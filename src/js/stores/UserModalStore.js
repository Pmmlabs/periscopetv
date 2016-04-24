"use strict";

var assign = require("object-assign");
var EventEmitter = require("events").EventEmitter;

var ApiRequest = require("../utils/apiRequest");
var Constants = require("../constants/Constants");
var Dispatcher = require("../dispatcher/Dispatcher");

var ProfileStore = require("../stores/ProfileStore");

var Utils = require("../utils/utils");
var Debugging = require("../utils/Debugging");
var Permissions = require("../utils/Permissions");

var DEFAULT_MODAL = {
  username: null,
  user: {},
  loading: true };

// Must create object with null as prototype so screen name/ID
// keys aren't mistaken for prototype methods
var userCache = Object.create(null);
var userModal = assign({}, DEFAULT_MODAL);

var CHANGE_EVENT = "change";

var UserModalStore = assign({}, EventEmitter.prototype, {

  writeUsername: function writeUsername(username) {
    userModal.username = username;
  },

  writeUserToModal: function writeUserToModal(user) {
    userModal.user = user;
    userModal.loading = false;
  },

  /**
   * We don't reset the user object or the loading state
   * on dismissal of the modal so that user info is
   * preserved in the rerender. Those fields will be
   * reassigned properly when a new user is set.
   */
  resetModal: function resetModal() {
    userModal.username = null;
  },

  storeUser: function storeUser(userData) {
    userCache[userData.username] = ProfileStore.processUser(userData);
  },

  /**
   * If the user modal is requested and a user has not been set
   * return the default user modal without a user set
   */
  handleUnsetUser: function handleUnsetUser(username) {
    return new Promise(function (resolve, reject) {
      username === null ? resolve(userModal) : reject();
    });
  },

  getUserFromCache: function getUserFromCache(username) {
    var _this = this;

    return new Promise(function (resolve, reject) {
      var userFromCache = userCache[username];
      Debugging.log("Requesting cache data for user name: " + username);
      if (userFromCache !== undefined) {
        _this.writeUserToModal(userFromCache);
        resolve(userModal);
      } else {
        reject();
      }
    });
  },

  getUserFromRemote: function getUserFromRemote(user_name) {
    var _this = this;

    Debugging.log("Requesting remote data for user name " + user_name);
    var requestConfig = {
      url: Constants.ApiEndpoints.HOSTNAME + Constants.ApiEndpoints.USER,
      query: {
        user_name: user_name
      }
    };

    return ApiRequest.get(requestConfig).then(function (response) {
      var userData = response.body.user;
      _this.storeUser(userData);
      return userData;
    }).then(function (userData) {
      _this.writeUserToModal(userData);
      return userModal;
    });
  },

  getUserModal: function getUserModal() {
    var _this = this;

    var username = arguments[0] === undefined ? userModal.username : arguments[0];

    return this.handleUnsetUser(username).then(function (userModal) {
      // No username is defined, return default modal
      return userModal;
    }, function (error) {
      return _this.getUserFromCache(username).then(function (userModal) {
        // User found in cache, return user modal with user
        return userModal;
      }, function (error) {
        return _this.getUserFromRemote(username).then(function (userModal) {
          // User retrieved from server, return user modal with user
          return userModal;
        }, function (error) {});
      });
    });
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

UserModalStore.dispatchToken = Dispatcher.register(function (payload) {
  var action = payload.action;

  switch (action.type) {
    case Constants.ActionTypes.SET_MODAL_USER:
      UserModalStore.writeUsername(action.username);
      UserModalStore.emitChange();
      break;

    case Constants.ActionTypes.RESET_USER_MODAL:
      UserModalStore.resetModal();
      UserModalStore.emitChange();
      break;

    case Constants.ActionTypes.UPDATE_PROFILE_USER_DATA:
      UserModalStore.writeUsername(action.user.username);
      UserModalStore.storeUser(action.user);
      break;
  }
});

module.exports = UserModalStore;
