"use strict";

var React = require("react");

// Mixes in i18n methods and defines child context which allows for
// access to i18n data on this.props to all children
var IntlMixin = ReactIntl.IntlMixin;

var Utils = require("../utils/utils");
var Constants = require("../constants/Constants");
var App = require("./App.jsx");
var Card = require("./Card.jsx");

var Window = React.createClass({
  displayName: "Window",

  mixins: [IntlMixin],

  getInitialState: function getInitialState() {
    return this.buildState(true);
  },

  componentDidMount: function componentDidMount() {
    window.addEventListener("resize", this.throttledResize);
  },

  componentWillUnmount: function componentWillUnmount() {
    window.removeEventListener("resize", this.throttledResize);
  },

  throttledResize: function throttledResize() {
    if (!this._resizeTimeout) {
      this._resizeTimeout = setTimeout((function () {
        this._resizeTimeout = null;
        this.setState(this.buildState(true));
      }).bind(this), 30);
    }
  },

  measureDOM: function measureDOM() {
    return {
      width: window.innerWidth,
      height: window.innerHeight
    };
  },

  buildState: function buildState() {
    var takeDOMDimensions = arguments[0] === undefined ? false : arguments[0];

    var dimensions = takeDOMDimensions ? this.measureDOM() : this.state.dimensions;

    return {
      dimensions: dimensions
    };
  },

  updateState: function updateState() {
    this.setState(this.buildState());
  },

  shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState) {
    return this.state.dimensions.height !== nextState.dimensions.height || this.state.dimensions.width !== nextState.dimensions.width;
  },

  renderApp: function renderApp() {
    return React.createElement(App, { dimensions: this.state.dimensions, displayMode: Constants.DisplayModes.APP });
  },

  renderCard: function renderCard() {
    return React.createElement(Card, { dimensions: this.state.dimensions, displayMode: Constants.DisplayModes.CARD });
  },

  render: function render() {
    switch (Constants.AppSettings.displayMode) {
      case Constants.DisplayModes.CARD:
        return this.renderCard();
      case Constants.DisplayModes.APP:
      default:
        return this.renderApp();
    }
  }
});

module.exports = Window;
