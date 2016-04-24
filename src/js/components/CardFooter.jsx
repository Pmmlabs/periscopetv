"use strict";

var React = require("react");
var PlaybackUI = require("../mixins/PlaybackUI");
var PlayerHelper = require("../mixins/PlayerHelper");
var Utils = require("../utils/utils");
var ViewerBadge = require("./ViewerBadge.jsx");
var PlaybackControls = require("./PlaybackControls.jsx");
var PlaybackProgress = require("./PlaybackProgress.jsx");
var MuteButton = require("./MuteButton.jsx");
var SafariMessage = require("./SafariMessage.jsx");

var CardFooter = React.createClass({
  displayName: "CardFooter",

  mixins: [PlayerHelper, PlaybackUI],

  possiblyRenderSafariMessage: function possiblyRenderSafariMessage() {
    if (Utils.isHTMLVideoSupported() && this._isLiveMode()) {
      return React.createElement(SafariMessage, null);
    }
  },

  renderLiveFooter: function renderLiveFooter() {
    return React.createElement(
      "div",
      { className: "CardFooter" },
      React.createElement(ViewerBadge, { isLive: true, isConjoined: true, includeEndedLabel: true }),
      React.createElement(
        "div",
        { className: "CardFooter-message" },
        this.possiblyRenderSafariMessage()
      ),
      React.createElement(
        "div",
        { className: "CardFooter-fixed" },
        React.createElement(MuteButton, { mute: this._isAudioOff() })
      )
    );
  },

  renderReplayFooter: function renderReplayFooter() {
    return React.createElement(
      "div",
      { className: "CardFooter" },
      React.createElement(
        "div",
        { className: "CardFooter-dynamic" },
        React.createElement(ViewerBadge, { isConjoined: true, includeEndedLabel: true }),
        React.createElement(
          "div",
          { className: "CardFooter-playback" },
          React.createElement(PlaybackControls, { player: this.props.player, broadcast: this.props.broadcast }),
          React.createElement(PlaybackProgress, { hideThumbnail: true, player: this.props.player, broadcast: this.props.broadcast })
        )
      ),
      React.createElement(
        "div",
        { className: "CardFooter-fixed" },
        React.createElement(MuteButton, { mute: this._isAudioOff() })
      )
    );
  },

  render: function render() {
    return this._isLiveMode() ? this.renderLiveFooter() : this.renderReplayFooter();
  }
});

module.exports = CardFooter;
