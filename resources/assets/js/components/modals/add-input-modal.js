import AppDispatcher from '../../dispatcher.js';
import AddInputModalStore from '../../stores/add-input-modal-store.js';
import ModalsStore from '../../stores/modals-store.js';
import React from 'react';

import {
  Button,
  ButtonToolbar,
  Grid,
  Row,
  Col,
} from 'react-bootstrap';

import {
  ADD_INPUT,
  SPINNER_MODAL_ID,
} from '../../constants.js';

export class ModalHeader extends React.Component {
  
  render() {
    let productionLine = AddInputModalStore.getProductionLine();
    return (
      <div>Add Input to {productionLine.name}</div>
    );
  }
}

export class ModalBody extends React.Component {
  render() {
    return (
      <Grid>
        Modal Body
      </Grid>
    );
  }
}

export class ModalFooter extends React.Component {
  render() {
    return (
      <ButtonToolbar>
        <Button onClick={()=>ModalsStore.hideModal()}>Cancel</Button>
      </ButtonToolbar>
    )
  }
}
