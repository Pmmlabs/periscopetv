"use strict";

var React = require("react");
var Router = require("../router");

var PlayerHelper = require("../mixins/PlayerHelper.js");
var BroadcastHelper = require("../mixins/BroadcastHelper.js");
var IntlMixin = ReactIntl.IntlMixin;
var Debugging = require("../utils/Debugging");

var TwitterLogo = require("./icons/TwitterLogo.jsx");

var TWEET_LENGTH = 140;
// Length buffer for spaces and ellipses between words
var TWEET_LENGTH_BUFFER = 3;

var ShareBroadcastButton = React.createClass({
  displayName: "ShareBroadcastButton",

  mixins: [IntlMixin, PlayerHelper, BroadcastHelper],

  getDefaultProps: function getDefaultProps() {
    return {
      location: "VideoOverlay",
      broadcast: null,
      title: ""
    };
  },

  trackClick: function trackClick() {
    Debugging.track("share-on-twitter", {
      location: this.props.location
    });
  },

  truncateTitle: function truncateTitle(title, length) {
    if (title.length > length) {
      return "" + title.substring(0, length) + "â€¦";
    } else {
      return title;
    }
  },

  getIntentText: function getIntentText() {
    var text = this._isRunning() ? this.getIntlMessage("share.tweet.LIVE_BROADCAST") : this.getIntlMessage("share.tweet.ENDED_BROADCAST");

    if (this.props.broadcast.twitter_username && this.props.broadcast.twitter_username !== "") {
      text = ".@" + this.props.broadcast.twitter_username + " " + text;
    }

    var url = Router.generateBroadcastUrl({ id: this.props.broadcast.id });
    var availableSpace = TWEET_LENGTH - text.length - TWEET_LENGTH_BUFFER - url.length;
    var title = this.truncateTitle(this.props.title, availableSpace);

    return "" + text + " " + title + " " + url;
  },

  getIntentUrl: function getIntentUrl() {
    var text = encodeURIComponent(this.getIntentText());
    return "https://twitter.com/intent/tweet?text=" + text;
  },

  getTitle: function getTitle() {
    return this.getIntlMessage("share.button.LINK_TITLE");
  },

  render: function render() {
    return React.createElement(
      "a",
      { href: this.getIntentUrl(),
        className: "ShareBroadcastButton",
        title: this.getTitle(),
        onClick: this.trackClick },
      this.props.title,
      React.createElement(TwitterLogo, null)
    );
  }
});

module.exports = ShareBroadcastButton;
