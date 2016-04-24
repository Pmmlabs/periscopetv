"use strict";

var assign = require("object-assign");
var EventEmitter = require("events").EventEmitter;

var Actions = require("../actions/Actions");
var ApiRequest = require("../utils/apiRequest");
var Constants = require("../constants/Constants");
var Dispatcher = require("../dispatcher/Dispatcher");
var BroadcastStore = require("../stores/BroadcastStore");
var Debugging = require("../utils/Debugging");
var Permissions = require("../utils/Permissions");
var Utils = require("../utils/utils");
var VideoLifecycle = require("../api/VideoLifecycle");

var ActionTypes = Constants.ActionTypes;
var CHANGE_EVENT = "change";

var _video = {};

// TODO: Terrible hack
// Refactor store and dependent components to use Promises
var pendingRequest = false;

var broadcastRunning = false;
var broadcastHasReplay = false;
var broadcastId = "";

BroadcastStore.addChangeListener(function () {
  broadcastRunning = BroadcastStore.broadcastIsRunning();
  broadcastHasReplay = BroadcastStore.broadcastHasReplay();
  broadcastId = BroadcastStore.getBroadcastId();

  VideoStore.possiblyRequestData();
});

var VideoStore = assign({}, EventEmitter.prototype, {
  getVideo: function getVideo() {
    this.possiblyRequestData();
    return {
      video: this.video()
    };
  },

  getSessionParam: function getSessionParam() {
    var session = this.video().session;
    if (!session) {
      return {};
    }return {
      session: session
    };
  },

  broadcastIsRunning: function () {
    return broadcastRunning;
  },

  broadcastHasReplay: function () {
    return Permissions.isEnabled("replays") && broadcastHasReplay && !broadcastRunning;
  },

  replayStateInSync: function replayStateInSync() {
    return this.broadcastHasReplay() === Utils.hasReplay(_video);
  },

  isLive: function (data) {
    return data && !!data.hls_url;
  },

  liveStateInSync: function liveStateInSync() {
    return this.broadcastIsRunning() === this.isLive(_video);
  },

  shouldRequestVideo: function shouldRequestVideo() {
    var videoRequestsEnabled = Constants.AppSettings.displayMode === Constants.DisplayModes.APP;
    var shouldRequestReplay = this.broadcastHasReplay() && !this.replayStateInSync();
    var shouldRequestLive = this.broadcastIsRunning() && !this.liveStateInSync();
    return videoRequestsEnabled && (shouldRequestLive || shouldRequestReplay);
  },

  video: function video() {
    return _video;
  },

  possiblyRequestData: function possiblyRequestData() {
    if (this.shouldRequestVideo()) {
      this.requestData();
    }
  },

  requestData: function requestData() {
    if (!broadcastId || broadcastId === "") {
      return;
    }VideoLifecycle.accessVideo();
  },

  requestCardReplay: function requestCardReplay() {
    if (!_video.card_replay_url) {
      return;
    }var url = _video.card_replay_url;
    var noRedirectUrl = url.replace("replay_redirect=true", "replay_redirect=false");

    var requestConfig = {
      url: noRedirectUrl
    };

    ApiRequest.get(requestConfig).then(function (response) {

      if (ApiRequest.hasErrorFor(response.status.toString(), Constants.ApiEndpointTypes.VIDEO)) {
        return;
      }

      Actions.updateReplayUrl(response.body.replay_url);
    }, function (error) {
      Debugging.log(error);
    });
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

VideoStore.dispatchToken = Dispatcher.register(function (payload) {
  var action = payload.action;

  switch (action.type) {
    case ActionTypes.START_PLAYING:
      VideoStore.requestCardReplay();
      break;

    case ActionTypes.STOP_PLAYING:
      _video = VideoStore.video();
      _video.replay_url = null;
      VideoStore.emitChange();
      break;

    case ActionTypes.UPDATE_HLS_URL:
      _video = VideoStore.video();
      _video.hls_url = action.url;
      VideoStore.emitChange();
      break;

    case ActionTypes.UPDATE_CARD_REPLAY_URL:
      _video = VideoStore.video();
      _video.card_replay_url = action.url;
      break;

    case ActionTypes.UPDATE_REPLAY_URL:
      _video = VideoStore.video();
      _video.replay_url = action.url;
      VideoStore.emitChange();
      break;

    case ActionTypes.UPDATE_VIDEO_DATA:
      _video = action.data;
      VideoStore.emitChange();
      break;
  }
});

module.exports = VideoStore;
