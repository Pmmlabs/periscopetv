"use strict";

var React = require("react");
var Utils = require("../utils/utils");

var AppStoreCTA = require("../components/AppStoreCTA.jsx");
var AppStoreLinks = require("../components/AppStoreLinks.jsx");

var ProfileHeader = React.createClass({
  displayName: "ProfileHeader",

  getDeviceState: function getDeviceState() {
    if (Utils.is.ios()) {
      return "IOS";
    }if (Utils.is.android()) {
      return "ANDROID";
    }return "DEFAULT";
  },

  possiblyRenderAppCTA: function possiblyRenderAppCTA() {
    var currentState = this.getDeviceState();
    switch (currentState) {
      case "IOS":
      case "ANDROID":
        return React.createElement(
          "div",
          { className: "ProfileHeader-appCta" },
          React.createElement(
            "div",
            { className: "AppLinks" },
            React.createElement(AppStoreCTA, {
              platform: currentState,
              contentType: "USER" })
          )
        );
      case "DEFAULT":
        return React.createElement(
          "div",
          { className: "ProfileHeader-appCta" },
          React.createElement(AppStoreLinks, { location: "ProfileHeader" })
        );
    }
  },

  render: function render() {
    return React.createElement(
      "div",
      { className: "ProfileHeader" },
      React.createElement(
        "h1",
        null,
        React.createElement(
          "a",
          { className: "ProfileHeader-logo", href: "/", target: "_blank" },
          React.createElement("img", { src: "/v/images/largepin.svg" })
        )
      ),
      this.possiblyRenderAppCTA()
    );
  }
});

module.exports = ProfileHeader;
