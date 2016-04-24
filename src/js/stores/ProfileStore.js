"use strict";

var assign = require("object-assign");
var EventEmitter = require("events").EventEmitter;

var Actions = require("../actions/Actions");
var ApiRequest = require("../utils/apiRequest");
var Constants = require("../constants/Constants");
var Dispatcher = require("../dispatcher/Dispatcher");
var Utils = require("../utils/utils");

var readBroadcastMetadata = function () {
  var broadcasts = undefined;

  try {
    broadcasts = JSON.parse(document.getElementById("user-broadcasts").getAttribute("content")).broadcasts.filter(function (broadcast) {
      return !!broadcast.id;
    });
  } catch (e) {} finally {
    broadcasts = broadcasts || [];
  }

  return broadcasts;
};

var CHANGE_EVENT = "change";
var USER_CHANGE_EVENT = "user_change";

var DEFAULT_AVATAR_URL = "https://abs.twimg.com/sticky/default_profile_images/default_profile_0_400x400.png";
var DEFAULT_PROFILE = {
  profile: {
    user: {
      avatar_url: ""
    },
    broadcasts: readBroadcastMetadata(),
    isLive: false,
    visible: document.getElementById("profile-visible").getAttribute("content") === "true"
  }
};

var _profile = DEFAULT_PROFILE;

var ProfileStore = assign({}, EventEmitter.prototype, {
  profile: function profile() {
    return _profile;
  },

  getProfile: function getProfile() {
    this.possiblyReadData();
    return this.profile();
  },

  getProfileUser: function getProfileUser() {
    return this.getProfile().profile.user;
  },

  getProfileUsername: function getProfileUsername() {
    return this.getProfileUser().username;
  },

  getProfileAvatar: function getProfileAvatar() {
    return this.getProfileUser().avatar_url;
  },

  hasBroadcasts: function hasBroadcasts() {
    return !!this.getProfile().profile.broadcasts.length;
  },

  isProfileVisible: function isProfileVisible() {
    return !!this.getProfile().profile.visible;
  },

  possiblyReadData: function possiblyReadData() {
    if (_profile.profile.user.avatar_url === "") {
      this.readInitialData();
    }
  },

  processUser: function processUser(user) {
    var avatarUrls = user.profile_image_urls;
    var avatarUrl = DEFAULT_AVATAR_URL;
    if (avatarUrls && avatarUrls.length) {
      avatarUrl = avatarUrls[avatarUrls.length - 1].ssl_url;
    }
    user.avatar_url = avatarUrl;
    return user;
  },

  readInitialData: function readInitialData() {
    var broadcastJsonString = document.getElementById("broadcast-data").getAttribute("content");

    if (!broadcastJsonString) {
      return;
    }var broadcastJson = JSON.parse(broadcastJsonString);
    var userJson = Utils.is.empty(broadcastJson.user) ? DEFAULT_PROFILE : broadcastJson.user;

    Actions.updateProfileUserData(userJson);
  },

  requestUser: function requestUser() {
    var user_name = this.getProfileUsername();
    var requestConfig = {
      url: Constants.ApiEndpoints.HOSTNAME + Constants.ApiEndpoints.USER,
      query: {
        user_name: user_name
      }
    };

    var Debugging = require("../utils/Debugging");
    Debugging.log("Requesting profile data for user name " + user_name);
    return ApiRequest.get(requestConfig).then(function (response) {
      if (ApiRequest.hasErrorFor(response.status.toString(), Constants.ApiEndpointTypes.USER)) {
        return;
      }
      Actions.updateProfileUserData(response.body.user);
    });
  },

  emitUserChange: function emitUserChange() {
    this.emit(USER_CHANGE_EVENT);
  },

  addUserChangeListener: function addUserChangeListener(fn) {
    this.on(USER_CHANGE_EVENT, fn);
  },

  removeUserChangeListener: function removeUserChangeListener(fn) {
    this.removeListener(USER_CHANGE_EVENT, fn);
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

ProfileStore.dispatchToken = Dispatcher.register(function (payload) {
  var action = payload.action;

  switch (action.type) {
    case Constants.ActionTypes.REFRESH_PROFILE_USER:
      ProfileStore.requestUser();
      break;
    case Constants.ActionTypes.UPDATE_PROFILE_USER_DATA:
      _profile.profile.user = ProfileStore.processUser(action.user);
      ProfileStore.emitUserChange();
      ProfileStore.emitChange();
      break;
    case Constants.ActionTypes.UPDATE_PROFILE_USER_BROADCASTS:
      _profile.profile.broadcasts = action.data;
      ProfileStore.emitChange();
      break;
    case Constants.ActionTypes.TOGGLE_PROFILE:
      _profile.profile.visible = !_profile.profile.visible;
      ProfileStore.emitChange();
      break;
    case Constants.ActionTypes.TOGGLE_PROFILE_USER_IS_LIVE:
      _profile.profile.isLive = !_profile.isLive;
      ProfileStore.emitChange();
      break;
  }
});

module.exports = ProfileStore;
