"use strict";

var React = require("react");
var PlayerHelper = require("../mixins/PlayerHelper");
var Actions = require("../actions/Actions");

var TwitterPlayButton = React.createClass({
  displayName: "TwitterPlayButton",

  mixins: [PlayerHelper],

  render: function render() {
    var classes = ["TwitterPlayButton"];
    if (!this._isStopped() || this._isUnknownMode()) {
      classes.push("TwitterPlayButton--hidden");
    }
    if (this._isLiveMode()) {
      classes.push("TwitterPlayButton--isLive");
    }
    if (this._isReplayMode()) {
      classes.push("TwitterPlayButton--isReplay");
    }

    return React.createElement(
      "a",
      { className: classes.join(" "), href: "#", onClick: Actions.startPlaying },
      React.createElement("div", { className: "TwitterPlayButton-liveButton" }),
      React.createElement("div", { className: "TwitterPlayButton-replayButton" })
    );
  }
});

module.exports = TwitterPlayButton;
