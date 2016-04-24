"use strict";

var Utils = require("../utils/utils");
var Constants = require("../constants/Constants");

var BroadcastHelper = {

  assertBroadcastValue: function assertBroadcastValue(objName, valueName, expectedValue) {
    var actualValue = Utils.checkObjForValue(this.props, this.state, objName, valueName);
    return actualValue === expectedValue;
  },

  _broadcastIs: function _broadcastIs(state) {
    return this.assertBroadcastValue("broadcast", "state", Constants.VideoBroadcastStates[state]);
  },

  /* *
   * Broadcast State Assertions
   */

  _isRunning: function _isRunning() {
    return this._broadcastIs("RUNNING");
  },

  _isEnded: function _isEnded() {
    return this._broadcastIs("ENDED") || this._broadcastIs("TIMED_OUT");
  },

  _isNotFound: function _isNotFound() {
    return this._broadcastIs("NOT_FOUND");
  },

  _isExpired: function _isExpired() {
    return this._broadcastIs("EXPIRED");
  }
};

module.exports = BroadcastHelper;
