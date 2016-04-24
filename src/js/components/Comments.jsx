"use strict";

var React = require("react");

var _require = require("../stores/EventStore");

var EventStore = _require.EventStore;

var Utils = require("../utils/utils");
var Debugging = require("../utils/Debugging");
var Constants = require("../constants/Constants");

var Comment = require("./Comment.jsx");

var commentsAtFullOpacity = 0;

var commentSettings = {
  maxFullOpacityComments: 0,
  maxNewComments: 15,
  commentFadeOutTimeInMS: 4500,
  commentTimeOnScreenInMS: 7000,
  // Must match .Comment.slidein
  // animation-duration
  animateInTimeInMS: 1000
};

var Comments = React.createClass({
  displayName: "Comments",

  getInitialState: function getInitialState() {
    return this.getComments();
  },
  componentDidMount: function componentDidMount() {
    EventStore.addChatEventChangeListener(this.onChange);
    EventStore.addFlushEventChangeListener(this.onFlush);
  },
  componentWillUnmount: function componentWillUnmount() {
    EventStore.removeChatEventChangeListener(this.onChange);
    EventStore.removeFlushEventChangeListener(this.onFlush);
  },
  onChange: function onChange() {
    var newComments = this.getComments();
    this.updateActiveComments(newComments.comments);
    this.setState(newComments);
    this.addLogComments();
  },

  onFlush: function onFlush() {
    this.activeComments = [];
    this.setState(this.getComments());
  },

  getComments: function getComments() {
    return EventStore.getChatEvents();
  },

  commentIsActive: function commentIsActive(comment) {
    var timeInMS = arguments[1] === undefined ? commentSettings.commentTimeOnScreenInMS : arguments[1];

    return new Date().valueOf() - comment.displayDate <= timeInMS;
  },

  activeComments: [],

  updateActiveComments: function updateActiveComments() {
    var _this = this;

    var newComments = arguments[0] === undefined ? [] : arguments[0];

    if (newComments.length > commentSettings.maxNewComments + 1) Debugging.log("" + (newComments.length - commentSettings.maxNewComments) + " comments not shown");
    newComments = newComments.slice(0, commentSettings.maxNewComments).map(function (comment, index) {
      var animationTime = commentSettings.animateInTimeInMS;

      var lastComment = _this.activeComments[_this.activeComments.length];
      var time = lastComment && new Date().valueOf() + animationTime < lastComment.displayDate ? lastComment.displayDate : new Date().valueOf();

      var displayDate = time + index * animationTime;
      comment.displayDate = displayDate;
      return comment;
    });

    commentsAtFullOpacity = newComments.length;

    this.activeComments = this.activeComments.filter(function (comment) {
      // HACK: this seems to work fine (read better than the correct way)
      // but we should really only be counting ones that are still active
      commentsAtFullOpacity++;
      var commentDurationOnScreen = commentSettings.commentTimeOnScreenInMS + commentSettings.commentFadeOutTimeInMS;
      return _this.commentIsActive(comment, commentDurationOnScreen);
    }).concat(newComments);
  },

  addComments: function addComments() {
    var _this = this;

    if (this.activeComments.length === 0) {
      return;
    }commentSettings.maxFullOpacityComments = Math.max(Math.floor((Utils.videoPlayerSize().height + 50) / 100) - 2, 1);

    var composeComments = function () {
      var comments = [];

      _this.activeComments.map(function (comment, index) {
        var timeOnScreen = commentSettings.commentTimeOnScreenInMS;
        var animationTime = commentSettings.commentFadeOutTimeInMS;

        // By default, every comment lives on screen for commentTimeOnScreen.
        // But, if new comments cause the number of comments on screen
        // to be greater than the max, reset the overflow comments'
        // timeOnScreen to have a near immediate expiry.
        if (index + 1 + commentSettings.maxFullOpacityComments <= commentsAtFullOpacity) {
          timeOnScreen = 0;
          // animation time is the transition time. This should get faster
          // the more comments are on screen
          animationTime = animationTime * (commentSettings.maxFullOpacityComments / commentsAtFullOpacity) + index * 50;
        }

        comments.push(React.createElement(Comment, {
          key: comment.uuid,
          animationTime: animationTime,
          comment: comment,
          timeOnScreen: timeOnScreen,
          participantColor: Utils.getParticipantColorName(comment.participant_index)
        }));
      });

      return comments;
    };

    return React.createElement(
      "ul",
      null,
      composeComments()
    );
  },

  addLogComments: function addLogComments() {
    if (Debugging._isProd()) {
      return;
    }this.state.comments.map(function (comment) {
      var participantColorName = Utils.getParticipantColorName(comment.participant_index);
      var participantColorRGB = Utils.getParticipantColor(comment.participant_index);

      console.info("\n");
      console.info("%c @" + comment.username + " ", "\n                   color: " + participantColorRGB + ";\n                   font-size: 11px;\n                   padding: 1px 2px 1px;\n                   border: 1px solid " + participantColorRGB + ";\n                   border-top-left-radius: 4px;\n                   border-top-right-radius: 4px;");
      console.info("%c " + comment.body + " ", "font-size: 13px;\n                   background-color: " + participantColorRGB + ";\n                   color: white;\n                   padding: 2px 4px;\n                   border-bottom-left-radius: 4px;\n                   border-bottom-right-radius: 4px;");
    });
  },

  render: function render() {
    var classes = ["Comments"].concat(this.props.classNames).join(" ");

    return React.createElement(
      "div",
      { className: classes },
      this.addComments()
    );
  }
});

module.exports = Comments;
