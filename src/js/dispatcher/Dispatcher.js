"use strict";

var FluxDispatcher = require("flux").Dispatcher;
var Constants = require("../constants/Constants");

var PayloadSources = Constants.PayloadSources;

var Dispatcher = new FluxDispatcher();

Dispatcher.handleViewAction = function (action) {
  var payload = {
    source: PayloadSources.VIEW_ACTION,
    action: action
  };
  this.dispatch(payload);
};

Dispatcher.handleServerAction = function (action) {
  var payload = {
    source: PayloadSources.SERVER_ACTION,
    action: action
  };
  this.dispatch(payload);
};

module.exports = Dispatcher;
