"use strict";

var React = require("react");

var ProfileAvatar = require("./ProfileAvatar.jsx");
var ProfileName = require("./ProfileName.jsx");

var ProfileAuthor = React.createClass({
  displayName: "ProfileAuthor",

  propTypes: {
    user: React.PropTypes.object.isRequired,
    location: React.PropTypes.string.isRequired
  },

  hasUser: function hasUser() {
    return this.props.user && this.props.user.display_name;
  },

  possiblyRenderAuthor: function possiblyRenderAuthor() {
    if (this.hasUser()) {
      return React.createElement(
        "div",
        { className: "ProfileAuthor" },
        React.createElement(ProfileAvatar, this.props),
        React.createElement(ProfileName, this.props)
      );
    }
  },

  render: function render() {
    return React.createElement(
      "div",
      null,
      this.possiblyRenderAuthor()
    );
  }
});

module.exports = ProfileAuthor;
