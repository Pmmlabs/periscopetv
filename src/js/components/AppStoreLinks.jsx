"use strict";

var React = require("react");

var IntlMixin = ReactIntl.IntlMixin;

var Constants = require("../constants/Constants");
var Debugging = require("../utils/Debugging");

var AppStoreLinks = React.createClass({
  displayName: "AppStoreLinks",

  mixins: [IntlMixin],

  trackClick: function trackClick(platform) {
    var trackStr = platform === "ANDROID" ? "click-getAppSplit-android" : "click-getAppSplit";

    Debugging.track(trackStr, {
      location: this.props.location
    });
  },

  render: function render() {
    return React.createElement(
      "div",
      { className: "AppLinks" },
      React.createElement(
        "a",
        { href: Constants.PeriscopeLinks.APP_WEB,
          className: "AppLink AppLink--cta AppLink--withIcon",
          onClick: this.trackClick.bind(this, "IOS") },
        React.createElement(
          "span",
          { className: "AppLink-icon AppLink-icon--apple" },
          React.createElement("img", { src: "/v/images/logo_apple.svg" })
        ),
        this.getIntlMessage("app.IOS")
      ),
      React.createElement(
        "a",
        { href: Constants.PeriscopeLinks.PLAY_STORE,
          className: "AppLink AppLink--cta AppLink--withIcon",
          onClick: this.trackClick.bind(this, "ANDROID") },
        React.createElement(
          "span",
          { className: "AppLink-icon AppLink-icon--playstore" },
          React.createElement("img", { src: "/v/images/logo_playstore.svg" })
        ),
        this.getIntlMessage("app.ANDROID")
      )
    );
  }
});

module.exports = AppStoreLinks;
