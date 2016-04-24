"use strict";

require("../api/Pubnub");
require("../api/Chatman");
require("../stores/PubnubStore");
require("../stores/ChatmanStore");
require("../stores/BroadcastFeedStore");
require("../utils/bugsnagInit");
require("../utils/mixpanelInit");

var React = require("react");

// Mixes in i18n methods and defines child context which allows for
// access to i18n data on this.props to all children
var IntlMixin = ReactIntl.IntlMixin;

var Actions = require("../actions/Actions");

var ProfileStore = require("../stores/ProfileStore");
var BroadcastStore = require("../stores/BroadcastStore");
var VideoPlayerStore = require("../stores/VideoPlayerStore");
var Constants = require("../constants/Constants");

var ProfileSidebar = require("./ProfileSidebar.jsx");
var BroadcastFeed = require("./BroadcastFeed.jsx");
var Header = require("./Header.jsx");
var Map = require("./Map.jsx");
var ProfileAvatar = require("./ProfileAvatar.jsx");
var GetAppModal = require("./modals/GetAppModal.jsx");

var Router = require("../router");

var ProfileSidebarWidth = 390;
var BroadcastMinWidth = 720;

var App = React.createClass({
  displayName: "App",

  mixins: [IntlMixin],

  getInitialState: function getInitialState() {
    return this.buildState(true);
  },

  componentDidMount: function componentDidMount() {
    ProfileStore.addChangeListener(this.updateState);
    BroadcastStore.addChangeListener(this.updateState);
    VideoPlayerStore.addChangeListener(this.onPlayerChange);
    window.addEventListener("keydown", this.handleKeyDown);
  },

  componentWillUnmount: function componentWillUnmount() {
    ProfileStore.removeChangeListener(this.updateState);
    BroadcastStore.removeChangeListener(this.updateState);
    VideoPlayerStore.removeChangeListener(this.onPlayerChange);
    window.removeEventListener("keydown", this.handleKeyDown);
  },

  shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState) {
    return this.state.profileIsVisible !== nextState.profileIsVisible || this.state.profileOnly !== nextState.profileOnly || this.state.profileWidth !== nextState.profileWidth || this.state.broadcastWidth !== nextState.broadcastWidth || this.state.isSmall !== nextState.isSmall || this.props.dimensions.width !== nextProps.dimensions.width || this.props.dimensions.height !== nextProps.dimensions.height;
  },

  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    this.setState(this.buildState(false, nextProps));
  },

  updateState: function updateState() {
    this.setState(this.buildState(), this.updateBroadcastUrl);
  },

  buildState: function buildState() {
    var firstLoad = arguments[0] === undefined ? false : arguments[0];
    var props = arguments[1] === undefined ? this.props : arguments[1];

    var dimensions = props.dimensions;
    var isSmall = dimensions.width <= BroadcastMinWidth;
    var profileIsVisible = undefined;

    if (firstLoad && isSmall && Constants.Broadcast.REQUESTED_ID) {
      profileIsVisible = false;
      if (ProfileStore.isProfileVisible()) Actions.toggleProfile();
    } else {
      profileIsVisible = ProfileStore.isProfileVisible();
    }

    var profileWidth = isSmall ? dimensions.width : ProfileSidebarWidth;

    return {
      profileIsVisible: profileIsVisible,
      profileOnly: !ProfileStore.hasBroadcasts() && !BroadcastStore.hasId() && !this.broadcastHadError() && !this.broadcastIdRequested(),
      profileWidth: profileWidth,
      profileUnavailable: this.broadcastHadError(),
      broadcastWidth: dimensions.width - (profileIsVisible ? profileWidth : 0),
      isSmall: isSmall };
  },

  handleKeyDown: function handleKeyDown(event) {
    // Do not toggle cinema when users hide their browser
    if (event.metaKey) {
      return;
    }switch (event.keyCode) {
      case Constants.Keycodes.H:
        Actions.toggleCinema();
        break;
    }
  },

  updateBroadcastUrl: function updateBroadcastUrl() {
    var token = undefined;

    if (!this.broadcastIdRequested() && this.state.profileIsVisible) {
      try {
        token = new RegExp("(w|.[^/]+)/(.[^/]+)", "ig").exec(window.location.pathname)[2];
      } catch (e) {}
    }

    Router.replaceUrl(Router.generateBroadcastUrl({
      id: BroadcastStore.getBroadcastId() || token,
      username: this.state.profileIsVisible ? ProfileStore.getProfileUsername() : undefined,
      search: window.location.search
    }));
  },

  onPlayerChange: function onPlayerChange() {
    if (this.broadcastHadError()) {
      this.updateState();
    }

    if (this.broadcastIsActive()) {
      this.updateBroadcastUrl();
    }
  },

  broadcastIdRequested: function broadcastIdRequested() {
    return !!Constants.Broadcast.REQUESTED_ID;
  },

  broadcastIsActive: function broadcastIsActive() {
    var state = VideoPlayerStore.getVideoPlayer().player.state;
    switch (state) {
      case Constants.VideoPlayerStates.CONNECTING:
      case Constants.VideoPlayerStates.PLAYING:
      case Constants.VideoPlayerStates.PAUSED:
        return true;
    }
    return false;
  },

  broadcastHadError: function broadcastHadError() {
    var state = VideoPlayerStore.getVideoPlayer().player.state;
    switch (state) {
      case Constants.VideoPlayerStates.EXPIRED:
      // TODO: Render server error outside of broadcast/profile sidebar components
      case Constants.VideoPlayerStates.SERVER_ERROR:
        return true;
    }
    return false;
  },

  possiblyRenderMap: function possiblyRenderMap() {
    var user = ProfileStore.getProfileUser();

    if (this.state.profileOnly && !this.state.isSmall) {
      return React.createElement(
        "div",
        null,
        React.createElement(Header, null),
        React.createElement(
          Map,
          null,
          React.createElement(ProfileAvatar, { location: "", user: user, isLink: false })
        ),
        React.createElement(GetAppModal, { user: user })
      );
    }
  },

  possiblyRenderProfileSidebar: function possiblyRenderProfileSidebar() {
    if (!this.state.profileUnavailable) {
      return React.createElement(ProfileSidebar, {
        width: this.state.profileWidth,
        height: this.props.dimensions.height,
        soloState: this.state.profileOnly,
        condensed: this.state.isSmall,
        profileIsVisible: this.state.profileIsVisible });
    }
  },

  possiblyRenderBroadcastFeed: function possiblyRenderBroadcastFeed() {
    if (this.broadcastIdRequested() && this.state.profileUnavailable || !this.state.profileOnly) {
      var width = this.state.width;
      return React.createElement(BroadcastFeed, {
        displayMode: this.props.displayMode,
        width: this.state.broadcastWidth,
        height: this.props.dimensions.height,
        profileIsVisible: this.state.profileIsVisible });
    }
  },

  render: function render() {
    var classes = ["App"];

    if (!this.state.profileOnly || !this.state.isSmall && !this.state.profileIsVisible) {
      classes.push("u-fullHeight");
    }

    return React.createElement(
      "div",
      { className: classes.join(" ") },
      this.possiblyRenderMap(),
      this.possiblyRenderProfileSidebar(),
      this.possiblyRenderBroadcastFeed()
    );
  }
});

module.exports = App;
