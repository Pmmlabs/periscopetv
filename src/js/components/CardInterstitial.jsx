"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require("react");

var InitForReplay = require("../mixins/InitForReplay");
var PlayerHelper = require("../mixins/PlayerHelper");
var Utils = require("../utils/utils");

var VideoInterstitial = require("./VideoInterstitial.jsx");
var BroadcastBackground = require("./BroadcastBackground.jsx");
var ViewerBadge = require("./ViewerBadge.jsx");
var TwitterPlayButton = require("./TwitterPlayButton.jsx");
var CardHeader = require("./CardHeader.jsx");
var LoadingOverlay = require("./LoadingOverlay.jsx");

var CardInterstitial = React.createClass({
  displayName: "CardInterstitial",

  mixins: [InitForReplay, PlayerHelper],

  render: function render() {
    return React.createElement(
      VideoInterstitial,
      _extends({ baseClass: "CardInterstitial" }, this.props),
      React.createElement(BroadcastBackground, {
        broadcast: this.props.broadcast,
        player: this.props.player,
        width: this.props.width,
        height: this.props.height,
        shouldBlur: false }),
      React.createElement(LoadingOverlay, { player: this.props.player, replay: this.state.replay }),
      React.createElement(CardHeader, null),
      React.createElement(ViewerBadge, { isLive: this._isLiveMode(), hidden: this._isUnknownMode(), isConjoined: true, includeEndedLabel: true }),
      React.createElement(TwitterPlayButton, { player: this.props.player, broadcast: this.props.broadcast })
    );
  }
});

module.exports = CardInterstitial;
