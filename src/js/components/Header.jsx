"use strict";

var React = require("react");
var IntlMixin = ReactIntl.IntlMixin;

var Constants = require("../constants/Constants");
var Debugging = require("../utils/Debugging");
var Utils = require("../utils/utils");

var VideoPlayerStore = require("../stores/VideoPlayerStore");
var PlayerHelper = require("../mixins/PlayerHelper");
var BroadcastHelper = require("../mixins/BroadcastHelper");

var InitForBroadcast = require("../mixins/InitForBroadcast");
var InitForCinema = require("../mixins/InitForCinema");

var AppIcon = require("./icons/AppIcon.jsx");
var GetAppCTA = require("./GetAppCTA.jsx");

var Header = React.createClass({
  displayName: "Header",

  mixins: [IntlMixin, InitForBroadcast, InitForCinema, PlayerHelper, BroadcastHelper],

  possiblyIncludeSubhead: function possiblyIncludeSubhead() {
    if (this._isRunning()) {
      return React.createElement(
        "p",
        { className: "Header-subhead" },
        this.getIntlMessage("app.DISCLAIMER")
      );
    }
  },

  trackClick: function trackClick() {
    if (Utils.is.ios() || Utils.is.android()) {
      var trackStr = Utils.is.android() ? "click-getApp-android" : "click-getApp";

      Debugging.track(trackStr, {
        location: "Header--mobile"
      });
    }
  },

  getAppStoreLink: function getAppStoreLink() {
    if (Utils.is.ios()) {
      return Constants.PeriscopeLinks.APP_STORE;
    }if (Utils.is.android()) {
      return Constants.PeriscopeLinks.PLAY_STORE;
    }return "/";
  },

  getCtaCopy: function getCtaCopy() {
    if (Utils.is.ios() || Utils.is.android()) {
      return this.getIntlMessage("app.MOBILE");
    } else {
      return this.getIntlMessage("app.MOBILE_UNSUPPORTED");
    }
  },

  possiblyRenderCtaButton: function possiblyRenderCtaButton() {
    if (!Utils.is.ios() && !Utils.is.android()) {
      return;
    }return React.createElement(
      "p",
      { className: "Header-ctaButton" },
      "Get"
    );
  },

  renderMobileHeader: function renderMobileHeader() {
    return React.createElement(
      "div",
      { className: "Header-container" },
      React.createElement(
        "a",
        { href: this.getAppStoreLink(),
          onClick: this.trackClick,
          className: "Header-mobileLinkContainer" },
        React.createElement(AppIcon, null),
        React.createElement(
          "p",
          { className: "Header-ctaCopy" },
          this.getCtaCopy()
        ),
        this.possiblyRenderCtaButton()
      )
    );
  },

  renderDesktopHeader: function renderDesktopHeader() {
    var styleClasses = ["u-transition-1"];

    if (this._isCinemaPlayer()) {
      styleClasses.push("u-opacity-0", "u-pointer-events-none");
    }

    return React.createElement(
      "div",
      { className: "Header-container" },
      React.createElement(
        "h1",
        null,
        React.createElement(
          "a",
          { className: "Header-logo", href: "/", target: "_blank" },
          "Periscope"
        )
      ),
      React.createElement(
        "div",
        { className: styleClasses.join(" ") },
        React.createElement(GetAppCTA, { location: "Header" }),
        this.possiblyIncludeSubhead()
      )
    );
  },

  render: function render() {
    return React.createElement(
      "header",
      { className: "Header" },
      Utils.shouldUseMobileLayout() ? this.renderMobileHeader() : this.renderDesktopHeader()
    );
  }
});

module.exports = Header;
