"use strict";

var assign = require("object-assign");
var React = require("react");

var Actions = require("../actions/Actions");
var Constants = require("../constants/Constants");
var Debugging = require("../utils/Debugging");
var Utils = require("../utils/utils");
var ProfileStore = require("../stores/ProfileStore");
var ReplayStore = require("../stores/ReplayStore");

var videoId = "video";
var METADATA_THROTTLE_INTERVAL = 1000;
var videoPlayer = undefined,
    playbackStartTime = undefined,
    isSeeking = false;

var videoSettings = {
  flashplayer: Constants.VideoPlayerSettings.playerPath,
  wmode: "transparent",
  screencolor: "FFFFFF",
  primary: Utils.is.safari() ? "html5" : "flash",
  autostart: true,
  controls: false,
  abouttext: Constants.VideoPlayerSettings.linkText,
  aboutlink: Constants.VideoPlayerSettings.linkUrl,
  stretching: "exactfit"
};

var processMetadata = function (event) {
  function getMetadataAsFloat(data, key) {
    // Metadata values have the invisible ETX character at their start
    // so strip this off before parsing. trim() does not work here.
    return parseFloat(data[key].replace(/\x03/, ""));
  }

  // Debounce all this
  if (event.metadata.error) {
    Debugging.log("Player Metadata Error");
    Debugging.log(event.metadata.type);
    Debugging.log(event.metadata.error);

    if (event.metadata.type === "manifestRefreshError") {
      Actions.endBroadcast();
    }
  }

  if (event.metadata.TIT3) {
    var ntp = getMetadataAsFloat(event.metadata, "TIT3");
    Actions.renderedNTP(ntp);
  }

  if (event.metadata.TKEY) {
    var orientation = getMetadataAsFloat(event.metadata, "TKEY");
    Actions.renderedOrientation(orientation);
  }

  if (event.metadata.TMED && event.metadata.TMOO) {
    var width = getMetadataAsFloat(event.metadata, "TMED");
    var height = getMetadataAsFloat(event.metadata, "TMOO");
    Actions.renderedDimensions({ width: width, height: height });
  }
};

// Throttled method to prevent metadata events firing too frequently and freezing the browser
var throttledHandleVideoPlayerMetadata = Utils.throttle(processMetadata, METADATA_THROTTLE_INTERVAL);

var Video = React.createClass({
  displayName: "Video",

  propTypes: {
    mute: React.PropTypes.bool,
    updatePlayback: React.PropTypes.bool,
    playbackMode: React.PropTypes.string.isRequired,
    url: React.PropTypes.string.isRequired,
    videoWidth: React.PropTypes.number.isRequired,
    videoHeight: React.PropTypes.number.isRequired
  },

  getDefaultProps: function getDefaultProps() {
    return {
      mute: false,
      updatePlayback: true
    };
  },

  componentWillMount: function componentWillMount() {
    var _this = this;

    try {
      Actions.updatePlaybackTime({ position: 0, duration: 1 });
    } catch (e) {
      setTimeout(function () {
        Actions.updatePlaybackTime({ position: 0, duration: 1 });
      });
    }

    setTimeout(function () {
      var videoEl = document.createElement("div");
      videoEl.className = "Video u-flexItem";

      // Possibly don't need anymore
      videoEl.setAttribute("id", videoId);

      _this.refs.videoContainer.getDOMNode().appendChild(videoEl);

      var hlsUrl = _this.props.url;
      videoSettings.sources = [{
        file: hlsUrl
      }];
      Debugging.log("Stream Playlist URL", hlsUrl);

      // set the video dimensions
      assign(videoSettings, _this.determinePlayerSize());

      // set initial mute
      videoSettings.mute = _this.props.mute;

      // initialize the player
      jwplayer.key = Constants.VideoPlayerSettings.playerKey;
      videoPlayer = jwplayer(videoEl).setup(videoSettings);

      _this.attachVideoEvents(videoPlayer);
      Actions.changePlayerState(Constants.VideoPlayerStates.CONNECTING);
    });
  },

  componentDidMount: function componentDidMount() {
    ReplayStore.addPositionChangeListener(this.playbackPositionRequested);
  },

  componentWillUnmount: function componentWillUnmount() {
    videoPlayer && videoPlayer.remove();
    if (playbackStartTime) {
      var elapsedTime = new Date().valueOf() - playbackStartTime;
      Actions.elapsedPlaybackTime(elapsedTime);
      playbackStartTime = undefined;
    }
    ReplayStore.removePositionChangeListener(this.playbackPositionRequested);
  },

  rotateVideoPlayer: function rotateVideoPlayer() {
    var rotation = undefined;
    switch (this.props.videoOrientation) {
      case 0:
      case 360:
        rotation = 0;
        break;
      case 90:
        rotation = 90;
        break;
      case 180:
        rotation = 180;
        break;
      case 270:
        rotation = -90;
        break;
    }

    TweenLite.to(".Video #video", 0, {
      rotation: "" + rotation,
      onComplete: this.resizeVideoPlayer
    });
  },

  componentDidUpdate: function componentDidUpdate(nextProps) {
    if (this.props.videoOrientation === nextProps.videoOrientation || this.shouldNotRotate()) {
      return this.resizeVideoPlayer();
    }
    this.rotateVideoPlayer();
  },

  playbackPositionRequested: function playbackPositionRequested() {
    var playbackPosition = ReplayStore.getRequestedPosition();
    if (this.shouldSeekTo(playbackPosition)) {
      videoPlayer.seek(playbackPosition);
    }
  },

  attachVideoEvents: function attachVideoEvents(videoPlayer) {
    var _this = this;

    videoPlayer.on("ready", function () {
      _this.rotateVideoPlayer();
      if (_this.props.eventsEnabled) {
        Actions.initiatePubnub();
        Actions.initiateChatman();

        switch (_this.props.playbackMode) {
          case Constants.VideoPlayerModes.LIVE:
            Actions.liveBackfill();
            break;
          case Constants.VideoPlayerModes.REPLAY:
            Actions.replayBackfill();
            break;
        }
      }
    }).on("play", function (event) {
      Debugging.log("JWPlayer Playback", "Previous state:", event);

      if (!playbackStartTime) {
        playbackStartTime = new Date().valueOf();
        Actions.playerStarted(true);
      }

      if (isSeeking) {
        isSeeking = false;
        Actions.seekingComplete();

        Debugging.track("video-seek-complete");
      }
    }).on("seek", function (event) {
      Debugging.log("JWPlayer Seek Begin", "Previous state:", event);
      isSeeking = true;
      Actions.seekingInitiated(event);
    }).on("buffer", function (event) {
      Debugging.log("JWPlayer Buffer", "Previous state:", event);
      if (event.reason === "stalled") {
        Actions.refreshBroadcast();
      }
    }).on("time", function (event) {
      if (_this.props.updatePlayback) {
        Actions.updatePlaybackTime(event);
      }
    }).on("complete", function () {
      // Never happens on live streams
      Debugging.log("JWPlayer Playback Complete");
      Actions.completePlayback();
    }).on("setupError", function (event) {
      Debugging.warn("JWPlayer Setup Error", "Message: ", event.message);

      Actions.apiVideoResourceUnavailable();
    }).on("error", function (event) {
      Debugging.warn("JWPlayer Error", "Previous state:", event);

      Actions.apiVideoResourceUnavailable();
    }).on("meta", this.handleVideoPlayerMetadata);
  },

  handleVideoPlayerMetadata: function (event) {
    if (event.metadata) {
      if (event.metadata.TKEY || event.metadata.TMED || event.metadata.TMOO) {
        processMetadata(event);
      } else {
        throttledHandleVideoPlayerMetadata(event);
      }
    }
  },

  resizeVideoPlayer: function resizeVideoPlayer() {
    var _determinePlayerSize = this.determinePlayerSize();

    var width = _determinePlayerSize.width;
    var height = _determinePlayerSize.height;

    videoPlayer && videoPlayer.resize(width, height);
  },

  determinePlayerSize: function determinePlayerSize() {
    var props = arguments[0] === undefined ? this.props : arguments[0];

    var scale = undefined,
        width = undefined,
        height = undefined,
        scaleFn = undefined;
    var rotateTo = this.shouldNotRotate() ? 0 : props.videoOrientation;

    switch (this.props.fillMode) {
      case Constants.FillModes.COVER:
        scaleFn = Math.max;
        break;
      case Constants.FillModes.CONTAIN:
        scaleFn = Math.min;
        break;
    }

    switch (rotateTo) {
      case 90:
      case 270:
        scale = scaleFn(props.width / props.videoHeight, props.height / props.videoWidth);
        break;
      default:
        scale = scaleFn(props.width / props.videoWidth, props.height / props.videoHeight);
        break;
    }

    width = props.videoWidth * scale;
    height = props.videoHeight * scale;

    return {
      width: width,
      height: height
    };
  },

  shouldSeekTo: function shouldSeekTo(position) {
    return position && position !== 0 && this.props.playbackMode === Constants.VideoPlayerModes.REPLAY;
  },

  shouldNotRotate: function shouldNotRotate() {
    return this.props.playbackMode === Constants.VideoPlayerModes.LIVE && this.props.videoNoRotate;
  },

  controlPlayback: function controlPlayback() {
    switch (this.props.playbackState) {
      case Constants.VideoPlayerStates.PAUSED:
        videoPlayer && videoPlayer.pause(true);
        break;
      case Constants.VideoPlayerStates.PLAYING:
        videoPlayer && videoPlayer.play(true);
        break;
      default:
        break;
    }
  },

  controlVolume: function controlVolume() {
    videoPlayer && videoPlayer.setMute(this.props.mute);
  },

  render: function render() {
    this.controlPlayback();
    this.controlVolume();

    return React.createElement("div", {
      className: "Video",
      ref: "videoContainer",
      id: "videoContainer" });
  }
});

module.exports = Video;
