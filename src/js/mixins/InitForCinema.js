"use strict";

var VideoPlayerStore = require("../stores/VideoPlayerStore");

var InitForCinema = {
  componentDidMount: function componentDidMount() {
    VideoPlayerStore.addChangeListener(this.onVideoPlayerStoreChange);
  },

  componentWillUnmount: function componentWillUnmount() {
    VideoPlayerStore.removeChangeListener(this.onVideoPlayerStoreChange);
  },

  onVideoPlayerStoreChange: function onVideoPlayerStoreChange() {
    this.forceUpdate();
  },

  _isCinemaPlayer: function _isCinemaPlayer() {
    return VideoPlayerStore.getVideoPlayer().player.cinema;
  }
};

module.exports = InitForCinema;
