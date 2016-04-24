"use strict";

var ViewerStore = require("../stores/ViewerStore");

var InitForViewers = {
  getInitialState: function getInitialState() {
    return this.getViewerCount();
  },

  componentDidMount: function componentDidMount() {
    ViewerStore.addChangeListener(this.onChange);
  },

  componentWillUnmount: function componentWillUnmount() {
    ViewerStore.removeChangeListener(this.onChange);
  },

  onChange: function onChange() {
    this.setState(this.getViewerCount());
  },

  getViewerCount: function getViewerCount() {
    return ViewerStore.getCount();
  }
};

module.exports = InitForViewers;
