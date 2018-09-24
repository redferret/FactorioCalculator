import AppDispatcher from '../../dispatcher.js';
import EditProductTypeModalStore from '../../stores/edit-product-type-modal-store.js';
import GameItemsStore from '../../stores/game-items-store.js';
import Input from '../input.js';
import ModalsStore from '../../stores/modals-store.js';
import React from 'react';
import Router from '../../router.js';

import {
  Alert,
  Button,
  ButtonToolbar,
  Col,
  Form,
  Grid,
  Label,
  Modal,
  Row,
  Table,
  Well,
} from 'react-bootstrap';

import {
  DELETE_PRODUCT_TYPE,
  EDIT_PRODUCT_TYPE_MODAL_ID,
  GAME_ITEMS_ID,
  IMAGE_ASSET,
  SPINNER_MODAL_ID,
  UPDATE_PRODUCT_TYPE,
} from '../../constants.js';

export class ModalHeader extends React.Component {
  render() {
    let productType = EditProductTypeModalStore.getProductType();
    return (
      <Form inline>
        <Input initialValue={productType.name} isStatic={true}
          label={
            <img src={Router.route(IMAGE_ASSET, {fileName: productType.image_file})} />
          }
        />
      </Form>
    )
  }
}

export class ModalBody extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.updateNameValue = this.updateNameValue.bind(this);
  }

  updateNameValue(event) {
    EditProductTypeModalStore.setProductTypeName(event.target.value);
  }

  render() {
    let productType = EditProductTypeModalStore.getProductType();
    return (
      <Grid>
        <Row>
          <Col md={3}>
            <Input type='text' name='name' initialValue={productType.name} label='Name'
              callback={(event) => this.updateNameValue(event)}/>
          </Col>
        </Row>
      </Grid>
    )
  }
}

export class ModalFooter extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.handleApplyProductTypeChanges = this.handleApplyProductTypeChanges.bind(this);
  }

  handleApplyProductTypeChanges() {
    let productType = EditProductTypeModalStore.getProductType();
    ModalsStore.hideModal();
    ModalsStore.showModal({id: SPINNER_MODAL_ID});
    AppDispatcher.dispatch({
      action: UPDATE_PRODUCT_TYPE,
      data: {
        id: productType.id,
        name: EditProductTypeModalStore.getProductTypeName()
      },
      emitOn: [{
        store: GameItemsStore,
        componentIds: [GAME_ITEMS_ID]
      }]
    });
  }

  handleDeleteProductType() {
    let productType = EditProductTypeModalStore.getProductType();
    let confirmDelete = confirm("Are you sure you want to delete '" + productType.name + "'? " +
      "This will also remove all products in this category.");
    if (confirmDelete) {
      let isEmpty = productType.products.length < 1;
      if (isEmpty) {
        ModalsStore.hideModal();
        ModalsStore.showModal({id: SPINNER_MODAL_ID});
        AppDispatcher.dispatch({
          action: DELETE_PRODUCT_TYPE,
          data: {
            id: productType.id
          },
          emitOn: [{
            store: GameItemsStore,
            componentIds: [GAME_ITEMS_ID]
          }]
        });
      } else {
        alert("In order to safely delete this category each product needs to be deleted. If there are production lines " +
         "producing these products you must remove that product from the production line to delete that product.");
      }
    }
  }

  render() {
    return (
      <ButtonToolbar>
        <Button bsStyle='success' onClick={this.handleApplyProductTypeChanges}>Apply</Button>
        <Button bsStyle='danger' onClick={this.handleDeleteProductType}>Delete Product Type</Button>
        <Button onClick={() => {ModalsStore.hideModal()}}>Cancel</Button>
      </ButtonToolbar>
    )
  }
}
