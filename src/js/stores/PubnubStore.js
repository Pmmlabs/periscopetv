"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var assign = require("object-assign");
var Signer = require("jsrsasign");

var EventEmitter = require("events").EventEmitter;

var Constants = require("../constants/Constants");
var Debugging = require("../utils/Debugging");

var Dispatcher = require("../dispatcher/Dispatcher");
var Hack = require("../utils/Hack");
var Permissions = require("../utils/Permissions");

var _require = require("../stores/EventStore");

var EventTimer = _require.EventTimer;
var EventStore = _require.EventStore;

var CHANGE_EVENT = "change";
var EVENTS = Constants.Events;

// Begin with one viewer to account for broadcaster
var _viewerCount = 1;

var signatureConfig = undefined;

var constructPem = function () {
  if (Debugging._isTest()) return;

  var pemParts = [];
  pemParts.push("-----BEGIN CERTIFICATE-----");
  pemParts.push(signatureConfig.signer_key);
  pemParts.push("-----END CERTIFICATE-----");
  signatureConfig.pemCert = pemParts.join("\n");
};

var filterEvents = function filterEvents(event, action) {
  var _processEvent = EventStore.processEvent.bind(this, event, action);
  var index = action.index;
  var array = action.array;

  // If a message is received during a replay, there's a possibilty there are more messages
  // in history, so indicate that we still want to request for more

  // Note: We must process this logic before we filter on event type. Because Web doesn't
  // honor all event types, we can receive full history responses without any events to
  // actually render. In that case, we still need to indicate to paginate for more.

  if (!EventStore.getReplayNeedsMoreMessages() && (index && array && index + 1 === array.length)) {
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
      if (Permissions.isDisabled("comments") || !Hack.liveComments && !event.hacked) {
        return;
      }_processEvent(EVENTS.CHAT.kind);
      return;
  }
};

var PubnubStore = assign({}, EventEmitter.prototype, {
  isVerifiedMessage: function isVerifiedMessage(message) {
    var signature = undefined;
    try {
      signature = new Signature();
    } catch (e) {
      return false;
    }
    if (signature.shouldVerifySignature(message) && signature.isVerifiedSignature(message)) {
      return true;
    }return false;
  },

  emitPubnubPaginationRequest: function emitPubnubPaginationRequest() {
    if (Permissions.isDisabled("Pubnub")) {
      return;
    }this.emit("PubnubPaginationRequest");
  },

  addPubnubPaginationListener: function addPubnubPaginationListener(fn) {
    if (Permissions.isDisabled("Pubnub")) {
      return;
    }this.on("PubnubPaginationRequest", fn);
  },

  removePubnubPaginationListener: function removePubnubPaginationListener(fn) {
    if (Permissions.isDisabled("Pubnub")) {
      return;
    }this.removeListener("PubnubPaginationRequest", fn);
  } });

var Signature = (function () {
  function Signature() {
    _classCallCheck(this, Signature);

    this.signature = new Signer.Signature({ alg: "SHA256withECDSA" });
    this.signature.init(signatureConfig.pemCert);
  }

  _createClass(Signature, {
    shouldVerifySignature: {
      value: function shouldVerifySignature(message) {
        if (Debugging._isTest()) {
          return false;
        } // All messages of type 12 or higher must be verified
        if (message.type >= 12 || signatureConfig.enabled) {
          return true;
        }return false;
      }
    },
    isVerifiedSignature: {
      value: function isVerifiedSignature(message) {
        var _this = this;

        // Hearts aren't signed, consider them verified
        if (message.type === Constants.PubnubMessageTypes.HEART) {
          return true;
        } // Drop unsigned messages
        if (!message.signature) {
          return false;
        }var originalMessage = assign({}, message);
        var messageSignature = originalMessage.signature;
        var modifiedMessage = assign({}, message);

        // Filter any keys set by client, prefixed with `webClient_`
        // Filter any keys for Signer, prefixed with `signer_` or `signature`
        Object.keys(modifiedMessage).filter(function (key) {
          if (key.indexOf("webClient_") !== -1) return true;
          if (key.indexOf("signer_") !== -1) return true;
          if (key.indexOf("signature") !== -1) return true;
        }).forEach(function (key) {
          delete modifiedMessage[key];
        });

        // In alphabetical order of the keys,
        // update signature with each key's value
        Object.keys(modifiedMessage).sort().forEach(function (key) {
          var strValue = undefined;
          var keyAsString = originalMessage["signer_str_" + key];
          if (typeof modifiedMessage[key] === "number" && keyAsString) {
            strValue = String(keyAsString);
          } else {
            strValue = String(modifiedMessage[key]);
          }
          _this.signature.updateString(strValue);
        });

        // Decode signature on message from base64, re-encode to hex
        var hexSignature = Signer.b64tohex(messageSignature);
        var signatureValidity = this.signature.verify(hexSignature);

        return signatureValidity;
      }
    }
  });

  return Signature;
})();

;

PubnubStore.dispatchToken = Dispatcher.register(function (payload) {
  if (Permissions.isDisabled("Pubnub")) return;

  var action = payload.action;

  switch (action.type) {
    case Constants.ActionTypes.PUBNUB_DATA:
      signatureConfig = {
        enabled: action.data.should_verify_signature,
        signer_key: action.data.signer_key
      };
      constructPem();
      return;

    case Constants.ActionTypes.PUBNUB_MESSAGE:
      var message = action.message;

      // Convert and copy Pubnub event NTP time from a fixed-point 32.32
      // number to a floating point number of seconds for comparisons
      var event = EventTimer.setEventTime(message);
      filterEvents(event, action);
      return;
  }
});

module.exports = PubnubStore;
