"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var React = require("react");
var Utils = require("../utils/utils");
var Actions = require("../actions/Actions");
var Constants = require("../constants/Constants");
var IntlMixin = ReactIntl.IntlMixin;

var SessionStore = require("../stores/SessionStore");

var commentFadeInTimeInMS = 500;

var CommentView = (function () {
  function CommentView(opts) {
    _classCallCheck(this, CommentView);

    var getIntlMessage = opts.getIntlMessage;
    var comment = opts.comment;
    var participantColor = opts.participantColor;
    var component = opts.component;

    if (!getIntlMessage || !comment || !participantColor || !component) {
      throw new Error("You must pass `getIntlMessage` `comment` `participantColor` and `component` to CommentView");
    }

    this.getIntlMessage = getIntlMessage;

    this.comment = comment;
    this.participantColor = participantColor;
    this.component = component;

    this.rendered = false;
    this._timeOnScreen;
    this.animateTimer;
    this.shouldAnimateOut = false;
  }

  _createClass(CommentView, {
    rerender: {
      value: function rerender() {
        this.component.forceUpdate.call(this.component);
      }
    },
    needsNewAnimationTimeout: {
      value: function needsNewAnimationTimeout(timeOnScreen) {
        return typeof this._timeOnScreen === "undefined" || timeOnScreen < this._timeOnScreen;
      }
    },
    delayRender: {
      value: function delayRender() {
        var _this = this;

        var renderedAt = this.comment.displayDate - new Date().valueOf();
        if (renderedAt > 0) {
          setTimeout(function () {
            _this.rerender();
          }, renderedAt);
          return true;
        }
      }
    },
    slideIn: {
      value: function slideIn() {
        var _this = this;

        this.commentClasses.push("slidein");
        this.renderTimeout = setTimeout(function () {
          if (_this.component.isMounted()) {
            var commentDOM = _this.component.getDOMNode();
            var classes = commentDOM.className.split(" ");
            Utils.removeFromArray("slidein", classes);
            commentDOM.className = classes.join(" ");
          }
        }, commentFadeInTimeInMS);

        this.rendered = true;
      }
    },
    animateOut: {
      value: function animateOut() {
        if (this.animateTimer) clearTimeout(this.animateTimer);
        Utils.removeFromArray("u-opacity-100", this.commentClasses);
        this.commentClasses.push("u-opacity-0");
        this.fadingOut = true;
      }
    },
    getAnimationTimeout: {
      value: function getAnimationTimeout() {
        var animationTimeout = this._timeOnScreen - (new Date().valueOf() - this.comment.displayDate);
        // Make sure timeout is 0+
        return Math.max(0, animationTimeout);
      }
    },
    showUserProfile: {
      value: function showUserProfile() {
        Actions.openModal(Constants.ModalTypes.USER);
        Actions.setModalUser(this.comment.username);
      }
    },
    renderComment: {
      value: function renderComment(classes) {
        return React.createElement(
          "li",
          { className: classes.join(" "), onClick: this.showUserProfile.bind(this) },
          React.createElement("div", { className: "Comment-avatar", style: { backgroundImage: "url(" + this.comment.profileImageURL + ")" } }),
          React.createElement(
            "div",
            { className: "Comment-body" },
            React.createElement(
              "span",
              { className: "Comment-username" },
              "@",
              this.comment.username
            ),
            React.createElement(
              "span",
              { className: "Comment-message" },
              this.comment.body
            )
          )
        );
      }
    },
    renderSystemMessage: {
      value: function renderSystemMessage(classes) {
        classes.push("SystemMessage");
        var messageData = this.comment.messageData;

        switch (messageData.messageType) {
          case Constants.SystemMessageTypes.MUTE:
            return React.createElement(
              "li",
              { className: classes.join(" ") },
              React.createElement(
                "div",
                { className: "Comment-body" },
                React.createElement(
                  "span",
                  { className: "Comment-message" },
                  React.createElement(ReactIntl.FormattedMessage, {
                    message: this.getIntlMessage("system.USER_MUTED"),
                    username: React.createElement(
                      "strong",
                      null,
                      "@",
                      messageData.aux.username
                    )
                  })
                )
              )
            );
          default:
            return React.createElement("li", null);
        }
      }
    },
    render: {
      value: function render(commentRenderOptions) {
        var _this = this;

        if (this.delayRender()) {
          return false;
        }var timeOnScreen = commentRenderOptions.timeOnScreen;
        var animationTime = commentRenderOptions.animationTime;
        var isMuted = commentRenderOptions.isMuted;

        var comment = this.comment;

        this.commentClasses = ["Comment", "u-opacity-100", "Comment-participant" + this.participantColor];

        // Slide comment in if this is the first time rendering
        if (!this.rendered) this.slideIn();

        if (this.shouldAnimateOut || isMuted) {
          this.animateOut();
        } else if (this.needsNewAnimationTimeout(timeOnScreen)) {
          this._timeOnScreen = timeOnScreen;

          // Calculate time until fade out
          this.animationTimeout = this.getAnimationTimeout();

          if (this.animateTimer) clearTimeout(this.animateTimer);
          this.animateTimer = setTimeout(function () {
            if (!_this.component.isMounted()) return false;
            _this.shouldAnimateOut = true;
            // rerender
            _this.rerender();
          }, this.animationTimeout);
        }

        if (this.component.isMounted() && this.component.getDOMNode() && !this.fadingOut) {
          var animationTimeInSec = animationTime / 1000;
          Utils.setCss3Style(this.component.getDOMNode(), "transition", "opacity " + animationTimeInSec + "s");
        }

        if (comment.isImmediate) {
          return this.renderSystemMessage(this.commentClasses);
        } else {
          return this.renderComment(this.commentClasses);
        }
      }
    }
  });

  return CommentView;
})();

var Comment = React.createClass({
  displayName: "Comment",

  mixins: [IntlMixin],
  getInitialState: function getInitialState() {
    return SessionStore.getSessionInformation().sessionInformation;
  },

  componentDidMount: function componentDidMount() {
    SessionStore.addChangeListener(this.onChange);
  },
  componentWillUnmount: function componentWillUnmount() {
    SessionStore.removeChangeListener(this.onChange);
  },
  onChange: function onChange() {
    this.setState(SessionStore.getSessionInformation().sessionInformation);
  },

  render: function render() {
    var isMuted = false;
    if (this.state.mutedUsernames.indexOf(this.props.comment.username) >= 0) {
      isMuted = true;
    }

    // If there is no commentView or the uuid is different
    if (typeof this.commentView === "undefined" || this.props.comment.uuid !== this.commentView.comment.uuid) {
      this.commentView = new CommentView({
        comment: this.props.comment,
        component: this,
        participantColor: this.props.participantColor,
        getIntlMessage: this.getIntlMessage
      });
    }

    return this.commentView.render({
      isMuted: isMuted,
      timeOnScreen: this.props.timeOnScreen,
      animationTime: this.props.animationTime
    });
  }
});

module.exports = Comment;
