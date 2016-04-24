"use strict";

var React = require("react");
var IntlMixin = ReactIntl.IntlMixin;

var _require = require("../stores/EventStore");

var EventStore = _require.EventStore;

var VideoPlayerStore = require("../stores/VideoPlayerStore");
var ProfileStore = require("../stores/ProfileStore");
var Utils = require("../utils/utils");

var ProfileHearts = React.createClass({
  displayName: "ProfileHearts",

  getInitialState: function getInitialState() {
    return this.getHeartsCount();
  },
  getHeartsCount: function getHeartsCount() {
    var props = arguments[0] === undefined ? this.props : arguments[0];

    return { heartsCount: props.user.n_hearts || 1 };
  },
  componentDidMount: function componentDidMount() {
    EventStore.addHeartEventChangeListener(this.updateHearts);
  },
  componentWillUnmount: function componentWillUnmount() {
    EventStore.removeHeartEventChangeListener(this.updateHearts);
  },
  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    this.setState(this.getHeartsCount(nextProps));
  },
  isProfileUser: function isProfileUser() {
    var profileUsername = ProfileStore.getProfileUsername().toLowerCase();
    var currentUsername = this.props.user.username.toLowerCase();
    return profileUsername === currentUsername;
  },
  updateHearts: function updateHearts(data) {
    if (VideoPlayerStore.inReplayMode()) {
      return;
    }if (!this.isProfileUser()) {
      return;
    }var count = this.state.heartsCount;
    if (data && data.hearts) count += data.hearts.length;
    this.setState({ heartsCount: count });
  },
  render: function render() {
    return React.createElement(
      "div",
      { className: "ProfileHearts" },
      React.createElement("div", { className: "ProfileHearts-heart" }),
      React.createElement(ReactIntl.FormattedNumber, { value: this.state.heartsCount })
    );
  }
});

module.exports = ProfileHearts;
