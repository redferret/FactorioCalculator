import AppDispatcher from '../dispatcher.js';
import ModalsRepository from './modals-repository.js';
import React from 'react';
var EventEmitter = require('events').EventEmitter;

import {
  MODAL_ID,
  RE_RENDER,
} from '../constants.js';

const EMPTY_MODAL = {
  header: <div>No Modal Defined</div>,
  body: null,
  footer: null
}

class ModalsStore extends EventEmitter {
  constructor() {
    super();

    this._currentModalId = 'no-id';
    this._currentModal = EMPTY_MODAL;
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

    this.emit(MODAL_ID);
  }

  hideModal() {
    this._show = false;
    this.emit(MODAL_ID);
  }

  shouldShow() {
    return this._show;
  }

  getCurrentModal() {
    if (this._currentModal) {
      return this._currentModal;
    } else {
      return EMPTY_MODAL;
    }
  }

}

export default new ModalsStore();
