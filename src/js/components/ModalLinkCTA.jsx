"use strict";

var React = require("react");
var Debugging = require("../utils/Debugging");

var ModalLinkCTA = React.createClass({
  displayName: "ModalLinkCTA",

  propTypes: {
    isFilled: React.PropTypes.bool,
    isMuted: React.PropTypes.bool,
    linkTarget: React.PropTypes.string.isRequired,
    trackStr: React.PropTypes.string,
    location: React.PropTypes.string
  },

  getDefaultProps: function getDefaultProps() {
    return {
      isFilled: false,
      isMuted: false,
      linkTarget: "#",
      trackStr: "modal-link-cta",
      location: "Modal"
    };
  },

  trackClick: function trackClick(platform) {
    Debugging.track(this.props.trackStr, {
      location: this.props.location
    });
  },

  render: function render() {
    var classes = ["ModalLinkCTA"];
    if (this.props.isFilled) classes.push("ModalLinkCTA--isFilled");
    if (this.props.isMuted) classes.push("ModalLinkCTA--isMuted");

    return React.createElement(
      "a",
      { href: this.props.linkTarget,
        className: classes.join(" "),
        onClick: this.trackClick },
      this.props.children
    );
  }
});

module.exports = ModalLinkCTA;
