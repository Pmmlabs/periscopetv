"use strict";

var React = require("react");
var Blur = require("react-blur");

var Constants = require("../constants/Constants");
var Utils = require("../utils/utils");
var Actions = require("../actions/Actions");

var PlayerHelper = require("../mixins/PlayerHelper");
var BroadcastHelper = require("../mixins/BroadcastHelper");
var InitForReplay = require("../mixins/InitForReplay");

var fadeOutTimer = undefined;
var backgroundShown = false;

var BACKGROUND = {
  baseClass: "BroadcastBackground",
  readyState: "ready",
  flexClass: "u-flexParent" };

var IMAGE = {
  baseClass: "BackgroundImage",
  dimOpacity: "u-opacity-50",
  brightOpacity: "u-opacity-90",
  transition: "u-transition-1",
  flexClass: "u-flexItem" };

var BroadcastBackground = React.createClass({
  displayName: "BroadcastBackground",

  mixins: [InitForReplay, PlayerHelper, BroadcastHelper],

  broadcastBackgroundReady: function broadcastBackgroundReady(event) {
    if (backgroundShown) {
      return;
    }backgroundShown = true;

    // Send actions on next tick to avoid dispatching during another dispatch
    setTimeout(function () {
      Actions.broadcastBackgroundReady();

      // Use thumbnail orientation to correct video rotation for mobile streams
      if (event && event.target) {
        if (event.target.width > event.target.height) {
          if (this.props.player.height > this.props.player.width) {
            Actions.renderedOrientation("270.0");
          }
        }
      }
    });
  },

  buildBackgroundClasses: function buildBackgroundClasses() {
    var backgroundClasses = [BACKGROUND.baseClass, BACKGROUND.flexClass];
    var showBackground = this.props.player.backgroundReady;

    // Hide background when video is playing
    if (this._videoHasStarted() && this._isPlayback() && Utils.is.not.mobile()) {
      showBackground = false;
    }

    if (showBackground) {
      backgroundClasses.push(BACKGROUND.readyState);
    }

    return backgroundClasses.join(" ");
  },

  buildImageClasses: function buildImageClasses() {
    var _this = this;

    var imageClasses = [IMAGE.baseClass, IMAGE.flexClass];
    var revealImage = false;

    // Reveal background image when video is finished playing
    if (!this._isPlayback() && this._isEnded() || Utils.shouldUseMobileLayout()) {
      revealImage = true;
    }

    // Reveal background image at bright opacity and transition to dimmed.
    if (revealImage) {
      if (!fadeOutTimer) {
        imageClasses.push(IMAGE.brightOpacity);
        fadeOutTimer = setTimeout(function () {
          Utils.removeFromArray(IMAGE.brightOpacity, imageClasses);
          imageClasses.push(IMAGE.dimOpacity);
          imageClasses.push(IMAGE.transition);
          _this.forceUpdate();
        });
      } else {
        imageClasses.push(IMAGE.transition);
        imageClasses.push(IMAGE.dimOpacity);
      }
    } else {
      imageClasses.push(IMAGE.brightOpacity);
    }

    // When in replay mode, we always want the background image dimmed
    if (this._isReplayMode()) {
      Utils.removeFromArray(IMAGE.brightOpacity, imageClasses);
      imageClasses.push(IMAGE.dimOpacity);
    }

    return imageClasses.join(" ");
  },

  possiblyRenderBackgroundImage: function possiblyRenderBackgroundImage() {
    var broadcastThumb = Constants.Broadcast.LOCAL_THUMB || this.props.broadcast.image_url;
    if (!broadcastThumb) {
      return;
    }if (this.props.shouldBlur) {
      return React.createElement(Blur, {
        className: this.buildImageClasses(),
        img: broadcastThumb,
        blurRadius: 80,
        onLoadFunction: this.broadcastBackgroundReady });
    } else {
      var styles = {
        backgroundSize: "cover",
        backgroundImage: "url(" + broadcastThumb + ")"
      };

      // Render hidden image to handle onLoad event, but show image
      // via background image to utilize background-size cover
      return React.createElement(
        "div",
        { className: this.buildImageClasses(), style: styles },
        React.createElement("img", { style: { display: "none" }, src: broadcastThumb, onLoad: this.broadcastBackgroundReady })
      );
    }
  },

  render: function render() {
    return React.createElement(
      "div",
      { className: this.buildBackgroundClasses() },
      this.possiblyRenderBackgroundImage()
    );
  }
});

module.exports = BroadcastBackground;
