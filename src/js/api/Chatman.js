"use strict";

var _slicedToArray = function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { var _arr = []; for (var _iterator = arr[Symbol.iterator](), _step; !(_step = _iterator.next()).done;) { _arr.push(_step.value); if (i && _arr.length === i) break; } return _arr; } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } };

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var assign = require("object-assign");

var Actions = require("../actions/Actions");
var Dispatcher = require("../dispatcher/Dispatcher");
var ApiRequest = require("../utils/apiRequest");
var Permissions = require("../utils/Permissions");
var Constants = require("../constants/Constants");
var Debugging = require("../utils/Debugging");

var BroadcastStore = require("../stores/BroadcastStore");
var ChatmanStore = require("../stores/ChatmanStore");
var VideoPlayerStore = require("../stores/VideoPlayerStore");

var ActionTypes = Constants.ActionTypes;

var stringify = JSON.stringify;
var parse = JSON.parse;

var MESSAGE_KIND = {
  CHAT: 1,
  CONTROL: 2,
  AUTH: 3
};

var FAILURE_BACKOFF_MS = 1000;
var MAX_FAILURES = 10;

var _videoData = undefined;
var _chatmanSocket = undefined;
var _chatmanSocketFailedAttemps = 0;
var _broadcastEnded = false;

var WireMessage = (function () {
  function WireMessage(payload, /*String*/kind) {
    _classCallCheck(this, WireMessage);

    this.payload = payload;
    this.kind = kind;
  }

  _createClass(WireMessage, {
    toString: {
      value: function toString() {
        var payload = this.payload;
        var kind = this.kind;
        return stringify({ payload: payload, kind: kind });
      }
    }
  });

  return WireMessage;
})();

var ControlMessage = (function (_WireMessage) {
  function ControlMessage(payload /*String*/) {
    _classCallCheck(this, ControlMessage);

    _get(Object.getPrototypeOf(ControlMessage.prototype), "constructor", this).call(this, payload, MESSAGE_KIND.CONTROL);
  }

  _inherits(ControlMessage, _WireMessage);

  return ControlMessage;
})(WireMessage);

var ChatmanMessage = (function () {
  function ChatmanMessage(data) {
    _classCallCheck(this, ChatmanMessage);

    this.kind = data.kind;
    this.payload = parse(data.payload);
    this.body = parse(this.payload.body);
  }

  _createClass(ChatmanMessage, {
    isChat: {
      value: function isChat() {
        return this.kind === MESSAGE_KIND.CHAT;
      }
    },
    isControl: {
      value: function isControl() {
        return this.kind === MESSAGE_KIND.CONTROL;
      }
    },
    isPresence: {
      value: function isPresence() {
        return this.isControl() && typeof this.body !== "undefined";
      }
    }
  });

  return ChatmanMessage;
})();

var ChatmanAPI = {
  authMessage: function (access_token) {
    return new WireMessage(stringify({ access_token: access_token }), MESSAGE_KIND.AUTH);
  },
  joinMessage: function (room) {
    return new ControlMessage(stringify({
      body: stringify({ room: room }), kind: MESSAGE_KIND.CHAT
    }));
  },

  init: function () {
    if (Permissions.isDisabled("Chatman")) return;

    // if endpoint and access_token then open the socket
    if (_videoData.endpoint && _videoData.access_token) {
      try {
        if (VideoPlayerStore.getVideoPlayer().player.mode === Constants.VideoPlayerModes.LIVE) {
          ChatmanAPI.openSocket(_videoData);
        } else if (BroadcastStore.broadcastHasReplay()) {
          ChatmanAPI.backfillReplay({});
        }
      } catch (e) {
        Debugging.warn(e);
      }
    } else {
      throw new Error("Access Channel did not provide endpoint and/or access_token");
    }
  },

  getHistory: function (_ref) {
    var cursor = _ref.cursor;
    var timetoken = _ref.timetoken;
    var processMessages = _ref.processMessages;

    var requestConfig = {
      url: _videoData.endpoint + Constants.ApiEndpoints.CHATMAN_HISTORY,
      query: {
        access_token: _videoData.access_token,
        cursor: cursor,
        duration: 30,
        since: timetoken
      }
    };

    ApiRequest.post(requestConfig).then(function (response) {
      if (response.status === 200) {
        var _response$body = response.body;
        var messages = _response$body.messages;
        var _cursor = _response$body.cursor;

        processMessages([messages, _cursor]);
      }
    });
  },

  openSocket: function (videoData) {
    var transformEndpoint = function (uri) {
      if (uri.indexOf("https://") > -1) {
        return "wss://" + uri.substr("https://".length);
      } else if (uri.indexOf("http://") > -1) {
        return "ws://" + uri.substr("http://".length);
      }

      return uri;
    };
    var wsEndpoint = transformEndpoint(videoData.endpoint);

    try {
      _chatmanSocket = new WebSocket(wsEndpoint + Constants.ApiEndpoints.CHATMAN_WEB_SOCKET);
      ChatmanAPI.authAndJoinRoom(videoData.access_token);
      _chatmanSocket.onmessage = ChatmanAPI.onMessage;
      _chatmanSocket.onclose = ChatmanAPI.onClose;
    } catch (e) {
      Debugging.warn(e);
    }
  },

  closeSocket: function () {
    return _chatmanSocket && _chatmanSocket.close();
  },

  onClose: function () {
    if (_chatmanSocket) ChatmanAPI.closeSocket();

    // Reconnect
    if (!Debugging._isTest() && !_broadcastEnded && _chatmanSocketFailedAttemps < MAX_FAILURES) {
      _chatmanSocketFailedAttemps++;
      setTimeout(function () {
        ChatmanAPI.openSocket(_videoData);
      }, FAILURE_BACKOFF_MS * _chatmanSocketFailedAttemps);
    }
  },

  endBroadcast: function () {
    _broadcastEnded = true;
    ChatmanAPI.closeSocket();
  },

  onMessage: function (event) {
    return ChatmanAPI.chatmanMessage(event.data);
  },

  chatmanMessage: function (message) {
    var chatMessage = new ChatmanMessage(parse(message));
    // Limit to CHAT type because sockets sends occupancy as well
    if (chatMessage.isChat()) {
      Actions.incomingChatmanMessage(chatMessage.body);
    } else if (chatMessage.isPresence()) {
      Actions.chatmanPresence(chatMessage.body);
    }
  },

  authAndJoinRoom: function (accessToken) {
    _chatmanSocket.onopen = function () {
      _chatmanSocketFailedAttemps = 0;
      var broadcastId = BroadcastStore.getBroadcastId();

      // AUTH
      this.send(ChatmanAPI.authMessage(accessToken));

      // JOIN
      this.send(ChatmanAPI.joinMessage(_videoData.room_id));
    };
  },

  backfillReplay: function (_ref) {
    var _ref$cursor = _ref.cursor;
    var cursor = _ref$cursor === undefined ? "" : _ref$cursor;
    var _ref$timetoken = _ref.timetoken;
    var timetoken = _ref$timetoken === undefined ? 0 : _ref$timetoken;
    var _ref$listener = _ref.listener;
    var listener = _ref$listener === undefined ? true : _ref$listener;

    if (Permissions.isDisabled("Chatman")) return;

    var config = {};

    assign(config, {
      cursor: cursor,
      timetoken: timetoken,
      processMessages: function processMessages(_ref2) {
        var _ref22 = _slicedToArray(_ref2, 2);

        var messages = _ref22[0];
        var cursor = _ref22[1];

        config.cursor = cursor;
        messages.map(function (raw) {
          return new ChatmanMessage(raw).body;
        }).forEach(Actions.incomingChatmanMessage.bind(Actions));
      }
    });

    if (listener) {
      // When Chatman queue drops below threshold, change event triggered
      ChatmanStore.addChatmanPaginationListener(function () {
        return ChatmanAPI.getHistory(config);
      });
    }

    // Begin backfill
    ChatmanAPI.getHistory(config);
  }
};

Dispatcher.register(function (payload) {
  if (Permissions.isDisabled("Chatman")) return;

  var action = payload.action;

  switch (action.type) {
    case ActionTypes.CHATMAN_DATA:
      _videoData = action.data;
      ChatmanAPI.init();
      break;

    case ActionTypes.SEEK_POSITION:
      if (!_videoData) return;
      var timetoken = Number(action.unix * 1000 // seconds => milliseconds
       * 1000 // milliseconds => microseconds
       * 1000 // microseconds => nanoseconds
      );
      ChatmanAPI.backfillReplay({
        timetoken: timetoken,
        listener: false
      });
      break;

    case ActionTypes.UPDATE_BROADCAST_END_TIME:
      ChatmanAPI.endBroadcast();
      break;
  }
});

module.exports = ChatmanAPI;
