"use strict";

var React = require("react");
var Utils = require("../../utils/utils");

var Constants = require("../../constants/Constants");
var Debugging = require("../../utils/Debugging");

var Modal = React.createClass({
  displayName: "Modal",

  propTypes: {
    location: React.PropTypes.string.isRequired,
    className: React.PropTypes.string,
    isVisible: React.PropTypes.bool,
    onDismiss: React.PropTypes.func
  },

  getDefaultProps: function getDefaultProps() {
    return {
      className: "",
      isVisible: false
    };
  },

  trackEvent: function trackEvent(eventName, eventSource) {
    Debugging.track(eventName, {
      location: this.props.location,
      eventSource: eventSource
    });
  },

  componentDidMount: function componentDidMount() {
    window.addEventListener("keydown", this.dismissByKeypress);
  },

  componentDidUnmount: function componentDidUnmount() {
    window.removeEventListener("keydown", this.dismissByKeypress);
  },

  dismissByKeypress: function dismissByKeypress(event) {
    // Esc key pressed while modal is visible
    if (event.keyCode === Constants.Keycodes.ESC && this.props.isVisible) {
      this.dismiss();
      this.trackEvent("modal-close", "keypress-esc");
    }
  },

  dismissByClick: function dismissByClick(element) {
    this.dismiss();
    this.trackEvent("modal-close", element);
  },

  dismiss: function dismiss() {
    if (this.props.onDismiss && typeof this.props.onDismiss === "function") this.props.onDismiss();
  },

  render: function render() {
    var hiddenStateClass = "Modal--hidden";
    var visibleStateClass = "Modal--visible";
    var classes = ["Modal", "u-fullHeight", "u-flexParent"];

    if (this.props.isVisible) {
      Utils.removeFromArray(hiddenStateClass, classes);
      classes.push(visibleStateClass);
    } else {
      Utils.removeFromArray(visibleStateClass, classes);
      classes.push(hiddenStateClass);
    }

    return React.createElement(
      "div",
      { className: classes.join(" ") },
      React.createElement(
        "div",
        { className: "" + this.props.className + " Modal-content u-flexItem" },
        this.props.children,
        React.createElement("div", { className: "Modal-dismiss", onClick: this.dismissByClick.bind(this, "modal-button") })
      ),
      React.createElement("div", { className: "Modal-background", onClick: this.dismissByClick.bind(this, "modal-background") })
    );
  }
});

module.exports = Modal;
