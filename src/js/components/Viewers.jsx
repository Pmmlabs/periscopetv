"use strict";

var React = require("react");
var IntlMixin = ReactIntl.IntlMixin;

var ViewerStore = require("../stores/ViewerStore");
var Utils = require("../utils/utils");

var Viewers = React.createClass({
  displayName: "Viewers",

  mixins: [IntlMixin],

  getDefaultProps: function getDefaultProps() {
    return {
      useSmallIcon: false,
      includeIcon: true,
      count: 0
    };
  },

  getCountWithText: function getCountWithText() {
    return this.formatMessage(this.getIntlMessage("viewers.COUNT_LABEL"), { viewerCount: this.props.count });
  },

  determineLabel: function determineLabel() {
    if (this.props.includeIcon) {
      return React.createElement(ReactIntl.FormattedNumber, { value: this.props.count });
    } else {
      return React.createElement(
        "span",
        null,
        this.getCountWithText()
      );
    }
  },

  render: function render() {
    var classes = ["Viewers"];
    if (this.props.useSmallIcon) {
      classes.push("Viewers--small");
    }

    if (!this.props.includeIcon) {
      classes.push("Viewers--noIcon");
    }

    return React.createElement(
      "div",
      { className: classes.join(" "), title: this.getCountWithText() },
      this.determineLabel()
    );
  }
});

module.exports = Viewers;
