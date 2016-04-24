"use strict";

var React = require("react");
var PlayerHelper = require("../mixins/PlayerHelper");
var PlaybackUI = require("../mixins/PlaybackUI");

var PlaybackControls = React.createClass({
  displayName: "PlaybackControls",

  mixins: [PlayerHelper, PlaybackUI],

  render: function render() {
    var classes = ["PlaybackControls"].concat(this.buildStateClasses());

    return React.createElement(
      "div",
      { className: classes.join(" "), onClick: this.togglePlayback },
      React.createElement("div", { className: "PlaybackControls-pause", dangerouslySetInnerHTML: { __html: this.getPauseIcon() } }),
      React.createElement("div", { className: "PlaybackControls-play", dangerouslySetInnerHTML: { __html: this.getPlayIcon() } })
    );
  }
});

module.exports = PlaybackControls;
