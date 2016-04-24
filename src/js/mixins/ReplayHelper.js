"use strict";

var Utils = require("../utils/utils");
var Constants = require("../constants/Constants");

var ReplayHelper = {

  _replayAvailable: function _replayAvailable() {
    return Utils.checkObjForValue(this.props, this.state, "replay", "available");
  } };

module.exports = ReplayHelper;
