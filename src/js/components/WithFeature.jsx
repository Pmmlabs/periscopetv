"use strict";

var React = require("react");
var Permissions = require("../utils/Permissions");

var WithFeature = React.createClass({
  displayName: "WithFeature",

  render: function render() {
    if (!Permissions.isEnabled(this.props.feature)) {
      return React.createElement("div", null);
    }return React.createElement(
      "div",
      { className: this.props.className },
      this.props.children
    );
  }
});

module.exports = WithFeature;
