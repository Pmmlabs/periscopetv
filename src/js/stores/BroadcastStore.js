"use strict";

var assign = require("object-assign");
var EventEmitter = require("events").EventEmitter;

var Actions = require("../actions/Actions");
var ApiRequest = require("../utils/apiRequest");
var Constants = require("../constants/Constants");
var Dispatcher = require("../dispatcher/Dispatcher");
var Utils = require("../utils/utils");

var CHANGE_EVENT = "change";
var UNTITLED_BROADCAST = "Untitled";

var DEFAULT_BROADCAST = {
  broadcast: {
    state: "",
    status: "",
    noRotate: false
  },
  user: {}
};

var _broadcast = undefined;

var BroadcastStore = assign({}, EventEmitter.prototype, {
  hasBroadcast: function hasBroadcast() {
    return !!_broadcast;
  },

  hasId: function hasId() {
    return !!this.getBroadcast().broadcast.id;
  },

  getBroadcast: function getBroadcast() {
    return this.broadcast();
  },

  getBroadcastState: function getBroadcastState() {
    return this.broadcast().broadcast.state;
  },

  broadcastIsRunning: function broadcastIsRunning() {
    return this.getBroadcastState() === Constants.VideoBroadcastStates.RUNNING;
  },

  broadcastHasReplay: function broadcastHasReplay() {
    return this.broadcast().broadcast.available_for_replay;
  },

  broadcastJustEnded: function broadcastJustEnded(newState) {
    return this.broadcastIsRunning() && this.broadcastStateEnded(newState);
  },

  broadcastStateEnded: function broadcastStateEnded(state) {
    return state === Constants.VideoBroadcastStates.ENDED || state === Constants.VideoBroadcastStates.TIMED_OUT;
  },

  getBroadcastId: function getBroadcastId() {
    return this.broadcast().broadcast.id;
  },

  broadcast: function broadcast() {
    if (!_broadcast) this.checkApiStatus();
    _broadcast = _broadcast || DEFAULT_BROADCAST;
    return _broadcast;
  },

  /**
   * Check API status before rendering broadcast
   */

  checkApiStatus: function checkApiStatus() {
    var apiStatus = document.getElementById("api-status").getAttribute("content");

    if (ApiRequest.hasErrorFor(apiStatus, Constants.ApiEndpointTypes.BROADCAST)) {
      return;
    }this.readInitialData();
  },

  /**
   * Parse Broadcast object with User and Broadcast objects
   * from initial page render
   */

  readInitialData: function readInitialData() {
    var broadcastJsonString = document.getElementById("broadcast-data").getAttribute("content");

    if (!broadcastJsonString) {
      return;
    }var broadcastJson = JSON.parse(broadcastJsonString);

    if (Utils.is.empty(broadcastJson)) {
      broadcastJson = DEFAULT_BROADCAST;
    } else {
      try {
        broadcastJson.broadcast.noRotate = JSON.parse(document.getElementById("no-rotation").getAttribute("content"));
      } catch (e) {
        broadcastJson.broadcast.noRotate = false;
      }
    }

    Actions.initBroadcastData(broadcastJson);
    Actions.renderedDimensions({ width: broadcastJson.broadcast.width, height: broadcastJson.broadcast.height });
  },

  /**
   * Request Broadcast object with User and Broadcast objects
   * asynchronously
   */

  requestData: function requestData() {
    var _this = this;

    var requestConfig = {
      url: Constants.ApiEndpoints.HOSTNAME + Constants.ApiEndpoints.BROADCAST,
      query: Utils.getBroadcastParam(this.getBroadcastId())
    };

    ApiRequest.get(requestConfig).then(function (response) {
      if (ApiRequest.hasErrorFor(response.status.toString(), Constants.ApiEndpointTypes.BROADCAST)) {
        return;
      }

      // If a broadcast is currently running and we requested data to refresh
      // broadcast state, check if broadcast is now ended in order to properly update UI.
      var broadcast = response.body && response.body.broadcast;
      if (broadcast && _this.broadcastJustEnded(broadcast.state)) {
        Actions.endBroadcast();
      } else {
        Actions.updateBroadcastData(response.body);
      }
    }, function (error) {});
  },

  getBroadcastDuration: function getBroadcastDuration() {
    return new Date(this.broadcast().broadcast.ended_at) - new Date(this.broadcast().broadcast.start);
  },

  broadcastEndTime: function broadcastEndTime(broadcast) {
    return broadcast.ended || broadcast.timedout || broadcast.ping || broadcast.start;
  },

  setBroadcastEndTime: function setBroadcastEndTime(broadcast, time) {
    _broadcast.broadcast.ended_at = time || this.broadcastEndTime(broadcast);
  },

  processData: function processData() {
    this.setBroadcastEndTime(_broadcast.broadcast);
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

BroadcastStore.dispatchToken = Dispatcher.register(function (payload) {
  var action = payload.action;

  switch (action.type) {

    case Constants.ActionTypes.BROADCAST_NOT_FOUND:
      var Debugging = require("../utils/Debugging");
      Debugging.trackOnce("broadcast-not-found");
      break;

    case Constants.ActionTypes.UPDATE_BROADCAST_END_TIME:
      /**
       * While we try to ensure we don't set broadcast ended state manually unless
       * the client is informed of the change, if for any reason it is set
       * manually and the broadcast has already ended, don't override the
       * legitimate existing ended state provided by the broadcast.
       */
      if (!BroadcastStore.broadcastStateEnded(BroadcastStore.getBroadcastState())) {
        _broadcast.broadcast.state = Constants.VideoBroadcastStates.ENDED;
        BroadcastStore.setBroadcastEndTime(_broadcast, action.time);
        BroadcastStore.emitChange();
        // BroadcastStore.requestData();
      }
      break;

    case Constants.ActionTypes.CHANGE_BROADCAST_STATE:
      // This action type is only ever issued when broadcast data
      // is not present. Thus, don't attempt to query for data,
      // always assume the default, empty broadcast.
      _broadcast = _broadcast || DEFAULT_BROADCAST;
      _broadcast.broadcast.state = action.state;
      BroadcastStore.emitChange();
      break;

    case Constants.ActionTypes.REFRESH_BROADCAST:
      BroadcastStore.requestData();
      break;

    case Constants.ActionTypes.UPDATE_BROADCAST_DATA:
      _broadcast = action.data;
      BroadcastStore.processData();
      BroadcastStore.emitChange();
      break;
  }
});

module.exports = BroadcastStore;
