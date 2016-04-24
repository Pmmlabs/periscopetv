"use strict";

var React = require("react");
var ShareBroadcastButton = require("./ShareBroadcastButton.jsx");

var IntlMixin = ReactIntl.IntlMixin;

var BroadcastTitle = React.createClass({
  displayName: "BroadcastTitle",

  mixins: [IntlMixin],

  getDefaultProps: function getDefaultProps() {
    return {
      showTwitterShareButton: false,
      broadcast: null
    };
  },

  /**
   * If a broadcast title is only whitespace or empty,
   * set title to default untitled string. Use of
   * this method requires ReactIntl.IntlMixin.
   */
  generateBroadcastTitle: function generateBroadcastTitle() {
    var broadcastTitle = this.props.broadcast && this.props.broadcast.status || "";
    if (broadcastTitle === "") {
      broadcastTitle = this.getIntlMessage("broadcast.defaults.TITLE");
    }
    return broadcastTitle;
  },

  possiblyIncludeTwitterShareButton: function possiblyIncludeTwitterShareButton() {
    if (!this.props.showTwitterShareButton || !this.props.broadcast) {
      return this.generateBroadcastTitle();
    } else {
      return React.createElement(ShareBroadcastButton, { title: this.generateBroadcastTitle(), broadcast: this.props.broadcast });
    }
  },

  render: function render() {
    var classes = ["BroadcastTitle"].concat(this.props.classNames).join(" ");
    return React.createElement(
      "div",
      { className: classes },
      this.possiblyIncludeTwitterShareButton()
    );
  }
});

module.exports = BroadcastTitle;
