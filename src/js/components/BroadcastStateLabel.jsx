"use strict";

var React = require("react");

var IntlMixin = ReactIntl.IntlMixin;
var InitForReplay = require("../mixins/InitForReplay");
var PlayerHelper = require("../mixins/PlayerHelper");
var ReplayHelper = require("../mixins/ReplayHelper");
var BroadcastHelper = require("../mixins/BroadcastHelper");
var Constants = require("../constants/Constants");
var Utils = require("../utils/utils");
var Debugging = require("../utils/Debugging");
var Permissions = require("../utils/Permissions");

var endedTimer = undefined;
var endedTimerTick = 90000;

var BroadcastStateLabel = React.createClass({
  displayName: "BroadcastStateLabel",

  mixins: [InitForReplay, IntlMixin, PlayerHelper, ReplayHelper, BroadcastHelper],

  getState: function getState() {

    if (this._isServerError()) {
      return "ERROR";
    }if (this._isNotFound() || this._isUnavailable() && !this._isRunning() && this._isVideoPresentation()) {
      return "NOT_FOUND";
    }

    if (this._isExpired()) {
      return "EXPIRED";
    }

    if (this._isRunning() && (Utils.isDevice() || this._isUnavailable() || Utils.isUnsupportedBrowser() || Utils.isUnsupportedEnv())) {
      return "LIVE";
    }

    if (this._isRunning() && this._isConnecting()) {
      return "CONNECTING";
    }if (this._isRunning() && this._isPlaying()) {
      return "CONNECTED";
    }if (this._isEnded()) {
      return "ENDED_AGO";
    }return "CONNECTING";
  },

  possiblyIncludeReplayNotice: function possiblyIncludeReplayNotice() {
    if (!Permissions.isEnabled("replays")) {
      return;
    }if (Utils.isDevice()) {
      return;
    }if (this._isServerError()) {
      return;
    }if (this._isNotFound()) {
      return;
    }if (this._isExpired()) {
      return;
    }if (!this._isEnded()) {
      return;
    }if (this._replayAvailable()) {
      return;
    }return React.createElement(
      "p",
      { className: "BroadcastState-noReplay" },
      "Replay Unavailable"
    );
  },

  render: function render() {
    var _this = this;

    var currentState = this.getState();
    var labelClasses = ["BroadcastState"];

    switch (currentState) {
      case "ERROR":
      case "NOT_FOUND":
      case "EXPIRED":
        labelClasses.push("BroadcastState--error");
        break;
      case "ENDED_AGO":
        if (!endedTimer) {
          endedTimer = setInterval(function () {
            _this.forceUpdate();
          }, endedTimerTick);
        }
        break;
    }

    return React.createElement(
      "div",
      { className: labelClasses.join(" ") },
      React.createElement(
        "p",
        null,
        React.createElement(ReactIntl.FormattedMessage, {
          message: this.getIntlMessage("broadcast.state_label." + currentState),
          ended_ago: React.createElement(
            "time",
            { dateTime: new Date(this.props.broadcast.ended_at) },
            React.createElement(ReactIntl.FormattedRelative, { value: this.props.broadcast.ended_at })
          )
        })
      ),
      this.possiblyIncludeReplayNotice()
    );
  }
});

module.exports = BroadcastStateLabel;
