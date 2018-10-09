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
    this.handleValueChanged = this.handleValueChanged.bind(this);
    this.handleReselectProduct = this.handleReselectProduct.bind(this);
    this.handleReselectProducer = this.handleReselectProducer.bind(this);
    this.handleProductSelect = this.handleProductSelect.bind(this);
    this.handleProducerSelect = this.handleProducerSelect.bind(this);

    this.state = NewProductionLineModalStore.getValues();
  }

  _onChange() {
    this.setState(NewProductionLineModalStore.getValues());
  }

  componentDidMount() {
    NewProductionLineModalStore.on(NEW_PRODUCTION_LINE_MODAL_ID, this._onChange.bind(this));
  }

  componentWillUnmount() {
    NewProductionLineModalStore.removeListener(NEW_PRODUCTION_LINE_MODAL_ID, this._onChange.bind(this));
  }

  handleValueChanged(event) {
    event.preventDefault();
    let key = event.target.name;
    let value = event.target.value;
    NewProductionLineModalStore.setValue(key, value);
    this.setState({
      [key]: value
    });
  }

  handleProducerSelect(producer) {
    NewProductionLineModalStore.setValue('selectedProducer', producer);
    this.setState({
      selectedProducer: producer
    })
  }

  handleProductSelect(product) {
    NewProductionLineModalStore.setValue('selectedProduct', product);
    this.setState({
      selectedProduct: product
    });
  }

  handleReselectProducer() {
    NewProductionLineModalStore.setValue('selectedProducer', null);
    this.setState({
      selectedProducer: null
    });
  }

  handleReselectProduct() {
    NewProductionLineModalStore.setValue('selectedProducer', null);
    NewProductionLineModalStore.setValue('selectedProduct', null);
    this.setState({
      selectedProduct: null,
      selectedProducer: null
    });
  }

  renderSelectProduct() {
    let selectedProduct = this.state.selectedProduct;
    let productTypes = GameItemsStore.getProductTypes();
    return (selectedProduct == null?
      <div>
        <h4>Select a product:</h4>
        <TabbedItems tabs={productTypes} sm={12}
          tabCallback={(productType) =>
            <div>
              <h4><Label>{productType.name}</Label></h4>
              <img src={Router.plainRoute(IMAGE_ASSET, {fileName:productType.image_file})}/>
            </div>
          }
          tabContentCallback={(productType) =>
            <div className='production-lines-well'>
              <ItemTable items={productType.products} rowLength={4}
                onClickCallback={this.handleProductSelect} sm={3}
                itemCallback={(product) =>
                  <div>
                    <img src={Router.plainRoute(IMAGE_ASSET, {fileName: product.image_file})} />{' '}
                    {product.name}
                  </div>
                }/>
            </div>
          }/>
      </div>
       :
      <div>
        <h4>Selected Product:</h4>
        <img src={Router.plainRoute(IMAGE_ASSET, {fileName: selectedProduct.image_file})} />
        {selectedProduct.name}
        <ButtonToolbar>
          <Button bsSize='xsmall' onClick={this.handleReselectProduct}>Change Selected Product</Button>
        </ButtonToolbar>
      </div>
    )
  }

  renderSelectProducer() {
    let selectedProducer = this.state.selectedProducer;
    let producers = GameItemsStore.getProducers();

    if (this.state.selectedProduct != null) {
      producers = this.state.selectedProduct.producers;
    }

    return (selectedProducer == null?
      <div>
        <h4>Select a producer</h4>
        <div className='production-lines-well'>
          <ItemTable items={producers} rowLength={3}
            onClickCallback={this.handleProducerSelect} sm={4}
            itemCallback={(producer) =>
              <div>
                <img src={Router.plainRoute(IMAGE_ASSET, {fileName: producer.image_file})} />
                {producer.name}
              </div>
            }/>
        </div>
      </div>
       :
      <div>
        <h4>Selected Producer:</h4>
        <img src={Router.plainRoute(IMAGE_ASSET, {fileName: selectedProducer.image_file})} />
        {selectedProducer.name}
        <ButtonToolbar>
          <Button bsSize='xsmall' onClick={this.handleReselectProducer}>Change Selected Producer</Button>
        </ButtonToolbar>
      </div>
    );
  }

  render() {
    return (
      <div>
        <Row>
          <Col sm={6}>
            <Input name='name' type='text' label='Production Line Name'
              initialValue={this.state.name}
              callback={this.handleValueChanged}/>
          </Col>
        </Row>
        <Row>
          <Col sm={4}>
            <Input name='items_per_second' type='number' label='Initial Items Per Second'
              initialValue={this.state.items_per_second}
              callback={this.handleValueChanged}/>
          </Col>
        </Row>
        <Row>
          <Col sm={12}>
            {this.renderSelectProduct()}
            {this.renderSelectProducer()}
          </Col>
        </Row>
      </div>
    )
  }
}

export class ModalFooter extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.handleAddProductionLine = this.handleAddProductionLine.bind(this);
  }

  handleAddProductionLine() {
    let producer = NewProductionLineModalStore.getValue('selectedProducer');
    let product = NewProductionLineModalStore.getValue('selectedProduct');
    let name = NewProductionLineModalStore.getValue('name');
    if (producer != null) {
      if (/(.|\s)*\S(.|\s)*/.test(name)) {
        this.addProductionLine();
      } else {
        alert('Production Line Name is Invalid');
      }
    } else {
      alert('Please pick a Producer');
    }
  }

  addProductionLine() {
    ModalsStore.hideModal();
    ModalsStore.showModal({id: SPINNER_MODAL_ID});
    AppDispatcher.dispatch({
      action: ADD_PRODUCTION_LINE,
      values: NewProductionLineModalStore.getValues(),
      emitOn: [{
        store: FactoryStore,
        componentIds: [NewProductionLineModalStore.getFactoryComponentId()]
      }]
    });
  }

  closeModal() {
    ModalsStore.hideModal();
    NewProductionLineModalStore.reset();
  }

  render() {
    return (
      <ButtonToolbar>
        <Button bsStyle='success' onClick={this.handleAddProductionLine}>Add Production Line</Button>
        <Button onClick={this.closeModal}>Cancel</Button>
      </ButtonToolbar>
    )
  }
}
