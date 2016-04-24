"use strict";

var _toConsumableArray = function (arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } };

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var assign = require("object-assign");

var EventEmitter = require("events").EventEmitter;

var Actions = require("../actions/Actions");
var Constants = require("../constants/Constants");
var Debugging = require("../utils/Debugging");

var Dispatcher = require("../dispatcher/Dispatcher");

var PubnubStore = require("../stores/PubnubStore");
var SessionStore = require("../stores/SessionStore");
var VideoPlayerStore = require("../stores/VideoPlayerStore");

var CHANGE_EVENT = "change";

var EVENTS = Constants.Events;

var getEventLabelFromKind = function (kind) {
  var label = undefined;
  Object.keys(EVENTS).forEach(function (key) {
    if (EVENTS[key].kind == kind) return label = EVENTS[key].label;
  });
  return label;
};

var ALL_EVENTS = [EVENTS.VIDEO.label, EVENTS.HEART.label, EVENTS.CHAT.label];

var EventMemory = {
  ChatEventStack: [],
  ChatEventHeap: [],
  VideoEventStack: [],
  VideoEventHeap: [],
  HeartEventStack: [],
  HeartEventHeap: [],
  SystemEventsStack: []
};

var TICK_TIME_MS = 100;

var LOW_EVENT_THRESHOLD = 50;

var mostRecentNTP = undefined;
var eventTimer = undefined;

var replayNeedsMoreMessages = false;
var lastSeekingData = undefined;

var _sessionInformation = SessionStore.getSessionInformation().sessionInformation;
SessionStore.addChangeListener(function () {
  _sessionInformation = SessionStore.getSessionInformation().sessionInformation;
});

var inReplayMode = false;
VideoPlayerStore.addChangeListener(function () {
  inReplayMode = VideoPlayerStore.inReplayMode();
});

var EventStore = assign({}, EventEmitter.prototype, {
  processEvent: function (event, action, eventKind) {
    var index = action.index;
    var array = action.array;

    var eventType = getEventLabelFromKind(eventKind);

    // Guarantee uniqueness of events in stack
    if (Array.prototype.find) {
      if (!EventMemory["" + eventType + "Stack"].find(function (stackEvent) {
        return stackEvent.uuid === event.uuid;
      })) {
        EventMemory["" + eventType + "Stack"].push(event);
      }
    } else if (!EventMemory["" + eventType + "Stack"].filter(function (stackEvent) {
      return stackEvent.uuid === event.uuid;
    }).length) {
      EventMemory["" + eventType + "Stack"].push(event);
    }

    // Sort stack by time
    EventMemory["" + eventType + "Stack"] = EventMemory["" + eventType + "Stack"].sort(function (a, b) {
      return EventTimer.getEventTime(a) - EventTimer.getEventTime(b);
    });
  },

  // A message that will be shown ASAP
  // TODO: Refactor Comments to be more generic so we don't have to fake a sys message
  // as a comment. I don't think we should do that until we have classes in React
  addImmediateMessage: function (message) {
    message.uuid = new Date().valueOf();
    message.isImmediate = true;
    EventMemory.SystemEventsStack.push(message);
  },

  getReplayNeedsMoreMessages: function () {
    return replayNeedsMoreMessages;
  },
  setReplayNeedsMoreMessages: function (bool) {
    return replayNeedsMoreMessages = bool;
  },

  /**
   * Video Event methods and event handling
   */
  dispatchVideoEvents: function dispatchVideoEvents() {
    EventMemory.VideoEventHeap.forEach(function (event) {
      switch (event.type) {
        /**
         * TODO: Don't process on NTP time sync, instead check for event in stack
         * once the broadcast has ended and refresh the broadcast
         */
        case Constants.PubnubMessageTypes.BROADCASTER_UPLOADED_REPLAY:
          if (inReplayMode) return;
          Actions.refreshBroadcast();
          break;

        case Constants.PubnubMessageTypes.BROADCAST_ENDED:
          EventTimer.sendEndBroadcast();
          break;
      }
    });
  },

  /**
   * Flush event queues on playback completion
   */
  flushQueues: function flushQueues() {
    Object.keys(EventMemory).forEach(function (key) {
      EventMemory[key].length = 0;
    });
  },

  logNtpForDebugging: function logNtpForDebugging() {
    if (!Debugging._isProd()) {
      console.info("\n");
      console.info("%cCurrent NTP: " + mostRecentNTP, "color: RGB(150, 150, 150);");
    }
  },

  /**
   * Comments methods and event handling
   */
  getChatEvents: function getChatEvents() {
    var heap = EventMemory.ChatEventHeap.filter(function (event) {
      if (_sessionInformation.mutedUsernames.indexOf(event.username) >= 0) {
        Debugging.log("Muted message from " + event.username);
        return false;
      }
      return true;
    });
    EventMemory.ChatEventHeap = [];
    return { comments: heap };
  },

  emitChatEventChange: function emitChatEventChange() {
    this.emit("ChatEvent-" + CHANGE_EVENT);
  },

  addChatEventChangeListener: function addChatEventChangeListener(fn) {
    this.on("ChatEvent-" + CHANGE_EVENT, fn);
  },

  removeChatEventChangeListener: function removeChatEventChangeListener(fn) {
    this.removeListener("ChatEvent-" + CHANGE_EVENT, fn);
  },

  /**
   * Hearts methods and event handling
   */
  getHeartEvents: function getHeartEvents() {
    var heap = EventMemory.HeartEventHeap;
    EventMemory.HeartEventHeap = [];
    return { hearts: heap };
  },

  emitHeartEventChange: function emitHeartEventChange() {
    this.emit("HeartEvent-" + CHANGE_EVENT, this.getHeartEvents());
  },

  addHeartEventChangeListener: function addHeartEventChangeListener(fn) {
    this.on("HeartEvent-" + CHANGE_EVENT, fn);
  },

  removeHeartEventChangeListener: function removeHeartEventChangeListener(fn) {
    this.removeListener("HeartEvent-" + CHANGE_EVENT, fn);
  },

  emitFlushEventChange: function emitFlushEventChange() {
    this.emit("FlushEvent-" + CHANGE_EVENT);
  },

  addFlushEventChangeListener: function addFlushEventChangeListener(fn) {
    this.on("FlushEvent-" + CHANGE_EVENT, fn);
  },

  removeFlushEventChangeListener: function removeFlushEventChangeListener(fn) {
    this.removeListener("FlushEvent-" + CHANGE_EVENT, fn);
  }
});

var EventTimer = (function () {
  function EventTimer() {
    _classCallCheck(this, EventTimer);

    this.reset();
    this.start();
  }

  _createClass(EventTimer, {
    start: {
      value: function start() {
        var _this = this;

        if (this.intervalId) this.stop();
        this.intervalId = setInterval(function () {
          _this.processStack.call(_this);
        }, TICK_TIME_MS);
      }
    },
    stop: {
      value: function stop() {
        clearInterval(this.intervalId);
        this.intervalId = null;
      }
    },
    reset: {
      value: function reset() {
        mostRecentNTP = 0;
        this.timerTick = 0;
        this.previousNtp = mostRecentNTP;
        this.interpolatedTime = this.previousNtp;
      }
    },
    processStack: {
      value: function processStack() {
        var _this = this;

        if (this.previousNtp === mostRecentNTP) {
          this.timerTick++;
          this.interpolatedTime = mostRecentNTP + this.timerTick * TICK_TIME_MS / 1000;
        } else {
          this.timerTick = 0;
          this.interpolatedTime = this.previousNtp = mostRecentNTP;
        }

        for (var i = 0; i < ALL_EVENTS.length; i++) {
          var _ret = (function (i) {
            var eventStack = EventMemory["" + ALL_EVENTS[i] + "Stack"];
            var eventHeap = EventMemory["" + ALL_EVENTS[i] + "Heap"];
            var hasSystemMessages = false;

            if (ALL_EVENTS[i] === EVENTS.CHAT.label && EventMemory.SystemEventsStack.length) {
              eventHeap.splice.apply(eventHeap, [0, 0].concat(_toConsumableArray(EventMemory.SystemEventsStack)));
              EventMemory.SystemEventsStack = [];
              hasSystemMessages = true;
            }

            // If current stack is empty, skip it
            if (eventStack.length === 0 && !hasSystemMessages) return "continue";

            // Find events older than mostRecentNTP - 0.25
            var lowerBoundary = EventTimer.binarySearch(eventStack, function (event) {
              return _this.interpolatedTime - 0.2 - EventTimer.getEventTime(event);
            });

            // If old events exist, cut them
            if (lowerBoundary > 0) eventStack.splice(0, lowerBoundary);

            var upperBoundary = EventTimer.binarySearch(eventStack, function (event) {
              return _this.interpolatedTime - EventTimer.getEventTime(event);
            });

            // If no matches, skip the current stack
            if (upperBoundary <= 0 && !hasSystemMessages) return "continue";

            // Splice out the first x elements until upper boundary
            var heapEvents = eventStack.splice(0, upperBoundary + 1);

            // Filter unsigned messages before dispatching to the view
            heapEvents.forEach(function (event) {
              var PubnubStore = require("../stores/PubnubStore");
              if (event.isImmediate || event.isCM || PubnubStore.isVerifiedMessage(event)) {
                eventHeap.push(event);
              }
            });

            if (upperBoundary >= 0 || eventHeap.length) {
              switch (ALL_EVENTS[i]) {
                case EVENTS.VIDEO.label:
                  // Dispatch actions for video events uniquely
                  EventStore.dispatchVideoEvents();
                  break;
                default:
                  // Inform listeners that new items are ready
                  EventStore["emit" + ALL_EVENTS[i] + "Change"]();
                  break;
              }
            }
          })(i);

          if (_ret === "continue") continue;
        }

        var unprocessedEventCount = 0;
        for (var i = 0; i < ALL_EVENTS.length; i++) {
          var eventStack = EventMemory["" + ALL_EVENTS[i] + "Stack"];
          unprocessedEventCount += Number(eventStack.length);
        }

        if (replayNeedsMoreMessages && unprocessedEventCount < LOW_EVENT_THRESHOLD) {
          replayNeedsMoreMessages = false;
          Actions.replayPaginationRequest();
        }
      }
    }
  }, {
    binarySearch: {

      // Example:
      //   var list = [{a: 1}, {a:2}, {a:6}, {a:6}, {a:10}, {a:13}, {a:15}, {a:23}];
      //   binarySearch(list, function(item){return 16 - item.a});
      //     => 6

      value: function binarySearch(list, compare) {
        var min = 0;
        var max = list.length - 1;
        var guess = undefined;
        var result = undefined;
        var perfectMatch = undefined;

        // Loop until min and max meet
        while (min <= max) {
          // Half way between min and max
          guess = Math.floor((min + max) / 2);
          result = compare(list[guess]);

          // If there was a previous perfectMatch and this guess is not one
          // return the perfectMatch
          if (perfectMatch !== undefined && result !== 0) {
            return perfectMatch;
          } // If compare returned greater than 0 we move min
          // Example:
          //   target = 7
          //   list = 2 3 |5| 8 9
          //   7 > 5 (so 5 can become the new min)
          if (result >= 0) {
            min = guess + 1;
          } else {
            max = guess - 1;
          }

          if (result === 0) perfectMatch = guess;
        }

        // If our final guess was a perfect match OR
        // result was greater than 0 (our guess is the answer)
        if (perfectMatch !== undefined || result > 0) {
          return guess;
        } // If our guess is greater than target we don't want
        // to include it so move down one
        return guess - 1;
      }
    },
    setEventTime: {
      value: function setEventTime(event) {
        var useBroadcasterNTP = inReplayMode && !!event.ntpForBroadcasterFrame;
        var ntpToUse = useBroadcasterNTP ? event.ntpForBroadcasterFrame : event.ntpForLiveFrame;

        event.webClient_ntpInSeconds = parseFloat(ntpToUse / 4294967296);
        return event;
      }
    },
    getEventTime: {
      value: function getEventTime(event) {
        return event && event.webClient_ntpInSeconds;
      }
    },
    sendEndBroadcast: {
      value: function sendEndBroadcast() {
        Actions.endBroadcast();
        eventTimer && eventTimer.stop();
      }
    }
  });

  return EventTimer;
})();

;

var setChannelPermissions = function (_ref) {
  var pb = _ref.pb;
  var cm = _ref.cm;

  /*
   * pb: on = 1
   * cm: connect = 1, read = 2, write = 4
   */
  var ON = 1 << 0; // 001
  var READ = 1 << 1; // 010
  // Unused on the web
  // const WRITE = 1 << 2; // 100
  var CONNECT_AND_READ = ON | READ; // 011

  var usePB = Boolean(pb & ON);
  var useCM = Boolean(cm & CONNECT_AND_READ === CONNECT_AND_READ);

  // if no Pubnub
  if (!usePB) {
    Debugging.log("No PB");
    removeFeature("Pubnub");
  }

  // if no connect and read
  if (!useCM) {
    Debugging.log("No CM");
    removeFeature("Chatman");
  }
};

EventStore.dispatchToken = Dispatcher.register(function (payload) {
  var action = payload.action;
  var data = action.data;

  switch (action.type) {
    case Constants.ActionTypes.UPDATE_CHAT_DATA:
      if (data.chan_perms) {
        setChannelPermissions(data.chan_perms);
      }
      break;

    case Constants.ActionTypes.CHANGE_PLAYER_STATE:
      switch (action.state) {
        case Constants.VideoPlayerStates.PLAYING:
          Dispatcher.waitFor([VideoPlayerStore.dispatchToken]);
          if (eventTimer) {
            eventTimer.stop();
            eventTimer.reset();
            eventTimer.start();
          } else {
            eventTimer = new EventTimer();
          }
          return;

        case Constants.VideoPlayerStates.PAUSED:
          Dispatcher.waitFor([VideoPlayerStore.dispatchToken]);
          eventTimer && eventTimer.stop();
          return;

        case Constants.VideoPlayerStates.STOPPED:
          EventStore.flushQueues();
          eventTimer && eventTimer.stop() && eventTimer.reset();
          return;

        default:
          return;
      }
      return;

    case Constants.ActionTypes.SEEK_POSITION:
      EventStore.flushQueues();
      EventStore.emitFlushEventChange();
      eventTimer && eventTimer.stop() && eventTimer.reset();

      replayNeedsMoreMessages = false;

      // We don't want to update NTP when seek is initiated,
      // we want to update NTP when seek completes. See below.
      lastSeekingData = action;
      return;

    case Constants.ActionTypes.SEEKING_COMPLETE:
      // When seeking completes, update with estimated
      // ntp value from the seeking request
      mostRecentNTP = lastSeekingData.ntp;
      EventStore.logNtpForDebugging();
      return;

    case Constants.ActionTypes.UPDATE_BROADCAST_END_TIME:
    case Constants.ActionTypes.PUBNUB_DISCONNECTED:
      eventTimer && eventTimer.stop();
      return;

    case Constants.ActionTypes.CURRENT_NTP:
      mostRecentNTP = action.ntp;
      EventStore.logNtpForDebugging();
      return;

    case Constants.ActionTypes.SHOW_SYSTEM_MESSAGE:
      switch (data.messageType) {
        case Constants.SystemMessageTypes.MUTE:
          EventStore.addImmediateMessage({
            messageData: data });
          return;
      }
      return;
  }
});

exports.EventStore = EventStore;
exports.EventTimer = EventTimer;
