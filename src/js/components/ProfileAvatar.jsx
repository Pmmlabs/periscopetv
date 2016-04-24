"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require("react");
var ProfileLink = require("./ProfileLink.jsx");

var ProfileAvatar = React.createClass({
  displayName: "ProfileAvatar",

  propTypes: {
    user: React.PropTypes.object.isRequired,
    location: React.PropTypes.string.isRequired,
    isLink: React.PropTypes.bool
  },

  getDefaultProps: function getDefaultProps() {
    return {
      isLink: true
    };
  },

  render: function render() {
    return React.createElement(
      ProfileLink,
      _extends({ className: "ProfileAvatar" }, this.props),
      React.createElement("img", { className: "ProfileAvatar-image", src: this.props.user.avatar_url })
    );
  }
});

module.exports = ProfileAvatar;
