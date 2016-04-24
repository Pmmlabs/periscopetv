"use strict";

var React = require("react");

var IntlMixin = ReactIntl.IntlMixin;
var Utils = require("../utils/utils");
var VideoPlayerStore = require("../stores/VideoPlayerStore");
var Debugging = require("../utils/Debugging");
var FlashMixin = require("../mixins/Flash");

var FlashOverlay = React.createClass({
  displayName: "FlashOverlay",

  mixins: [IntlMixin, FlashMixin],

  componentDidMount: function componentDidMount() {
    VideoPlayerStore.addPlaybackUnavailableListener(this.forceUpdate);
  },

  componentDidUnmount: function componentDidUnmount() {
    VideoPlayerStore.removePlaybackUnavailableListener(this.forceUpdate);
  },

  render: function render() {
    var classes = ["FlashOverlay"];

    return React.createElement(
      "div",
      { className: "FlashOverlay" },
      React.createElement("img", { className: "FlashOverlay-logo", src: "/v/images/flash_logo.svg" }),
      React.createElement(
        "div",
        { className: "FlashOverlay-message" },
        this.getFlashMessage()
      ),
      React.createElement(
        "div",
        { className: "FlashOverlay-cta" },
        this.getFlashCTA()
      )
    );
  }
});

module.exports = FlashOverlay;
