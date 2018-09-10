import AppDispatcher from '../../dispatcher.js';
import FactoryStore from '../../stores/factory-store';
import GameItemsStore from '../../stores/game-items-store.js';
import Input from '../input.js';
import ItemTable from '../item-table.js';
import ModalsStore from '../../stores/modals-store.js';
import NewProductionLineModalStore from '../../stores/new-production-line-modal-store.js';
import React from 'react';
import Router from '../../router.js';
import TabbedItems from '../tabbed-items.js';

import {
  Button,
  ButtonToolbar,
  Col,
  Grid,
  Label,
  Nav,
  NavItem,
  Row,
  Tab,
  Well,
} from 'react-bootstrap';

import {
  ADD_PRODUCTION_LINE,
  IMAGE_ASSET,
  NEW_PRODUCTION_LINE_MODAL_ID,
  SPINNER_MODAL_ID,
} from '../../constants.js';

export class ModalHeader extends React.Component {
  render() {
    return (
      <div>New Production Line</div>
    )
  }
}

export class ModalBody extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleItemsPerSecondChange = this.handleItemsPerSecondChange.bind(this);
    this.handleReselectProduct = this.handleReselectProduct.bind(this);
    this.handleReselectProducer = this.handleReselectProducer.bind(this);
    this.handleProductSelect = this.handleProductSelect.bind(this);
    this.handleProducerSelect = this.handleProducerSelect.bind(this);

    this.state = {
      selectedProduct: null,
      selectedProducer: null
    }
  }

  handleProducerSelect(producer) {
    NewProductionLineModalStore.setProducer(producer);
    this.setState({
      selectedProducer: NewProductionLineModalStore.getProducer()
    })
  }

  handleProductSelect(product) {
    NewProductionLineModalStore.setProduct(product);
    this.setState({
      selectedProduct: NewProductionLineModalStore.getProduct()
    });
  }

  handleNameChange(event) {
    NewProductionLineModalStore.setName(event.target.value);
  }

  handleItemsPerSecondChange(event) {
    NewProductionLineModalStore.setItemsPerSecond(event.target.value);
  }

  handleReselectProducer() {
    NewProductionLineModalStore.setProducer(null);
    this.setState({
      selectedProducer: null
    });
  }

  handleReselectProduct() {
    NewProductionLineModalStore.setProduct(null);
    this.setState({
      selectedProduct: null
    });
  }

  renderSelectProduct() {
    let selectedProduct = this.state.selectedProduct;
    let productTypes = GameItemsStore.getProductTypes();
    return (selectedProduct == null?
      <div>
        <h4>Select a product that will be produced</h4>
        <TabbedItems tabs={productTypes} sm={12}
          tabCallback={(productType) =>
            <div>
              <h4><Label>{productType.name}</Label></h4>
              <img src={Router.route(IMAGE_ASSET, {fileName:productType.image_file})}/>
            </div>
          }
          tabContentCallback={(productType) =>
            <ItemTable items={productType.sorted_products} rowLength={3}
              onClickCallback={this.handleProductSelect} sm={3}
              itemCallback={(product) =>
                <div>
                  <img src={Router.route(IMAGE_ASSET, {fileName: product.image_file})} />{' '}
                  {product.name}
                </div>
              }/>
          }/>
      </div>
       :
      <div>
        <h4>Selected Product to be Produced:</h4>
        <img src={Router.route(IMAGE_ASSET, {fileName: selectedProduct.image_file})} />
        {selectedProduct.name}
        <ButtonToolbar>
          <Button bsSize='xsmall' onClick={this.handleReselectProduct}>Change Selected Product</Button>
        </ButtonToolbar>
      </div>
    )
  }

  renderSelectProducer() {
    let selectedProducer = NewProductionLineModalStore.getProducer();
    let producers = GameItemsStore.getProducers();
    return (selectedProducer == null?
      <div>
        <h4>Select a producer</h4>
        <ItemTable items={producers} rowLength={3}
          onClickCallback={this.handleProducerSelect} sm={3}
          itemCallback={(producer) =>
            <div>
              <img src={Router.route(IMAGE_ASSET, {fileName: producer.image_file})} />
              {producer.name}
            </div>
          }/>
      </div>
       :
      <div>
        <h4>Selected a Producer:</h4>
        <img src={Router.route(IMAGE_ASSET, {fileName: selectedProducer.image_file})} />
        {selectedProducer.name}
        <ButtonToolbar>
          <Button bsSize='xsmall' onClick={this.handleReselectProducer}>Change Selected Producer</Button>
        </ButtonToolbar>
      </div>
    )
  }

  render() {
    return (
      <Grid>
        <Row>
          <Col sm={3}>
            <Input name='name' type='text' label='Production Line Name'
              initialValue={NewProductionLineModalStore.getName()}
              callback={(event)=>this.handleNameChange(event)}/>
            <Input name='items_per_second' type='number' label='Initial Items Per Second'
              initialValue={NewProductionLineModalStore.getItemsPerSecond()}
              callback={(event)=>this.handleItemsPerSecondChange(event)}/>
          </Col>
        </Row>
        <Row>
          <Col sm={6}>
            {this.renderSelectProduct()}
            {this.renderSelectProducer()}
          </Col>
        </Row>
      </Grid>
    )
  }
}

export class ModalFooter extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.handleAddProductionLine = this.handleAddProductionLine.bind(this);
  }

  handleAddProductionLine() {
    let values = {};
    values['items_per_second'] = NewProductionLineModalStore.getItemsPerSecond();
    values['name'] = NewProductionLineModalStore.getName();
    values['producer'] = NewProductionLineModalStore.getProducer();
    values['product'] = NewProductionLineModalStore.getProduct();
    values['factory_id'] = NewProductionLineModalStore.getFactoryId();
    ModalsStore.hideModal();
    ModalsStore.showModal({id: SPINNER_MODAL_ID});
    AppDispatcher.dispatch({
      action: ADD_PRODUCTION_LINE,
      data: {
        values: values
      },
      emitOn: [{
        store: FactoryStore,
        componentIds: [NewProductionLineModalStore.getFactoryComponentId()]
      }]
    })
  }

  render() {
    return (
      <ButtonToolbar>
        <Button bsStyle='success' onClick={this.handleAddProductionLine}>Add Production Line</Button>
        <Button onClick={() => ModalsStore.hideModal()}>Cancel</Button>
      </ButtonToolbar>
    )
  }
}
