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

    this._currentModal = '';
    this._show = false;
  }

  showModal() {
    this._show = true;
  }

  hideModal(id) {
    this._show = false;
    this.emitChange(id);
  }

  shouldShow() {
    return this._show;
  }

  setCurrentModal(id) {
    this._currentModal = this._modals.get(id);
  }

  getCurrentModal() {
    return this._currentModal;
  }

  emitChange(id) {
    this.emit(id);
  }
}

export default new ModalsStore();
