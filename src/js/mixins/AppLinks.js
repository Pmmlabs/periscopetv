"use strict";

var Utils = require("../utils/utils");
var Constants = require("../constants/Constants");

var AppLinks = {
  getAppStoreLink: function getAppStoreLink() {
    if (Utils.is.ios()) {
      return Constants.PeriscopeLinks.APP_STORE;
    }if (Utils.is.android()) {
      return Constants.PeriscopeLinks.PLAY_STORE;
    }return "#";
  },

  getInAppLink: function getInAppLink() {
    if (Utils.is.ios()) {
      return Constants.PeriscopeLinks.BROADCAST_IN_APP;
    }if (Utils.is.android()) {
      return Constants.PeriscopeLinks.ANDROID_IN_APP;
    }return "#";
  }
};

module.exports = AppLinks;
