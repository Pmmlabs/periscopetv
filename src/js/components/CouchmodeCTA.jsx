"use strict";

var React = require("react");
var IntlMixin = ReactIntl.IntlMixin;

var CouchmodeCTA = React.createClass({
  displayName: "CouchmodeCTA",

  mixins: [IntlMixin],

  render: function render() {
    return React.createElement(
      "div",
      { className: "CouchmodeCTA" },
      React.createElement(
        "div",
        { className: "CouchmodeCTA-prompt" },
        this.getIntlMessage("broadcast.cta.EMPTY_PROMPT")
      ),
      React.createElement(
        "a",
        { href: "/couchmode", className: "CouchmodeCTA-button" },
        this.getIntlMessage("broadcast.cta.EMPTY_CTA")
      )
    );
  }
});

module.exports = CouchmodeCTA;
