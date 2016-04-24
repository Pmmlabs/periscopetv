"use strict";

var React = require("react");
var IntlMixin = ReactIntl.IntlMixin;
var AppLinks = require("../../mixins/AppLinks");

var ModalStateStore = require("../../stores/ModalStateStore");
var Actions = require("../../actions/Actions");
var Constants = require("../../constants/Constants");

var Modal = require("./Modal.jsx");
var AppIcon = require("./../icons/AppIcon.jsx");
var ModalLinkCTA = require("./../ModalLinkCTA.jsx");

var modalType = Constants.ModalTypes.APP_LINK;
var location = "AppLinkModal";

var AppLinkModal = React.createClass({
  displayName: "AppLinkModal",

  mixins: [IntlMixin, AppLinks],

  getInitialState: function getInitialState() {
    return this.getModal();
  },
  getModal: function getModal() {
    return ModalStateStore.getModal(modalType);
  },
  componentDidMount: function componentDidMount() {
    ModalStateStore.addChangeListener(this.onChange);
  },
  componentWillUnmount: function componentWillUnmount() {
    ModalStateStore.removeChangeListener(this.onChange);
  },
  onChange: function onChange() {
    this.setState(this.getModal());
  },
  onDismiss: function onDismiss() {
    Actions.closeModal(modalType);
  },

  render: function render() {
    return React.createElement(
      Modal,
      { className: "AppLinkModal", isVisible: this.state.visible, onDismiss: this.onDismiss, location: location },
      React.createElement(AppIcon, null),
      React.createElement(
        "p",
        { className: "Modal-message" },
        this.getIntlMessage("app.MOBILE")
      ),
      React.createElement(
        "div",
        { className: "AppLinkModal-cta" },
        React.createElement(
          ModalLinkCTA,
          { isFilled: true, linkTarget: this.getAppStoreLink(), trackStr: "modal-get-app", location: location },
          this.getIntlMessage("app.GET")
        ),
        React.createElement(
          ModalLinkCTA,
          { isMuted: true, linkTarget: this.getInAppLink(), trackStr: "modal-open-app", location: location },
          this.getIntlMessage("app.OPEN")
        )
      )
    );
  }
});

module.exports = AppLinkModal;
