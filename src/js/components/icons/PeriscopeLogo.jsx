"use strict";

var React = require("react");
var Utils = require("./../../utils/utils");

var PeriscopeLogo = React.createClass({
  displayName: "PeriscopeLogo",

  getDefaultProps: function getDefaultProps() {
    return {
      variants: []
    };
  },

  render: function render() {
    var baseClass = "PeriscopeLogo";
    var classes = [baseClass];

    if (this.props.variants.length) {
      this.props.variants.forEach(function (variant) {
        classes.push("" + baseClass + "--" + variant);
      });
    }
    return React.createElement("img", { className: classes.join(" "), src: "/v/images/largepin.svg" });
  }
});

module.exports = PeriscopeLogo;
