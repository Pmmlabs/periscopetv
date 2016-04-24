"use strict";

var Debugging = require("../utils/Debugging");
var Actions = require("../actions/Actions");
var Utils = require("../utils/utils");

var playAffordance = ".PlaybackControlsOverlay-hud .PlaybackControlsOverlay-play svg";
var pauseAffordance = ".PlaybackControlsOverlay-hud .PlaybackControlsOverlay-pause svg";

var playIcon = "<svg viewBox=\"0 0 34 34\"><g stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\"><g transform=\"translate(-1370.000000, -955.000000)\" fill=\"#FFFFFF\"><polygon transform=\"translate(1387.000000, 972.000000) rotate(90.000000) translate(-1387.000000, -972.000000) \" points=\"1387 955 1404 989 1370 989 \"></polygon></g></g></svg>";
var pauseIcon = "<svg viewBox=\"0 0 27 33\"><g stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\"><g transform=\"translate(-1371.000000, -954.000000)\" fill=\"#FFFFFF\"><g transform=\"translate(1371.000000, 954.000000)\"><rect x=\"0\" y=\"0\" width=\"9\" height=\"33\"></rect><rect x=\"18\" y=\"0\" width=\"9\" height=\"33\"></rect></g></g></g></svg>";

var PlaybackControls = {

  getPlayIcon: function getPlayIcon() {
    return playIcon;
  },

  getPauseIcon: function getPauseIcon() {
    return pauseIcon;
  },

  buildStateClasses: function buildStateClasses() {
    var classes = [];
    if (this._isPlaying()) {
      Utils.removeFromArray("is-paused", classes);
      classes.push("is-playing");
    } else {
      Utils.removeFromArray("is-playing", classes);
      classes.push("is-paused");
    };
    return classes;
  },

  animateAffordance: function animateAffordance(elSelector) {
    var DURATION = 1;

    var INITIAL_SCALE = 1;
    var FINAL_SCALE = 2;

    var INITIAL_OPACITY = 0;
    var FINAL_OPACITY = 1;

    var tl = new TimelineLite();

    tl.fromTo(elSelector, DURATION / 2, { opacity: INITIAL_OPACITY }, {
      opacity: FINAL_OPACITY,
      bezier: {
        values: [{ x: 0.25, y: 0.46 }, { x: 0.45, y: 0.94 }]
      }
    }).to(elSelector, DURATION / 2, {
      opacity: INITIAL_OPACITY,
      bezier: {
        values: [{ x: 0.25, y: 0.46 }, { x: 0.45, y: 0.94 }]
      }
    }).fromTo(elSelector, DURATION, { scale: INITIAL_SCALE }, {
      scale: FINAL_SCALE,
      transformOrigin: "center center",
      bezier: {
        values: [{ x: 0.19, y: 1 }, { x: 0.22, y: 1 }]
      }
    }, 0);
  },

  togglePlayback: function togglePlayback() {
    if (this._isPlaying()) {
      this.animateAffordance(pauseAffordance);
      Actions.pauseVideo();
      Debugging.track("video-pause", this.props.player);
    } else {
      this.animateAffordance(playAffordance);
      Actions.playVideo();
      Debugging.track("video-unpause", this.props.player);
    }
  }
};

module.exports = PlaybackControls;
