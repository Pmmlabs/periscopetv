"use strict";

var React = require("react");

var IntlMixin = ReactIntl.IntlMixin;

var Actions = require("../actions/Actions");
var Constants = require("../constants/Constants");

var PlayerHelper = require("../mixins/PlayerHelper");
var BroadcastHelper = require("../mixins/BroadcastHelper");
var Utils = require("../utils/utils");
var Debugging = require("../utils/Debugging");

var AppStoreCTA = require("./AppStoreCTA.jsx");
var AppStoreLinks = require("./AppStoreLinks.jsx");
var GetAppCTA = require("./GetAppCTA.jsx");

var BroadcastCallToAction = React.createClass({
  displayName: "BroadcastCallToAction",

  mixins: [IntlMixin, PlayerHelper, BroadcastHelper],

  getState: function getState() {
    // Caution order matters here
    if (this._isServerError()) {
      return "HIDE";
    }if (this._isExpired()) {
      return "HIDE";
    }if (this._isNotFound()) {
      return "HIDE";
    }if (Utils.isUnsupportedBrowser()) {
      return "UNSUPPORTED_BROWSER";
    }if (Utils.is.ios()) {
      return "IOS";
    }if (Utils.is.android()) {
      return "ANDROID";
    }if (this._isRunning()) {
      return "HIDE";
    } // TODO: WEB-32 Properly reflect replay availability on mobile
    return "DEFAULT";
  },

  determineCTA: function determineCTA() {
    var currentState = this.getState();
    switch (currentState) {
      case "HIDE":
        return;
      case "UNSUPPORTED_BROWSER":
        return React.createElement(
          "div",
          { className: "BroadcastDetails-appCta" },
          React.createElement(
            "p",
            null,
            this.getIntlMessage("broadcast.cta." + currentState)
          )
        );
      case "IOS":
      case "ANDROID":
        return React.createElement(
          "div",
          { className: "BroadcastDetails-appCta BroadcastDetails-appCta--deviceWithApp" },
          React.createElement(AppStoreCTA, {
            platform: currentState,
            contentType: "BROADCAST" })
        );
      case "DEFAULT":
        return React.createElement(
          "div",
          { className: "BroadcastDetails-appCta" },
          React.createElement(GetAppCTA, { location: "BroadcastDetails" }),
          React.createElement(AppStoreLinks, { location: "BroadcastDetails" })
        );
    }
  },

  render: function render() {
    return React.createElement(
      "div",
      null,
      this.determineCTA()
    );
  }
});

module.exports = BroadcastCallToAction;
