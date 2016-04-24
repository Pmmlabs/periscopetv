"use strict";

var Debugging = require("./Debugging");

// Load and use polyfill for ECMA-402.
if (!global.Intl) {
  global.Intl = require("intl");
}

global.ReactIntl = require("react-intl");
window.ReactIntl = global.ReactIntl;

require("react-intl/dist/locale-data/en.js");
var defaultIntlData = require("../translations/en");

var __getIntlMessage = ReactIntl.getIntlMessage;
ReactIntl.getIntlMessage = function (path) {
  var message = undefined;
  try {
    message = __getIntlMessage.call(this, path);
  } catch (e) {
    message = path.split(".").reduce(function (obj, pathPart) {
      return obj[pathPart];
    }, defaultIntlData.messages);
  } finally {
    if (message === undefined) {
      // Make sure we don't crash the App
      message = "";
      Debugging.trackException(new ReferenceError("Could not find Intl message: " + path));
    }
  }
  return message;
};

var intlData = undefined;
if (window.locale) {
  intlData = window.locale();
} else {
  intlData = defaultIntlData;
}

module.exports = intlData;
