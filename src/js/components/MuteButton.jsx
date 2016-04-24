"use strict";

var React = require("react");
var Actions = require("../actions/Actions");

var MuteButton = React.createClass({
  displayName: "MuteButton",

  toggleMute: function toggleMute() {
    if (this.props.mute) {
      Actions.audioOn();
    } else {
      Actions.audioOff();
    }
  },

  render: function render() {
    var classes = ["MuteButton"];
    if (this.props.mute) {
      classes.push("MuteButton--audioOff");
    } else {
      classes.push("MuteButton--audioOn");
    }

    return React.createElement(
      "a",
      { href: "#", className: classes.join(" "), onClick: this.toggleMute },
      React.createElement("div", { className: "MuteButton-on" }),
      React.createElement("div", { className: "MuteButton-off" })
    );
  }
});

module.exports = MuteButton;
