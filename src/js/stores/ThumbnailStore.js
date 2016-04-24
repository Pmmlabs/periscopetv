"use strict";

var assign = require("object-assign");
var EventEmitter = require("events").EventEmitter;

var Actions = require("../actions/Actions");
var Constants = require("../constants/Constants");
var Dispatcher = require("../dispatcher/Dispatcher");

var ApiRequest = require("../utils/apiRequest");
var BroadcastStore = require("./BroadcastStore");
var ReplayStore = require("./ReplayStore");
var VideoStore = require("./VideoStore");
var Utils = require("../utils/utils");

var CHANGE_EVENT = "change";

var THUMBNAILS = {};
var THUMBNAILS_PRELOAD_COUNT = 50;
var INCREMENT_THRESHOLD = 1;
var THUMBNAIL_MAPPING_OFFSET = 1;

var _thumbs = undefined;
var _thumbnailIndex = [];
var _thumbnailCache = [];

ReplayStore.addAvailabilityChangeListener(function () {
  if (Utils.isThumbnailPlaylistEnabled() && ReplayStore.isReplayAvailable() && Utils.isVideoSupported()) {
    ThumbnailStore.requestData();
  }
});

var ThumbnailStore = assign({}, EventEmitter.prototype, {
  getThumbnailForPosition: function getThumbnailForPosition(position) {
    var index = this.binaryThumbnailSearch(_thumbnailIndex, function (thumb) {
      return position.seconds - thumb.time;
    });
    index = Math.max(0, index);
    index = Math.min(index, _thumbnailIndex.length);
    return _thumbnailIndex.length ? _thumbnailIndex[index].tn : "";
  },

  thumbs: function thumbs() {
    _thumbs = _thumbs || THUMBNAILS;
    return _thumbs;
  },

  buildThumbnailIndex: function buildThumbnailIndex() {
    var thumbs = this.thumbs().chunks;
    // Don't attempt to build unless thumbnail chunks are present
    if (!thumbs) {
      return [];
    } // The original first thumbnail is the broadcast thumbnail,
    // and is not applicable for scrubbing
    thumbs = thumbs.slice(1);

    // The new first thumbnail is from time 0,
    // but does not have time set because time is 0
    // Set this manually to ensure appropriate
    // interval calculation
    if (!thumbs[0].time) {
      thumbs[0].time = 0;
    }

    // Determine average timecode spread between thumbnails
    var timecodeInterval = Number(thumbs.slice(1, 10).map(function (thumb, index, array) {
      if (index === 0 || !thumb.time) return;
      return thumb.time - array[index - 1].time;
    }).filter(function (thumb, index, array) {
      return thumb !== undefined;
    }).reduce(function (prevTime, currTime) {
      return (prevTime + currTime) / 2;
    }, 0).toFixed(1));

    // TODO: If timecode resumes on later thumbnails in the playlist
    // adjust the interval value to be an even spread between the
    // last known timecode and the first resumed timecode

    // Fill in timecode on thumbnails if missing
    var lastTimecode = 0;
    return thumbs.map(function (thumb) {
      if (!thumb.time) {
        thumb.time = Math.round(lastTimecode + timecodeInterval);
      }
      lastTimecode = thumb.time;
      return thumb;
    });
  },

  getThumbnailsForPreload: function getThumbnailsForPreload() {
    // Grab even distribution of THUMBNAILS_PRELOAD_COUNT thumbnails from response
    var thumbIncrement = Math.max(Math.round(_thumbnailIndex.length / THUMBNAILS_PRELOAD_COUNT), INCREMENT_THRESHOLD);

    return _thumbnailIndex.filter(function (value, index, array) {
      if (index % thumbIncrement === 0) return true;
      return false;
    });
  },

  preloadThumbnails: function preloadThumbnails() {
    var thumbs = this.getThumbnailsForPreload();
    thumbs.forEach(function (thumb, index, array) {
      setTimeout(function () {
        var t = document.createElement("img");
        t.setAttribute("src", thumb.tn);
        // Hold thumbnail reference in cache
        // so GC doesn't drop the loaded asset
        _thumbnailCache.push(t);
      });
    });
  },

  // Same logic used in PubnubStore's binary search
  binaryThumbnailSearch: function binaryThumbnailSearch(list, compareFn) {
    var min = 0;
    var max = list.length - 1;
    var guess = undefined;
    var result = undefined;
    var perfectMatch = undefined;

    // Loop until min and max meet
    while (min <= max) {
      // Half way between min and max
      guess = Math.floor((min + max) / 2);
      result = compareFn(list[guess]);

      // If there was a previous perfectMatch and this guess is not one
      // return the perfectMatch
      if (perfectMatch !== undefined && result !== 0) {
        return perfectMatch;
      } // If compareFn returned greater than 0 we move min
      // Example:
      //   target = 7
      //   list = 2 3 |5| 8 9
      //   7 > 5 (so 5 can become the new min)
      if (result >= 0) {
        min = guess + 1;
      } else {
        max = guess - 1;
      }

      if (result === 0) perfectMatch = guess;
    }

    // If our final guess was a perfect match OR
    // result was greater than 0 (our guess is the answer)
    if (perfectMatch !== undefined || result > 0) {
      return guess;
    } // If our guess is greater than target we don't want
    // to include it so move down one
    return guess - 1;
  },

  requestData: function requestData() {
    var broadcastId = BroadcastStore.getBroadcastId();
    if (broadcastId) {
      var requestConfig = {
        url: Constants.ApiEndpoints.HOSTNAME + Constants.ApiEndpoints.THUMBNAIL_PLAYLIST,
        query: assign(Utils.getSessionSecretParam(), Utils.getBroadcastParam(broadcastId))
      };
      ApiRequest.get(requestConfig).then(function (response) {
        Actions.thumbnailHistoryReceived(response.body);
      }, function (error) {});
    }
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

ThumbnailStore.dispatchToken = Dispatcher.register(function (payload) {
  var action = payload.action;

  switch (action.type) {
    case Constants.ActionTypes.THUMBNAILS_RECEIVED:
      _thumbs = action.data;
      _thumbnailIndex = ThumbnailStore.buildThumbnailIndex();
      ThumbnailStore.preloadThumbnails();
      break;
  }
});

module.exports = ThumbnailStore;
