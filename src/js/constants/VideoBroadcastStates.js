"use strict";

var VideoBroadcastStates = {
  // Strings match BroadcastState/"state" API enum response
  ENDED: "ENDED",
  NOT_STARTED: "NOT_STARTED",
  RUNNING: "RUNNING",
  TIMED_OUT: "TIMED_OUT",

  // States used locally
  NOT_FOUND: "NOT_FOUND",
  EXPIRED: "EXPIRED"
};

module.exports = VideoBroadcastStates;
