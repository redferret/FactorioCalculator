import AppDispatcher from '../../dispatcher.js';
import Input from '../input.js';
import GameItemsStore from '../../stores/game-items-store.js';
import ModalsStore from '../../stores/modals-store.js';
import NewProductTypeModalStore from '../../stores/new-product-type-modal-store.js';
import React from 'react';

import {
  Alert,
  Button,
  ButtonToolbar,
  Grid,
  Col,
  Row,
} from 'react-bootstrap';

import {
  ADD_PRODUCT_TYPE,
  GAME_ITEMS_ID,
  SPINNER_MODAL_ID,
} from '../../constants.js';

export class ModalHeader extends React.Component {
  render() {
    return (
      <div>New Product Type</div>
    );
  }
}

export class ModalBody extends React.Component {

  handleInputChange(event) {
    let values = NewProductTypeModalStore.getValues();
    values[event.target.name] = event.target.value;
  }

  render() {
    return (
      <Grid>
        <Row>
          <Col sm={6}>
            <Input name='name' type='text' label='Name of Product Type'
              callback={this.handleInputChange} />
            <Input name='image_file' type='text' label='Image File'
              help='Pulls Image from external site wiki.factorio.com'
              callback={this.handleInputChange}/>
          </Col>
        </Row>
      </Grid>
    )
  }
}

export class ModalFooter extends React.Component {

  handleAddNewProductType() {
    ModalsStore.hideModal();
    ModalsStore.showModal({id: SPINNER_MODAL_ID});
    AppDispatcher.dispatch({
      action: ADD_PRODUCT_TYPE,
      data: {
        values: NewProductTypeModalStore.getValues()
      },
      emitOn: [{
        store: GameItemsStore,
        componentIds: [GAME_ITEMS_ID]
      }]
    });
  }

  render() {
    return (
      <ButtonToolbar>
        <Button bsStyle='success' onClick={this.handleAddNewProductType}>Add Product Type</Button>
        <Button onClick={()=>ModalsStore.hideModal()}>Cancel</Button>
      </ButtonToolbar>
    );
  }
}
