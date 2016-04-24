"use strict";

var displayMode = document.getElementById("display-mode").getAttribute("content");
var mode = document.getElementById("mode").getAttribute("content");

var AppSettings = {
  displayMode: displayMode,
  mode: mode
};

module.exports = AppSettings;
