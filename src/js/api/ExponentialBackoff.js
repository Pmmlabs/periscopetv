"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var ApiRequest = require("../utils/apiRequest");
var Debugging = require("../utils/Debugging");

var ExponentialBackoff = (function () {
  function ExponentialBackoff(getRequestObject) {
    var method = arguments[1] === undefined ? "GET" : arguments[1];

    _classCallCheck(this, ExponentialBackoff);

    this.MAX_ATTEMPTS = 5;

    this.getRequestObject = getRequestObject;
    this.method = method;
  }

  _createClass(ExponentialBackoff, {
    backoff: {

      // Initiate a backoff
      // Returns a promise

      value: function backoff() {
        this.attempts = 0;
        return this.request();
      }
    },
    request: {

      // Make the request
      // Returns a promise

      value: function request() {
        var Debugging = require("../utils/Debugging");
        Debugging.log("REQUESTING EXPO_BACKOFF::" + this.getRequestObject().url);

        if (this.method === "GET") {
          return this.wait(ApiRequest.get(this.getRequestObject()));
        } else if (this.method === "POST") {
          return this.wait(ApiRequest.post(this.getRequestObject()));
        } else {
          throw new Error("Unknown method type in EXPO Backoff");
        }
      }
    },
    wait: {

      // Wait for the response and retry if needed
      // Returns a promise

      value: function wait(requestPromise) {
        var _this = this;

        return new Promise(function (resolve, reject) {
          var Debugging = require("../utils/Debugging");
          var handleError = function (err) {
            Debugging.log("ERROR EXPO_BACKOFF::" + _this.getRequestObject().url);
            reject(err);

            if (_this.attempts < _this.MAX_ATTEMPTS) {
              // Keep trying the request in a delayed fashion
              _this.attempts++;
              setTimeout(function () {
                _this.request.call(_this);
              }, 500 * _this.attempts);
            } else {
              Debugging.warn("We have reached the end of our EXPO backoff with no success");
            }
          };

          requestPromise.then(function (response) {
            var responseBody = response.body;
            if (responseBody.success === false) {
              var errMessage = responseBody.msg ? responseBody.msg : "No message provided";
              return handleError(errMessage);
            }
            Debugging.log("SUCCESS EXPO_BACKOFF::" + _this.getRequestObject().url);

            resolve(response);
          }, handleError);
        });
      }
    }
  });

  return ExponentialBackoff;
})();

;

module.exports = ExponentialBackoff;
