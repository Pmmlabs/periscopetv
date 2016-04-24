"use strict";

var React = require("react");

var Map = React.createClass({
  displayName: "Map",

  render: function render() {
    return React.createElement(
      "div",
      { className: "Map" },
      this.props.children,
      React.createElement("div", { className: "Map-map" })
    );
  }
});

module.exports = Map;
