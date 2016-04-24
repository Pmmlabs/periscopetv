"use strict";

var assign = require("object-assign");
var Dispatcher = require("../dispatcher/Dispatcher");
var EventEmitter = require("events").EventEmitter;

var Constants = require("../constants/Constants");

var CHANGE_EVENT = "change";
var DEFAULT_MODAL = {
  visible: false
};

var _modals = {};

Object.keys(Constants.ModalTypes).forEach(function (key) {
  _modals[key] = DEFAULT_MODAL;
});

var ModalStateStore = assign({}, EventEmitter.prototype, {

  getModal: function getModal(name) {
    return _modals[name];
  },

  setModalVisibility: function setModalVisibility(modalName, visibility) {
    Object.keys(Constants.ModalTypes).forEach(function (key) {
      _modals[key] = { visible: key === modalName ? visibility : false };
    });
  },

  emitChange: function emitChange() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function addChangeListener(fn) {
    this.on(CHANGE_EVENT, fn);
  },

  removeChangeListener: function removeChangeListener(fn) {
    this.removeListener(CHANGE_EVENT, fn);
  },

  emitOpenChange: function emitOpenChange() {
    this.emit("open-" + CHANGE_EVENT);
  },

  addOpenChangeListener: function addOpenChangeListener(fn) {
    this.on("open-" + CHANGE_EVENT, fn);
  },

  removeOpenChangeListener: function removeOpenChangeListener(fn) {
    this.removeListener("open-" + CHANGE_EVENT, fn);
  },

  emitCloseChange: function emitCloseChange() {
    this.emit("close-" + CHANGE_EVENT);
  },

  addCloseChangeListener: function addCloseChangeListener(fn) {
    this.on("close-" + CHANGE_EVENT, fn);
  },

  removeCloseChangeListener: function removeCloseChangeListener(fn) {
    this.removeListener("close-" + CHANGE_EVENT, fn);
  }
});

ModalStateStore.dispatchToken = Dispatcher.register(function (payload) {
  var action = payload.action;

  switch (action.type) {
    case Constants.ActionTypes.OPEN_MODAL:
      ModalStateStore.setModalVisibility(action.name, true);
      ModalStateStore.emitChange();
      ModalStateStore.emitOpenChange();
      return;

    case Constants.ActionTypes.CLOSE_MODAL:
      ModalStateStore.setModalVisibility(action.name, false);
      ModalStateStore.emitChange();
      ModalStateStore.emitCloseChange();
      return;
  }
});

module.exports = ModalStateStore;
