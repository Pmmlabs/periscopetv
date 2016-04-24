"use strict";

var Utils = require("../utils/utils");
var Constants = require("../constants/Constants");

var PlayerHelper = {

  assertPlayerValue: function assertPlayerValue(objName, valueName, expectedValue) {
    var actualValue = Utils.checkObjForValue(this.props, this.state, objName, valueName);
    return actualValue === expectedValue;
  },

  _appModeIs: function _appModeIs(mode) {
    return Constants.AppSettings.mode === Constants.AppModes[mode];
  },

  _playerIs: function _playerIs(state) {
    return this.assertPlayerValue("player", "state", Constants.VideoPlayerStates[state]);
  },

  _playerAudioIs: function _playerAudioIs(state) {
    return this.assertPlayerValue("player", "audio", Constants.VideoPlayerAudioStates[state]);
  },

  _playerModeIs: function _playerModeIs(mode) {
    return this.assertPlayerValue("player", "mode", Constants.VideoPlayerModes[mode]);
  },

  _playerPresentationIs: function _playerPresentationIs(mode) {
    return this.assertPlayerValue("player", "presentation", Constants.VideoPlayerPresentations[mode]);
  },

  _videoHasStarted: function _videoHasStarted() {
    return Utils.checkObjForValue(this.props, this.state, "player", "playerStarted");
  },

  _includeVideoUI: function _includeVideoUI() {
    return Utils.isVideoSupported() && this._videoHasStarted();
  },

  /**
   * VideoPlayer State Assertions
   */

  _isServerError: function _isServerError() {
    return this._playerIs("SERVER_ERROR");
  },

  _isUnavailable: function _isUnavailable() {
    return this._playerIs("UNAVAILABLE");
  },

  _isConnecting: function _isConnecting() {
    return this._playerIs("CONNECTING");
  },

  _isPlaying: function _isPlaying() {
    return this._playerIs("PLAYING");
  },

  _isStopped: function _isStopped() {
    return this._playerIs("STOPPED");
  },

  _isPaused: function _isPaused() {
    return this._playerIs("PAUSED");
  },

  _isPlayback: function _isPlayback() {
    return this._isPlaying() || this._isPaused();
  },

  _isLiveMode: function _isLiveMode() {
    return this._playerModeIs("LIVE");
  },

  _isReplayMode: function _isReplayMode() {
    return this._playerModeIs("REPLAY");
  },

  _isUnknownMode: function _isUnknownMode() {
    return this._playerModeIs("UNKNOWN");
  },

  _isVideoPresentation: function _isVideoPresentation() {
    return this._playerPresentationIs("VIDEO");
  },

  _isInterstitialPresentation: function _isInterstitialPresentation() {
    return this._playerPresentationIs("INTERSTITIAL");
  },

  _isAudioOn: function _isAudioOn() {
    return this._playerAudioIs("ON");
  },

  _isAudioOff: function _isAudioOff() {
    return this._playerAudioIs("OFF");
  }
};

module.exports = PlayerHelper;
