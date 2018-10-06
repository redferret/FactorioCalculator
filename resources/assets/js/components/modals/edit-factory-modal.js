import AppDispatcher from '../../dispatcher.js';
import EditFactoryModalStore from '../../stores/edit-factory-modal-store.js';
import FactoryStore from '../../stores/factory-store.js';
import Input from '../input.js';
import MainStore from '../../stores/main-store.js';
import ModalsStore from '../../stores/modals-store.js';
import React from 'react';

import {
  Alert,
  Button,
  ButtonToolbar,
  Label,
  Modal,
  Row,
  Table,
  Well,
} from 'react-bootstrap';

import {
  DELETE_FACTORY,
  EDIT_FACTORY_MODAL_ID,
  FACTORY_PANEL_,
  MAIN_ID,
  UPDATE_FACTORY,
  SPINNER_MODAL_ID,
} from '../../constants.js';

export class ModalHeader extends React.Component {
  render() {
    let factory = EditFactoryModalStore.getFactory();
    return (
      <div>{factory.name}</div>
    )
  }
}

export class ModalBody extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.handleFactoryNameChange = this.handleFactoryNameChange.bind(this);
  }

  handleFactoryNameChange(event) {
    EditFactoryModalStore.setFactoryName(event.target.value);
  }

  render() {
    let factory = EditFactoryModalStore.getFactory();
    return (
      <Row>
        <Input name='name' type='text' label='Factory Name' initialValue={factory.name}
          callback={(event) => this.handleFactoryNameChange(event)} />
      </Row>
    )
  }
}

export class ModalFooter extends React.Component {

  handleApplyChanges() {
    ModalsStore.hideModal();
    ModalsStore.showModal({id: SPINNER_MODAL_ID});
    let factory = EditFactoryModalStore.getFactory();
    AppDispatcher.dispatch({
      action: UPDATE_FACTORY,
      id: factory.id,
      name: EditFactoryModalStore.getFactoryName(),
      emitOn: [{
        store: FactoryStore,
        componentIds: [FACTORY_PANEL_ + factory.id]
      }]
    });
  }

  handleDeleteFactory() {
    let factory = EditFactoryModalStore.getFactory()
    let confirmDelete = confirm(`Are you sure you want to delete '${factory.name}'?" +
      "This will remove all production lines in this factory as well.`);
    if (confirmDelete) {
      ModalsStore.hideModal();
      ModalsStore.showModal({id: SPINNER_MODAL_ID});
      AppDispatcher.dispatch({
        action: DELETE_FACTORY,
        id: factory.id,
        emitOn: [{
          store: MainStore,
          componentIds: [MAIN_ID]
        }]
      });
    }
  }

  render() {
    return (
      <ButtonToolbar>
        <Button onClick={this.handleApplyChanges} bsStyle='success'>Apply</Button>
        <Button bsStyle='danger' onClick={this.handleDeleteFactory}>Delete Factory</Button>
        <Button onClick={() => ModalsStore.hideModal()}>Cancel</Button>
      </ButtonToolbar>
    )
  }
}
