"use strict";

var hostname = document.getElementById("api-host").getAttribute("content");
var session = document.getElementById("api-session").getAttribute("content");
var langCode = document.getElementById("lang-code").getAttribute("content");

var ApiEndpoints = {
  HOSTNAME: hostname,
  LANG: langCode,
  SESSION: session,

  BROADCAST: "/api/v2/getBroadcastPublic",
  THUMBNAIL_PLAYLIST: "/api/v2/publicReplayThumbnailPlaylist",
  USER: "/api/v2/getUserPublic",
  RANKED: "/api/v2/_getRankedFeedPublic",
  CHATMAN_HISTORY: "/chatapi/v1/history",
  CHATMAN_WEB_SOCKET: "/chatapi/v1/chatnow",
  BROADCAST_CARDS_PUBLIC: "/api/v2/_getBroadcastsCardsPublic",

  /**
   * New LifeCycle Endpoints
   */
  ACCESS_VIDEO_PUBLIC: "/api/v2/accessVideoPublic",
  ACCESS_CHAT_PUBLIC: "/api/v2/accessChatPublic",
  START_PUBLIC: "/api/v2/startPublic",
  PING_PUBLIC: "/api/v2/pingPublic",
  STOP_PUBLIC: "/api/v2/stopPublic",
  REPLAY_VIEWED_PUBLIC: "/api/v2/replayViewedPublic",
  PING_REPLAY_VIEWED_PUBLIC: "/api/v2/pingReplayViewedPublic",
  END_REPLAY_VIEWED_PUBLIC: "/api/v2/endReplayViewedPublic",

  /**
   * Deprecated
   */
  VIDEO_ACCESS: "/api/v2/getAccessPublic",
  REPLAY_VIEWED: "/api/v2/replayViewedPublic",
  PING_WATCHING: "/api/v2/pingPublic"
};

module.exports = ApiEndpoints;
