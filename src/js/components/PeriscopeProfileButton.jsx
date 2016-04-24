"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require("react");
var ProfileLink = require("./ProfileLink.jsx");

var IntlMixin = ReactIntl.IntlMixin;

var PeriscopeProfileButton = React.createClass({
  displayName: "PeriscopeProfileButton",

  mixins: [IntlMixin],

  propTypes: {
    user: React.PropTypes.object.isRequired
  },

  generateButton: function generateButton() {
    if (this.props.user && this.props.user.username && this.props.user.username !== "") {

      return React.createElement(
        "div",
        { className: "PeriscopeProfileButton" },
        React.createElement(
          ProfileLink,
          _extends({}, this.props, { useModal: false, location: "PeriscopeProfileButton", profileIsVisible: true }),
          this.getIntlMessage("user.PROFILE_LINK")
        )
      );
    }
  },

  render: function render() {
    return React.createElement(
      "div",
      null,
      this.generateButton()
    );
  }
});

module.exports = PeriscopeProfileButton;
