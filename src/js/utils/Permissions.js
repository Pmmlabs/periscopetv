"use strict";

var Constants = require("../constants/Constants");

var Permissions = {
  isEnabled: function (feature) {
    return Constants.Features.indexOf(feature) >= 0;
  },
  isDisabled: function (feature) {
    return Constants.Features.indexOf(feature) === -1;
  }
};

module.exports = Permissions;
