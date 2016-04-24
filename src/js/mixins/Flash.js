"use strict";

var React = require("react");

var Debugging = require("../utils/Debugging");
var Utils = require("../utils/utils");

var FlashMixin = {

  getFlashReason: function getFlashReason() {
    // Return 1 if Flash is not installed
    // Return 2 if Flash is installed but disabled by browser
    // Return 3 if Flash is installed but disabled by extension

    switch (this.props.flashStatus) {
      case 1:
        Debugging.trackOnce("flash-not-installed");
        if (Utils.is.safari()) {
          return "NOT_INSTALLED_SAFARI";
        }return "NOT_INSTALLED";
      case 2:
        Debugging.trackOnce("flash-disabled");
        if (Utils.is.chrome()) {
          return "DISABLED_BY_CHROME";
        }if (Utils.is.firefox()) {
          return "DISABLED_BY_FIREFOX";
        }if (Utils.is.safari()) {
          return "DISABLED_BY_SAFARI";
        }return "DISABLED_BY_BROWSER";
      case 3:
        Debugging.trackOnce("flash-blocked");
        if (Utils.is.safari()) {
          return "DISABLED_BY_SAFARI_EXTENSION";
        }return "DISABLED_BY_EXTENSION";
    }
  },

  getFlashMessage: function getFlashMessage() {
    return "To play video, Flash is required.";
  },

  getFlashCTA: function getFlashCTA() {
    switch (this.getFlashReason()) {
      case "NOT_INSTALLED":
        return React.createElement(
          "span",
          null,
          "Please go to ",
          React.createElement(
            "a",
            { href: "https://get.adobe.com/flashplayer/", target: "_blank" },
            "Adobe"
          ),
          " and install Flash."
        );
      case "NOT_INSTALLED_SAFARI":
        return React.createElement(
          "span",
          null,
          "Please go to ",
          React.createElement(
            "a",
            { href: "https://get.adobe.com/flashplayer/", target: "_blank" },
            "Adobe"
          ),
          " and install Flash."
        );
      case "DISABLED_BY_BROWSER":
        return "Please go to your browser's settings and enable Flash.";
      case "DISABLED_BY_CHROME":
        return "Please go to Chrome's Plugins and enable Flash.";
      case "DISABLED_BY_FIREFOX":
        return "Please go to Firefox's Add-ons > Plugins.";
      case "DISABLED_BY_SAFARI":
        return "Please go to Safari's Preferences > Security > Plug-in Settings.";
      case "DISABLED_BY_EXTENSION":
        return "Please go to your browser's extensions and unblock Flash.";
      case "DISABLED_BY_SAFARI_EXTENSION":
        return "Please go to your browser's extensions and unblock Flash.";
    }
  } };

module.exports = FlashMixin;
