"use strict";

var React = require("react");
var Utils = require("../utils/utils");

var InitForBroadcast = require("../mixins/InitForBroadcast");
var PlayerHelper = require("../mixins/PlayerHelper");

var Header = require("./Header.jsx");
var BroadcastNextButton = require("./BroadcastNextButton.jsx");
var VideoPlayer = require("./VideoPlayer.jsx");

var ProfileModal = require("./modals/ProfileModal.jsx");
var AppLinkModal = require("./modals/AppLinkModal.jsx");
var GetAppModal = require("./modals/GetAppModal.jsx");

var BroadcastFeed = React.createClass({
  displayName: "BroadcastFeed",

  mixins: [InitForBroadcast, PlayerHelper],

  possiblyIncludeNextBroadcastButton: function possiblyIncludeNextBroadcastButton() {
    if (Utils.shouldUseMobileLayout() || !this._appModeIs("COUCH")) {
      return;
    }return React.createElement(BroadcastNextButton, null);
  },

  possiblyIncludeMobileCTAModal: function possiblyIncludeMobileCTAModal() {
    if (!Utils.shouldUseMobileLayout()) {
      return;
    }return React.createElement(AppLinkModal, null);
  },

  render: function render() {
    return React.createElement(
      "div",
      { className: "BroadcastFeed u-fullHeight" },
      React.createElement(Header, { broadcast: this.state.broadcast }),
      this.possiblyIncludeNextBroadcastButton(),
      React.createElement(VideoPlayer, {
        displayMode: this.props.displayMode,
        height: this.props.height,
        width: this.props.width,
        broadcast: this.state.broadcast,
        user: this.state.user,
        profileIsVisible: this.props.profileIsVisible }),
      React.createElement(ProfileModal, null),
      React.createElement(GetAppModal, { broadcast: this.state.broadcast }),
      this.possiblyIncludeMobileCTAModal()
    );
  }
});

module.exports = BroadcastFeed;
