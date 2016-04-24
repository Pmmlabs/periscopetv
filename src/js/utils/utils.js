"use strict";

var assign = require("object-assign");
var environment = require("./environment");

var vendors = ["-moz-", "-webkit-", "-o-", "-ms-", "-khtml-", ""];

var Utils = assign(environment, {
  removeFromArray: function (item, array) {
    var itemIndex = array.indexOf(item);
    if (itemIndex >= 0) array.splice(itemIndex, 1);
  },

  getBroadcastParam: function (id) {
    if (!id) return {};

    return {
      broadcast_id: id
    };
  },

  // Use for sessioner secret
  getSessionSecretParam: function () {
    return {
      session_id: require("../constants/Constants").ApiEndpoints.SESSION
    };
  },

  generateParticipantId: function (index) {
    /**
     * Subtract one from the index value to account for the
     * broadcaster and then determine index for color from there.
     */
    return (index - 1) % 13;
  },

  getParticipantColorName: function () {
    var index = arguments[0] === undefined ? -1 : arguments[0];

    var Constants = require("../constants/Constants");
    var participantColorName = index < 0 ? "default" : Constants.ParticipantColors[Utils.generateParticipantId(index)] ? Constants.ParticipantColors[Utils.generateParticipantId(index)].colorName : "default";

    return participantColorName;
  },

  getParticipantColor: function () {
    var index = arguments[0] === undefined ? -1 : arguments[0];

    var Constants = require("../constants/Constants");
    var participantColorValue = index < 0 ? Constants.ParticipantColors.filter(function (color) {
      return color.colorName === "default";
    })[0].colorValue : Constants.ParticipantColors[Utils.generateParticipantId(index)].colorValue;

    return participantColorValue;
  },

  hasReplay: function (data) {
    return data && (!!data.replay_url || !!data.card_replay_url);
  },

  toCamelCase: function (str) {
    return str.toLowerCase().replace(/(\-[a-z])/g, function ($1) {
      return $1.toUpperCase().replace("-", "");
    });
  },

  setCss3Style: function (el, prop, val) {
    for (var i = 0; i < vendors.length; i++) {
      var p = Utils.toCamelCase(vendors[i] + prop);
      if (p in el.style) el.style[p] = val;
    }
  },

  checkObjForValue: function checkObjForValue(props, state, objName, valueName) {
    var value = undefined;
    try {
      value = props[objName][valueName];
    } catch (e) {
      value = state[objName][valueName];
    }
    return value;
  },

  videoPlayerSize: function () {
    var videoPlayerEl = document.getElementsByClassName("VideoPlayer")[0];
    var width = Math.max(videoPlayerEl.clientWidth || 0);
    var height = Math.max(videoPlayerEl.clientHeight || 0);

    return { width: width, height: height };
  },

  throttle: function (func, wait) {
    var ctx = undefined,
        args = undefined,
        rtn = undefined,
        timeoutID = undefined; // caching
    var last = 0;

    return function throttled() {
      ctx = this;
      args = arguments;
      var delta = new Date() - last;
      if (!timeoutID) if (delta >= wait) call();else timeoutID = setTimeout(call, wait - delta);
      return rtn;
    };

    function call() {
      timeoutID = 0;
      last = +new Date();
      rtn = func.apply(ctx, args);
      ctx = null;
      args = null;
    }
  },

  htmlSanitize: function (string) {
    var sanitizeEl = document.createElement("div");

    if ("innerText" in sanitizeEl) {
      sanitizeEl.innerText = string;
    } else {
      sanitizeEl.textContent = string;
    }

    return sanitizeEl.innerHTML;
  },

  isThumbnailPlaylistEnabled: function () {
    var Constants = require("../constants/Constants");
    return Constants.AppSettings.displayMode === Constants.DisplayModes.APP;
  },

  shouldUseMobileLayout: function () {
    return environment.isDevice();
  } });

module.exports = Utils;
