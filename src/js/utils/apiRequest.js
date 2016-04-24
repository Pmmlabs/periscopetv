"use strict";

var request = require("superagent");

var Actions = require("../actions/Actions");
var Constants = require("../constants/Constants");

var ApiRequest = {
  get: function get() {
    var params = arguments[0] === undefined ? {} : arguments[0];
    var enabled = arguments[1] === undefined ? true : arguments[1];

    return new Promise(function (resolve, reject) {
      if (!enabled) reject();
      request.get(params.url)
      // DO NOT REMOVE withCredentials()
      // Cookies are critical for authorizing requests
      // and stats logging
      .withCredentials().query(params.query).end(function (error, response) {
        error ? reject(error) : resolve(response);
      });
    });
  },

  post: function post() {
    var params = arguments[0] === undefined ? {} : arguments[0];
    var enabled = arguments[1] === undefined ? true : arguments[1];

    return new Promise(function (resolve, reject) {
      if (!enabled) reject();
      request.post(params.url)
      // DO NOT REMOVE withCredentials()
      // Cookies are critical for authorizing requests
      // and stats logging
      .withCredentials().send(params.query).end(function (error, response) {
        error ? reject(error) : resolve(response);
      });
    });
  },

  handleEndpointResponse: function handleEndpointResponse(endpoint, videoAction, broadcastAction) {
    endpoint === Constants.ApiEndpointTypes.VIDEO ? videoAction() : broadcastAction();
  },

  hasErrorFor: function hasErrorFor(apiStatus) {
    var endpoint = arguments[1] === undefined ? "" : arguments[1];

    var statusType = apiStatus / 100 | 0;
    switch (statusType) {
      case 5:
        this.handleEndpointResponse(endpoint, Actions.apiVideoResourceUnavailable, Actions.apiServerError);
        return true;
      case 4:
        if (apiStatus === "410") {
          this.handleEndpointResponse(endpoint, Actions.apiBroadcastEnded, Actions.apiBroadcastExpired);
        } else {
          this.handleEndpointResponse(endpoint, Actions.apiVideoResourceUnavailable, Actions.apiBroadcastNotFound);
        }
        return true;
      case 2:
      default:
        return false;
    }
  }
};

module.exports = ApiRequest;
