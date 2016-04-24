"use strict";

var React = require("react");

var IntlMixin = ReactIntl.IntlMixin;

var Constants = require("../constants/Constants");
var Debugging = require("../utils/Debugging");
var Actions = require("../actions/Actions");

var GetAppCTA = React.createClass({
  displayName: "GetAppCTA",

  mixins: [IntlMixin],

  openGetAppCta: function openGetAppCta(platform) {
    Actions.openModal(Constants.ModalTypes.GET_APP);
    Debugging.track("click-getAppCTA", {
      location: this.props.location
    });
  },

  render: function render() {
    return React.createElement(
      "div",
      { className: "GetAppCTA" },
      React.createElement(
        "div",
        { className: "AppLink AppLink--cta",
          onClick: this.openGetAppCta },
        this.getIntlMessage("app.GET")
      )
    );
  }
});

module.exports = GetAppCTA;
