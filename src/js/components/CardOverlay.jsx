"use strict";

var React = require("react");

// Required for unit test to provide access
// to child context and i18n methods
var IntlMixin = ReactIntl.IntlMixin;
var PlayerHelper = require("../mixins/PlayerHelper");
var InitForReplay = require("../mixins/InitForReplay");
var BroadcastStore = require("../stores/BroadcastStore");
var ProfileStore = require("../stores/ProfileStore");
var Router = require("../router");
var Actions = require("../actions/Actions");
var LoadingOverlay = require("./LoadingOverlay.jsx");
var CardHeader = require("./CardHeader.jsx");
var CardFooter = require("./CardFooter.jsx");

var CardOverlay = React.createClass({
  displayName: "CardOverlay",

  mixins: [InitForReplay, IntlMixin, PlayerHelper],

  getInitialState: function getInitialState() {
    return this.buildState();
  },

  buildState: function buildState() {
    var externalLink = Router.generateBroadcastUrl({
      id: BroadcastStore.getBroadcastId(),
      username: ProfileStore.getProfileUsername() });
    return { externalLink: externalLink };
  },

  componentDidMount: function componentDidMount() {
    ProfileStore.addChangeListener(this.updateExternalLink);
    BroadcastStore.addChangeListener(this.updateExternalLink);
  },

  componentWillUnmount: function componentWillUnmount() {
    ProfileStore.removeChangeListener(this.updateExternalLink);
    BroadcastStore.removeChangeListener(this.updateExternalLink);
  },

  updateExternalLink: function updateExternalLink() {
    this.setState(this.buildState());
  },

  getLinkClickHandler: function getLinkClickHandler() {
    var _this = this;

    if (this._isLiveMode()) {
      return function () {
        Actions.externalLinkOpened(_this.state.externalLink);
        Actions.audioOff();
      };
    } else {
      return function () {
        Actions.externalLinkOpened(_this.state.externalLink);
        Actions.pauseVideo();
      };
    }
  },

  render: function render() {
    return React.createElement(
      "div",
      { className: "CardOverlay" },
      React.createElement("div", { className: "CardOverlay-alpha" }),
      React.createElement(LoadingOverlay, { player: this.props.player, replay: this.state.replay }),
      React.createElement(
        "a",
        { className: "CardOverlay-link", href: this.state.externalLink, onClick: this.getLinkClickHandler(), target: "_blank" },
        React.createElement(CardHeader, { includeCTA: true })
      ),
      React.createElement(CardFooter, { player: this.props.player, broadcast: this.props.broadcast })
    );
  }
});

module.exports = CardOverlay;
