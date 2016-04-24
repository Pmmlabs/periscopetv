"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var Actions = require("../actions/Actions");
var ApiRequest = require("../utils/apiRequest");
var ExponentialBackoff = require("./ExponentialBackoff");
var Constants = require("../constants/Constants");
var Debugging = require("../utils/Debugging");
var Utils = require("../utils/utils");

var BroadcastStore = require("../stores/BroadcastStore");

// Important tokens that need to be passed to following APIs
var _lifecycleToken = undefined;
var _session = undefined;

var _pendingRequest = false;

var PING_INTERVAL = 30000;
var watchTimer = undefined;

var LifecycleState = {
  STOPPED: "STOPPED",
  RUNNING: "RUNNING"
};
var currentState = LifecycleState.STOPPED;

// Ping Timer runs while video is running

var WatchTimer = (function () {
  function WatchTimer(_ref) {
    var _ref$isLive = _ref.isLive;
    var isLive = _ref$isLive === undefined ? true : _ref$isLive;

    _classCallCheck(this, WatchTimer);

    this.start(isLive);
  }

  _createClass(WatchTimer, {
    start: {
      value: function start(isLive) {
        this.watchTimerId = setInterval(function () {
          var getRequestObject = function () {
            return {
              url: isLive ? Constants.ApiEndpoints.HOSTNAME + Constants.ApiEndpoints.PING_PUBLIC : Constants.ApiEndpoints.HOSTNAME + Constants.ApiEndpoints.PING_REPLAY_VIEWED_PUBLIC,
              query: { session: _session }
            };
          };

          new ExponentialBackoff(getRequestObject).backoff();
        }, PING_INTERVAL);
      }
    },
    stop: {
      value: function stop() {
        clearInterval(this.watchTimerId);
        watchTimer = null;
      }
    }
  });

  return WatchTimer;
})();

var VideoLifecycle = {
  // Reset local state
  flush: function () {
    _session = null;
    _lifecycleToken = null;
    currentState = LifecycleState.STOPPED;
    VideoLifecycle.stopWatcher();
  },

  // Stop ping interval
  stopWatcher: function () {
    if (watchTimer) watchTimer.stop();
  },

  // Restart lifecycle
  getNewLife: function () {
    VideoLifecycle.flush();
    return VideoLifecycle.accessVideo();
  },

  accessVideo: function () {
    if (Constants.AppSettings.displayMode === Constants.DisplayModes.CARD) return;
    if (_pendingRequest) return;
    if (currentState === LifecycleState.RUNNING) return;

    VideoLifecycle.flush();
    _pendingRequest = true;
    var broadcastId = BroadcastStore.getBroadcastId();

    var getRequestObject = function () {
      return {
        url: Constants.ApiEndpoints.HOSTNAME + Constants.ApiEndpoints.ACCESS_VIDEO_PUBLIC,
        query: Utils.getBroadcastParam(broadcastId)
      };
    };

    var success = function (response) {
      _pendingRequest = false;
      if (ApiRequest.hasErrorFor(response.status.toString(), Constants.ApiEndpointTypes.VIDEO)) {
        var _Debugging = require("../utils/Debugging");
        _Debugging.log("accessVideo hasErrorFor");
        return;
      }

      var videoData = response.body;
      var hasReplay = Utils.hasReplay(videoData);
      var lifecycleToken = videoData.life_cycle_token;
      var chatToken = videoData.chat_token;

      if (lifecycleToken) _lifecycleToken = lifecycleToken;

      // Update video data store
      Actions.updateVideoData(videoData);

      // Dispatch information about replay state
      Actions.updateReplayAvailability(hasReplay);

      // Get ChatMan data
      VideoLifecycle.accessChat(chatToken);
    };

    var error = function (error) {
      _pendingRequest = false;
    };
    return new ExponentialBackoff(getRequestObject).backoff().then(success, error);
  },

  accessChat: function (chatToken) {
    if (Constants.AppSettings.displayMode === Constants.DisplayModes.CARD) return;
    if (!Utils.isVideoSupported()) return;
    if (!chatToken) {
      throw new Error("Access Video did not provide chat_token");
    }

    var getRequestObject = function () {
      return {
        url: Constants.ApiEndpoints.HOSTNAME + Constants.ApiEndpoints.ACCESS_CHAT_PUBLIC,
        query: { chat_token: chatToken }
      };
    };

    return new ExponentialBackoff(getRequestObject).backoff().then(function (response) {
      var chatData = response.body;
      Actions.updateChatData(chatData);
    });
  },

  startWatchingLive: function () {
    if (Constants.AppSettings.displayMode === Constants.DisplayModes.CARD) return;
    if (currentState === LifecycleState.RUNNING) return;
    var getRequestObject = function () {
      return {
        url: Constants.ApiEndpoints.HOSTNAME + Constants.ApiEndpoints.START_PUBLIC,
        query: { life_cycle_token: _lifecycleToken }
      };
    };

    return new ExponentialBackoff(getRequestObject).backoff().then(function (response) {
      currentState = LifecycleState.RUNNING;
      var sessionData = response.body;
      _session = sessionData.session;

      watchTimer = new WatchTimer({ isLive: true });
    });
  },

  pauseWatchingLive: function () {
    if (Constants.AppSettings.displayMode === Constants.DisplayModes.CARD) return;
    if (currentState === LifecycleState.STOPPED) return;
    var getRequestObject = function () {
      return {
        url: Constants.ApiEndpoints.HOSTNAME + Constants.ApiEndpoints.STOP_PUBLIC,
        query: { session: _session }
      };
    };
    var stop = function () {
      currentState = LifecycleState.STOPPED;
      var Debugging = require("../utils/Debugging");
      Debugging.log("VideoLifecycle::stopPublic SUCCESS");
      VideoLifecycle.stopWatcher();
    };
    return new ExponentialBackoff(getRequestObject).backoff().then(stop, stop);
  },

  stopWatchingLive: function () {
    if (Constants.AppSettings.displayMode === Constants.DisplayModes.CARD) return;
    if (currentState === LifecycleState.STOPPED) return;
    var getRequestObject = function () {
      return {
        url: Constants.ApiEndpoints.HOSTNAME + Constants.ApiEndpoints.STOP_PUBLIC,
        query: { session: _session }
      };
    };
    var stop = function () {
      currentState = LifecycleState.STOPPED;
      var Debugging = require("../utils/Debugging");
      Debugging.log("VideoLifecycle::stopPublic SUCCESS");
      VideoLifecycle.flush();
    };

    return new ExponentialBackoff(getRequestObject).backoff().then(stop, stop);
  },

  startWatchingReplay: function () {
    if (Constants.AppSettings.displayMode === Constants.DisplayModes.CARD) return;
    if (currentState === LifecycleState.RUNNING) return;
    var getRequestObject = function () {
      return {
        url: Constants.ApiEndpoints.HOSTNAME + Constants.ApiEndpoints.REPLAY_VIEWED_PUBLIC,
        query: { life_cycle_token: _lifecycleToken }
      };
    };

    return new ExponentialBackoff(getRequestObject).backoff().then(function (response) {
      currentState = LifecycleState.RUNNING;
      var sessionData = response.body;
      _session = sessionData.session;

      watchTimer = new WatchTimer({ isLive: false });
    });
  },

  pauseWatchingReplay: function () {
    if (Constants.AppSettings.displayMode === Constants.DisplayModes.CARD) return;
    if (currentState === LifecycleState.STOPPED) return;
    var getRequestObject = function () {
      return {
        url: Constants.ApiEndpoints.HOSTNAME + Constants.ApiEndpoints.END_REPLAY_VIEWED_PUBLIC,
        query: { session: _session }
      };
    };
    var stop = function () {
      currentState = LifecycleState.STOPPED;
      var Debugging = require("../utils/Debugging");
      Debugging.log("VideoLifecycle::endReplayViewedPublic SUCCESS");
      VideoLifecycle.stopWatcher();
    };

    return new ExponentialBackoff(getRequestObject).backoff().then(stop, stop);
  },

  stopWatchingReplay: function () {
    if (Constants.AppSettings.displayMode === Constants.DisplayModes.CARD) return;
    if (currentState === LifecycleState.STOPPED) return;
    var getRequestObject = function () {
      return {
        url: Constants.ApiEndpoints.HOSTNAME + Constants.ApiEndpoints.END_REPLAY_VIEWED_PUBLIC,
        query: { session: _session }
      };
    };

    var stop = function () {
      currentState = LifecycleState.STOPPED;
      var Debugging = require("../utils/Debugging");
      Debugging.log("VideoLifecycle::endReplayViewedPublic SUCCESS");
      VideoLifecycle.flush();
    };

    return new ExponentialBackoff(getRequestObject).backoff().then(stop, stop);
  }
};

module.exports = VideoLifecycle;
