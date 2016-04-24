"use strict";

var React = require("react");

var IntlMixin = ReactIntl.IntlMixin;

var SafariMessage = React.createClass({
  displayName: "SafariMessage",

  mixins: [IntlMixin],

  getDefaultProps: function getDefaultProps() {
    return {
      fromTop: false
    };
  },

  getMessageText: function getMessageText() {
    return this.getIntlMessage("broadcast.cta.BROWSER_RECOMMENDATION");
  },

  render: function render() {
    var classes = ["SafariMessage"];
    if (this.props.fromTop) {
      classes.push("SafariMessage--fromTop");
    }
    return React.createElement(
      "div",
      { className: classes.join(" ") },
      React.createElement(
        "span",
        { className: "SafariMessage-text" },
        this.getMessageText()
      )
    );
  }
});

module.exports = SafariMessage;
