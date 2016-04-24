"use strict";

var React = require("react");
var IntlMixin = ReactIntl.IntlMixin;

var Actions = require("../actions/Actions");
var InitForCinema = require("../mixins/InitForCinema");
var Constants = require("../constants/Constants");

var BroadcastNextButton = React.createClass({
  displayName: "BroadcastNextButton",

  mixins: [IntlMixin, InitForCinema],

  componentDidMount: function componentDidMount() {
    window.addEventListener("keydown", this.nextBroadcastByKeyPress);
  },

  componentWillUnmount: function componentWillUnmount() {
    window.removeEventListener("keydown", this.nextBroadcastByKeyPress);
  },

  nextBroadcastByKeyPress: function nextBroadcastByKeyPress(event) {
    // Right arrow key pressed
    if (event.keyCode === Constants.Keycodes.RIGHT_ARROW) {
      this.nextBroadcast();
    }
  },

  nextBroadcast: function nextBroadcast(event) {
    Actions.nextBroadcast();
  },

  render: function render() {
    var styleClasses = ["BroadcastNextButton", "u-transition-1"];

    if (this._isCinemaPlayer()) {
      styleClasses.push("u-opacity-0", "u-pointer-events-none");
    }

    return React.createElement(
      "div",
      { className: styleClasses.join(" "), onClick: this.nextBroadcast },
      React.createElement("div", { className: "BroadcastNextButton-arrow" }),
      React.createElement(
        "div",
        { className: "BroadcastNextButton-label" },
        this.getIntlMessage("broadcast.controls.NEXT_BROADCAST")
      )
    );
  }
});

module.exports = BroadcastNextButton;
