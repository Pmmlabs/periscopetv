"use strict";

var React = require("react");
var IntlMixin = ReactIntl.IntlMixin;

var Form = React.createClass({
  displayName: "Form",

  mixins: [IntlMixin],

  getDefaultProps: function getDefaultProps() {
    return {
      submitLabel: "Submit",
      disabled: false
    };
  },

  render: function render() {
    return React.createElement(
      "form",
      { className: "Form" },
      this.props.children,
      React.createElement(
        "button",
        { className: "Form-button",
          disabled: this.props.disabled,
          type: "submit",
          onClick: this.props.submitFn },
        this.props.submitLabel
      )
    );
  }
});

module.exports = Form;
