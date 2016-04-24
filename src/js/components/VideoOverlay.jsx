"use strict";

var React = require("react");
var assign = require("object-assign");

// Required for unit test to provide access
// to child context and i18n methods
var IntlMixin = ReactIntl.IntlMixin;
var PlayerHelper = require("../mixins/PlayerHelper");
var ReplayHelper = require("../mixins/ReplayHelper");
var Utils = require("../utils/utils");

var ProfileStore = require("../stores/ProfileStore");

var WithFeature = require("./WithFeature.jsx");
var InitForReplay = require("../mixins/InitForReplay");
var SeekingOverlay = require("./SeekingOverlay.jsx");
var PlaybackControlsOverlay = require("./PlaybackControlsOverlay.jsx");
var PlaybackProgress = require("./PlaybackProgress.jsx");
var PlaybackControls = require("./PlaybackControls.jsx");

var Comments = require("./Comments.jsx");
var BroadcastTitle = require("./BroadcastTitle.jsx");
var ProfileName = require("./ProfileName.jsx");
var BroadcastLocation = require("./BroadcastLocation.jsx");
var ViewerBadge = require("./ViewerBadge.jsx");
var Hearts = require("./Hearts.jsx");

var playbackAffordanceTimeout = undefined;
var PLAYBACK_AFFORDANCE_DURATION = 4000;

var VideoOverlay = React.createClass({
  displayName: "VideoOverlay",

  mixins: [InitForReplay, IntlMixin, PlayerHelper, ReplayHelper],

  shouldRenderReplayElement: function shouldRenderReplayElement() {
    return Utils.isVideoSupported() && this._replayAvailable();
  },

  possiblyRenderSeekingOverlay: function possiblyRenderSeekingOverlay() {
    if (!this.shouldRenderReplayElement()) {
      return;
    }return React.createElement(SeekingOverlay, { player: this.props.player, replay: this.state.replay });
  },

  possiblyIncludePlaybackControlsOverlay: function possiblyIncludePlaybackControlsOverlay() {
    if (!this.shouldRenderReplayElement()) {
      return;
    }return React.createElement(PlaybackControlsOverlay, { player: this.props.player, broadcast: this.props.broadcast });
  },

  possiblyIncludePlaybackProgress: function possiblyIncludePlaybackProgress() {
    if (!this.shouldRenderReplayElement()) {
      return;
    }return React.createElement(PlaybackProgress, { player: this.props.player, broadcast: this.props.broadcast });
  },

  possiblyIncludePlaybackControls: function possiblyIncludePlaybackControls() {
    if (!this.shouldRenderReplayElement()) {
      return;
    }return React.createElement(PlaybackControls, { player: this.props.player, broadcast: this.props.broadcast });
  },

  render: function render() {
    var _this = this;

    var stateClasses = ["VideoOverlay-container"];

    if (this.shouldRenderReplayElement()) {
      stateClasses.push("VideoOverlay-container--forPlayback");
      if (!playbackAffordanceTimeout) {
        stateClasses.push("VideoOverlay-container--playbackAffordance");
        playbackAffordanceTimeout = setTimeout(function () {
          Utils.removeFromArray("VideoOverlay-container--playbackAffordance", stateClasses);
          _this.forceUpdate();
        }, PLAYBACK_AFFORDANCE_DURATION);
      }
    }

    var styleClasses = ["u-transition-1", "u-opacity-" + (this.props.player.cinema ? 0 : 1)];

    return React.createElement(
      "div",
      { className: "VideoOverlay" },
      this.possiblyRenderSeekingOverlay(),
      this.possiblyIncludePlaybackControlsOverlay(),
      React.createElement(
        "div",
        { className: stateClasses.join(" ") },
        React.createElement(
          WithFeature,
          { feature: "comments" },
          React.createElement(Comments, { classNames: styleClasses })
        ),
        React.createElement(BroadcastTitle, {
          classNames: styleClasses,
          showTwitterShareButton: true,
          broadcast: this.props.broadcast
        }),
        React.createElement(
          "div",
          { className: "VideoOverlay-metadataContainer" },
          React.createElement(ProfileName, {
            ref: "username",
            user: this.props.user,
            isLink: true,
            location: "VideoOverlay",
            includeUsername: false,
            profileIsVisible: this.props.profileIsVisible }),
          React.createElement(
            "div",
            { className: "VideoOverlay-dynamicMetadata" },
            React.createElement(
              "div",
              { className: "VideoOverlay-broadcastData" },
              React.createElement(BroadcastLocation, { broadcast: this.props.broadcast }),
              React.createElement(ViewerBadge, { isLive: this._isLiveMode() })
            ),
            this.possiblyIncludePlaybackProgress()
          ),
          this.possiblyIncludePlaybackControls()
        ),
        React.createElement(Hearts, { forReplay: this._isReplayMode(), classNames: styleClasses })
      )
    );
  }
});

module.exports = VideoOverlay;
