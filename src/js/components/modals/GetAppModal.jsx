"use strict";

var React = require("react");
var assign = require("object-assign");

var IntlMixin = ReactIntl.IntlMixin;

var ModalStateStore = require("../../stores/ModalStateStore");
var DownloadLinkStore = require("../../stores/DownloadLinkStore");
var Actions = require("../../actions/Actions");
var Constants = require("../../constants/Constants");
var Debugging = require("../../utils/Debugging");

var Modal = require("./Modal.jsx");
var AppIcon = require("./../icons/AppIcon.jsx");
var CheckIcon = require("./../CheckIcon.jsx");
var Form = require("./../Form.jsx");

var FieldKit = require("field-kit");
var PhoneInput = require("./../PhoneInput.jsx");

var modalType = Constants.ModalTypes.GET_APP;
var location = "GetAppModal";

var GetAppModal = React.createClass({
  displayName: "GetAppModal",

  mixins: [IntlMixin],

  getInitialState: function getInitialState() {
    return this.getState();
  },

  getState: function getState() {
    return assign({
      // +444213312312
      rawPhoneValue: this.state && this.state.rawPhoneValue || "",
      // +44 (421) 331-2312
      formattedPhoneValue: this.state && this.state.formattedPhoneValue || "",
      isValidPhone: this.state && this.state.isValidPhone
    }, ModalStateStore.getModal(modalType), DownloadLinkStore.getLinkRequest());
  },

  mutateState: function mutateState() {
    var newState = arguments[0] === undefined ? {} : arguments[0];

    var state = assign(this.getState(), newState);
    this.setState(assign(state, {
      isValidPhone: this.isValidPhoneNumber(state.formattedPhoneValue)
    }));
  },

  componentWillMount: function componentWillMount() {
    DownloadLinkStore.init();
  },

  componentDidMount: function componentDidMount() {
    ModalStateStore.addChangeListener(this.onChange);
    ModalStateStore.addOpenChangeListener(this.onOpenChange);
    DownloadLinkStore.addChangeListener(this.onChange);
  },

  componentWillUnmount: function componentWillUnmount() {
    ModalStateStore.removeChangeListener(this.onChange);
    ModalStateStore.removeOpenChangeListener(this.onOpenChange);
    DownloadLinkStore.removeChangeListener(this.onChange);
  },

  isValidPhoneNumber: function isValidPhoneNumber(number) {
    var numberSplit = number.split("-");
    if (numberSplit.length > 1 && numberSplit.pop().length === 4) {
      return true;
    }

    return false;
  },

  focusInput: function focusInput() {
    if (!this.refs.getAppInput) {
      return;
    }var input = this.refs.getAppInput.getDOMNode();
    input.focus();

    // Ensure cursor is at end of input value on focus
    var val = input.value;
    input.value = "";
    input.value = val;
  },

  clearInput: function clearInput() {
    if (this.state.linkRequest.view === "PROMPT" && this.refs.getAppInput) {
      this.refs.getAppInput.getDOMNode().value = "";
    }
  },

  // Store change handlers
  onChange: function onChange() {
    this.mutateState();
  },

  onPhoneChange: function onPhoneChange(field) {
    this.mutateState({
      rawPhoneValue: field.value(),
      formattedPhoneValue: field.text()
    });
  },

  onOpenChange: function onOpenChange() {
    setTimeout(this.resetPrompt);
  },

  // UI click handlers
  onDismiss: function onDismiss() {
    Actions.closeModal(modalType);
  },

  onReset: function onReset(event) {
    event && event.preventDefault();
    this.resetPrompt();
  },

  resetPrompt: function resetPrompt() {
    Actions.resetDownloadLink();
    this.mutateState({
      rawPhoneValue: "",
      formattedPhoneValue: ""
    });
    this.clearInput();
    this.focusInput();
  },

  // Form event handlers
  onSubmit: function onSubmit(event) {
    event && event.preventDefault();
    var destination = this.state.rawPhoneValue;
    var data = {};
    if (this.props.broadcast && this.props.broadcast.id) {
      data.broadcastId = this.props.broadcast.id;
    } else if (this.props.user && this.props.user.username) {
      data.username = this.props.user.username;
    }

    Actions.requestDownloadLink(destination, data);
    Debugging.track("download-link-submit");
  },

  renderPromptState: function renderPromptState() {
    return React.createElement(
      "div",
      { className: "GetAppModal-prompt" },
      React.createElement(AppIcon, null),
      React.createElement(
        "h1",
        { className: "Modal-title" },
        this.getIntlMessage("text_link.prompt.TITLE")
      ),
      React.createElement(
        "p",
        { className: "Modal-message" },
        this.getIntlMessage("text_link.prompt.MESSAGE")
      ),
      React.createElement(
        "div",
        { className: "Modal-form" },
        React.createElement(
          Form,
          { submitLabel: "Text me the link", submitFn: this.onSubmit, disabled: this.state.linkRequest.pending || !this.state.isValidPhone },
          React.createElement(
            "label",
            { className: "Form-label", htmlFor: "get-app-phone-input" },
            this.getIntlMessage("text_link.prompt.CTA")
          ),
          React.createElement(PhoneInput, { value: this.state.rawPhoneValue,
            className: "Form-input",
            id: "get-app-phone-input",
            ref: "getAppInput",
            unfocusedPlaceholder: "Phone Number",
            focusedPlaceholder: "ex. (415) 555-0123",
            onChange: this.onPhoneChange })
        ),
        React.createElement(
          "small",
          { className: "Modal-smallPrint" },
          this.getIntlMessage("text_link.prompt.DISCLAIMER")
        )
      )
    );
  },

  renderSuccessState: function renderSuccessState() {
    var formatter = new FieldKit.PhoneFormatter();
    var formattedNumber = formatter.format(this.state.linkRequest.destination);

    return React.createElement(
      "div",
      { className: "GetAppModal-result" },
      React.createElement(CheckIcon, null),
      React.createElement(
        "h1",
        { className: "Modal-title" },
        this.getIntlMessage("text_link.success.TITLE")
      ),
      React.createElement(
        "div",
        { className: "Modal-message" },
        React.createElement(
          "p",
          { className: "Modal-message" },
          React.createElement(ReactIntl.FormattedMessage, {
            message: this.getIntlMessage("text_link.success.MESSAGE"),
            formattedNumber: formattedNumber
          })
        ),
        React.createElement(
          "small",
          { className: "Modal-smallPrint" },
          this.getIntlMessage("text_link.success.CTA"),
          " ",
          React.createElement(
            "a",
            { href: "#", onClick: this.onReset },
            this.getIntlMessage("text_link.success.TRY_AGAIN")
          )
        )
      ),
      React.createElement(
        "a",
        { href: "#", className: "ModalLinkCTA ModalLinkCTA--isMuted", onClick: this.onDismiss },
        this.getIntlMessage("text_link.success.DONE")
      )
    );
  },

  renderErrorState: function renderErrorState() {
    return React.createElement(
      "div",
      { className: "GetAppModal-result" },
      React.createElement(
        "h1",
        { className: "Modal-title" },
        this.getIntlMessage("text_link.error.TITLE")
      ),
      React.createElement(
        "div",
        { className: "Modal-message" },
        React.createElement(
          "p",
          { className: "Modal-message" },
          this.getIntlMessage("text_link.error.MESSAGE")
        ),
        React.createElement(
          "small",
          { className: "Modal-smallPrint" },
          React.createElement(
            "a",
            { href: "#", onClick: this.onReset },
            this.getIntlMessage("text_link.error.TRY_AGAIN")
          )
        )
      ),
      React.createElement(
        "a",
        { href: "#", className: "ModalLinkCTA ModalLinkCTA--isMuted", onClick: this.onDismiss },
        this.getIntlMessage("text_link.error.DONE")
      )
    );
  },

  renderState: function renderState() {
    switch (this.state.linkRequest.view) {
      case Constants.DownloadLinkStates.SUCCESS:
        return this.renderSuccessState();
      case Constants.DownloadLinkStates.ERROR:
        return this.renderErrorState();
      case Constants.DownloadLinkStates.PROMPT:
      default:
        return this.renderPromptState();
    }
  },

  render: function render() {
    return React.createElement(
      Modal,
      { className: "GetAppModal", isVisible: this.state.visible, onDismiss: this.onDismiss, location: location },
      this.renderState()
    );
  }
});

module.exports = GetAppModal;
