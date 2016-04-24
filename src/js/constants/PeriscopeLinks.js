"use strict";

var iosAppLinkEl = document.getElementsByName("twitter:app:url:iphone");
var iosAppLink = iosAppLinkEl.length ? iosAppLinkEl[0].getAttribute("content") : "";

var androidAppLinkEl = document.getElementsByName("twitter:app:url:googleplay");
var androidAppLink = androidAppLinkEl.length ? androidAppLinkEl[0].getAttribute("content") : "";

var broadcastInApp = document.getElementById("broadcast-in-app").getAttribute("content");
var userInApp = document.getElementById("user-in-app").getAttribute("content");

var appStoreLink = "://itunes.apple.com/us/app/id972909677?mt=8";

var PeriscopeLinks = {
  IOS_IN_APP: iosAppLink,
  ANDROID_IN_APP: androidAppLink,
  BROADCAST_IN_APP: broadcastInApp,
  USER_IN_APP: userInApp,
  APP_STORE: "itms-apps" + appStoreLink,
  APP_WEB: "https" + appStoreLink,
  PLAY_STORE: "https://play.google.com/store/apps/details?id=tv.periscope.android"
};

module.exports = PeriscopeLinks;
