"use strict";

var tokenId = document.getElementById("token-id").getAttribute("content");
var localThumb = document.getElementById("broadcast-thumb-local").getAttribute("content");

var Broadcast = {
  REQUESTED_ID: tokenId,
  LOCAL_THUMB: localThumb
};

module.exports = Broadcast;
