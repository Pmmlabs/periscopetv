"use strict";

var React = require("react");
var IntlMixin = ReactIntl.IntlMixin;
var Debugging = require("../utils/Debugging");
var TwitterLogo = require("./icons/TwitterLogo.jsx");

var ProfileTwitterAccount = React.createClass({
  displayName: "ProfileTwitterAccount",

  mixins: [IntlMixin],
  propTypes: {
    user: React.PropTypes.object.isRequired
  },

  trackClick: function trackClick(eventData) {
    Debugging.track("profile-sidebar-twitter", eventData);
  },

  render: function render() {
    return React.createElement(
      "a",
      { className: "ProfileTwitterAccount",
        href: "https://twitter.com/" + this.props.user.twitter_screen_name,
        title: this.getIntlMessage("user.TWITTER_LINK"),
        onClick: this.trackClick.bind(this, { "twitter-username": this.props.user.twitter_screen_name }),
        target: "_blank" },
      React.createElement(TwitterLogo, null)
    );
  }
});

module.exports = ProfileTwitterAccount;
