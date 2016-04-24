"use strict";

var React = require("react");

var IntlMixin = ReactIntl.IntlMixin;
var Utils = require("../utils/utils");
var VideoPlayerStore = require("../stores/VideoPlayerStore");
var FlashMixin = require("../mixins/Flash");

var FlashAlertDrawer = React.createClass({
  displayName: "FlashAlertDrawer",

  mixins: [IntlMixin, FlashMixin],

  getInitialState: function getInitialState() {
    return {
      isVisible: false
    };
  },

  componentDidMount: function componentDidMount() {
    VideoPlayerStore.addPlaybackUnavailableListener(this.show);
    this.show();
  },

  componentDidUnmount: function componentDidUnmount() {
    VideoPlayerStore.removePlaybackUnavailableListener(this.show);
  },

  show: function show() {
    var _this = this;

    if (this.isMounted()) {
      // Guarantee the alert alwyas attempts to animate
      this.setState({ isVisible: false });
      setTimeout(function () {
        _this.setState({ isVisible: true });
      }, 100);
    }
  },

  hide: function hide() {
    if (this.isMounted()) {
      this.setState({ isVisible: false });
    }
  },

  render: function render() {
    var classes = ["FlashAlertDrawer"];

    if (this.state.isVisible) {
      Utils.removeFromArray("FlashAlertDrawer--hidden", classes);
      classes.push("FlashAlertDrawer--shown");
    } else {
      Utils.removeFromArray("FlashAlertDrawer--shown", classes);
      classes.push("FlashAlertDrawer--hidden");
    }

    return React.createElement(
      "div",
      { className: classes.join(" ") },
      React.createElement("img", { className: "FlashAlertDrawer-logo", src: "/v/images/flash_logo.svg" }),
      React.createElement(
        "p",
        { className: "FlashAlertDrawer-message" },
        this.getFlashMessage(),
        React.createElement(
          "span",
          { className: "FlashAlertDrawer-cta" },
          this.getFlashCTA()
        )
      ),
      React.createElement("img", { className: "FlashAlertDrawer-close", src: "/v/images/icon_close.svg", onClick: this.hide })
    );
  }
});

module.exports = FlashAlertDrawer;
