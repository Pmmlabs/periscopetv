"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var Blur = require("react-blur");
var React = require("react");

var Constants = require("../constants/Constants");
var Utils = require("../utils/utils");
var Actions = require("../actions/Actions");

var PlayerHelper = require("../mixins/PlayerHelper");
var BroadcastHelper = require("../mixins/BroadcastHelper");
var ReplayHelper = require("../mixins/ReplayHelper");
var InitForReplay = require("../mixins/InitForReplay");

var WithFeature = require("./WithFeature.jsx");
var WithoutFeature = require("./WithoutFeature.jsx");

var VideoInterstitial = require("./VideoInterstitial.jsx");
var BroadcastBackground = require("./BroadcastBackground.jsx");
var BroadcastReplayButton = require("./BroadcastReplayButton.jsx");
var BroadcastPreview = require("./BroadcastPreview.jsx");
var BroadcastStateLabel = require("./BroadcastStateLabel.jsx");
var BroadcastTitle = require("./BroadcastTitle.jsx");
var ProfileName = require("./ProfileName.jsx");
var BroadcastCallToAction = require("./BroadcastCallToAction.jsx");
var CouchmodeCTA = require("./CouchmodeCTA.jsx");

var BroadcastDetails = React.createClass({
  displayName: "BroadcastDetails",

  mixins: [InitForReplay, PlayerHelper, BroadcastHelper, ReplayHelper],

  possiblyRenderReplayButton: function possiblyRenderReplayButton() {
    if (!Utils.isVideoSupported() || !this._replayAvailable()) {
      return;
    }return React.createElement(BroadcastReplayButton, { broadcast: this.props.broadcast, player: this.props.player });
  },

  renderBroadcastStatePreview: function renderBroadcastStatePreview() {
    if (Utils.shouldUseMobileLayout()) {
      return React.createElement(BroadcastPreview, { broadcast: this.props.broadcast, player: this.props.player });
    } else {
      return React.createElement(BroadcastStateLabel, { broadcast: this.props.broadcast, player: this.props.player });
    }
  },

  possiblyRenderBroadcastData: function possiblyRenderBroadcastData() {
    if (this._isServerError()) {
      return;
    }if (this._isNotFound()) {
      return;
    }if (this._isExpired()) {
      return;
    }return React.createElement(
      "div",
      null,
      React.createElement(BroadcastTitle, { broadcast: this.props.broadcast }),
      React.createElement(ProfileName, {
        user: this.props.user,
        location: "BroadcastDetails",
        profileIsVisible: this.props.profileIsVisible })
    );
  },

  possiblyRenderCouchmodeCTA: function possiblyRenderCouchmodeCTA() {
    if (!this._isExpired() || !Utils.isVideoSupported()) {
      return;
    }return React.createElement(CouchmodeCTA, null);
  },

  render: function render() {
    return React.createElement(
      VideoInterstitial,
      _extends({ baseClass: "BroadcastDetails" }, this.props),
      React.createElement(
        "div",
        { className: "BroadcastDetails-overlay u-flexItem" },
        this.possiblyRenderReplayButton(),
        this.renderBroadcastStatePreview(),
        this.possiblyRenderCouchmodeCTA(),
        this.possiblyRenderBroadcastData(),
        React.createElement(BroadcastCallToAction, { broadcast: this.props.broadcast, player: this.props.player })
      ),
      React.createElement(BroadcastBackground, {
        broadcast: this.props.broadcast,
        player: this.props.player,
        shouldBlur: true })
    );
  }
});

module.exports = BroadcastDetails;
