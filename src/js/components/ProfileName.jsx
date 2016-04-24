"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require("react");
var ProfileLink = require("./ProfileLink.jsx");
var ProfileUsername = require("./ProfileUsername.jsx");
var Utils = require("../utils/utils");

var ProfileName = React.createClass({
  displayName: "ProfileName",

  propTypes: {
    user: React.PropTypes.object.isRequired,
    location: React.PropTypes.string.isRequired,
    includeUsername: React.PropTypes.bool,
    isLink: React.PropTypes.bool
  },

  getDefaultProps: function getDefaultProps() {
    return {
      isLink: true,
      includeUsername: true
    };
  },

  possiblyRenderUsername: function possiblyRenderUsername() {
    if (this.props.includeUsername) {
      return React.createElement(ProfileUsername, { user: this.props.user });
    }
  },

  render: function render() {
    var classes = ["ProfileName"];
    if (this.props.includeUsername) {
      classes.push("ProfileName--withUsername");
    }

    return React.createElement(
      ProfileLink,
      _extends({ className: classes.join(" ") }, this.props),
      Utils.htmlSanitize(this.props.user.display_name),
      this.possiblyRenderUsername()
    );
  }
});

module.exports = ProfileName;
