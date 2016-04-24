"use strict";

var React = require("react");
var IntlMixin = ReactIntl.IntlMixin;
var InitForViewers = require("../mixins/InitForViewers");
var Utils = require("../utils/utils");
var Viewers = require("./Viewers.jsx");

var MODE = {
  baseClass: "ViewerBadge-mode",
  liveClass: "live",
  replayClass: "replay" };

var ViewerBadge = React.createClass({
  displayName: "ViewerBadge",

  mixins: [InitForViewers, IntlMixin],

  getDefaultProps: function getDefaultProps() {
    return {
      isLive: false,
      isHidden: false,
      isConjoined: false,
      includeEndedLabel: false
    };
  },

  hideViewerCount: function hideViewerCount() {
    return this.state.viewers === 0;
  },

  renderCountText: function renderCountText() {
    if (this.hideViewerCount()) {
      return;
    }if (this.props.isLive) {
      return React.createElement(Viewers, { useSmallIcon: this.props.isConjoined, count: this.state.viewers });
    } else {
      return React.createElement(Viewers, { includeIcon: false, count: this.state.viewers });
    }
  },

  renderMode: function renderMode() {
    var classes = [MODE.baseClass, "u-pullLeft"];

    var modeText = undefined;
    if (this.props.isLive) {
      modeText = this.getIntlMessage("broadcast.state_label.LIVE");
      classes.push(MODE.liveClass);
    } else {
      if (!this.props.includeEndedLabel) {
        return;
      }modeText = "ENDED";
      classes.push(MODE.replayClass);
    }

    return React.createElement(
      "span",
      { className: classes.join(" ") },
      modeText
    );
  },

  render: function render() {
    var classes = ["ViewerBadge"];
    if (this.props.hidden) {
      classes.push("ViewerBadge--hidden");
    }
    if (this.props.isConjoined && !this.hideViewerCount()) {
      classes.push("ViewerBadge--conjoined");
    }

    return React.createElement(
      "div",
      { className: classes.join(" ") },
      this.renderMode(),
      React.createElement(
        "div",
        { className: "ViewerBadge-count u-pullRight" },
        this.renderCountText()
      )
    );
  }
});

module.exports = ViewerBadge;
