"use strict";

var React = require("react");
var IntlMixin = ReactIntl.IntlMixin;

var Utils = require("../utils/utils");
var Debugging = require("../utils/Debugging");

var VideoPlayerStore = require("../stores/VideoPlayerStore");

var _require = require("../constants/Constants");

var VideoBroadcastStates = _require.VideoBroadcastStates;
var VideoPlayerStates = _require.VideoPlayerStates;

var Router = require("../router");

var BroadcastLocation = require("./BroadcastLocation.jsx");
var BroadcastTitle = require("./BroadcastTitle.jsx");

var ProfileBroadcasts = React.createClass({
  displayName: "ProfileBroadcasts",

  mixins: [IntlMixin],
  getInitialState: function getInitialState() {
    return this.getState();
  },
  componentDidMount: function componentDidMount() {
    VideoPlayerStore.addChangeListener(this.onChange);
    // Update timestamps
    this.intervalRender = setInterval(this.forceUpdate.bind(this), 90 * 1000);
  },
  componentWillUnmount: function componentWillUnmount() {
    VideoPlayerStore.removeChangeListener(this.onChange);
    clearInterval(this.intervalRender);
  },
  onChange: function onChange() {
    this.setState(this.getState());
  },
  getState: function getState() {
    return {
      activePlaying: VideoPlayerStore.getVideoPlayer().player.state === VideoPlayerStates.PLAYING
    };
  },
  generateTimeAgoEl: function generateTimeAgoEl(broadcast) {
    var time = broadcast.ended || broadcast.timedout || broadcast.ping || broadcast.start;

    return React.createElement(
      "time",
      { className: "ProfileBroadcast-detailsTime", dateTime: new Date(time) },
      React.createElement(ReactIntl.FormattedRelative, { value: time })
    );
  },
  renderNoBroadcasts: function renderNoBroadcasts() {
    return React.createElement(
      "div",
      { className: "ProfileBroadcasts-noBroadcasts" },
      "No broadcasts in the last 24 hours."
    );
  },

  trackClick: function trackClick(eventData) {
    Debugging.track("user-broadcast-click", eventData);
  },

  getFeaturedColor: function getFeaturedColor(broadcast) {
    return broadcast.featured_category_color || "FADD5F";
  },

  possiblyIncludeFeaturedContainer: function possiblyIncludeFeaturedContainer(broadcast) {
    if (!broadcast.featured || !broadcast.featured_reason) {
      return;
    }var featuredColor = "#" + this.getFeaturedColor(broadcast);

    return React.createElement(
      "div",
      { className: "ProfileBroadcast-featuredContainer" },
      React.createElement(
        "div",
        { className: "ProfileBroadcast-featuredFlag" },
        React.createElement(
          "svg",
          { width: "12px", height: "16px", viewBox: "0 0 12 16", version: "1.1", xmlns: "http://www.w3.org/2000/svg" },
          React.createElement(
            "g",
            { transform: "translate(-24.000000, -643.000000)", fill: featuredColor },
            React.createElement("path", { d: "M24,643 L36,643 L36,659 L30,654 L24,659 L24,643 Z" })
          )
        )
      ),
      React.createElement(
        "p",
        { className: "ProfileBroadcast-featuredReason" },
        broadcast.featured_reason
      )
    );
  },

  renderBroadcast: function renderBroadcast(broadcast) {
    var key = undefined,
        classes = undefined,
        thumbnailStyles = undefined,
        contextEl = undefined,
        liveEl = undefined,
        locationEl = undefined,
        contentEl = undefined;

    // Set key for component
    key = broadcast.id;

    // Set flags
    var isCondensed = this.props.isCondensed;
    var isActive = broadcast.id === this.props.active.id;
    var isLive = broadcast.state === VideoBroadcastStates.RUNNING;
    var isFeatured = broadcast.featured;
    var isUnavailable = !(broadcast.available_for_replay || isLive);
    var featuredColor = this.getFeaturedColor(broadcast);

    // Build classes and styles
    classes = ["ProfileBroadcast"];

    thumbnailStyles = { backgroundImage: "url(" + broadcast.image_url + ")" };

    if (isCondensed) classes.push("ProfileBroadcast--condensed");
    if (isActive) classes.push("ProfileBroadcast--active");
    if (isLive) classes.push("ProfileBroadcast--live");
    if (isFeatured) classes.push("ProfileBroadcast--featured");
    if (isUnavailable) classes.push("ProfileBroadcast--unavailable");

    // Build elements
    locationEl = React.createElement(BroadcastLocation, { broadcast: broadcast });

    if (isLive) {
      liveEl = React.createElement(
        "div",
        { className: "ProfileBroadcast-detailsLive" },
        this.getIntlMessage("broadcast.state_label.LIVE")
      );
    } else if (isFeatured) {
      var featuredCategory = broadcast.featured_category || this.getIntlMessage("broadcast.meta.FEATURED");

      contextEl = React.createElement(
        "div",
        {
          style: { backgroundColor: "#" + featuredColor },
          className: "ProfileBroadcast-detailsFeatured",
          title: this.getIntlMessage("broadcast.meta.FEATURED_LABEL") },
        featuredCategory
      );
    } else {
      contextEl = this.generateTimeAgoEl(broadcast);
    }

    contentEl = React.createElement(
      "div",
      { className: "ProfileBroadcast-content" },
      React.createElement(
        "div",
        { className: "ProfileBroadcast-thumbContainer", style: { borderColor: "#" + featuredColor } },
        React.createElement("div", { className: "ProfileBroadcast-thumb", style: thumbnailStyles })
      ),
      React.createElement(
        "div",
        { className: "ProfileBroadcast-detailsContainer" },
        liveEl,
        React.createElement(
          "div",
          { className: "ProfileBroadcast-detailsTitleAndTimeContainer" },
          React.createElement(BroadcastTitle, { broadcast: broadcast }),
          contextEl
        ),
        locationEl
      ),
      this.possiblyIncludeFeaturedContainer(broadcast)
    );

    // Create classes string
    classes = classes.join(" ");

    // Wrap with either div or anchor
    if (isActive && isCondensed) {
      return React.createElement(
        "div",
        { className: classes, key: key, onClick: this.props.toggle },
        contentEl
      );
    } else if (isActive || isUnavailable) {
      return React.createElement(
        "div",
        { className: classes, key: key },
        contentEl
      );
    } else {
      return React.createElement(
        "a",
        {
          href: Router.generateBroadcastUrl({ id: broadcast.id, username: this.props.user.username }),
          className: classes,
          onClick: this.trackClick.bind(this, { "user-broadcast-id": broadcast.id }),
          key: key },
        contentEl
      );
    }
  },

  render: function render() {
    return React.createElement(
      "div",
      { className: "ProfileBroadcasts" },
      this.props.broadcasts.length ? this.props.broadcasts.map(this.renderBroadcast) : this.renderNoBroadcasts()
    );
  }
});

module.exports = ProfileBroadcasts;
