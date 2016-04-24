"use strict";

var React = require("react");
var Utils = require("../utils/utils");

var PlayerHelper = require("../mixins/PlayerHelper");
var BroadcastHelper = require("../mixins/BroadcastHelper");

var INTERSTITIAL = {
  baseClass: "VideoInterstitial",
  hiddenModifier: "VideoInterstitial--hidden",
  delayModifier: "VideoInterstitial--delay"
};

var LAYOUT = {
  flexParent: "u-flexParent",
  fullHeight: "u-fullHeight"
};

var VideoInterstitial = React.createClass({
  displayName: "VideoInterstitial",

  mixins: [PlayerHelper, BroadcastHelper],

  render: function render() {
    var classes = [INTERSTITIAL.baseClass, LAYOUT.fullHeight, LAYOUT.flexParent];

    // Fade out interstitial when video is playing
    if (this._videoHasStarted() && this._isPlayback() && Utils.is.not.mobile()) {
      classes.push(INTERSTITIAL.hiddenModifier);
      classes.push(INTERSTITIAL.delayModifier);
    }

    // Show interstitial when video is finished playing
    if (!this._isPlayback() && this._isEnded() || Utils.shouldUseMobileLayout()) {
      Utils.removeFromArray(INTERSTITIAL.delayModifier, classes);
      Utils.removeFromArray(INTERSTITIAL.hiddenModifier, classes);
    }

    if (this.props.baseClass) {
      classes.push(this.props.baseClass);
    }

    return React.createElement(
      "div",
      { className: classes.join(" ") },
      this.props.children
    );
  }
});

module.exports = VideoInterstitial;
