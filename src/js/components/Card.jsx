"use strict";

var React = require("react");
var IntlMixin = ReactIntl.IntlMixin;

var InitForBroadcast = require("../mixins/InitForBroadcast");
var BroadcastHelper = require("../mixins/BroadcastHelper");
var WindowMessage = require("../api/WindowMessage");
var Utils = require("../utils/utils");
var VideoPlayer = require("./VideoPlayer.jsx");
var MissingCardBroadcast = require("./MissingCardBroadcast.jsx");

var Card = React.createClass({
  displayName: "Card",

  mixins: [IntlMixin, InitForBroadcast, BroadcastHelper],

  componentWillMount: function componentWillMount() {
    WindowMessage.init();
  },

  componentWillUnmount: function componentWillUnmount() {
    WindowMessage.deinit();
  },

  renderUnsupportedMessage: function renderUnsupportedMessage() {
    return React.createElement(
      "span",
      { className: "IEMessage" },
      this.getIntlMessage("broadcast.cta.UNSUPPORTED_IE")
    );
  },

  renderBroadcastNotFound: function renderBroadcastNotFound() {
    return React.createElement(MissingCardBroadcast, null);
  },

  renderPlayer: function renderPlayer(size) {
    return React.createElement(VideoPlayer, {
      width: size,
      height: size,
      broadcast: this.state.broadcast,
      displayMode: this.props.displayMode });
  },

  renderContent: function renderContent(size) {
    if (!Utils.isVideoCapableEnvironment()) {
      return this.renderUnsupportedMessage();
    } else if (this._isNotFound() || this._isExpired()) {
      return this.renderBroadcastNotFound();
    } else {
      return this.renderPlayer(size);
    }
  },

  render: function render() {
    var size = Math.min(this.props.dimensions.width, this.props.dimensions.height);
    var squareStyle = {
      width: size,
      height: size
    };

    return React.createElement(
      "div",
      { className: "App u-fullHeight u-flexParent" },
      React.createElement(
        "div",
        { className: "u-flexItem u-transition", style: squareStyle },
        this.renderContent(size)
      )
    );
  }
});

module.exports = Card;
