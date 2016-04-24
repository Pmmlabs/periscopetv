"use strict";

var React = require("react");
var IntlMixin = ReactIntl.IntlMixin;
var PeriscopeLogo = require("./icons/PeriscopeLogo.jsx");

var CardHeader = React.createClass({
  displayName: "CardHeader",

  mixins: [IntlMixin],

  getDefaultProps: function getDefaultProps() {
    return {
      includeProfileCTA: false,
      includeCTA: false
    };
  },

  getCTAMessage: function getCTAMessage() {
    if (this.props.includeCTA) {
      return this.getIntlMessage("app.EXTERNAL");
    } else if (this.props.includeUserCTA) {
      return this.getIntlMessage("user.PERISCOPE_LINK");
    }
    return "";
  },

  possiblyIncludeCTA: function possiblyIncludeCTA() {
    var ctaMessage = this.getCTAMessage();
    if (!ctaMessage) {
      return;
    }return React.createElement(
      "span",
      { className: "CardHeader-cta u-pullRight" },
      ctaMessage
    );
  },

  render: function render() {
    var classes = ["CardHeader"];
    if (this.props.includeCTA || this.props.includeUserCTA) classes.push("CardHeader--isCTA");

    return React.createElement(
      "div",
      { className: classes.join(" ") },
      React.createElement(
        "span",
        { className: "CardHeader-logo u-pullRight" },
        React.createElement(PeriscopeLogo, null)
      ),
      this.possiblyIncludeCTA()
    );
  }
});

module.exports = CardHeader;
