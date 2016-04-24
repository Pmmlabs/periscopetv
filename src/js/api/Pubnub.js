"use strict";

var _slicedToArray = function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { var _arr = []; for (var _iterator = arr[Symbol.iterator](), _step; !(_step = _iterator.next()).done;) { _arr.push(_step.value); if (i && _arr.length === i) break; } return _arr; } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } };

var assign = require("object-assign");
var Actions = require("../actions/Actions");
var Constants = require("../constants/Constants");
var Dispatcher = require("../dispatcher/Dispatcher");
var Permissions = require("../utils/Permissions");
var Utils = require("../utils/utils");

var PubnubStore = require("../stores/PubnubStore");

var ActionTypes = Constants.ActionTypes;
var MessageTypes = Constants.PubnubMessageTypes;

var _pubnub = undefined;
var _pubnubData = undefined;

var MAX_LIVE_BACKFILL = 400;
var PUBNUB_MAX_COUNT = 100;

var PUBNUB_TIMETOKEN_MULTIPLIER = 10000000;

var PubnubAPI = {
  init: function init() {
    if (Permissions.isDisabled("Pubnub")) {
      return;
    }_pubnub = PUBNUB.init({
      auth_key: _pubnubData.auth_token,
      subscribe_key: _pubnubData.subscriber,
      keepalive: "30",
      heartbeat: "30",
      ssl: true
    });

    _pubnub.subscribe({
      channel: _pubnubData.channel,
      message: this.messageReceived,
      presence: function presence(message) {
        Actions.pubnubPresence(message);
      },
      connect: function connect() {
        Actions.pubnubChannelConnected();
      },
      disconnect: function disconnect() {
        Actions.pubnubChannelDisconnected();
      },
      state: {
        platform: 1
      }
    });
  },

  messageReceived: function messageReceived(message, envelope, channel) {
    Actions.incomingPubnubMessage(message);
  },

  backfillLive: function backfillLive() {
    var _this = this;

    PubnubAPI.historicalEvents = 0;
    var config = {
      reverse: false,
      timetoken: null,
      processMessages: function (_ref) {
        var _ref2 = _slicedToArray(_ref, 3);

        var msgs = _ref2[0];
        var start = _ref2[1];
        var end = _ref2[2];

        msgs.forEach(Actions.incomingPubnubMessage.bind(Actions));
        // Keep track locally of number of backfilled events
        PubnubAPI.historicalEvents += msgs.length;
        config.timetoken = start;
        possiblyContinueBackfill();
      }
    };

    var possiblyContinueBackfill = function () {
      // This will request up to 4 times if that many events exist
      if (PubnubAPI.historicalEvents < MAX_LIVE_BACKFILL - PUBNUB_MAX_COUNT) {
        _this.getHistory(config);
      }
    };

    // Begin live backfill to account for events missing from HLS stream delay
    possiblyContinueBackfill();
  },

  getHistory: function getHistory(_ref) {
    var reverse = _ref.reverse;
    var timetoken = _ref.timetoken;
    var processMessages = _ref.processMessages;

    var endTime = new Date().getTime() / 1000 * PUBNUB_TIMETOKEN_MULTIPLIER;

    _pubnub.history({
      start: timetoken,
      end: endTime,
      reverse: reverse,
      channel: _pubnubData.channel,
      callback: function callback(payload) {
        if (Utils.is.not.array(payload) || Utils.is.not.array(payload[0]) || !payload[1] || !payload[2]) {
          return false;
        }
        var _payload = _slicedToArray(payload, 1);

        var msgs = _payload[0];

        if (msgs != undefined && msgs.length > 0) {
          processMessages(payload);
        }
      }
    });
  },

  backfillReplay: function backfillReplay() {
    var timetoken = arguments[0] === undefined ? null : arguments[0];
    var reverse = arguments[1] === undefined ? true : arguments[1];
    var shouldBindListener = arguments[2] === undefined ? true : arguments[2];

    if (Permissions.isDisabled("Pubnub")) {
      return;
    }var config = {};

    assign(config, {
      reverse: reverse,
      timetoken: timetoken,
      processMessages: function processMessages(_ref) {
        var _ref2 = _slicedToArray(_ref, 3);

        var msgs = _ref2[0];
        var start = _ref2[1];
        var end = _ref2[2];

        config.timetoken = end;
        config.reverse = false;
        msgs.forEach(Actions.incomingPubnubMessage.bind(Actions));
      }
    });

    if (shouldBindListener) {
      // When Punbub queue drops below threshold, change event triggered
      PubnubStore.addPubnubPaginationListener(function () {
        return PubnubAPI.getHistory(config);
      });
    }

    // Begin backfill
    PubnubAPI.getHistory(config);
  }
};

Dispatcher.register(function (payload) {
  if (Permissions.isDisabled("Pubnub")) return;

  var action = payload.action;

  switch (action.type) {
    case ActionTypes.PUBNUB_DATA:
      _pubnubData = action.data;
      break;

    case ActionTypes.PUBNUB_INIT:
      if (!_pubnubData) return;
      PubnubAPI.init();
      break;

    case ActionTypes.PUBNUB_LIVE:
      if (!_pubnubData) return;
      PubnubAPI.backfillLive();
      break;

    case ActionTypes.SEEK_POSITION:
      if (!_pubnubData) return;
      var timetoken = Number(action.unix * PUBNUB_TIMETOKEN_MULTIPLIER).toFixed();
      PubnubAPI.backfillReplay(timetoken, false, false);
      break;

    case ActionTypes.PUBNUB_REPLAY:
      if (!_pubnubData) return;
      PubnubAPI.backfillReplay();
      break;
  }
});

module.exports = PubnubAPI;
