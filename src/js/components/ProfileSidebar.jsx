"use strict";

var React = require("react");
var IntlMixin = ReactIntl.IntlMixin;

var assign = require("object-assign");

var ProfileStore = require("../stores/ProfileStore");
var BroadcastStore = require("../stores/BroadcastStore");
var Utils = require("../utils/utils");
var Constants = require("../constants/Constants");
var Actions = require("../actions/Actions");

var ProfileHeader = require("./ProfileHeader.jsx");
var ProfileCard = require("./ProfileCard.jsx");
var ProfileBroadcasts = require("./ProfileBroadcasts.jsx");
var CouchmodeCTA = require("./CouchmodeCTA.jsx");

var ProfileSidebar = React.createClass({
  displayName: "ProfileSidebar",

  getInitialState: function getInitialState() {
    return this.getState();
  },

  componentDidMount: function componentDidMount() {
    BroadcastStore.addChangeListener(this.onChange);
    ProfileStore.addChangeListener(this.onChange);
    window.addEventListener("keydown", this.toggleProfileByKeypress);
  },

  componentWillUnmount: function componentWillUnmount() {
    BroadcastStore.removeChangeListener(this.onChange);
    ProfileStore.removeChangeListener(this.onChange);
    window.removeEventListener("keydown", this.toggleProfileByKeypress);
  },

  onChange: function onChange() {
    this.setState(this.getState());
  },

  getState: function getState() {
    return assign({}, BroadcastStore.getBroadcast(), ProfileStore.getProfile());
  },

  toggleProfileByKeypress: function toggleProfileByKeypress(event) {
    if (this.props.soloState) {
      return;
    }if (event.keyCode === Constants.Keycodes.P) this.toggle("KeyboardShortcut");
  },

  toggle: function toggle(eventName) {
    Actions.toggleProfile(eventName);
  },

  shouldIncludeCloseButtons: function shouldIncludeCloseButtons() {
    return !!this.state.broadcast.id;
  },

  shouldRenderCallToAction: function shouldRenderCallToAction() {
    return this.props.soloState && Utils.isVideoSupported();
  },

  render: function render() {
    var classes = ["ProfileSidebar"];
    var style = {};

    if (this.props.soloState) {
      classes.push("ProfileSidebar--isSolo");
      style.minHeight = this.props.height;
    } else {
      if (this.props.condensed) {
        classes.push("ProfileSidebar--condensed");
      }
      style.width = this.props.width;
      style.height = this.props.height;

      if (this.props.profileIsVisible) {
        classes.push("ProfileSidebar--isActive");
        style.marginLeft = 0;
      } else {
        style.marginLeft = -this.props.width;
      }
    }

    return React.createElement(
      "div",
      { className: classes.join(" "), style: style },
      this.props.condensed ? React.createElement(ProfileHeader, null) : undefined,
      React.createElement(
        "div",
        { className: "ProfileSidebar-content" },
        React.createElement(
          "div",
          { className: "ProfileSidebar-accordion" },
          React.createElement("div", { className: "ProfileSidebar-headerSpacerTop" }),
          React.createElement(ProfileCard, { user: this.state.profile.user, location: "ProfileSidebar" }),
          React.createElement("div", { className: "ProfileSidebar-broadcastsSpacerTop" }),
          React.createElement(ProfileBroadcasts, {
            isSolo: this.props.soloState,
            isCondensed: this.props.condensed,
            toggle: this.toggle.bind(this, "ProfileSidebarCloseButton"),
            user: this.state.profile.user,
            broadcasts: this.state.profile.broadcasts,
            active: this.state.broadcast }),
          this.shouldRenderCallToAction() ? React.createElement("div", { className: "ProfileSidebar-ctaSpacerTop" }) : undefined,
          this.shouldRenderCallToAction() ? React.createElement("div", { className: "ProfileSidebar-ctaBorderSpacerTop" }) : undefined,
          this.shouldRenderCallToAction() ? React.createElement(CouchmodeCTA, null) : undefined
        )
      ),
      this.shouldIncludeCloseButtons() ? React.createElement("div", { className: "ProfileSidebar-rightBarClose", onClick: this.toggle.bind(this, "ProfileSidebarDivider") }) : undefined,
      this.shouldIncludeCloseButtons() ? React.createElement("div", { className: "ProfileSidebar-bottomClose", onClick: this.toggle.bind(this, "ProfileSidebarCloseButton") }) : undefined
    );
  }
});

module.exports = ProfileSidebar;
