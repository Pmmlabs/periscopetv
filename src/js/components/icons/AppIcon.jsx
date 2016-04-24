"use strict";

var React = require("react");
var Utils = require("./../../utils/utils");
var PeriscopeLogo = require("./PeriscopeLogo.jsx");

var variants = ["appIcon"];
if (Utils.is.android()) variants.push("appIconAndroid");

var AppIcon = React.createClass({
  displayName: "AppIcon",

  render: function render() {
    return React.createElement(PeriscopeLogo, { variants: variants });
  }
});

module.exports = AppIcon;
