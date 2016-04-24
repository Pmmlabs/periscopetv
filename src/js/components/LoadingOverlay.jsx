"use strict";

var React = require("react");
var IntlMixin = ReactIntl.IntlMixin;
var Constants = require("../constants/Constants");
var Utils = require("../utils/utils");
var PlayerHelper = require("../mixins/PlayerHelper");

var LOADING_CLASS = "LoadingOverlay--isLoading";

var LoadingOverlay = React.createClass({
  displayName: "LoadingOverlay",

  mixins: [PlayerHelper, IntlMixin],

  isSeeking: function isSeeking() {
    return !this._isPaused() && this.props.replay.isSeeking;
  },

  render: function render() {
    var classes = ["LoadingOverlay"];
    var loadingText = undefined;

    // Show loading overlay before video starts playing
    if (this._isConnecting()) {
      classes.push(LOADING_CLASS);
      loadingText = this._isLiveMode() ? this.getIntlMessage("broadcast.state_label.CONNECTING") : this.getIntlMessage("broadcast.state_label.LOADING");
    }

    // Show loading overlay when video is seeking
    if (this.isSeeking()) {
      classes.push(LOADING_CLASS);
    }

    return React.createElement(
      "div",
      { className: classes.join(" ") },
      React.createElement(
        "span",
        { className: "LoadingOverlay-text" },
        loadingText
      )
    );
  }
});

module.exports = LoadingOverlay;
