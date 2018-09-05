
import * as EditFactoryModal from './edit-factory-modal.js';
import * as EditProducerModal from './edit-producer-modal.js';
import * as EditProductionLineModal from './edit-production-line-modal.js';
import * as EditProductModal from './edit-product-modal.js';
import * as EditProductTypeModal from './edit-product-type-modal.js';
import * as ModalSpinner from './modal-spinner.js';
import * as NewFactoryModal from './new-factory-modal.js';

import MainStore from '../../stores/main-store.js';
import ModalsRepository from '../../stores/modals-repository.js'
import React from 'react';

import NewProducerModal from './new-producer-modal.js';
import NewProductionLineModal from './new-production-line-modal.js';
import NewProductModal from './new-product-modal.js';
import NewProductTypeModal from './new-product-type-modal.js';

import {
  EDIT_FACTORY_MODAL_ID,
  EDIT_PRODUCER_MODAL_ID,
  EDIT_PRODUCT_MODAL_ID,
  EDIT_PRODUCT_TYPE_MODAL_ID,
  EDIT_PRODUCTION_LINE_MODAL_ID,
  NEW_FACTORY_MODAL_ID,
  NEW_PRODUCER_MODAL_ID,
  NEW_PRODUCT_MODAL_ID,
  NEW_PRODUCT_TYPE_MODAL_ID,
  NEW_PRODUCTION_LINE_MODAL_ID,
  SPINNER_MODAL_ID,
} from '../../constants.js';

ModalsRepository.registerModal(EDIT_FACTORY_MODAL_ID, {
  header: <EditFactoryModal.ModalHeader/>,
  body: <EditFactoryModal.ModalBody/>,
  footer: <EditFactoryModal.ModalFooter/>,
});

ModalsRepository.registerModal(EDIT_PRODUCER_MODAL_ID, {
  header: <EditProducerModal.ModalHeader/>,
  body: <EditProducerModal.ModalBody/>,
  footer: <EditProducerModal.ModalFooter/>,
});

ModalsRepository.registerModal(EDIT_PRODUCT_MODAL_ID, {
  header: <EditProductModal.ModalHeader/>,
  body: <EditProductModal.ModalBody/>,
  footer: <EditProductModal.ModalFooter/>
});

ModalsRepository.registerModal(EDIT_PRODUCT_TYPE_MODAL_ID, {
  header: <EditProductTypeModal.ModalHeader/>,
  body: <EditProductTypeModal.ModalBody/>,
  footer: <EditProductTypeModal.ModalFooter/>
});

ModalsRepository.registerModal(EDIT_PRODUCTION_LINE_MODAL_ID, {
  header: <EditProductionLineModal.ModalHeader/>,
  body: <EditProductionLineModal.ModalBody/>,
  footer: <EditProductionLineModal.ModalFooter/>,
  modalSize: 'large'
});

ModalsRepository.registerModal(SPINNER_MODAL_ID, {
  header: null,
  body: <ModalSpinner.ModalBody/>,
  footer: null
});

ModalsRepository.registerModal(NEW_FACTORY_MODAL_ID, {
  header: <NewFactoryModal.ModalHeader/>,
  body: <NewFactoryModal.ModalBody/>,
  footer: <NewFactoryModal.ModalFooter/>
});

// ModalsRepository.registerModal(NEW_PRODUCER_MODAL_ID, <NewProducerModal/>);
// ModalsRepository.registerModal(NEW_PRODUCT_MODAL_ID, <NewProductModal/>);
// ModalsRepository.registerModal(NEW_PRODUCT_TYPE_MODAL_ID, <NewProductTypeModal/>);
// ModalsRepository.registerModal(NEW_PRODUCTION_LINE_MODAL_ID, <NewProductionLineModal/>);
