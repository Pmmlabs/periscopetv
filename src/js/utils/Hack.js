"use strict";

var assign = require("object-assign");
var Actions = require("../actions/Actions");
var Constants = require("../constants/Constants");
var Dispatcher = require("../dispatcher/Dispatcher");
var mostRecentNTP = undefined;

var heartFixture = {
  hacked: true,
  participant_index: 35,
  displayName: "Jeff Rutkowski",
  v: 2,
  remoteID: "248053",
  type: 2 };

var commentFixture = {
  hacked: true,
  displayName: "Beary Sweet",
  participant_index: 3,
  username: "bearysweet",
  remoteID: "1719182",
  type: 1,
  v: 2,
  body: "Test Comment!!",
  profileImageURL: "http://pbs.twimg.com/profile_images/378800000049438710/b2cdaa67821c0abe192c9ad6a501683f_reasonably_small.png" };

function randomNumber() {
  return Math.floor((1 + Math.random()) * 65536);
}

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 65536).toString(16).substring(1);
  }
  return s4() + s4() + "-" + s4() + "-" + s4() + "-" + s4() + "-" + s4() + s4() + s4();
}

var Hack = {
  stopLivePubNubEvents: function () {
    Hack.stopLiveComments();
    Hack.stopLiveHearts();
  },

  stopLiveComments: function () {
    return Hack.liveComments = false;
  },

  liveComments: true,

  stopLiveHearts: function () {
    return Hack.liveHearts = false;
  },

  liveHearts: true,

  startLivePubNubEvents: function () {
    Hack.startLiveComments();
    Hack.startLiveHearts();
  },

  startLiveComments: function () {
    return Hack.liveComments = true;
  },

  startLiveHearts: function () {
    return Hack.liveHearts = true;
  },

  postComments: function () {
    var service = arguments[0] === undefined ? "Pubnub" : arguments[0];
    var amount = arguments[1] === undefined ? 1 : arguments[1];
    var offset = arguments[2] === undefined ? 0.1 : arguments[2];

    var random = false;
    var range = undefined;
    if (typeof offset === "object") {
      range = offset;
      random = true;
    }

    for (var i = 0; i < amount; i++) {
      var _commentFixture = assign({}, commentFixture);
      _commentFixture.uuid = guid();
      _commentFixture.participant_index = randomNumber();
      if (random) offset = (Math.floor(Math.random() * (range[1] * 100)) + range[0] * 100) / 100;
      _commentFixture.ntpForLiveFrame = parseFloat((mostRecentNTP + offset * i) * 4294967296);
      if (service === "Pubnub") {
        Actions.incomingPubnubMessage(_commentFixture);
      } else {
        Actions.incomingChatmanMessage(_commentFixture);
      }
    }
  },

  postHearts: function () {
    var service = arguments[0] === undefined ? "Pubnub" : arguments[0];
    var amount = arguments[1] === undefined ? 1 : arguments[1];
    var offset = arguments[2] === undefined ? 0.05 : arguments[2];

    var random = false;
    var range = undefined;
    if (typeof offset === "object") {
      range = offset;
      random = true;
    }

    for (var i = 0; i < amount; i++) {
      var _heartFixture = assign({}, heartFixture);
      _heartFixture.uuid = guid();
      _heartFixture.participant_index = randomNumber();
      if (random) offset = (Math.floor(Math.random() * (range[1] * 100)) + range[0] * 100) / 100;
      _heartFixture.ntpForLiveFrame = parseFloat((mostRecentNTP + offset * i) * 4294967296);
      if (service === "Pubnub") {
        Actions.incomingPubnubMessage(_heartFixture);
      } else {
        Actions.incomingChatmanMessage(_heartFixture);
      }
    }
  },

  muteVideo: function () {
    jwplayer(document.getElementById("video")).setMute(true);
  },

  unmuteVideo: function () {
    jwplayer(document.getElementById("video")).setMute(false);
  }
};

Hack.dispatchToken = Dispatcher.register(function (payload) {
  var action = payload.action;

  switch (action.type) {
    case Constants.ActionTypes.CURRENT_NTP:
      mostRecentNTP = action.ntp;
      return;
  }
});

window.Hack = Hack;

module.exports = Hack;
