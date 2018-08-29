import EditProductionLineModal from '../components/modals/edit-production-line-modal.js';
import NewFactoryModal from '../components/modals/new-factory-modal.js';
import NewProducerModal from '../components/modals/new-producer-modal.js';
import NewProductionLineModal from '../components/modals/new-production-line-modal.js';
import NewProductModal from '../components/modals/new-product-modal.js';
import React from 'react';
var EventEmitter = require('events').EventEmitter;

import {
  EDIT_PRODUCTION_LINE_MODAL_ID,
  NEW_FACTORY_MODAL_ID,
  NEW_PRODUCER_MODAL_ID,
  NEW_PRODUCT_MODAL_ID,
  NEW_PRODUCTION_LINE_MODAL_ID,
} from '../constants.js';

class ModalsStore extends EventEmitter {
  constructor() {
    super();

    this._modals = new Map();
    this._modals.set(EDIT_PRODUCTION_LINE_MODAL_ID, <EditProductionLineModal/>);
    this._modals.set(NEW_PRODUCTION_LINE_MODAL_ID, <NewProductionLineModal/>);
    this._modals.set(NEW_FACTORY_MODAL_ID, <NewFactoryModal/>);
    this._modals.set(NEW_PRODUCT_MODAL_ID, <NewProductModal/>);
    this._modals.set(NEW_PRODUCER_MODAL_ID, <NewProducerModal/>);

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
