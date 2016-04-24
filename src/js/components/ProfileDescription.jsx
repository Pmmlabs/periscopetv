"use strict";

var React = require("react");
var twitterText = require("twitter-text");
var Utils = require("../utils/utils");

var ProfileDescription = React.createClass({
  displayName: "ProfileDescription",

  linkifyDescription: function linkifyDescription() {
    return { __html: twitterText.autoLinkUrlsCustom(Utils.htmlSanitize(this.props.user.description), { targetBlank: true }) };
  },

  render: function render() {
    return React.createElement("div", { className: "ProfileDescription", dangerouslySetInnerHTML: this.linkifyDescription() });
  }
});

module.exports = ProfileDescription;
