"use strict";

var assign = require("object-assign");
var EventEmitter = require("events").EventEmitter;

var BroadcastStore = require("../stores/BroadcastStore");
var VideoPlayerStore = require("../stores/VideoPlayerStore");
var ApiRequest = require("../utils/apiRequest");
var Actions = require("../actions/Actions");
var Constants = require("../constants/Constants");
var Dispatcher = require("../dispatcher/Dispatcher");
var Router = require("../router");

var itemKey = "visited-broadcasts";

var BROADCASTS = [];

var BroadcastFeedStore = assign({}, EventEmitter.prototype, {

  inCouchMode: function inCouchMode() {
    return Constants.AppSettings.mode === Constants.AppModes.COUCH;
  },

  getStorage: function getStorage() {
    var str = localStorage.getItem(itemKey);
    var history = undefined;
    try {
      history = JSON.parse(str);
    } catch (e) {
      history = BROADCASTS;
    } finally {
      history = history || BROADCASTS;
    }
    return history;
  },

  setStorage: function setStorage(item) {
    // Previously stored state in sessionStorage
    // Clear it to clean up after ourselves
    sessionStorage.clear();

    var str = JSON.stringify(item);
    localStorage.setItem(itemKey, str);
  },

  sendBroadcastMessage: function sendBroadcastMessage() {
    var broadcast = BroadcastStore.getBroadcast();
    var message = {
      type: Constants.PageMessageTypes.VISITED_BROADCAST,

      url: Router.generateBroadcastUrl(broadcast.broadcast.id),
      title: broadcast.broadcast.status,
      id: broadcast.broadcast.id,
      displayName: broadcast.user.display_name,
      username: broadcast.user.username,
      userId: broadcast.user.id,
      twitterHandle: broadcast.user.twitter_screen_name
    };

    window.onload = function () {
      window.postMessage(message, window.location.origin);
    };
  },

  getVisitedBroadcasts: function getVisitedBroadcasts() {
    return this.getStorage();
  },

  setVisitedBroadcast: function setVisitedBroadcast(broadcastToken) {
    var broadcasts = this.getVisitedBroadcasts();
    if (broadcasts.indexOf(broadcastToken) === -1) {
      broadcasts.push(broadcastToken);
      this.setStorage(broadcasts);
      this.sendBroadcastMessage();
    }
  },

  possiblyVisitBroadcast: function possiblyVisitBroadcast(rankedTokens) {
    var visitedBroadcasts = this.getVisitedBroadcasts();

    for (var i = 0; i < rankedTokens.length; i++) {
      var token = rankedTokens[i];
      if (visitedBroadcasts.indexOf(token) === -1) {
        this.navigateToBroadcast(token);
        break;
      }
    }
  },

  navigateToBroadcast: function navigateToBroadcast(token) {
    var broadcastUrl = Router.generateBroadcastUrl({ id: token });
    broadcastUrl = "" + broadcastUrl + "?mode=couch";

    // TODO: Maintain profile visibility in URL construction.
    // Either have endpoint return username with token/id,
    // or pass up parameter to force broadcast URL to redirect
    // to broadcast URL with username

    var langCode = Constants.ApiEndpoints.LANG;
    if (langCode) {
      broadcastUrl = "" + broadcastUrl + "&lang=" + langCode;
    }

    var timerDuration = Constants.VideoPlayerSettings.timerDuration;
    if (timerDuration) {
      broadcastUrl = "" + broadcastUrl + "&d=" + timerDuration;
    }

    if (VideoPlayerStore.player().cinema) {
      broadcastUrl = "" + broadcastUrl + "&cinema";
    }

    window.location = broadcastUrl;
  },

  requestRankedBroadcasts: function requestRankedBroadcasts() {
    var requestConfig = {
      url: Constants.ApiEndpoints.HOSTNAME + Constants.ApiEndpoints.RANKED,
      query: { languages: Constants.ApiEndpoints.LANG || "en" }
    };

    ApiRequest.get(requestConfig).then(function (response) {
      if (ApiRequest.hasErrorFor(response.status.toString(), Constants.ApiEndpointTypes.RANKED)) {
        return;
      }
      Actions.rankedBroadcastData(response.body);
    }, function (error) {});
  }
});

BroadcastFeedStore.dispatchToken = Dispatcher.register(function (payload) {
  var action = payload.action;

  switch (action.type) {
    case Constants.ActionTypes.REQUEST_RANKED_BROADCASTS:
      if (!BroadcastFeedStore.inCouchMode()) return;
      BroadcastFeedStore.requestRankedBroadcasts();
      break;

    case Constants.ActionTypes.RANKED_BROADCAST_DATA:
      if (!BroadcastFeedStore.inCouchMode()) return;
      BroadcastFeedStore.possiblyVisitBroadcast(action.data);
      break;

    case Constants.ActionTypes.VISITED_BROADCAST:
      if (!BroadcastFeedStore.inCouchMode()) return;
      BroadcastFeedStore.setVisitedBroadcast(action.token);
      break;
  }
});

module.exports = BroadcastFeedStore;
