"use strict";

var assign = require("object-assign");
var EventEmitter = require("events").EventEmitter;

var Constants = require("../constants/Constants");
var Dispatcher = require("../dispatcher/Dispatcher");
var Actions = require("../actions/Actions");
var Debugging = require("../utils/Debugging");

var Branch = require("branch-sdk");

var CHANGE_EVENT = "change";

var DEFAULT_STATE = {
  view: Constants.DownloadLinkStates.PROMPT,
  pending: false,
  destination: ""
};

var _linkRequest = assign({}, DEFAULT_STATE);

var DownloadLinkStore = assign({}, EventEmitter.prototype, {

  init: function init() {
    Branch.init("key_live_mkey7mkQKGQ7wSCJZWqqbfjfsBpy9pHE");
  },

  getLinkRequest: function getLinkRequest() {
    return { linkRequest: this.linkRequest() };
  },

  linkRequest: function linkRequest() {
    _linkRequest = _linkRequest || DEFAULT_STATE;
    return _linkRequest;
  },

  resetState: function resetState() {
    _linkRequest = assign({}, DEFAULT_STATE);
  },

  requestDownloadLink: function requestDownloadLink(number, data) {
    if (!number) {
      return;
    }var linkData = {
      channel: "website",
      feature: "text-me-the-app",
      data: data
    };
    var options = {
      makeNewLink: true
    };

    Branch.sendSMS(number, linkData, options, function (err) {
      if (err) {
        Actions.downloadLinkRequestError(err);
        Debugging.track("download-link-error", { err: err });
      } else {
        Actions.downloadLinkRequestSuccess();
        Debugging.track("download-link-success");
      }
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

DownloadLinkStore.dispatchToken = Dispatcher.register(function (payload) {
  var action = payload.action;

  switch (action.type) {
    case Constants.ActionTypes.SEND_DOWNLOAD_LINK:
      var number = action.number,
          data = action.data;

      _linkRequest.pending = true;
      _linkRequest.destination = number;
      DownloadLinkStore.emitChange();
      DownloadLinkStore.requestDownloadLink(number, data);
      break;

    case Constants.ActionTypes.DOWNLOAD_LINK_SUCCESS:
      _linkRequest.pending = false;
      _linkRequest.view = Constants.DownloadLinkStates.SUCCESS;
      DownloadLinkStore.emitChange();
      break;

    case Constants.ActionTypes.DOWNLOAD_LINK_ERROR:
      _linkRequest.pending = false;
      _linkRequest.view = Constants.DownloadLinkStates.ERROR;
      DownloadLinkStore.emitChange();
      break;

    case Constants.ActionTypes.RESET_DOWNLOAD_LINK:
      DownloadLinkStore.resetState();
      DownloadLinkStore.emitChange();
      break;
  }
});

module.exports = DownloadLinkStore;
