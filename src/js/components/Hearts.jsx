"use strict";

var React = require("react");

var BroadcastStore = require("../stores/BroadcastStore");

var _require = require("../stores/EventStore");

var EventStore = _require.EventStore;

var Utils = require("../utils/utils");
var Constants = require("../constants/Constants");

var FEEDBACK_ITEM_CLASS = "FeedbackItem";
var THEME_PROBABILITY = 6;
var HEART_CONTAINER_WIDTH = 90;

var FeedbackTypes = {
  HEART: "heart",
  SCREENSHOT: "screenshot"
};

// TODO: Dynamically pull in SVGs based on which themes
// are eligible for the broadcast
var SVG_HEART = require("../assets/heart")();
var SVG_FRIDGE = require("../assets/fridge")();
var SVG_BALLOON = require("../assets/balloon")();
var SVG_FRAME = require("../assets/frame")();
var SVG_CUPCAKE = require("../assets/cupcake")();
var SVG_ACORN = require("../assets/acorn")();
var SVG_EARTH = require("../assets/earth")();
var SVG_SCREENSHOT = require("../assets/screenshot")();

var SVG = {
  heart: SVG_HEART,
  fridge: SVG_FRIDGE,
  balloon: SVG_BALLOON,
  acorn: SVG_ACORN,
  earth: SVG_EARTH,
  screenshot: SVG_SCREENSHOT
};

var Hearts = React.createClass({
  displayName: "Hearts",

  componentDidMount: function componentDidMount() {
    EventStore.addHeartEventChangeListener(this.onHeartEvent);
    EventStore.addFlushEventChangeListener(this.flushHearts);
  },
  componentWillUnmount: function componentWillUnmount() {
    EventStore.removeHeartEventChangeListener(this.onHeartEvent);
    EventStore.removeFlushEventChangeListener(this.flushHearts);
  },
  onHeartEvent: function onHeartEvent(data) {
    if (this.isMounted()) {
      this.appendHearts(data);
    };
  },
  generateElement: function generateElement(svg) {
    var fragment = document.createDocumentFragment();
    var body = document.createElement("body");
    var child = undefined;

    body.innerHTML = svg;
    while (child = body.firstChild) fragment.appendChild(child);
    return fragment;
  },

  getBroadcastThemes: function getBroadcastThemes() {
    var themes = BroadcastStore.getBroadcast().broadcast.heart_theme || [];
    return themes;
  },

  getRandomValueForRange: function getRandomValueForRange(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  },

  shouldUseHeartTheme: function shouldUseHeartTheme() {
    var themes = this.getBroadcastThemes();
    if (!themes || themes.length === 0) {
      return false;
    }var diceRoll = this.getRandomValueForRange(1, THEME_PROBABILITY + 1);
    if (diceRoll === THEME_PROBABILITY) {
      return true;
    }return false;
  },

  getHeartTheme: function getHeartTheme() {
    if (this.shouldUseHeartTheme()) {
      var broadcastThemes = this.getBroadcastThemes();
      var diceRoll = this.getRandomValueForRange(0, broadcastThemes.length);
      return broadcastThemes[diceRoll];
    }

    return FeedbackTypes.HEART;
  },

  appendHearts: function appendHearts(data) {
    var _this = this;

    data.hearts.map(function (item) {
      var container = _this.refs.heartsContainer.getDOMNode();
      var colorClass = "u-participant" + Utils.getParticipantColorName(item.participant_index);

      var feedbackType = undefined;
      switch (item.type) {
        case Constants.PubnubMessageTypes.SCREENSHOT:
          feedbackType = FeedbackTypes.SCREENSHOT;
          break;
        case Constants.PubnubMessageTypes.HEART:
          feedbackType = _this.getHeartTheme();
          break;
      }

      var id = "item-" + feedbackType + "-" + item.uuid;

      // Element already exists in DOM, skip it
      if (document.getElementById(id)) return;

      var el = _this.generateElement(SVG[feedbackType]);
      var svg = el.querySelector("svg");

      // Ensure feedback items spawn from their horizontal center
      var svgWidth = parseInt(svg.getAttribute("width"), 10);
      var offset = (HEART_CONTAINER_WIDTH - svgWidth) / 2;

      svg.setAttribute("class", "" + FEEDBACK_ITEM_CLASS + " " + FEEDBACK_ITEM_CLASS + "--" + feedbackType + " " + colorClass);
      svg.setAttribute("id", id);
      svg.setAttribute("style", "right: " + offset + "px");
      container.appendChild(el);

      _this.animateEl(id);
    });
  },

  removeHeart: function removeHeart(heartId) {
    var heart = document.getElementById(heartId);
    if (heart && heart.parentNode) {
      heart.parentNode.removeChild(heart);
    }
  },

  flushHearts: function flushHearts() {
    var heartsContainer = this.refs.heartsContainer.getDOMNode();
    while (heartsContainer.firstChild) {
      heartsContainer.removeChild(heartsContainer.firstChild);
    }
  },

  animateEl: function animateEl(heartId) {
    var _this = this;

    var BEZIER_TYPE = "thru";
    var BEZIER_CURVINESS = 1.5;
    var AUTO_ROTATE = false;

    var ROTATION_CONSTRAINT = 0.5;

    var BEZIER_POINT_ONE_RANGE = 80;
    var BEZIER_POINT_TWO_RANGE = 100;

    var DISTANCE_MULTIPLIER = 5;
    var WINDOW_HEIGHT = Utils.videoPlayerSize().height;
    var WINDOW_HEIGHT_CONSTRAINT = 0.25;
    var TOTAL_DISTANCE_MODIFIER_RANGE = 100;

    var FLOAT_DURATION_IN_SECONDS = 3;
    var FINAL_OPACITY = 0;

    var SCALE_DURATION_IN_SECONDS = 0.3;
    var FINAL_SCALE = 0.6;

    var heartsPresentInDOM = document.getElementsByClassName(FEEDBACK_ITEM_CLASS).length;

    // Increase total distance as more hearts are present
    // then scale total distance by window size
    var distance = heartsPresentInDOM * DISTANCE_MULTIPLIER + WINDOW_HEIGHT * WINDOW_HEIGHT_CONSTRAINT;

    // Cap the maximum distance in case hearts explode
    // and randomize final destination of heart
    distance = Math.min(distance, WINDOW_HEIGHT);
    distance = distance + Math.random() * TOTAL_DISTANCE_MODIFIER_RANGE;

    // Subtle rotation variance
    var rotation = Math.random() * ROTATION_CONSTRAINT - ROTATION_CONSTRAINT / 2;

    var bezierPointOneY = -(distance / 2);
    var bezierPointOneX = BEZIER_POINT_ONE_RANGE / 2 - Math.random() * BEZIER_POINT_ONE_RANGE;

    var bezierPointTwoY = -distance;
    var bezierPointTwoX = BEZIER_POINT_TWO_RANGE / 2 - Math.random() * BEZIER_POINT_TWO_RANGE;

    var heartSelector = "#" + heartId;

    // Initial scale animation
    TweenLite.to(heartSelector, SCALE_DURATION_IN_SECONDS, {
      scaleY: FINAL_SCALE,
      scaleX: FINAL_SCALE,
      ease: Back.easeOut
    });

    // Float animation
    TweenLite.to(heartSelector, FLOAT_DURATION_IN_SECONDS, {
      opacity: FINAL_OPACITY,
      rotation: "" + rotation + "rad",
      ease: Linear.easeNone,
      bezier: {
        type: BEZIER_TYPE,
        curviness: BEZIER_CURVINESS,
        autoRotate: false,
        values: [{
          x: bezierPointOneX,
          y: bezierPointOneY
        }, {
          x: bezierPointTwoX,
          y: bezierPointTwoY
        }]
      },
      onComplete: function () {
        _this.removeHeart(heartId);
      }
    });
  },

  render: function render() {
    var classes = ["Hearts"].concat(this.props.classNames);

    if (this.props.forReplay) {
      classes.push("Hearts--forReplay", classes);
    }

    return React.createElement("ul", { className: classes.join(" "),
      ref: "heartsContainer",
      id: "heartsContainer" });
  }
});

module.exports = Hearts;
