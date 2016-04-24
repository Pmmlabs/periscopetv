"use strict";

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var assign = require("object-assign");
var EventEmitter = require("events").EventEmitter;

var Actions = require("../actions/Actions");
var Constants = require("../constants/Constants");
var Dispatcher = require("../dispatcher/Dispatcher");

var BroadcastStore = require("../stores/BroadcastStore");
var VideoStore = require("../stores/VideoStore");
var ApiRequest = require("../utils/apiRequest");
var VideoLifecycle = require("../api/VideoLifecycle");
var Utils = require("../utils/utils");

var CHANGE_EVENT = "change";

var DEFAULT_PLAYER = {
  state: Constants.VideoPlayerStates.STOPPED,
  presentation: Constants.VideoPlayerPresentations.INTERSTITIAL,
  mode: Constants.VideoPlayerModes.UNKNOWN,
  audio: Constants.VideoPlayerAudioStates.ON,
  backgroundReady: false,
  playerStarted: false,
  cinema: document.getElementById("cinema").getAttribute("content") === "true",
  orientation: 0,
  width: 320,
  height: 568
};

var _player = DEFAULT_PLAYER;

var autoadvanceTimer = undefined;

var VideoPlayerStore = assign({}, EventEmitter.prototype, {
  getVideoPlayer: function getVideoPlayer() {
    return { player: this.player() };
  },

  player: function player() {
    _player = _player || DEFAULT_PLAYER;
    return _player;
  },

  inReplayMode: function inReplayMode() {
    return this.player().mode === Constants.VideoPlayerModes.REPLAY;
  },

  possiblyCreateTimer: function possiblyCreateTimer() {
    if (!Constants.VideoPlayerSettings.timerDuration) {
      return;
    }autoadvanceTimer = new AutoadvanceTimer();
  },

  logOrientationForDebugging: function logOrientationForDebugging(orientation) {
    var Debugging = require("../utils/Debugging");
    if (!Debugging._isProd()) {
      console.info("%cCurrent Orientation: " + orientation, "color: RGB(150, 150, 150);");
    }
  },

  logDimensionsForDebugging: function logDimensionsForDebugging(dimensions) {
    var Debugging = require("../utils/Debugging");
    if (!Debugging._isProd()) {
      console.info("%cCurrent Dimensions: " + dimensions.width + "w Ã— " + dimensions.height + "h", "color: RGB(150, 150, 150);");
    }
  },

  emitPlaybackUnavailableChange: function emitPlaybackUnavailableChange() {
    this.emit("PlaybackUnavailable-" + CHANGE_EVENT);
  },

  addPlaybackUnavailableListener: function addPlaybackUnavailableListener(fn) {
    this.on("PlaybackUnavailable-" + CHANGE_EVENT, fn);
  },

  removePlaybackUnavailableListener: function removePlaybackUnavailableListener(fn) {
    this.removeListener("PlaybackUnavailable-" + CHANGE_EVENT, fn);
  },

  emitChange: function emitChange() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function addChangeListener(fn) {
    this.on(CHANGE_EVENT, fn);
  },

  removeChangeListener: function removeChangeListener(fn) {
    this.removeListener(CHANGE_EVENT, fn);
  }
});

var AutoadvanceTimer = function AutoadvanceTimer() {
  _classCallCheck(this, AutoadvanceTimer);

  this.timerId = setTimeout(function () {
    Actions.nextBroadcast();
  }, Constants.VideoPlayerSettings.timerDuration * 1000);
};

;

VideoPlayerStore.dispatchToken = Dispatcher.register(function (payload) {
  var action = payload.action;

  switch (action.type) {
    case Constants.ActionTypes.UNSUPPORTED_PLAYBACK_REQUESTED:
      VideoPlayerStore.emitPlaybackUnavailableChange();
      return;

    case Constants.ActionTypes.BROADCAST_BACKGROUND_READY:
      _player = VideoPlayerStore.player();
      _player.backgroundReady = action.isReady;
      VideoPlayerStore.emitChange();
      break;

    case Constants.ActionTypes.PLAYER_STARTED:
      _player = VideoPlayerStore.player();

      // Video has started playing
      if (_player.playerStarted === false && action.hasStarted) {
        var _Debugging = require("../utils/Debugging");
        _Debugging.track("video-impression");
        VideoPlayerStore.possiblyCreateTimer();
      }

      if (action.hasStarted) {
        _player.state = Constants.VideoPlayerStates.PLAYING;
      }

      _player.playerStarted = action.hasStarted;
      VideoPlayerStore.emitChange();
      break;

    case Constants.ActionTypes.CURRENT_ORIENTATION:
      _player = VideoPlayerStore.player();

      var rawOrientation = action.orientation;
      VideoPlayerStore.logOrientationForDebugging(rawOrientation);

      var currentOrientation = Math.floor((Math.floor(rawOrientation) + 45) / 90) * 90 % 360;
      if (_player.orientation !== currentOrientation) {
        _player.orientation = currentOrientation;
        VideoPlayerStore.emitChange();
      }
      break;

    case Constants.ActionTypes.CURRENT_DIMENSIONS:
      _player = VideoPlayerStore.player();

      VideoPlayerStore.logDimensionsForDebugging(action.dimensions);

      if (_player.width !== action.dimensions.width || _player.height !== action.dimensions.height) {
        _player.width = action.dimensions.width;
        _player.height = action.dimensions.height;
        VideoPlayerStore.emitChange();
      }
      break;

    case Constants.ActionTypes.CHANGE_PLAYER_STATE:
      _player = VideoPlayerStore.player();
      _player.state = action.state;

      switch (action.state) {
        case Constants.VideoPlayerStates.PLAYING:
          if (VideoPlayerStore.inReplayMode()) {
            VideoLifecycle.startWatchingReplay();
          } else {
            VideoLifecycle.startWatchingLive();
          }
          break;

        case Constants.VideoPlayerStates.PAUSED:
          if (VideoPlayerStore.inReplayMode()) {
            VideoLifecycle.pauseWatchingReplay();
          } else {
            VideoLifecycle.pauseWatchingLive();
          }
          break;

        case Constants.VideoPlayerStates.STOPPED:
          if (VideoPlayerStore.inReplayMode()) {
            VideoLifecycle.stopWatchingReplay();
          } else {
            VideoLifecycle.stopWatchingLive();
          }
          break;
      }

      VideoPlayerStore.emitChange();
      break;

    case Constants.ActionTypes.CHANGE_PLAYER_MODE:
      _player = VideoPlayerStore.player();
      _player.mode = action.mode;
      VideoPlayerStore.emitChange();
      break;

    case Constants.ActionTypes.CHANGE_PLAYER_PRESENTATION:
      _player = VideoPlayerStore.player();
      _player.presentation = action.presentation;
      VideoPlayerStore.emitChange();
      break;

    case Constants.ActionTypes.UPDATE_BROADCAST_DATA:
      _player = VideoPlayerStore.player();

      if (action.data.broadcast.state === Constants.VideoBroadcastStates.RUNNING) {
        _player.mode = Constants.VideoPlayerModes.LIVE;
      } else if (action.data.broadcast.state === Constants.VideoBroadcastStates.ENDED || action.data.broadcast.state === Constants.VideoBroadcastStates.TIMED_OUT) {
        _player.mode = Constants.VideoPlayerModes.REPLAY;
      }

      // We only autoplay based on data when the broadcast is live in the full webapp
      if (action.data.broadcast.state === Constants.VideoBroadcastStates.RUNNING && Constants.AppSettings.displayMode === Constants.DisplayModes.APP) {
        _player.presentation = Constants.VideoPlayerPresentations.VIDEO;
      }

      VideoPlayerStore.emitChange();
      break;

    case Constants.ActionTypes.CHANGE_AUDIO_STATE:
      _player = VideoPlayerStore.player();
      _player.audio = action.state;
      VideoPlayerStore.emitChange();
      break;

    case Constants.ActionTypes.TOGGLE_CINEMA:
      _player = VideoPlayerStore.player();
      _player.cinema = !_player.cinema;
      var Debugging = require("../utils/Debugging");
      Debugging.track("cinema-mode-" + (_player.cinema ? "on" : "off"));
      VideoPlayerStore.emitChange();
      break;
  }
});

module.exports = VideoPlayerStore;
