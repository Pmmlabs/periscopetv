"use strict";

var React = require("react");
var Actions = require("../actions/Actions");
var Router = require("../router");

var Debugging = require("../utils/Debugging");
var Utils = require("../utils/utils");

var ProfileLinkClasses = {
  DEFAULT: "ProfileLink",
  INACTIVE: "ProfileLink--isInactive",
  ACTIVE: "ProfileLink--isActive"
};

var ProfileLink = React.createClass({
  displayName: "ProfileLink",

  propTypes: {
    user: React.PropTypes.object.isRequired,
    location: React.PropTypes.string.isRequired,
    useModal: React.PropTypes.bool,
    isLink: React.PropTypes.bool,
    profileIsVisible: React.PropTypes.bool
  },

  getDefaultProps: function getDefaultProps() {
    return {
      useModal: true,
      isLink: true,
      profileIsVisible: false
    };
  },

  trackEvent: function trackEvent(eventName) {
    Debugging.track(eventName, {
      location: this.props.location
    });
  },

  generateProfileLink: function generateProfileLink() {
    return Router.generateProfileUrl({ username: this.props.user.username });
  },

  modifierKey: function modifierKey(event) {
    return event.shiftKey || event.ctrlKey || event.metaKey || event.which > 1;
  },

  /**
   * When the parent component rendering this component
   * explicitly does not want to show the modal on click
   */
  modalDisabled: function modalDisabled() {
    if (!this.props.useModal) {
      this.trackEvent("profile-click");
      return true;
    }
    return false;
  },

  /**
   * When the user chooses to bypass the modal by clicking
   * with a modifier key simultaneously pressed
   */
  userBypassedModal: function userBypassedModal(event) {
    if (this.modifierKey(event) && this.props.user.twitter_screen_name && this.props.user.twitter_screen_name !== "") {
      this.trackEvent("profile-click");
      window.open(this.generateProfileLink(), "_blank");
      return true;
    }
    return false;
  },

  showUser: function showUser(event) {
    if (this.modalDisabled()) {
      return;
    }event.preventDefault();
    if (this.userBypassedModal(event)) {
      return;
    } // Set user in modal store, show user modal
    // Actions.setModalUser(this.props.user.id);

    // 2015/08/11
    // TODO: When the profile sidebar is introduced,
    // conditionally call this method if the user
    // requested is the profile broadcaster
    // For now, this only handles updating the URL
    Actions.toggleProfile(this.props.location);
  },

  renderContents: function renderContents() {
    if (this.props.isLink) {

      var classes = [ProfileLinkClasses.DEFAULT];
      if (this.props.profileIsVisible) {
        Utils.removeFromArray(ProfileLinkClasses.INACTIVE, classes);
        classes.push(ProfileLinkClasses.ACTIVE);
      } else {
        Utils.removeFromArray(ProfileLinkClasses.ACTIVE, classes);
        classes.push(ProfileLinkClasses.INACTIVE);
      }

      return React.createElement(
        "a",
        { className: classes.join(" "),
          href: this.generateProfileLink(),
          target: "_blank",
          rel: "author",
          onClick: this.showUser },
        this.props.children
      );
    } else {
      return React.createElement(
        "span",
        null,
        this.props.children
      );
    }
  },

  render: function render() {
    return React.createElement(
      "div",
      { className: this.props.className },
      this.renderContents()
    );
  }
});

module.exports = ProfileLink;
