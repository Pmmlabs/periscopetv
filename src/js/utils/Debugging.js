"use strict";

var assign = require("object-assign");

var BroadcastStore = require("../stores/BroadcastStore");
var VideoStore = require("../stores/VideoStore");
var VideoPlayerStore = require("../stores/VideoPlayerStore");
var ReplayStore = require("../stores/ReplayStore");
var BroadcastFeedStore = require("../stores/BroadcastFeedStore");
var ProfileStore = require("../stores/ProfileStore");

var Constants = require("../constants/Constants");

var auxDataToStore = {
  mode: "videoPlayer.player.mode",
  state: "broadcast.broadcast.state",
  "profile-visible": "profile.profile.visible",
  "broadcaster-username": "broadcast.user.username",
  "broadcaster-id": "broadcast.user.id",
  "has-broadcasts": "hasBroadcasts",
  elapsed: "replay.replay.elapsed",
  duration: "replay.replay.duration",
  percentage: "replay.replay.percentage",
  couchmode: "couchmode",
  cinema: "videoPlayer.player.cinema"
};

var _trackOnceCache = [];

function getAuxDataForTracking() {
  if (BroadcastStore.hasBroadcast() === false) {
    return {};
  }var stores = {
    broadcast: BroadcastStore.getBroadcast(),
    hasBroadcasts: ProfileStore.hasBroadcasts(),
    profile: ProfileStore.getProfile(),
    videoPlayer: VideoPlayerStore.getVideoPlayer(),
    replay: ReplayStore.getReplay(),
    couchmode: BroadcastFeedStore.inCouchMode()
  };

  var auxData = {};

  for (var key in auxDataToStore) {
    if (auxDataToStore.hasOwnProperty(key)) {
      var path = auxDataToStore[key].split(".");
      var keyValue = stores[path[0]];
      // loop over path
      for (var i = 1; i < path.length; i++) {
        // if we can find data at that path
        if (keyValue[path[i]]) {
          keyValue = keyValue[path[i]];
        } else {
          keyValue = undefined;
          break;
        }
      }
      if (keyValue !== undefined) auxData[key] = keyValue;
    }
  }

  return auxData;
}

module.exports = {
  _getEnv: function _getEnv() {
    return Constants.Env;
  },

  _envIs: function _envIs(env) {
    return env === this._getEnv();
  },

  _isDev: function _isDev() {
    return this._envIs("DEVELOPMENT");
  },

  _isProd: function _isProd() {
    return this._envIs("PRODUCTION");
  },

  _isLocal: function _isLocal() {
    return this._envIs("LOCAL");
  },

  _isTest: function _isTest() {
    return this._envIs("TESTING");
  },

  _isApp: function _isApp() {
    return Constants.AppSettings.displayMode === Constants.DisplayModes.APP;
  },

  warn: function warn() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    if (this._isProd() || !console || !console.warn) {
      return;
    }console.warn.apply(console, args);
  },

  log: function log() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    if (this._isProd() || this._isTest() || !console || !console.log) {
      return;
    }console.log.apply(console, args);
  },

  perform: function perform(fn) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    if (this._isProd() || this._isTest()) {
      return;
    }fn.apply(window, args);
  },

  track: function track(event) {
    var data = arguments[1] === undefined ? {} : arguments[1];
    var callback = arguments[2] === undefined ? function () {} : arguments[2];

    if (this._isTest()) {
      return;
    }data = assign(getAuxDataForTracking(), { token: Constants.Broadcast.REQUESTED_ID }, data);

    if (this._isDev() || this._isProd()) {
      window.mixpanel.track(event, data);
    } else {
      this.log("TRACK:", event, data);
    }
  },

  trackOnce: function trackOnce(event) {
    var data = arguments[1] === undefined ? {} : arguments[1];
    var callback = arguments[2] === undefined ? function () {} : arguments[2];

    if (_trackOnceCache.indexOf(event) === -1) {
      _trackOnceCache.push(event);

      if (!(this._isDev() || this._isProd())) {
        this.log("TRACK ONCE ----------------->");
      }

      this.track(event, data, callback);

      if (!(this._isDev() || this._isProd())) {
        this.log("<-----------------");
      }
    }
  },

  trackException: function trackException(e) {
    if (this._isDev() || this._isProd()) {
      if (Bugsnag) {
        Bugsnag.notifyException(e);
      }
    } else {
      this.log("TRACK EXCEPTION:", e);
    }
  }
};
