"use strict";

var React = require("react");
var IntlMixin = ReactIntl.IntlMixin;

var Actions = require("../actions/Actions");
var Constants = require("../constants/Constants");
var Debugging = require("../utils/Debugging");

var BroadcastStateLabel = require("./BroadcastStateLabel.jsx");

var InitForViewers = require("../mixins/InitForViewers");
var PlayerHelper = require("../mixins/PlayerHelper");
var BroadcastHelper = require("../mixins/BroadcastHelper");

var refreshTimer = undefined;
var REFRESH_TICK = 5000;

var BroadcastPreview = React.createClass({
  displayName: "BroadcastPreview",

  mixins: [InitForViewers, IntlMixin, PlayerHelper, BroadcastHelper],

  getInitialState: function getInitialState() {
    return {
      thumbLoaded: false
    };
  },

  openModal: function openModal() {
    Actions.openModal(Constants.ModalTypes.APP_LINK);

    Debugging.track("modal-applink-open", {
      location: "BroadcastPreview"
    });
  },

  possiblyRenderBroadcastPreview: function possiblyRenderBroadcastPreview() {
    if (!this.props.broadcast || !this.props.broadcast.image_url) {
      return;
    }var imgContainerClasses = ["BroadcastPreview-imageWrapper"];
    if (this._isRunning()) imgContainerClasses.push("BroadcastPreview-imageWrapper--live");

    return React.createElement(
      "div",
      { className: "BroadcastPreview-imageContainer", onClick: this.openModal },
      React.createElement(
        "div",
        { className: imgContainerClasses.join(" "), "data-tag-label": this.getIntlMessage("broadcast.state_label.LIVE") },
        React.createElement("img", { className: "BroadcastPreview-image", src: this.props.broadcast.image_url, onLoad: this.thumbLoaded })
      ),
      React.createElement("span", { className: "BroadcastPreview-playIcon", dangerouslySetInnerHTML: { __html: "<svg viewBox=\"0 0 34 34\"><g stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\"><g transform=\"translate(-1370.000000, -955.000000)\" fill=\"#FFFFFF\"><polygon transform=\"translate(1387.000000, 972.000000) rotate(90.000000) translate(-1387.000000, -972.000000) \" points=\"1387 955 1404 989 1370 989 \"></polygon></g></g></svg>" } })
    );
  },

  possiblyRenderStateLabel: function possiblyRenderStateLabel() {
    if (this._isRunning()) {
      return;
    }return React.createElement(BroadcastStateLabel, { broadcast: this.props.broadcast, player: this.props.player });
  },

  getWatcherLabel: function getWatcherLabel() {
    if (!this.props.broadcast.id || this.state.viewers === 0) {
      return;
    }var intlMessage = this._isRunning() ?
    // TODO: Replace with getIntlMessage for viewers.WATCHING_LABEL
    "{viewerCount, plural,\n  =0 {No one is watching}\n  one {# person is watching}\n  other {# people are watching}\n}" : this.getIntlMessage("viewers.COUNT_LABEL");

    return this.formatMessage(intlMessage, { viewerCount: this.state.viewers });
  },

  thumbLoaded: function thumbLoaded() {
    if (this.state.thumbLoaded) {
      return;
    }this.setState({ thumbLoaded: true });
  },

  render: function render() {
    if (this._isRunning() && !refreshTimer) {
      refreshTimer = setInterval(function () {
        Actions.refreshBroadcast();
      }, REFRESH_TICK);
    }

    if (!this._isRunning() && refreshTimer) {
      clearInterval(refreshTimer);
    }

    var classes = ["BroadcastPreview"];
    if (this.state.thumbLoaded) classes.push("BroadcastPreview--withImage");

    return React.createElement(
      "div",
      { className: classes.join(" ") },
      this.possiblyRenderBroadcastPreview(),
      React.createElement(
        "p",
        { className: "BroadcastPreview-subhead" },
        this.getWatcherLabel(),
        this.possiblyRenderStateLabel()
      )
    );
  }
});

module.exports = BroadcastPreview;
