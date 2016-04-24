"use strict";

var BroadcastStore = require("../stores/BroadcastStore");

var InitForBroadcast = {
  getInitialState: function getInitialState() {
    return this.getBroadcastData();
  },
  componentDidMount: function componentDidMount() {
    BroadcastStore.addChangeListener(this.onChange);
  },
  componentWillUnmount: function componentWillUnmount() {
    BroadcastStore.removeChangeListener(this.onChange);
  },
  onChange: function onChange() {
    this.setState(this.getBroadcastData());
  },
  getBroadcastData: function getBroadcastData() {
    return BroadcastStore.getBroadcast();
  }
};

module.exports = InitForBroadcast;
