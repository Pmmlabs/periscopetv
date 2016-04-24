"use strict";

var assign = require("object-assign");
var Actions = require("../actions/Actions");
var Debugging = require("../utils/Debugging");
var Dispatcher = require("../dispatcher/Dispatcher");
var EventEmitter = require("events").EventEmitter;
var Constants = require("../constants/Constants");
var CardAdapter = require("./CardAdapter");

var _require = require("../utils/utils");

var isIframe = _require.isIframe;

var TWITTER_ORIGIN = "https://twitter.com";

// TODO: (jstarry) update macaw-cards to condition autoplay events on whether
// an update message has been set so that we can remove this code
var pendingAutoPlayAction = undefined;
var receivedUpdateMessage = false;

var cardAdapter = undefined;

var shouldUseExternalData = Constants.Env === "PRODUCTION" || isIframe;

var WindowMessage = assign({}, EventEmitter.prototype, {

  init: function init() {
    window.addEventListener("message", WindowMessage.handleMessage);

    // Notify API that we can receive messages
    Debugging.log("Twitter Card: Send init message");

    this.handleApiAction(WindowMessage.initWindow, WindowMessage.initAdapter);
  },

  deinit: function deinit() {
    window.removeEventListener("message", WindowMessage.handleMessage);
  },

  openLink: function openLink(url) {
    var messageData = { url: url };
    WindowMessage.postMessage(Constants.WindowMessageTypes.OPEN_LINK, messageData);
  },

  postMessage: function postMessage(type) {
    var data = arguments[1] === undefined ? {} : arguments[1];

    var messageData = assign({ type: type }, data);
    window.parent.postMessage(messageData, TWITTER_ORIGIN);
  },

  handleApiAction: function handleApiAction(cardAction, adapterAction) {
    shouldUseExternalData ? cardAction() : adapterAction();
  },

  initWindow: function initWindow() {
    WindowMessage.postMessage(Constants.WindowMessageTypes.INIT);
  },

  deinitWindow: function deinitWindow() {
    WindowMessage.postMessage(Constants.WindowMessageTypes.STOP_POLLING);
  },

  initAdapter: function initAdapter() {
    cardAdapter = new CardAdapter();
  },

  deinitAdapter: function deinitAdapter() {
    cardAdapter && cardAdapter.destroy();
  },

  handleMessage: function handleMessage(event) {
    // Verify Twitter origin
    var origin = event.origin || event.originalEvent.origin;
    if (shouldUseExternalData && origin !== TWITTER_ORIGIN) {
      return;
    }Debugging.log("Twitter Card: Received message", event.data);
    var data = event.data;
    switch (data.type) {
      case Constants.WindowMessageTypes.INIT:
        WindowMessage.handleInitMessage(data.cardData);
        break;
      case Constants.WindowMessageTypes.UPDATE:
        WindowMessage.handleUpdateMessage(data.cardData);
        break;
      case Constants.WindowMessageTypes.UPDATE_ERROR:
        WindowMessage.handleUpdateErrorMessage();
        break;
      case Constants.WindowMessageTypes.START_PLAYING:
        WindowMessage.queueAutoPlayAction(Actions.startPlaying);
        break;
      case Constants.WindowMessageTypes.STOP_PLAYING:
        WindowMessage.queueAutoPlayAction(Actions.stopPlaying);
        break;
    }
  },

  queueAutoPlayAction: function queueAutoPlayAction(autoPlayAction) {
    if (receivedUpdateMessage) {
      autoPlayAction();
    } else {
      pendingAutoPlayAction = autoPlayAction;
    }
  },

  triggerPendingAutoPlayAction: function triggerPendingAutoPlayAction() {
    if (pendingAutoPlayAction) {
      pendingAutoPlayAction();
      pendingAutoPlayAction = null;
    }
  },

  handleInitMessage: function handleInitMessage(cardData) {
    Actions.updateBroadcastData({
      n_watching: cardData.total_participants,
      n_watched: cardData.total_participants,
      broadcast: {
        image_url: cardData.full_size_thumbnail_url,
        id: cardData.id } });

    Actions.updateProfileUserData({
      id: cardData.broadcaster_id,
      username: cardData.broadcaster_username,
      display_name: cardData.broadcaster_display_name });
  },

  handleUpdateMessage: function handleUpdateMessage(cardData) {
    Actions.updateBroadcastData({
      n_watching: cardData.total_participants,
      n_watched: cardData.total_participants,
      broadcast: {
        available_for_replay: cardData.available_for_replay,
        image_url: cardData.full_size_thumbnail_url,
        state: cardData.state,
        id: cardData.id,
        start: cardData.start_date,
        ended: cardData.end_date,
        status: cardData.status,
        featured: cardData.featured
      }
    });

    var hasReplay = !!cardData.replay_url;
    var broadcastEnded = cardData.state === Constants.VideoBroadcastStates.ENDED || cardData.state === Constants.VideoBroadcastStates.TIMED_OUT;
    if (!hasReplay && broadcastEnded) {
      this.handleApiAction(WindowMessage.deinitWindow, WindowMessage.deinitAdapter);
      Actions.refreshProfileUser();
      Actions.apiBroadcastExpired();
    }

    Actions.updateHlsUrl(cardData.hls_url);
    Actions.updateCardReplayUrl(cardData.replay_url);
    Actions.updateReplayAvailability(hasReplay);

    // Now that we received an update message, trigger pending autoplay actions
    receivedUpdateMessage = true;
    WindowMessage.triggerPendingAutoPlayAction();
  },

  handleUpdateErrorMessage: function handleUpdateErrorMessage() {
    Actions.refreshProfileUser();
    Actions.apiBroadcastNotFound();
  }
});

WindowMessage.dispatchToken = Dispatcher.register(function (payload) {
  var action = payload.action;

  switch (action.type) {
    case Constants.ActionTypes.EXTERNAL_LINK_OPENED:
      WindowMessage.openLink(action.url);
      return;
  }
});

module.exports = WindowMessage;
