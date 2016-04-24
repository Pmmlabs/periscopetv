"use strict";

var React = require("react");
var IntlMixin = ReactIntl.IntlMixin;
var assign = require("object-assign");

var UserModalStore = require("../../stores/UserModalStore");
var ModalStateStore = require("../../stores/ModalStateStore");
var Actions = require("../../actions/Actions");
var Constants = require("../../constants/Constants");
var Debugging = require("../../utils/Debugging");

var Modal = require("./Modal.jsx");
var ProfileCard = require("./../ProfileCard.jsx");
var PeriscopeProfileButton = require("./../PeriscopeProfileButton.jsx");

var modalType = Constants.ModalTypes.USER;

var ProfileModal = React.createClass({
  displayName: "ProfileModal",

  mixins: [IntlMixin],

  getInitialState: function getInitialState() {
    return {};
  },
  componentDidMount: function componentDidMount() {
    UserModalStore.addChangeListener(this.getModalUser);
    ModalStateStore.addChangeListener(this.updateModalState);
  },
  componentWillUnmount: function componentWillUnmount() {
    UserModalStore.removeChangeListener(this.getModalUser);
    ModalStateStore.removeChangeListener(this.updateModalState);
  },

  getModalUser: function getModalUser() {
    var _this = this;

    UserModalStore.getUserModal().then(function (response) {
      var newState = assign({}, response, ModalStateStore.getModal.call(ModalStateStore, modalType));

      _this.setState.call(_this, newState);
    });
  },

  updateModalState: function updateModalState() {
    var newState = assign({}, this.state.user, this.state.loading, ModalStateStore.getModal.call(ModalStateStore, modalType));
    this.setState(newState);
  },

  muteUsername: function muteUsername() {
    Debugging.track("user-muted");
    var username = this.state.username;
    Actions.muteUsername(username);
    Actions.closeModal(Constants.ModalTypes.USER);
  },

  onDismiss: function onDismiss() {
    Actions.closeModal(Constants.ModalTypes.USER);
  },

  possiblyRenderUser: function possiblyRenderUser() {
    if (this.state.user && !this.state.loading) {
      return React.createElement(
        "div",
        null,
        React.createElement(ProfileCard, { user: this.state.user, location: "ProfileModal" }),
        React.createElement(PeriscopeProfileButton, { user: this.state.user, location: "ProfileModal" }),
        React.createElement(
          "div",
          { className: "ProfileModal--mute", onClick: this.muteUsername },
          this.getIntlMessage("user.MUTE")
        )
      );
    }
  },

  render: function render() {
    return React.createElement(
      Modal,
      { className: "ProfileModal", isVisible: this.state.visible, onDismiss: this.onDismiss, location: "ProfileModal" },
      this.possiblyRenderUser()
    );
  }
});

module.exports = ProfileModal;
