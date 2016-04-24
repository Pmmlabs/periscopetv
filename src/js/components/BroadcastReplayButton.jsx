"use strict";

var React = require("react");

var Actions = require("../actions/Actions");
var Utils = require("../utils/utils");
var PlayerHelper = require("../mixins/PlayerHelper");
var BroadcastHelper = require("../mixins/BroadcastHelper");
var Constants = require("../constants/Constants");
var Debugging = require("../utils/Debugging");

var BroadcastReplayButton = React.createClass({
  displayName: "BroadcastReplayButton",

  mixins: [PlayerHelper, BroadcastHelper],

  componentDidMount: function componentDidMount() {
    window.addEventListener("keydown", this.togglePlayerModeByKeypress);
  },

  componentDidUnmount: function componentDidUnmount() {
    window.removeEventListener("keydown", this.togglePlayerModeByKeypress);
  },

  playbackNotSupported: function playbackNotSupported() {
    return !Utils.isVideoSupported();
  },

  togglePlayerModeByKeypress: function togglePlayerModeByKeypress(event) {
    // Ignore events if video is playing
    if (this._isPlayback()) {
      return;
    } // Space bar toggles playback
    if (event.keyCode === Constants.Keycodes.SPACE_BAR) {
      this.togglePlayerMode();
    }
  },

  togglePlayerMode: function togglePlayerMode() {
    if (this.playbackNotSupported()) {
      Debugging.trackOnce("replay-click-unsupported-playback");
      Actions.playbackRequestedButNotSupported();
      return;
    };

    if (this._isInterstitialPresentation()) {
      Actions.switchToVideoPresentation();
      Actions.playVideo();
    } else {
      Actions.completePlayback();
    }
  },

  render: function render() {
    var buttonClasses = ["BroadcastReplayButton"];
    if (this._isEnded() && this._isInterstitialPresentation()) {
      buttonClasses.push("is-paused");
    } else if (this._videoHasStarted()) {
      buttonClasses.push("is-playing");
    } else if (this._isVideoPresentation()) {
      buttonClasses.push("is-loading");
    }

    if (this.playbackNotSupported()) {
      buttonClasses.push("BroadcastReplayButton--disabled");
    }

    return React.createElement("div", { className: buttonClasses.join(" "),
      onClick: this.togglePlayerMode,
      dangerouslySetInnerHTML: { __html: "<div class=\"BroadcastReplayButton-loading\"></div><svg width=\"180px\" height=\"180px\" viewBox=\"0 0 182 180\" version=\"1.1\"><g stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\"><g transform=\"translate(-629, -319)\"><g transform=\"translate(-80.000000, -57.000000)\"><g class=\"replay-button\" transform=\"translate(710.000000, 376.000000)\"><circle class=\"circle\" stroke=\"#FFFFFF\" stroke-width=\"2\" fill-opacity=\"0\" fill=\"#000000\" cx=\"90\" cy=\"90\" r=\"90\"></circle><polygon class=\"icon-play\" fill=\"#FFFFFF\" transform=\"translate(100.000000, 91.000000) rotate(90.000000) translate(-100.000000, -91.000000) \" points=\"100 62 129 120 71 120 \"></polygon><path class=\"icon-pause\" d=\"M71,61 L71,120 L84,120 L84,61 L71,61 Z M96,61 L96,120 L109,120 L109,61 L96,61 Z\" id=\"pause\" fill=\"#FFFFFF\"></path></g></g></g></g></svg>" } });
  }
});

module.exports = BroadcastReplayButton;
