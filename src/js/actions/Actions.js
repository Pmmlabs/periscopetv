"use strict";

var Permissions = require("../utils/Permissions");
var Constants = require("../constants/Constants");
var Dispatcher = require("../dispatcher/Dispatcher");

var ActionTypes = Constants.ActionTypes;

var Actions = exports;

/**
 * API data updates
 */

Actions.apiBroadcastNotFound = function () {
  Dispatcher.handleServerAction({
    type: ActionTypes.BROADCAST_NOT_FOUND });
  Actions.changeBroadcastState(Constants.VideoBroadcastStates.NOT_FOUND);

  // `state` is included by default when broadcast data is present
  // but in this scenario, there is not broadcast data available,
  // so we are manually setting the `state` key to be NOT_FOUND
  var Debugging = require("../utils/Debugging");
  Debugging.trackOnce("page viewed", {
    "page-name": document.title,
    url: window.location.pathname,
    state: "NOT_FOUND"
  });
};

Actions.refreshBroadcast = function () {
  Dispatcher.handleViewAction({
    type: ActionTypes.REFRESH_BROADCAST });
};

Actions.initBroadcastData = function (data) {
  Actions.updateBroadcastData(data, false);

  // NOTE (JoeTaylor): Not sure why this can't go on line 1, but it returns an empty obj
  var Debugging = require("../utils/Debugging");
  Debugging.trackOnce("page viewed", {
    "page-name": document.title,
    url: window.location.pathname
  });

  // Until the ranked broadcast endpoint returns raw broadcast IDs
  // we need to pass in the requested ID to ensure we can properly
  // dedupe on the same broadcast ID type
  Actions.visitedBroadcast(Constants.Broadcast.REQUESTED_ID);
};

Actions.updateBroadcastData = function (data) {
  Dispatcher.handleServerAction({
    type: ActionTypes.UPDATE_BROADCAST_DATA,
    data: data
  });

  Dispatcher.handleServerAction({
    type: ActionTypes.UPDATE_WATCHER_COUNT,
    data: data
  });
};

Actions.updateProfileUserData = function (user) {
  Dispatcher.handleServerAction({
    type: ActionTypes.UPDATE_PROFILE_USER_DATA,
    user: user
  });
};

Actions.refreshProfileUser = function () {
  Dispatcher.handleServerAction({
    type: ActionTypes.REFRESH_PROFILE_USER
  });
};

Actions.updateCardReplayUrl = function (url) {
  Dispatcher.handleServerAction({
    type: ActionTypes.UPDATE_CARD_REPLAY_URL,
    url: url
  });
};

Actions.updateReplayUrl = function (url) {
  Dispatcher.handleServerAction({
    type: ActionTypes.UPDATE_REPLAY_URL,
    url: url
  });
};

Actions.updateHlsUrl = function (url) {
  Dispatcher.handleServerAction({
    type: ActionTypes.UPDATE_HLS_URL,
    url: url
  });
};

Actions.updateVideoData = function (data) {
  Dispatcher.handleServerAction({
    type: ActionTypes.UPDATE_VIDEO_DATA,
    data: data
  });
};

Actions.updateChatData = function (data) {
  Dispatcher.handleServerAction({
    type: ActionTypes.UPDATE_CHAT_DATA,
    data: data
  });

  if (data.auth_token && data.subscriber && data.channel) {
    Dispatcher.handleServerAction({
      type: ActionTypes.PUBNUB_DATA,
      data: {
        auth_token: data.auth_token,
        subscriber: data.subscriber,
        channel: data.channel,
        should_verify_signature: data.should_verify_signature,
        signer_key: data.signer_key
      }
    });
  }

  if (data.auth_token && data.endpoint && data.access_token && data.room_id) {
    Dispatcher.handleServerAction({
      type: ActionTypes.CHATMAN_DATA,
      data: {
        auth_token: data.auth_token,
        endpoint: data.endpoint,
        access_token: data.access_token,
        room_id: data.room_id
      }
    });
  }
};

Actions.showSystemMessage = function (messageType, aux) {
  Dispatcher.handleServerAction({
    type: ActionTypes.SHOW_SYSTEM_MESSAGE,
    data: {
      messageType: messageType,
      aux: aux
    }
  });
};

Actions.rankedBroadcastData = function (data) {
  Dispatcher.handleServerAction({
    type: ActionTypes.RANKED_BROADCAST_DATA,
    data: data
  });
};

Actions.nextBroadcast = function () {
  Dispatcher.handleViewAction({
    type: ActionTypes.REQUEST_RANKED_BROADCASTS });
};

Actions.visitedBroadcast = function (token) {
  Dispatcher.handleViewAction({
    type: ActionTypes.VISITED_BROADCAST,
    token: token
  });
};

Actions.setModalUser = function (username) {
  Dispatcher.handleViewAction({
    type: ActionTypes.SET_MODAL_USER,
    username: username
  });
};

Actions.openModal = function (name) {
  Dispatcher.handleViewAction({
    type: ActionTypes.OPEN_MODAL,
    name: name
  });
};

Actions.closeModal = function (name) {
  Dispatcher.handleViewAction({
    type: ActionTypes.CLOSE_MODAL,
    name: name
  });
};

Actions.closeProfileModal = function () {
  Dispatcher.handleViewAction({
    type: ActionTypes.RESET_USER_MODAL
  });
};

Actions.muteUsername = function (username) {
  Dispatcher.handleViewAction({
    type: ActionTypes.MUTE_USERNAME,
    username: username
  });

  Actions.showSystemMessage(Constants.SystemMessageTypes.MUTE, { username: username });
};

Actions.toggleProfile = function (location) {
  Dispatcher.handleViewAction({
    type: ActionTypes.TOGGLE_PROFILE
  });

  var Debugging = require("../utils/Debugging");
  Debugging.track("profile-sidebar-toggle", {
    location: location
  });
};

Actions.requestDownloadLink = function (number, data) {
  Dispatcher.handleViewAction({
    type: ActionTypes.SEND_DOWNLOAD_LINK,
    number: number,
    data: data
  });
};

Actions.downloadLinkRequestSuccess = function (data) {
  Dispatcher.handleServerAction({
    type: ActionTypes.DOWNLOAD_LINK_SUCCESS,
    data: data });
};

Actions.downloadLinkRequestError = function (err) {
  Dispatcher.handleServerAction({
    type: ActionTypes.DOWNLOAD_LINK_ERROR,
    err: err
  });
};

Actions.resetDownloadLink = function () {
  Dispatcher.handleViewAction({
    type: ActionTypes.RESET_DOWNLOAD_LINK
  });
};

Actions.initiateChatman = function () {
  Dispatcher.handleViewAction({
    type: ActionTypes.CHATMAN_INIT
  });
};

Actions.initiatePubnub = function () {
  Dispatcher.handleViewAction({
    type: ActionTypes.PUBNUB_INIT
  });
};

Actions.liveBackfill = function () {
  if (Permissions.isEnabled("Pubnub")) {
    Dispatcher.handleViewAction({
      type: ActionTypes.PUBNUB_LIVE
    });
  } else if (Permissions.isEnabled("Chatman")) {}
};

Actions.replayBackfill = function () {
  if (Permissions.isEnabled("Pubnub")) {
    Dispatcher.handleViewAction({
      type: ActionTypes.PUBNUB_REPLAY
    });
  } else if (Permissions.isEnabled("Chatman")) {
    Dispatcher.handleViewAction({
      type: ActionTypes.CHATMAN_REPLAY
    });
  }
};

Actions.replayPaginationRequest = function () {
  if (Permissions.isEnabled("Chatman")) {
    Dispatcher.handleViewAction({
      type: ActionTypes.CHATMAN_REPLAY_PAGINATION
    });
  }
  if (Permissions.isEnabled("Pubnub")) {
    Dispatcher.handleViewAction({
      type: ActionTypes.PUBNUB_REPLAY_PAGINATION
    });
  }
};

Actions.pubnubChannelConnected = function (message) {
  Dispatcher.handleServerAction({
    type: ActionTypes.PUBNUB_CONNECTED
  });
};

Actions.pubnubChannelDisconnected = function (message) {
  Dispatcher.handleServerAction({
    type: ActionTypes.PUBNUB_DISCONNECTED
  });
};

Actions.incomingChatmanMessage = function (message, index, array) {
  Dispatcher.handleServerAction({
    type: ActionTypes.CHATMAN_MESSAGE,
    message: message,
    index: index,
    array: array
  });
};

Actions.incomingPubnubMessage = function (message, index, array) {
  Dispatcher.handleServerAction({
    type: ActionTypes.PUBNUB_MESSAGE,
    message: message,
    index: index,
    array: array
  });
};

Actions.chatmanPresence = function (message) {
  Dispatcher.handleServerAction({
    type: ActionTypes.CHATMAN_PRESENCE,
    message: message
  });
};

Actions.pubnubPresence = function (message) {
  Dispatcher.handleServerAction({
    type: ActionTypes.PUBNUB_PRESENCE,
    message: message
  });
};

Actions.renderedNTP = function (ntp) {
  Dispatcher.handleServerAction({
    type: ActionTypes.CURRENT_NTP,
    ntp: ntp
  });
};

Actions.renderedOrientation = function (orientation) {
  Dispatcher.handleServerAction({
    type: ActionTypes.CURRENT_ORIENTATION,
    orientation: orientation
  });
};

Actions.renderedDimensions = function (dimensions) {
  Dispatcher.handleServerAction({
    type: ActionTypes.CURRENT_DIMENSIONS,
    dimensions: dimensions
  });
};
/**
 * API Error Handling
 */

Actions.apiServerError = function () {
  Actions.changePlayerState(Constants.VideoPlayerStates.SERVER_ERROR);

  // `state` is included by default when broadcast data is present
  // but in this scenario, there is not broadcast data available,
  // so we are manually setting the `state` key to be SERVER_ERROR
  var Debugging = require("../utils/Debugging");
  Debugging.trackOnce("page viewed", {
    "page-name": document.title,
    url: window.location.pathname,
    state: "SERVER_ERROR"
  });
};

Actions.apiVideoResourceUnavailable = function () {
  // We additionally need to re-request the broadcast object
  // when this action is invoked, check the state of the
  // broadcast and reinitialize the video player.
  Actions.changePlayerState(Constants.VideoPlayerStates.UNAVAILABLE);
};

Actions.apiBroadcastExpired = function () {
  Actions.changeBroadcastState(Constants.VideoBroadcastStates.EXPIRED);

  // `state` is included by default when broadcast data is present
  // but in this scenario, there is not broadcast data available,
  // so we are manually setting the `state` key to be EXPIRED
  var Debugging = require("../utils/Debugging");
  Debugging.trackOnce("page viewed", {
    "page-name": document.title,
    url: window.location.pathname,
    state: "EXPIRED"
  });
};

Actions.apiBroadcastEnded = function () {
  Actions.endBroadcast();
};

// Only use with live broadcasts
Actions.endBroadcast = function () {
  Dispatcher.handleViewAction({
    type: ActionTypes.UPDATE_BROADCAST_END_TIME,
    time: new Date()
  });

  Actions.completePlayback();
};

/**
 * Replay actions
 */

Actions.updatePlaybackTime = function (progress) {
  Dispatcher.handleViewAction({
    type: ActionTypes.PLAYBACK_TIME,
    progress: progress
  });
};

Actions.seekToPosition = function () {
  var timecode = arguments[0] === undefined ? { seconds: 0, unix: 0, ntp: 0 } : arguments[0];

  Dispatcher.handleViewAction({
    type: ActionTypes.SEEK_POSITION,
    seconds: timecode.seconds,
    unix: timecode.unix,
    ntp: timecode.ntp
  });
};

Actions.seekingInitiated = function (seek) {
  Dispatcher.handleServerAction({
    type: ActionTypes.SEEKING_INITIATED,
    seek: seek
  });
};

Actions.seekingComplete = function () {
  Dispatcher.handleServerAction({
    type: ActionTypes.SEEKING_COMPLETE
  });
};

Actions.updateReplayAvailability = function (isAvailable) {
  Dispatcher.handleServerAction({
    type: ActionTypes.REPLAY_AVAILABLE,
    isAvailable: isAvailable
  });
};

Actions.thumbnailHistoryReceived = function () {
  var data = arguments[0] === undefined ? [] : arguments[0];

  Dispatcher.handleServerAction({
    type: ActionTypes.THUMBNAILS_RECEIVED,
    data: data
  });
};

Actions.startPlaying = function () {
  Dispatcher.handleServerAction({
    type: ActionTypes.START_PLAYING
  });

  Actions.playVideo();
  Actions.switchToVideoPresentation();
};

Actions.stopPlaying = function () {
  Dispatcher.handleServerAction({
    type: ActionTypes.STOP_PLAYING
  });

  Actions.stopVideo();
  Actions.switchToInterstitialPresentation();
};

Actions.completePlayback = function () {
  var Debugging = require("../utils/Debugging");
  Debugging.trackOnce("video-ended");

  Actions.stopPlaying();
  Actions.switchToReplayMode();
  Actions.refreshBroadcast();
  Actions.nextBroadcast();
};

Actions.playVideo = function () {
  // resume pubnub timer
  Actions.changePlayerState(Constants.VideoPlayerStates.PLAYING);
};

Actions.pauseVideo = function () {
  // pause pubnub timer
  Actions.changePlayerState(Constants.VideoPlayerStates.PAUSED);
};

Actions.stopVideo = function () {
  Actions.playerStarted(false);
  Actions.changePlayerState(Constants.VideoPlayerStates.STOPPED);
};

Actions.audioOn = function () {
  Actions.changeAudioState(Constants.VideoPlayerAudioStates.ON);
};

Actions.audioOff = function () {
  Actions.changeAudioState(Constants.VideoPlayerAudioStates.OFF);
};

Actions.playbackRequestedButNotSupported = function () {
  Dispatcher.handleViewAction({
    type: ActionTypes.UNSUPPORTED_PLAYBACK_REQUESTED
  });
};

Actions.elapsedPlaybackTime = function (time) {
  return;
};

/**
 * Video Player actions
 */

Actions.changePlayerState = function (state) {
  Dispatcher.handleViewAction({
    type: ActionTypes.CHANGE_PLAYER_STATE,
    state: state
  });
};

Actions.changeBroadcastState = function (state) {
  Dispatcher.handleViewAction({
    type: ActionTypes.CHANGE_BROADCAST_STATE,
    state: state
  });
};

Actions.changeAudioState = function (state) {
  Dispatcher.handleViewAction({
    type: ActionTypes.CHANGE_AUDIO_STATE,
    state: state
  });
};

Actions.changePlayerMode = function (mode) {
  Dispatcher.handleViewAction({
    type: ActionTypes.CHANGE_PLAYER_MODE,
    mode: mode
  });
};

Actions.switchToLiveMode = function () {
  Actions.changePlayerMode(Constants.VideoPlayerModes.LIVE);
};

Actions.switchToReplayMode = function () {
  Actions.changePlayerMode(Constants.VideoPlayerModes.REPLAY);
};

Actions.changePresentationMode = function (presentation) {
  Dispatcher.handleViewAction({
    type: ActionTypes.CHANGE_PLAYER_PRESENTATION,
    presentation: presentation
  });
};

Actions.switchToVideoPresentation = function () {
  Actions.changePresentationMode(Constants.VideoPlayerPresentations.VIDEO);
};

Actions.switchToInterstitialPresentation = function () {
  Actions.changePresentationMode(Constants.VideoPlayerPresentations.INTERSTITIAL);
};

Actions.broadcastBackgroundReady = function () {
  var isReady = arguments[0] === undefined ? true : arguments[0];

  Dispatcher.handleViewAction({
    type: ActionTypes.BROADCAST_BACKGROUND_READY,
    isReady: isReady
  });
};

Actions.externalLinkOpened = function (url) {
  Dispatcher.handleViewAction({
    type: ActionTypes.EXTERNAL_LINK_OPENED,
    url: url
  });
};

Actions.playerStarted = function (hasStarted) {
  Dispatcher.handleViewAction({
    type: ActionTypes.PLAYER_STARTED,
    hasStarted: hasStarted
  });
};

Actions.toggleCinema = function () {
  Dispatcher.handleViewAction({
    type: ActionTypes.TOGGLE_CINEMA
  });
};

// TODO: once CM gets live backfill
