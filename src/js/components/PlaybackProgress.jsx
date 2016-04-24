"use strict";

var React = require("react");

var assign = require("object-assign");
var Debugging = require("../utils/Debugging");

var ReplayStore = require("../stores/ReplayStore");
var BroadcastStore = require("../stores/BroadcastStore");
var ThumbnailStore = require("../stores/ThumbnailStore");
var Actions = require("../actions/Actions");

var unixEpochForNTP = new Date(1970, 0, 1) - new Date(1900, 0, 1);

var seekingMemory = {
  position: 0,
  percentage: 0,
  seconds: 0
};

var PlaybackProgress = React.createClass({
  displayName: "PlaybackProgress",

  getInitialState: function getInitialState() {
    return this.getProgressData();
  },

  componentDidMount: function componentDidMount() {
    ReplayStore.addPlaybackChangeListener(this.onChange);
  },

  componentWillUnmount: function componentWillUnmount() {
    ReplayStore.removePlaybackChangeListener(this.onChange);
  },

  onChange: function onChange() {
    this.setState(this.getProgressData());
  },

  getBroadcastStartTime: function getBroadcastStartTime() {
    return BroadcastStore.getBroadcast().broadcast.start;
  },

  getCurrentThumbnail: function getCurrentThumbnail() {
    return ThumbnailStore.getThumbnailForPosition(this.state.seeking);
  },

  handleTooltipRender: function handleTooltipRender() {
    var seekingThumbnail = this.getCurrentThumbnail();
    if (this.props.hideThumbnail || seekingThumbnail === "") {
      return React.createElement(
        "div",
        { className: "PlaybackProgress-seekingTooltip", ref: "seekingTooltip", style: { left: "" + this.state.seeking.position + "px" } },
        React.createElement(
          "div",
          { className: "PlaybackProgress-seekingTime" },
          this.state.seeking.displayTime
        )
      );
    } else {
      return React.createElement(
        "div",
        { className: "PlaybackProgress-seekingTooltip", ref: "seekingTooltip", style: { left: "" + this.state.seeking.position + "px" } },
        React.createElement("img", { className: "PlaybackProgress-seekingThumbnail", src: seekingThumbnail }),
        React.createElement(
          "div",
          { className: "PlaybackProgress-seekingTime PlaybackProgress-seekingTime--withThumb" },
          this.state.seeking.displayTime
        )
      );
    }
  },

  getProgressData: function getProgressData() {
    return assign({ seeking: seekingMemory }, ReplayStore.getReplay());
  },

  getEventPositions: function getEventPositions(e) {
    var progressBarDimensions = this.refs.progressBar.getDOMNode().getBoundingClientRect();
    var rawMousePosition = e.pageX - progressBarDimensions.left;
    var relativeMousePosition = rawMousePosition < 0 ? 0 : rawMousePosition;
    var ratioMousePosition = relativeMousePosition / progressBarDimensions.width;
    var secondsMousePosition = ratioMousePosition * this.state.replay.duration;
    var percentageMousePosition = ratioMousePosition * 100;

    var broadcastStartInMS = new Date(this.getBroadcastStartTime()).getTime();
    var unixMousePosition = broadcastStartInMS / 1000 + secondsMousePosition;
    var ntpMousePosition = unixEpochForNTP / 1000 + unixMousePosition;

    return {
      position: relativeMousePosition,
      percentage: percentageMousePosition,
      seconds: secondsMousePosition,
      unix: unixMousePosition,
      ntp: ntpMousePosition
    };
  },

  seekTo: function seekTo(e) {
    var eventPositions = this.getEventPositions(e);

    Actions.seekToPosition({
      seconds: eventPositions.seconds,
      unix: eventPositions.unix,
      ntp: eventPositions.ntp
    });
    Actions.playVideo();

    Debugging.track("video-seek", {
      "seek-percentage": Number(eventPositions.percentage).toFixed(2)
    });
  },

  updatePosition: function updatePosition(e) {
    var eventPositions = this.getEventPositions(e);

    seekingMemory = {
      position: eventPositions.position,
      percentage: eventPositions.percentage,
      ntp: eventPositions.ntp,
      seconds: eventPositions.seconds,
      displayTime: this.getSeekingTime(e)
    };

    this.setState(this.getProgressData());
  },

  getFormattedTime: function getFormattedTime(sec) {
    var hours = parseInt(sec / 3600) % 24;
    var minutes = parseInt(sec / 60) % 60;
    var seconds = Math.floor(sec % 60);

    var hoursDisplay = hours !== 0 ? hours + ":" : "";
    var minutesDisplay = (minutes < 10 ? "0" + minutes : minutes) + ":";
    var secondsDisplay = seconds < 10 ? "0" + seconds : seconds;
    var displayTime = [hoursDisplay, minutesDisplay, secondsDisplay];
    return displayTime.join("");
  },

  getElapsedTime: function getElapsedTime() {
    return this.getFormattedTime(this.state.replay.elapsed);
  },

  getDurationTime: function getDurationTime() {
    return this.getFormattedTime(this.state.replay.duration);
  },

  getSeekingTime: function getSeekingTime(e) {
    return this.getFormattedTime(this.getEventPositions(e).seconds);
  },

  render: function render() {
    var seekingMarkerColor = this.state.seeking.percentage < this.state.replay.percentage ? "rgba(0,0,0,.3)" : "rgba(255,255,255,.5)";

    return React.createElement(
      "div",
      { className: "PlaybackProgress" },
      React.createElement(
        "div",
        { className: "PlaybackProgress-time PlaybackProgress-time--elapsed" },
        this.getElapsedTime()
      ),
      React.createElement(
        "div",
        { className: "PlaybackProgress-bars", ref: "progressBar", onClick: this.seekTo, onMouseMove: this.updatePosition },
        React.createElement("div", { className: "PlaybackProgress-bar PlaybackProgress-bar--duration" }),
        React.createElement("div", { className: "PlaybackProgress-bar PlaybackProgress-bar--elapsed", style: { width: "" + this.state.replay.percentage + "%" } }),
        React.createElement("div", { className: "PlaybackProgress-marker PlaybackProgress-marker--seekingElapsed", style: { left: "" + (this.state.seeking.position - 2) + "px", backgroundColor: "" + seekingMarkerColor } }),
        React.createElement("div", { className: "PlaybackProgress-marker PlaybackProgress-marker--elapsed", style: { left: "calc(" + this.state.replay.percentage + "% - 2px)" } }),
        this.handleTooltipRender()
      ),
      React.createElement(
        "div",
        { className: "PlaybackProgress-time PlaybackProgress-time--duration" },
        this.getDurationTime()
      )
    );
  }
});

module.exports = PlaybackProgress;
