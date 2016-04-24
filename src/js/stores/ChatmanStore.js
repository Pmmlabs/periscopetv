"use strict";

var assign = require("object-assign");

var EventEmitter = require("events").EventEmitter;

var Constants = require("../constants/Constants");
var Debugging = require("../utils/Debugging");

var Dispatcher = require("../dispatcher/Dispatcher");
var Hack = require("../utils/Hack");
var Permissions = require("../utils/Permissions");

var _require = require("../stores/EventStore");

var EventTimer = _require.EventTimer;
var EventStore = _require.EventStore;

var EVENTS = Constants.Events;

var filterEvents = function (event, action) {
  var _processEvent = EventStore.processEvent.bind(undefined, event, action);
  var index = action.index;
  var array = action.array;

  // If a message is received during a replay, there's a possibilty there are more messages
  // in history, so indicate that we still want to request for more

  // Note: We must process this logic before we filter on event type. Because Web doesn't
  // honor all event types, we can receive full history responses without any events to
  // actually render. In that case, we still need to indicate to paginate for more.
  if (!EventStore.getReplayNeedsMoreMessages() && (typeof index !== "undefined" && array && index + 1 === array.length)) {
    EventStore.setReplayNeedsMoreMessages(true);
  }

  switch (event.type) {
    case Constants.PubnubMessageTypes.BROADCASTER_UPLOADED_REPLAY:
    case Constants.PubnubMessageTypes.BROADCAST_ENDED:
      _processEvent(EVENTS.VIDEO.kind);
      return;
    case Constants.PubnubMessageTypes.HEART:
    case Constants.PubnubMessageTypes.SCREENSHOT:
      _processEvent(EVENTS.HEART.kind);
      return;
    case Constants.PubnubMessageTypes.CHAT:
      if (Permissions.isDisabled("comments") || !Hack.liveComments && !event.hacked) return;
      _processEvent(EVENTS.CHAT.kind);
      return;
  }
};

var ChatmanStore = assign({}, EventEmitter.prototype, {
  emitChatmanPaginationRequest: function emitChatmanPaginationRequest() {
    if (Permissions.isDisabled("Chatman")) {
      return;
    }this.emit("ChatmanPaginationRequest");
  },

  addChatmanPaginationListener: function addChatmanPaginationListener(fn) {
    if (Permissions.isDisabled("Chatman")) {
      return;
    }this.on("ChatmanPaginationRequest", fn);
  },

  removeChatmanPaginationListener: function removeChatmanPaginationListener(fn) {
    if (Permissions.isDisabled("Chatman")) {
      return;
    }this.removeListener("ChatmanPaginationRequest", fn);
  } });

ChatmanStore.dispatchToken = Dispatcher.register(function (payload) {
  if (Permissions.isDisabled("Chatman")) return;

  var action = payload.action;

  switch (action.type) {
    case Constants.ActionTypes.CHATMAN_MESSAGE:
      var message = action.message;

      // Convert and copy Chatman event NTP time from a fixed-point 32.32
      // number to a floating point number of seconds for comparisons
      var event = EventTimer.setEventTime(message);
      event.isCM = true;
      filterEvents(event, action);
      return;

    case Constants.ActionTypes.CHATMAN_REPLAY_PAGINATION:
      ChatmanStore.emitChatmanPaginationRequest();
      return;
  }
});

module.exports = ChatmanStore;
