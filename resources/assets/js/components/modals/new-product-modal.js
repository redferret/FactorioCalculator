import AppDispatcher from '../../dispatcher.js';
import GameItemsStore from '../../stores/game-items-store.js';
import Input from '../input.js';
import ItemTable from '../item-table.js';
import ModalsStore from '../../stores/modals-store.js';
import NewProductModalStore from '../../stores/new-product-modal-store.js';
import React from 'react';
import Router from '../../router.js';
import SearchableDropdown from '../searchable-dropdown.js';

import {
  Alert,
  Button,
  ButtonToolbar,
  Checkbox,
  Col,
  Grid,
  Row,
} from 'react-bootstrap';

import {
  ADD_PRODUCT,
  GAME_ITEMS_ID,
  IMAGE_ASSET,
  NEW_PRODUCT_MODAL_ID,
  SPINNER_MODAL_ID,
} from '../../constants.js';

export class ModalHeader extends React.Component {
  render() {
    return (
      <div>
        New Product
      </div>
    );
  }
}

export class ModalBody extends React.Component {

  constructor() {
    super();
    this.handleRemoveProduct = this.handleRemoveProduct.bind(this);
    this.handleProductSelect = this.handleProductSelect.bind(this);
    this.handleConsumerRequirementInput = this.handleConsumerRequirementInput.bind(this);
    this.state = {
      consumerProducts: []
    }
  }

  handleInputChange(event) {
    let values = NewProductModalStore.getValues();
    if (event.target.name == 'is_fluid') {
      values[event.target.name] = $('[name="is_fluid"]').is(':checked');
    } else {
      values[event.target.name] = event.target.value;
    }
    NewProductModalStore.setValues(values);
  }

  handleProductSelect(product) {
    NewProductModalStore.addConsumerProduct(product);
    this.setState({
      consumerProducts: NewProductModalStore.getConsumerProducts()
    })
  }

  handleRemoveProduct(product) {
    NewProductModalStore.removeConsumerProduct(product);
    this.setState({
      consumerProducts: NewProductModalStore.getConsumerProducts()
    })
  }

  handleConsumerRequirementInput(event, product) {
    product.consumer_requirement = event.target.value;
  }

  render() {
    let products = GameItemsStore.getProducts();
    let defaultValues = NewProductModalStore.getValues();
    return (
      <Grid>
        <Row>
          <Col sm={3}>
            <Input name='name' type='text' label='Product Name'
              initialValue={defaultValues.name}
              callback={this.handleInputChange}/>
            <Input name='crafting_time' type='number' label='Crafting Time'
              initialValue={defaultValues.crafting_time}
              callback={this.handleInputChange}/>
            <Input name='image_file' type='text' label='Image File'
              help='Pulls Image from external site wiki.factorio.com'
              callback={this.handleInputChange}/>
            <h4>Select Input Products</h4>
            <SearchableDropdown id='consumer-requirements' toggleText='Products' items={products}
              itemSelectCallback={this.handleProductSelect}
              itemCallback={(product) => product.name} />
            <ItemTable items={this.state.consumerProducts} rowLength={2}
              emptyItemsMessage='No Inputs'
              onClickCallback={this.handleRemoveProduct}
              itemCallback={(product) =>
                <div>
                  <img src={Router.route(IMAGE_ASSET, {fileName: product.image_file})} />
                  {product.name}
                </div>
              }
              itemContent={(product) =>
                <Input type='number' name='consumer_requirement' label='Consumer Requirement'
                  initialValue={product.consumer_requirement}
                  callback={(event) => this.handleConsumerRequirementInput(event, product)} />
              }/>
            <div className='help-text'>
              <p>
                Select products from the dropdown that are consumed by this product.
                To remove the product, click the icon.
              </p>
            </div>
          </Col>
          <Col sm={3}>
            <Input name='hardness' type='number' label='Hardness' help='Set to 0 if not an ore'
              initialValue={defaultValues.hardness}
              callback={this.handleInputChange}/>
            <Input name='stock_size' type='number' label='Stock Size' help='The number of products produced at a time. i.e. 2 Copper Wire for each Copper Plate'
              initialValue={defaultValues.stock_size}
              callback={this.handleInputChange}/>
            <Checkbox name='is_fluid' onChange={this.handleInputChange}>
              Product is a Fluid
            </Checkbox>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export class ModalFooter extends React.Component {

  handleAddProduct() {
    ModalsStore.hideModal();
    ModalsStore.showModal({id: SPINNER_MODAL_ID});
    AppDispatcher.dispatch({
      action: ADD_PRODUCT,
      data: {
        values: NewProductModalStore.getValues(),
        consumerProducts: NewProductModalStore.getConsumerProducts()
      },
      emitOn: [{
        store: GameItemsStore,// Optimize this, just emit a change on products
        componentIds: [GAME_ITEMS_ID]
      }]
    })
  }

  render() {
    return (
      <ButtonToolbar>
        <Button bsStyle='success' onClick={this.handleAddProduct}>Add Product</Button>
        <Button onClick={() => ModalsStore.hideModal()}>Cancel</Button>
      </ButtonToolbar>
    );
  }
}
