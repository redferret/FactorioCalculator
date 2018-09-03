import AppDispatcher from '../dispatcher.js';
import ModalsRepository from './modals-repository.js';
import React from 'react';
var EventEmitter = require('events').EventEmitter;

import {
  MODAL_ID,
  RE_RENDER,
} from '../constants.js';

class ModalsStore extends EventEmitter {
  constructor() {
    super();

    this._currentModalId = 'no-id';
    this._currentModal = {
      header: null,
      body: null,
      footer: null
    };
    this._show = false;
  }

  setToShowModal(id) {
    let _modals = ModalsRepository.getModals();
    this._currentModal = _modals.get(id);
    this._currentModalId = id;
    this._show = true;
  }

  showModal(modal) {
    let _modals = ModalsRepository.getModals();
    this._currentModal = _modals.get(modal.id);
    this._currentModalId = modal.id;
    this._show = true;

    if (modal.store) {
      AppDispatcher.dispatch({
        action: RE_RENDER,
        emitOn: [{
          store: modal.store,
          componentIds: [modal.id]
        }]
      });
    }

    this.emitChange(MODAL_ID);
  }

  hideModal() {
    this._show = false;
    this.emitChange(MODAL_ID);
  }

  shouldShow() {
    return this._show;
  }

  getCurrentModal() {
    return this._currentModal;
  }

  emitChange(id) {
    this.emit(id);
  }
}

export default new ModalsStore();
