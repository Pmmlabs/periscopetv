"use strict";

var assign = require("object-assign");
var React = require("react");
var Actions = require("../actions/Actions");

var VideoPlayerStore = require("../stores/VideoPlayerStore");
var VideoStore = require("../stores/VideoStore");

var Constants = require("../constants/Constants");
var Utils = require("../utils/utils");
var PlayerHelper = require("../mixins/PlayerHelper");

var Video = require("./Video.jsx");
var VideoOverlay = require("./VideoOverlay.jsx");
var CardOverlay = require("./CardOverlay.jsx");

var CardInterstitial = require("./CardInterstitial.jsx");
var BroadcastDetails = require("./BroadcastDetails.jsx");

var FlashAlertDrawer = require("./FlashAlertDrawer.jsx");
var FlashOverlay = require("./FlashOverlay.jsx");
var SafariMessage = require("./SafariMessage.jsx");

var hasStartedCountdown = false;

var connectingTimer = undefined;
var connectingTimerComplete = false;
var connectingTimerDuration = 2000;

var VideoPlayer = React.createClass({
  displayName: "VideoPlayer",

  mixins: [PlayerHelper],

  getInitialState: function getInitialState() {
    return this.getState();
  },

  getState: function getState() {
    var playerData = VideoPlayerStore.getVideoPlayer();
    var videoData = VideoStore.getVideo();

    return assign(playerData, videoData);
  },

  componentDidMount: function componentDidMount() {
    VideoPlayerStore.addChangeListener(this.onChange);
    VideoStore.addChangeListener(this.onChange);
  },

  componentWillUnmount: function componentWillUnmount() {
    VideoPlayerStore.removeChangeListener(this.onChange);
    VideoStore.removeChangeListener(this.onChange);
  },

  componentWillMount: function componentWillMount() {
    switch (this.props.displayMode) {
      case Constants.DisplayModes.CARD:
        Actions.audioOff();
        break;
      case Constants.DisplayModes.APP:
      default:
        Actions.audioOn();
        break;
    }
  },

  onChange: function onChange() {
    //Check to make sure we aren't setting state on unmounted component
    if (!this.isMounted()) {
      return;
    }this.setState(this.getState());

    if (this._playerIs("UNAVAILABLE") && this._appModeIs("COUCH")) {
      Actions.nextBroadcast();
    }
  },

  updateLivePlayback: function updateLivePlayback() {
    if (this.state.player.backgroundReady && !hasStartedCountdown) {
      this.beginConnectingCountdown();
    }
  },

  beginConnectingCountdown: function beginConnectingCountdown() {
    var _this = this;

    // Set up pseudo connecting countdown
    hasStartedCountdown = true;
    connectingTimer = setTimeout(function () {
      connectingTimerComplete = true;
      _this.possiblyRenderConnectingState();
    }, connectingTimerDuration);
  },

  possiblyRenderConnectingState: function possiblyRenderConnectingState() {
    // When playback is ready, a timer exists, and more than 2s have passed
    if (connectingTimer && connectingTimerComplete) {
      clearTimeout(connectingTimer);
      Actions.changePlayerState(Constants.VideoPlayerStates.PLAYING);
    }
  },

  isStoppedInterstitial: function isStoppedInterstitial() {
    return this._isStopped() && this._isInterstitialPresentation();
  },

  getVideoUrl: function getVideoUrl() {
    return this._isLiveMode() ? this.state.video.hls_url : this.state.video.replay_url;
  },

  possiblyRenderVideoOverlay: function possiblyRenderVideoOverlay() {
    if (!this._includeVideoUI()) {
      return;
    }switch (this.props.displayMode) {
      case Constants.DisplayModes.CARD:
        return React.createElement(CardOverlay, { player: this.state.player, broadcast: this.props.broadcast });
      case Constants.DisplayModes.APP:
      default:
        return React.createElement(VideoOverlay, {
          broadcast: this.props.broadcast,
          user: this.props.user,
          player: this.state.player,
          profileIsVisible: this.props.profileIsVisible });
    }
  },

  getFillMode: function getFillMode() {
    switch (this.props.displayMode) {
      case Constants.DisplayModes.CARD:
        return Constants.FillModes.COVER;
      case Constants.DisplayModes.APP:
      default:
        return Constants.FillModes.CONTAIN;
    }
  },

  isEventsEnabled: function isEventsEnabled() {
    switch (this.props.displayMode) {
      case Constants.DisplayModes.CARD:
        return false;
      case Constants.DisplayModes.APP:
      default:
        return true;
    }
  },

  possiblyRenderVideo: function possiblyRenderVideo() {
    if (!Utils.isVideoSupported() || !this.state.player.backgroundReady || !this.getVideoUrl() || this.isStoppedInterstitial()) {
      return;
    }

    if (this._isLiveMode()) {
      this.updateLivePlayback();
    }

    var url = this.getVideoUrl();
    var updatePlayback = this._isPlayback();
    var playbackState = this.state.player.state;
    var playbackMode = this.state.player.mode;
    var videoOrientation = this.state.player.orientation;
    var videoNoRotate = this.props.broadcast.noRotate;
    var videoWidth = this.state.player.width;
    var videoHeight = this.state.player.height;
    var eventsEnabled = this.isEventsEnabled();
    var fillMode = this.getFillMode();
    var mute = this._isAudioOff();
    var width = this.props.width;
    var height = this.props.height;

    return React.createElement(
      "div",
      null,
      React.createElement(Video, {
        url: url,
        updatePlayback: updatePlayback,
        videoWidth: videoWidth,
        videoHeight: videoHeight,
        videoOrientation: videoOrientation,
        playbackState: playbackState,
        playbackMode: playbackMode,
        videoNoRotate: videoNoRotate,
        eventsEnabled: eventsEnabled,
        fillMode: fillMode,
        mute: mute,
        height: height,
        width: width }),
      this.possiblyRenderVideoOverlay()
    );
  },

  possiblyRenderFlashMessage: function possiblyRenderFlashMessage() {
    if (this._isUnknownMode()) {
      return;
    }if (!Utils.isVideoCapableEnvironment()) {
      return;
    }if (Utils.isHTMLVideoSupported()) {
      var isAppMode = this.props.displayMode === Constants.DisplayModes.APP;
      if (isAppMode && this._isLiveMode()) {
        // Live broadcasts don't always trigger metadata events
        return React.createElement(SafariMessage, { fromTop: true });
      } else {
        return;
      }
    }

    var flashStatus = Utils.getFlashAvailability();
    if (flashStatus !== 0) {
      switch (this.props.displayMode) {
        case Constants.DisplayModes.CARD:
          return React.createElement(FlashOverlay, { flashStatus: flashStatus });
        case Constants.DisplayModes.APP:
        default:
          return React.createElement(FlashAlertDrawer, { flashStatus: flashStatus });
      }
    }
  },

  renderInterstitial: function renderInterstitial() {
    switch (this.props.displayMode) {
      case Constants.DisplayModes.CARD:
        return React.createElement(CardInterstitial, {
          broadcast: this.props.broadcast,
          player: this.state.player,
          width: this.props.width,
          height: this.props.height });
      case Constants.DisplayModes.APP:
      default:
        return React.createElement(BroadcastDetails, {
          broadcast: this.props.broadcast,
          player: this.state.player,
          user: this.props.user,
          profileIsVisible: this.props.profileIsVisible });
    }
  },

  render: function render() {
    return React.createElement(
      "div",
      { className: "VideoPlayer u-fullHeight" },
      this.possiblyRenderVideo(),
      this.renderInterstitial(),
      this.possiblyRenderFlashMessage()
    );
  }
});

module.exports = VideoPlayer;
