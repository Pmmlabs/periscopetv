"use strict";
GLOBAL.document = window.document;
GLOBAL.navigator = window.navigator;
require("es5-shim");
require("es5-shim/es5-sham");
require("es6-promise").polyfill();

global.intlData = require("./utils/i18nInit");

var React = require("react");
var Constants = require("./constants/Constants");
var Window = require("./components/Window.jsx");

React.render(React.createElement(Window, global.intlData), document.getElementById("periscope-app"));
