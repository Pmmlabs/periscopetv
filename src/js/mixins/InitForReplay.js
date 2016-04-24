"use strict";

var ReplayStore = require("../stores/ReplayStore");

var InitForReplay = {
  getInitialState: function getInitialState() {
    return this.getReplayData();
  },
  componentDidMount: function componentDidMount() {
    ReplayStore.addChangeListener(this.onChange);
  },
  componentWillUnmount: function componentWillUnmount() {
    ReplayStore.removeChangeListener(this.onChange);
  },
  onChange: function onChange() {
    this.setState(this.getReplayData());
  },
  getReplayData: function getReplayData() {
    return ReplayStore.getReplay();
  }
};

module.exports = InitForReplay;
