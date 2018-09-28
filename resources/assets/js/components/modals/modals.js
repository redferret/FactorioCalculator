
import * as EditFactoryModal from './edit-factory-modal.js';
import * as EditInputsModal from './edit-inputs-modal.js';
import * as EditProductionLineModal from './edit-production-line-modal.js';
import * as ModalSpinner from './modal-spinner.js';
import * as NewFactoryModal from './new-factory-modal.js';
import * as NewProductionLineModal from './new-production-line-modal.js';
import ModalsRepository from '../../stores/modals-repository.js'
import React from 'react';

import {
  EDIT_FACTORY_MODAL_ID,
  EDIT_INPUTS_MODAL_ID,
  EDIT_PRODUCTION_LINE_MODAL_ID,
  NEW_FACTORY_MODAL_ID,
  NEW_PRODUCTION_LINE_MODAL_ID,
  SPINNER_MODAL_ID,
} from '../../constants.js';

ModalsRepository.registerModal(EDIT_INPUTS_MODAL_ID, {
  header: <EditInputsModal.ModalHeader/>,
  body: <EditInputsModal.ModalBody/>,
  footer: <EditInputsModal.ModalFooter/>,
  modalSize: 'large'
})

ModalsRepository.registerModal(EDIT_FACTORY_MODAL_ID, {
  header: <EditFactoryModal.ModalHeader/>,
  body: <EditFactoryModal.ModalBody/>,
  footer: <EditFactoryModal.ModalFooter/>,
});

ModalsRepository.registerModal(EDIT_PRODUCTION_LINE_MODAL_ID, {
  header: <EditProductionLineModal.ModalHeader/>,
  body: <EditProductionLineModal.ModalBody/>,
  footer: <EditProductionLineModal.ModalFooter/>,
  modalSize: 'large'
});

ModalsRepository.registerModal(NEW_FACTORY_MODAL_ID, {
  header: <NewFactoryModal.ModalHeader/>,
  body: <NewFactoryModal.ModalBody/>,
  footer: <NewFactoryModal.ModalFooter/>
});

ModalsRepository.registerModal(NEW_PRODUCTION_LINE_MODAL_ID, {
  header: <NewProductionLineModal.ModalHeader/>,
  body: <NewProductionLineModal.ModalBody/>,
  footer: <NewProductionLineModal.ModalFooter/>,
  modalSize: 'large'
});

ModalsRepository.registerModal(SPINNER_MODAL_ID, {
  header: null,
  body: <ModalSpinner.ModalBody/>,
  footer: null
});
