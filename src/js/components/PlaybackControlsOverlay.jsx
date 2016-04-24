"use strict";

var React = require("react");
var PlayerHelper = require("../mixins/PlayerHelper");
var PlaybackUI = require("../mixins/PlaybackUI");
var Constants = require("../constants/Constants");

var PlaybackControlsOverlay = React.createClass({
  displayName: "PlaybackControlsOverlay",

  mixins: [PlayerHelper, PlaybackUI],

  componentDidMount: function componentDidMount() {
    window.addEventListener("keydown", this.togglePlaybackByKeypress);
  },

  componentDidUnmount: function componentDidUnmount() {
    window.removeEventListener("keydown", this.togglePlaybackByKeypress);
  },

  togglePlaybackByKeypress: function togglePlaybackByKeypress(event) {
    // Space bar toggles playback
    if (this._isPlayback() && event.keyCode === Constants.Keycodes.SPACE_BAR) {
      this.togglePlayback();
    }
  },

  render: function render() {
    var classes = ["PlaybackControlsOverlay"].concat(this.buildStateClasses());

    return React.createElement(
      "div",
      { className: classes.join(" ") },
      React.createElement(
        "div",
        { className: "PlaybackControlsOverlay-cover", onClick: this.togglePlayback },
        React.createElement(
          "div",
          { className: "PlaybackControlsOverlay-hud" },
          React.createElement("div", { className: "PlaybackControlsOverlay-icon PlaybackControlsOverlay-pause", dangerouslySetInnerHTML: { __html: this.getPauseIcon() } }),
          React.createElement("div", { className: "PlaybackControlsOverlay-icon PlaybackControlsOverlay-play", dangerouslySetInnerHTML: { __html: this.getPlayIcon() } })
        )
      )
    );
  }
});

module.exports = PlaybackControlsOverlay;
