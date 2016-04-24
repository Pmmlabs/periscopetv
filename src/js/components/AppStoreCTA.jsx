"use strict";

var React = require("react");

var IntlMixin = ReactIntl.IntlMixin;

var Constants = require("../constants/Constants");
var Debugging = require("../utils/Debugging");

var AppStoreCTA = React.createClass({
  displayName: "AppStoreCTA",

  mixins: [IntlMixin],

  propTypes: {
    platform: React.PropTypes.string.isRequired,
    contentType: React.PropTypes.string.isRequired },

  getDefaultProps: function getDefaultProps() {
    return {
      platform: "IOS",
      contentType: "BROADCAST"
    };
  },

  trackClick: function trackClick() {
    var trackStr = this.props.platform === "ANDROID" ? "click-openInApp-android" : "click-openInApp";

    Debugging.track(trackStr, {
      location: "BroadcastDetails"
    });
  },

  getContentLink: function getContentLink() {
    switch (this.props.contentType) {
      case "BROADCAST":
        return Constants.PeriscopeLinks.BROADCAST_IN_APP;
      case "USER":
        return Constants.PeriscopeLinks.USER_IN_APP;
    }
  },

  render: function render() {
    return React.createElement(
      "div",
      { className: "AppStoreCTA" },
      React.createElement(
        "a",
        {
          href: this.getContentLink(),
          className: "AppLink AppLink--cta",
          onClick: this.trackClick
        },
        this.getIntlMessage("app.OPEN")
      )
    );
  }
});

module.exports = AppStoreCTA;
