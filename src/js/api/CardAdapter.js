"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var assign = require("object-assign");
var ExponentialBackoff = require("./ExponentialBackoff");
var Constants = require("../constants/Constants");

var ORIGIN = "" + window.location.protocol + "//" + window.location.host;

// Mirrored from `card_capi_periscope_refresh_interval_seconds` decider value found at
// https://cgit.twitter.biz/source/tree/macaw-cards/src/main/resources/config/decider/decider.yml
var UPDATE_INTERVAL = 20;

var CardAdapter = (function () {
  function CardAdapter() {
    _classCallCheck(this, CardAdapter);

    this.initData();
    this.intervalId = setInterval(this.updateData, UPDATE_INTERVAL * 1000);
  }

  _createClass(CardAdapter, {
    destroy: {
      value: function destroy() {
        clearInterval(this.intervalId);
      }
    },
    initData: {
      value: function initData() {
        var _this = this;

        var success = function (apiData) {
          // Mirrored from PeriscopeCardModel.scala in macaw-cards
          // https://cgit.twitter.biz/source/tree/macaw-cards/src/main/scala/com/twitter/macawcards/data/models/PeriscopeCardModel.scala

          var sharedCardData = _this.getSharedCardData(apiData);
          var initData = {
            broadcaster_id: apiData.broadcast.user_id,
            broadcaster_username: apiData.broadcast.username,
            // Card data from macaw-cards page scrape cache, not needed for player render
            title: "",
            description: "",
            image: "",
            fullSizeImage: "",
            vanity_url: "",
            player_width: "",
            player_height: "",
            player_url: "",
            periscope_url: "",
            api: ""
          };

          window.postMessage({
            type: Constants.WindowMessageTypes.INIT,
            cardData: assign({}, sharedCardData, initData)
          }, ORIGIN);
        };

        var error = function (err) {
          _this.updateError();
        };

        CardAdapterAPI.getBroadcastCards(success, error);
        this.updateData();
      }
    },
    updateData: {
      value: function updateData() {
        var _this = this;

        var success = function (apiData) {
          // Mirrored from PeriscopeCardResponseModel.scala in macaw-cards
          // https://cgit.twitter.biz/source/tree/macaw-cards/src/main/scala/com/twitter/macawcards/data/models/card_actions/PeriscopeCardResponseModel.scala
          var sharedCardData = _this.getSharedCardData(apiData);
          var updateData = {
            start_date: apiData.broadcast.start,
            end_date: apiData.broadcast.end || apiData.broadcast.ping || apiData.broadcast.start,
            replay_url: apiData.video.replay_url,
            hls_url: apiData.video.hls_url,
            // Card data from macaw-cards page scrape cache, not needed for player render
            card_name: ""
          };

          window.postMessage({
            type: Constants.WindowMessageTypes.UPDATE,
            cardData: assign({}, sharedCardData, updateData)
          }, ORIGIN);
        };

        var error = function (err) {
          _this.updateError();
        };

        CardAdapterAPI.getBroadcastCards(success, error);
      }
    },
    updateError: {
      value: function updateError() {
        this.postMessage({
          type: Constants.WindowMessageTypes.UPDATE_ERROR
        });
      }
    },
    getSharedCardData: {
      value: function getSharedCardData(apiData) {
        return {
          id: apiData.broadcast.id,
          available_for_replay: apiData.broadcast.available_for_replay,
          featured: apiData.broadcast.featured,
          broadcaster_display_name: apiData.broadcast.user_display_name,
          state: apiData.broadcast.state,
          full_size_thumbnail_url: apiData.broadcast.image_url,
          status: apiData.broadcast.status,
          total_participants: apiData.participants_count
        };
      }
    },
    postMessage: {
      value: function postMessage(messageData) {
        window.postMessage(messageData, ORIGIN);
      }
    }
  });

  return CardAdapter;
})();

;

var CardAdapterAPI = {
  getBroadcastCards: function (success, error) {
    var getRequestObject = function () {
      return {
        url: Constants.ApiEndpoints.HOSTNAME + Constants.ApiEndpoints.BROADCAST_CARDS_PUBLIC,
        query: { broadcast_ids: Constants.Broadcast.REQUESTED_ID }
      };
    };

    return new ExponentialBackoff(getRequestObject).backoff().then(function (response) {
      return response.body.Broadcasts[0];
    }).then(success, error);
  }
};

module.exports = CardAdapter;
