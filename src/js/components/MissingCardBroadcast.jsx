"use strict";

var React = require("react");
var assign = require("object-assign");
var IntlMixin = ReactIntl.IntlMixin;
var Router = require("../router");
var Blur = require("react-blur");
var Utils = require("../utils/utils");
var Actions = require("../actions/Actions");
var ProfileStore = require("../stores/ProfileStore");
var CardHeader = require("./CardHeader.jsx");
var ProfileAuthor = require("./ProfileAuthor.jsx");

var MissingCardBroadcast = React.createClass({
  displayName: "MissingCardBroadcast",

  mixins: [IntlMixin],

  componentDidMount: function componentDidMount() {
    ProfileStore.addUserChangeListener(this.onChange);
  },

  componentWillUnmount: function componentWillUnmount() {
    ProfileStore.removeUserChangeListener(this.onChange);
  },

  onChange: function onChange() {
    this.setState(this.getState());
  },

  getState: function getState() {
    var ready = arguments[0] === undefined ? undefined : arguments[0];

    var backgroundReady = ready !== undefined ? ready : this.state.backgroundReady;
    return assign({}, { backgroundReady: backgroundReady }, { user: ProfileStore.getProfileUser() });
  },

  getInitialState: function getInitialState() {
    return this.getState(false);
  },

  getProfileLink: function getProfileLink() {
    return Router.generateProfileUrl({
      username: this.state.user.username
    });
  },

  backgroundReady: function backgroundReady() {
    if (!this.state.backgroundReady) this.setState(this.getState(true));
  },

  render: function render() {
    var backgroundClasses = ["MissingCardBroadcast", "u-flexParent"];
    var blurClasses = ["MissingCardBroadcast-image", "u-flexItem", "u-opacity-70", "u-transition-1"];

    if (this.state.backgroundReady) {
      backgroundClasses.push("MissingCardBroadcast--ready");
    }

    return React.createElement(
      "div",
      { className: backgroundClasses.join(" ") },
      React.createElement(Blur, { className: blurClasses.join(" "), img: this.state.user.avatar_url, blurRadius: 80, onLoadFunction: this.backgroundReady }),
      React.createElement(
        "div",
        { className: "MissingCardBroadcast-info" },
        React.createElement(ProfileAuthor, { user: this.state.user, isLink: false, location: "MissingCardBroadcast" }),
        React.createElement(
          "div",
          { className: "MissingCardBroadcast-broadcastState" },
          this.getIntlMessage("broadcast.state_label.UNAVAILABLE")
        )
      ),
      React.createElement(
        "a",
        { className: "MissingCardBroadcast-link", href: this.getProfileLink(), target: "_blank" },
        React.createElement(CardHeader, { includeUserCTA: true })
      )
    );
  }
});

module.exports = MissingCardBroadcast;
