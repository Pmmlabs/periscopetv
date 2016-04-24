// Sourced from https://github.com/square/react-field-kit

"use strict";

var React = require("react");
var FieldKit = require("field-kit");

var PhoneInput = React.createClass({
  displayName: "PhoneInput",

  propTypes: {
    rawValue: React.PropTypes.string,
    id: React.PropTypes.string,
    className: React.PropTypes.string,
    value: React.PropTypes.string,
    placeholder: React.PropTypes.string,
    focusedPlaceholder: React.PropTypes.string,
    unfocusedPlaceholder: React.PropTypes.string,
    onChange: React.PropTypes.func,
    didBeginEditing: React.PropTypes.func,
    didEndEditing: React.PropTypes.func,
    onBlur: React.PropTypes.func
  },

  getDefaultProps: function getDefaultProps() {
    return {
      onBlur: function () {},
      didBeginEditing: function () {},
      didEndEditing: function () {},
      id: "",
      className: ""
    };
  },

  componentDidMount: function componentDidMount() {
    this.buildFieldKitField();
    this.field.setValue(this.props.value);

    this.setUpPlaceholders();

    this.setupEvents();
  },

  buildFieldKitField: function buildFieldKitField() {
    var field = this.getField();

    if (field) {
      this.field = field;
    } else {
      var formatter = this.getFormatter();
      if (formatter) {
        this.field = new FieldKit.TextField(this.getElement(), formatter);
      } else {
        this.field = new FieldKit.TextField(this.getElement());
      }
    }

    return this.field;
  },

  setUpPlaceholders: function setUpPlaceholders() {
    if (this.props.placeholder || this.props.unfocusedPlaceholder) {
      this.field.setUnfocusedPlaceholder(this.props.placeholder || this.props.unfocusedPlaceholder);
    }

    if (this.props.focusedPlaceholder) {
      this.field.setFocusedPlaceholder(this.props.focusedPlaceholder);
    }
  },

  setupEvents: function setupEvents() {
    this.field.setDelegate({
      textFieldDidBeginEditing: this.props.didBeginEditing,
      textFieldDidEndEditing: this.props.didEndEditing,
      textDidChange: this.onChange
    });
  },

  getField: function getField() {
    // Allows subclasses to override
    return null;
  },

  getFormatter: function getFormatter() {
    return new FieldKit.PhoneFormatter();
  },

  getElement: function getElement() {
    return this.getDOMNode();
  },

  onChange: function onChange(field) {
    var _this = this;

    // Update component value
    this.props.rawValue = field.value();

    if (this.props.onChange) setTimeout(function () {
      return _this.props.onChange(field);
    });
  },

  render: function render() {
    return React.createElement("input", { type: "tel",
      className: this.props.className,
      id: this.props.id,
      onBlur: this.props.onBlur });
  }
});

module.exports = PhoneInput;
