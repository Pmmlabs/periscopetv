"use strict";

var React = require("react");
var Constants = require("../constants/Constants");
var Utils = require("../utils/utils");
var PlayerHelper = require("../mixins/PlayerHelper");

var CLASSES = ["SeekingOverlay"];
var SEEKING_CLASS = "SeekingOverlay--isSeeking";

var SeekingOverlay = React.createClass({
  displayName: "SeekingOverlay",

  mixins: [PlayerHelper],

  render: function render() {
    if (!this._isPaused() && this.props.replay.isSeeking && CLASSES.indexOf(SEEKING_CLASS) === -1) {
      CLASSES.push(SEEKING_CLASS);
    } else {
      Utils.removeFromArray(SEEKING_CLASS, CLASSES);
    };

    return React.createElement("div", { className: CLASSES.join(" ") });
  }
});

module.exports = SeekingOverlay;
