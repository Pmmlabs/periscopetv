"use strict";

var assign = require("object-assign");

var Dispatcher = require("../dispatcher/Dispatcher");
var EventEmitter = require("events").EventEmitter;
var Constants = require("../constants/Constants");
var Permissions = require("../utils/Permissions");

var BroadcastStore = require("../stores/BroadcastStore");

var CHANGE_EVENT = "change";

// Begin with one viewer to account for broadcaster
var BROADCASTER_PRESENCE = 1;

var _count = 0;
var broadcastIsLive = false;
BroadcastStore.addChangeListener(function () {
  broadcastIsLive = BroadcastStore.broadcastIsRunning();
});

var ViewerStore = assign({}, EventEmitter.prototype, {
  getCount: function getCount() {
    return { viewers: _count };
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

ViewerStore.dispatchToken = Dispatcher.register(function (payload) {
  var action = payload.action;

  switch (action.type) {
    case Constants.ActionTypes.PUBNUB_PRESENCE:
      if (!broadcastIsLive) return;

      var PubnubOccupancy = action.message.occupancy;

      if (typeof PubnubOccupancy === "undefined" || PubnubOccupancy === _count) return;

      // Deduct one viewer to account for broadcaster when live
      _count = PubnubOccupancy - BROADCASTER_PRESENCE;
      ViewerStore.emitChange();
      return;

    case Constants.ActionTypes.CHATMAN_PRESENCE:
      // Prefer Pubnub presence values if connected
      if (Permissions.isEnabled("Pubnub")) return;

      if (!broadcastIsLive) return;

      var ChatmanOccupancy = action.message.occupancy;

      if (typeof ChatmanOccupancy === "undefined" || ChatmanOccupancy === _count) return;
      _count = ChatmanOccupancy;
      ViewerStore.emitChange();
      return;

    case Constants.ActionTypes.UPDATE_WATCHER_COUNT:
      var _action$data = action.data,
          n_watching = _action$data.n_watching,
          n_watched = _action$data.n_watched;

      var count = undefined;
      if (broadcastIsLive) {
        count = n_watching || 0;
      } else {
        count = n_watched || 0;
      }

      if (count === _count) return;
      _count = count;
      ViewerStore.emitChange();
      return;
  }
});

module.exports = ViewerStore;
