"use strict";

var React = require("react");

var BroadcastLocation = React.createClass({
  displayName: "BroadcastLocation",

  /**
   * Filter out any location fields that are absent or empty
   * and generate location string on which remain
   */
  generateLocationLabel: function generateLocationLabel() {
    var locationString = [this.props.broadcast.city, this.props.broadcast.country_state, this.props.broadcast.country].filter(function (field) {
      return !!field && field !== "";
    }).join(", ");

    if (locationString.length) {
      return React.createElement(
        "div",
        { className: "BroadcastLocation" },
        locationString
      );
    } else {
      return React.createElement("div", null);
    }
  },

  render: function render() {
    return this.generateLocationLabel();
  }
});

module.exports = BroadcastLocation;
