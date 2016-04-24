"use strict";

var assign = require("object-assign");
var EventEmitter = require("events").EventEmitter;

var Constants = require("../constants/Constants");
var Dispatcher = require("../dispatcher/Dispatcher");

var CHANGE_EVENT = "change";
var PLAYBACK_CHANGE = "change_playback";
var SEEK_CHANGE_EVENT = "change_seek";
var POSITION_CHANGE_EVENT = "change_position";
var AVAILABILITY_CHANGE_EVENT = "change_availability";

var DEFAULT_REPLAY = {
  available: false,
  isSeeking: false,
  requestedPosition: null,
  elapsed: 0,
  duration: 1,
  percentage: 0
};

var _replay = DEFAULT_REPLAY;

var ReplayStore = assign({}, EventEmitter.prototype, {
  getReplay: function getReplay() {
    return { replay: this.replay() };
  },

  isReplayAvailable: function isReplayAvailable() {
    return this.replay().available;
  },

  getRequestedPosition: function getRequestedPosition() {
    return this.replay().requestedPosition;
  },

  replay: function replay() {
    _replay = _replay || DEFAULT_REPLAY;
    return _replay;
  },

  emitChange: function emitChange() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function addChangeListener(fn) {
    this.on(CHANGE_EVENT, fn);
  },

  removeChangeListener: function removeChangeListener(fn) {
    this.removeListener(CHANGE_EVENT, fn);
  },

  emitAvailabilityChange: function emitAvailabilityChange() {
    this.emit(AVAILABILITY_CHANGE_EVENT);
  },

  addAvailabilityChangeListener: function addAvailabilityChangeListener(fn) {
    this.on(AVAILABILITY_CHANGE_EVENT, fn);
  },

  removeAvailabilityChangeListener: function removeAvailabilityChangeListener(fn) {
    this.removeListener(AVAILABILITY_CHANGE_EVENT, fn);
  },

  emitPositionChange: function emitPositionChange() {
    this.emit(POSITION_CHANGE_EVENT);
  },

  addPositionChangeListener: function addPositionChangeListener(fn) {
    this.on(POSITION_CHANGE_EVENT, fn);
  },

  removePositionChangeListener: function removePositionChangeListener(fn) {
    this.removeListener(POSITION_CHANGE_EVENT, fn);
  },

  emitPlaybackChange: function emitPlaybackChange() {
    this.emit(PLAYBACK_CHANGE);
  },

  addPlaybackChangeListener: function addPlaybackChangeListener(fn) {
    this.on(PLAYBACK_CHANGE, fn);
  },

  removePlaybackChangeListener: function removePlaybackChangeListener(fn) {
    this.removeListener(PLAYBACK_CHANGE, fn);
  }

});

ReplayStore.dispatchToken = Dispatcher.register(function (payload) {
  var action = payload.action;

  switch (action.type) {
    case Constants.ActionTypes.REPLAY_AVAILABLE:
      _replay = ReplayStore.replay();
      _replay.available = action.isAvailable;
      ReplayStore.emitAvailabilityChange();
      ReplayStore.emitChange();
      break;

    case Constants.ActionTypes.SEEKING_INITIATED:
      _replay = ReplayStore.replay();

      var desiredPosition = Number(action.seek.offset);
      var desiredPercentage = desiredPosition / _replay.duration * 100;

      _replay.elapsed = desiredPosition;
      _replay.percentage = desiredPercentage;
      ReplayStore.emitPlaybackChange();

      _replay.isSeeking = true;
      ReplayStore.emitChange();
      break;

    case Constants.ActionTypes.SEEKING_COMPLETE:
      _replay = ReplayStore.replay();
      _replay.isSeeking = false;
      ReplayStore.emitChange();
      break;

    case Constants.ActionTypes.SEEK_POSITION:
      _replay = ReplayStore.replay();
      // JWPlayer requires an int for seek value
      _replay.requestedPosition = Math.round(action.seconds);
      ReplayStore.emitPositionChange();
      break;

    case Constants.ActionTypes.PLAYBACK_TIME:
      _replay = ReplayStore.replay();

      var elapsed = Number(action.progress.position);
      var duration = Number(action.progress.duration);
      var percentage = Number(elapsed / duration * 100).toFixed(2);

      _replay.elapsed = elapsed;
      _replay.duration = duration;
      _replay.percentage = percentage;
      ReplayStore.emitPlaybackChange();
      break;
  }
});

module.exports = ReplayStore;
