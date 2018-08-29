var EventEmitter = require('events').EventEmitter;
import EditProductionLineModal from '../components/modals/edit-production-line-modal.js';
import NewProductionLineModal from '../components/modals/new-production-line-modal.js';
import React from 'react';

import {
  EDIT_PRODUCTION_LINE_MODAL_ID,
  NEW_PRODUCTION_LINE_MODAL_ID,
} from '../constants.js';

class ModalsStore extends EventEmitter {
  constructor() {
    super();

    this._modals = new Map();
    this._modals.set(EDIT_PRODUCTION_LINE_MODAL_ID, <EditProductionLineModal/>);
    this._modals.set(NEW_PRODUCTION_LINE_MODAL_ID, <NewProductionLineModal/>);

    this._currentModalId = '';
    this._currentModal = '';
    this._show = false;
  }

  showModal(id) {
    this._currentModal = this._modals.get(id);
    this._currentModalId = id;
    this._show = true;
  }

  hideModal() {
    this._show = false;
    this.emitChange(this._currentModalId);
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
