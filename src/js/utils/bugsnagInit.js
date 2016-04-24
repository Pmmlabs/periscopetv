"use strict";

var Debugging = require("../utils/Debugging");

try {
  Bugsnag.apiKey = "8612ed3ae38fa519518370e99ba6003e";
  Bugsnag.releaseStage = Debugging._getEnv();
  Bugsnag.notifyReleaseStages = [];

  if (Debugging._isApp()) {
    if (Debugging._isDev() || Debugging._isProd()) {
      // Enable bugsnag notify
      Bugsnag.notifyReleaseStages = [Debugging._getEnv()];
    }
  }
} catch (ex) {}

module.exports = window;

// Bugsnag was blocked, do nothing
