var EventEmitter = require('events').EventEmitter;
import EditProductionLineModal from '../components/modals/edit-production-line-modal.js';
import NewProductionLineModal from '../components/modals/new-production-line-modal.js';
import React from 'react';

class ModalsStore extends EventEmitter {
  constructor() {
    super();
    this._currentModal = '';
  }

  setCurrentModal(modalElement) {
    this._currentModal = modalElement;
  }

  getCurrentModal() {
    return this._currentModal;
  }

  emitChange(id) {
    this.emit(id);
  }
}

export default new ModalsStore();
