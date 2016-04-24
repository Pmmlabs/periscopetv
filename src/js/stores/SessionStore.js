"use strict";

var assign = require("object-assign");

var Dispatcher = require("../dispatcher/Dispatcher");
var EventEmitter = require("events").EventEmitter;
var Constants = require("../constants/Constants");

var CHANGE_EVENT = "change";

var _sessionInformation = {
  mutedUsernames: []
};

var SessionStore = assign({}, EventEmitter.prototype, {
  getSessionInformation: function getSessionInformation() {
    return { sessionInformation: _sessionInformation };
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

SessionStore.dispatchToken = Dispatcher.register(function (payload) {
  var action = payload.action;

  switch (action.type) {
    case Constants.ActionTypes.MUTE_USERNAME:
      var username = action.username;

      if (!username) return;

      _sessionInformation.mutedUsernames.push(username);
      SessionStore.emitChange();
      return;
  }
});

module.exports = SessionStore;
