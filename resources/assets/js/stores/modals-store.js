import * as EditProductModal from '../components/modals/edit-product-modal.js';
import * as ModalSpinner from '../components/modals/modal-spinner.js';
import AppDispatcher from '../dispatcher.js';
import EditFactoryModal from '../components/modals/edit-factory-modal.js';
import EditProducerModal from '../components/modals/edit-producer-modal.js';
import EditProductionLineModal from '../components/modals/edit-production-line-modal.js';
import EditProductTypeModal from '../components/modals/edit-product-type-modal.js';
import MainStore from './main-store.js';
import NewFactoryModal from '../components/modals/new-factory-modal.js';
import NewProducerModal from '../components/modals/new-producer-modal.js';
import NewProductionLineModal from '../components/modals/new-production-line-modal.js';
import NewProductModal from '../components/modals/new-product-modal.js';
import NewProductTypeModal from '../components/modals/new-product-type-modal.js';
import React from 'react';
var EventEmitter = require('events').EventEmitter;

import {
  EDIT_FACTORY_MODAL_ID,
  EDIT_PRODUCER_MODAL_ID,
  EDIT_PRODUCT_MODAL_ID,
  EDIT_PRODUCT_TYPE_MODAL_ID,
  EDIT_PRODUCTION_LINE_MODAL_ID,
  MAIN_MODAL_CHANGE,
  MODAL_ID,
  NEW_FACTORY_MODAL_ID,
  NEW_PRODUCER_MODAL_ID,
  NEW_PRODUCT_MODAL_ID,
  NEW_PRODUCT_TYPE_MODAL_ID,
  NEW_PRODUCTION_LINE_MODAL_ID,
  RE_RENDER,
  SPINNER_MODAL_ID,
} from '../constants.js';

class ModalsStore extends EventEmitter {
  constructor() {
    super();

    this._modals = new Map();

    // this._modals.set(EDIT_FACTORY_MODAL_ID, <EditFactoryModal/>);
    // this._modals.set(EDIT_PRODUCER_MODAL_ID, <EditProducerModal/>);
    this._modals.set(EDIT_PRODUCT_MODAL_ID, {
      header: <EditProductModal.ModalHeader/>,
      body: <EditProductModal.ModalBody/>,
      footer: <EditProductModal.ModalFooter/>
    });
    // this._modals.set(EDIT_PRODUCT_TYPE_MODAL_ID, <EditProductTypeModal/>);
    // this._modals.set(EDIT_PRODUCTION_LINE_MODAL_ID, <EditProductionLineModal/>);

    this._modals.set(SPINNER_MODAL_ID, {
      header: null,
      body: <ModalSpinner.ModalBody/>,
      footer: null
    });
    // this._modals.set(NEW_FACTORY_MODAL_ID, <NewFactoryModal/>);
    // this._modals.set(NEW_PRODUCER_MODAL_ID, <NewProducerModal/>);
    // this._modals.set(NEW_PRODUCT_MODAL_ID, <NewProductModal/>);
    // this._modals.set(NEW_PRODUCT_TYPE_MODAL_ID, <NewProductTypeModal/>);
    // this._modals.set(NEW_PRODUCTION_LINE_MODAL_ID, <NewProductionLineModal/>);

    this._currentModalId = 'no-id';
    this._currentModal = {
      header: null,
      body: null,
      footer: null
    };
    this._show = false;
  }

  setToShowModal(id) {
    this._currentModal = this._modals.get(id);
    this._currentModalId = id;
    this._show = true;
  }

  showModal(modal) {
    this._currentModal = this._modals.get(modal.id);
    this._currentModalId = modal.id;
    this._show = true;

    AppDispatcher.dispatch({
      action: RE_RENDER,
      emitOn: [{
        store: modal.store,
        componentIds: [modal.id]
      }]
    });

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
