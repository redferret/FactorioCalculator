import AppDispatcher from '../../dispatcher.js';
import Input from '../input.js';
import MainStore from '../../stores/main-store.js';
import ModalsStore from '../../stores/modals-store.js';
import NewFactoryModalStore from '../../stores/new-factory-modal-store.js';
import React from 'react';

import {
  Button,
  ButtonToolbar,
} from 'react-bootstrap';

import {
  ADD_FACTORY,
  MAIN_ID,
  SPINNER_MODAL_ID,
} from '../../constants.js';


export class ModalHeader extends React.Component {
  render() {
    return (
      <div>Add New Factory</div>
    )
  }
}

export class ModalBody extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.handleInputChanged = this.handleInputChanged.bind(this);
  }

  handleInputChanged(event) {
    NewFactoryModalStore.setNewFactoryName(event.target.value);
  }

  render() {
    return (
      <Input name='name' type='text' label='Factory Name'
        callback={(event) => this.handleInputChanged(event)} />
    )
  }
}

export class ModalFooter extends React.Component {

  handleAddFactory() {
    let values = {
      name: NewFactoryModalStore.getNewFactoryName()
    };
    ModalsStore.hideModal();
    ModalsStore.showModal({id: SPINNER_MODAL_ID});
    AppDispatcher.dispatch({
      action: ADD_FACTORY,
      data: {
        values: values
      },
      emitOn: [{
        store: MainStore,
        componentIds: [MAIN_ID]
      }]
    })
  }

  render() {
    return (
      <ButtonToolbar>
        <Button onClick={this.handleAddFactory}>Add Factory</Button>
        <Button onClick={() => ModalsStore.hideModal()}>Cancel</Button>
      </ButtonToolbar>
    )
  }
}
