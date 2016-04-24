"use strict";

var React = require("react");
var IntlMixin = ReactIntl.IntlMixin;

var ProfileAuthor = require("./ProfileAuthor.jsx");
var ProfileHearts = require("./ProfileHearts.jsx");
var ProfileDescription = require("./ProfileDescription.jsx");
var ProfileTwitterAccount = require("./ProfileTwitterAccount.jsx");

var ProfileCard = React.createClass({
  displayName: "ProfileCard",

  mixins: [IntlMixin],

  shouldRenderDescription: function shouldRenderDescription() {
    return this.props.user && this.props.user.description;
  },

  shouldRenderTwitterLink: function shouldRenderTwitterLink() {
    return this.props.user && this.props.user.twitter_screen_name && this.props.user.twitter_screen_name !== "";
  },

  render: function render() {
    return React.createElement(
      "div",
      { className: "ProfileCard" },
      React.createElement(ProfileAuthor, { user: this.props.user, isLink: false, location: this.props.location }),
      React.createElement(ProfileHearts, { user: this.props.user }),
      this.shouldRenderDescription() ? React.createElement("div", { className: "ProfileCard-descriptionSpacerTop" }) : undefined,
      this.shouldRenderDescription() ? React.createElement(ProfileDescription, { user: this.props.user }) : undefined,
      this.shouldRenderTwitterLink() ? React.createElement("div", { className: "ProfileCard-twitterSpacerTop" }) : undefined,
      this.shouldRenderTwitterLink() ? React.createElement(ProfileTwitterAccount, { user: this.props.user }) : undefined,
      React.createElement("div", { className: "ProfileCard-metadataSpacerTop" }),
      React.createElement(
        "div",
        { className: "ProfileCard-metadataContainer" },
        React.createElement(
          "div",
          { className: "ProfileCard-metadata" },
          React.createElement(ReactIntl.FormattedNumber, { value: this.props.user.n_followers }),
          React.createElement(
            "label",
            null,
            this.getIntlMessage("user.FOLLOWERS")
          )
        ),
        React.createElement(
          "div",
          { className: "ProfileCard-metadata" },
          React.createElement(ReactIntl.FormattedNumber, { value: this.props.user.n_following }),
          React.createElement(
            "label",
            null,
            this.getIntlMessage("user.FOLLOWING")
          )
        )
      )
    );
  }
});

module.exports = ProfileCard;
