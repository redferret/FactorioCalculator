import AppDispatcher from '../dispatcher.js';
import EditProducerModalStore from '../stores/edit-producer-modal-store.js';
import EditProductModalStore from '../stores/edit-product-modal-store.js';
import EditProductTypeModalStore from '../stores/edit-product-type-modal-store.js';
import GameItemsStore from '../stores/game-items-store.js';
import MainStore from '../stores/main-store.js';
import ModalsStore from '../stores/modals-store.js';
import NewProducerModalStore from '../stores/new-producer-modal-store.js';
import NewProductModalStore from '../stores/new-product-modal-store.js';
import NewProductTypeModalStore from '../stores/new-product-type-modal-store.js';
import React from 'react';
import ReactDOM from 'react-dom';
import Router from '../router.js';

import {
  Alert,
  Button,
  ButtonToolbar,
  Image,
  Label,
  ListGroup,
  ListGroupItem,
  OverlayTrigger,
  Panel,
  PanelGroup,
  Popover,
  Thumbnail,
  Well,
} from 'react-bootstrap';

import {
  EDIT_PRODUCER_MODAL_ID,
  EDIT_PRODUCT_MODAL_ID,
  EDIT_PRODUCT_TYPE_MODAL_ID,
  GAME_ITEMS_ID,
  GET_GAME_ITEMS,
  IMAGE_ASSET,
  MAIN_MODAL_CHANGE,
  NEW_PRODUCER_MODAL_ID,
  NEW_PRODUCT_MODAL_ID,
  NEW_PRODUCT_TYPE_MODAL_ID,
  RE_RENDER,
} from '../constants.js';

export default class GameItems extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleGameSelect = this.handleGameSelect.bind(this);
    this.handleNewProducerSelect = this.handleNewProducerSelect.bind(this);
    this.handleNewProductSelect = this.handleNewProductSelect.bind(this);
    this.handleNewProductTypeSelect = this.handleNewProductTypeSelect.bind(this);
    this.handleProducersSelect = this.handleProducersSelect.bind(this);
    this.handleProductTypeSelect = this.handleProductTypeSelect.bind(this);
    this.handleProductTypesSelect = this.handleProductTypesSelect.bind(this);

    this.handleSelectedProducer = this.handleSelectedProducer.bind(this);
    this.handleSelectedProduct = this.handleSelectedProduct.bind(this);
    this.handleSelectedProductType = this.handleSelectedProductType.bind(this);

    this.state = {
      productTypes: GameItemsStore.getProductTypes(),
      producers: GameItemsStore.getProducers(),
      gamePanelActiveKey: '0',
      productTypesPanelActiveKey: '0',
      productTypePanelActiveKey: '0',
      producersPanelActiveKey: '0'
    }
  }

  _onChange() {
    this.setState({
      productTypes: GameItemsStore.getProductTypes(),
      producers: GameItemsStore.getProducers()
    })
  }

  componentDidMount() {
    GameItemsStore.on(GAME_ITEMS_ID, this._onChange.bind(this));
    AppDispatcher.dispatch({
      action: GET_GAME_ITEMS,
      emitOn: [{
        store: GameItemsStore,
        componentIds: [GAME_ITEMS_ID]
      }]
    });
  }

  componentWillUnmount() {
    GameItemsStore.removeListener(GAME_ITEMS_ID, this._onChange.bind(this));
  }

  handleGameSelect(gamePanelActiveKey) {
    this.setState({gamePanelActiveKey});
  }

  handleProductTypesSelect(productTypesPanelActiveKey) {
    this.setState({productTypesPanelActiveKey});
  }

  handleProductTypeSelect(productTypePanelActiveKey) {
    this.setState({productTypePanelActiveKey});
  }

  handleProducersSelect(producersPanelActiveKey) {
    this.setState({producersPanelActiveKey});
  }

  handleNewProductSelect() {
    ModalsStore.showModal({
      id: NEW_PRODUCT_MODAL_ID,
      store: NewProductModalStore
    });
  }

  handleNewProducerSelect() {
    ModalsStore.showModal({
      id: NEW_PRODUCER_MODAL_ID,
      store: NewProducerModalStore
    });
  }

  handleSelectedProducer(producer) {
    ModalsStore.showModal({
      id: EDIT_PRODUCER_MODAL_ID,
      store: EditProducerModalStore
    });
  }

  handleNewProductTypeSelect() {
    ModalsStore.showModal({
      id: NEW_PRODUCT_TYPE_MODAL_ID,
      store: NewProductTypeModalStore
    });
  }

  handleSelectedProductType(productType) {
    ModalsStore.showModal({
      id: EDIT_PRODUCT_TYPE_MODAL_ID,
      store: EditProductTypeModalStore
    });
  }

  handleSelectedProduct(product) {
    EditProductModalStore.setSelectedProduct(product);
    ModalsStore.showModal({
      id: EDIT_PRODUCT_MODAL_ID,
      store: EditProductModalStore
    });
  }

  renderProductList(productType) {
    var length = productType.sorted_products.length
    if (length > 0) {
      var rowLength = 7;
      var columns = Math.ceil(length / rowLength);
      var reversedRows = [];
      var rows = [];
      for (var c = 0; c < columns; c++) {
        reversedRows.unshift(productType.sorted_products.slice(c*rowLength, Math.min(length, (c*rowLength) + rowLength)));
      }
      for (var i = 0; i < columns; i++) {
        rows.unshift(reversedRows.shift());
      }

      return (
        <Well><table><tbody>
          {rows.map((row, index) =>
            <tr key={index}>
              {row.map(product =>
                <td key={product.id}>
                  <Button bsStyle='link' onClick={() => this.handleSelectedProduct(product)}>
                    <img src={Router.route(IMAGE_ASSET, {fileName: product.image_file})} />{' '}
                    {product.name}
                  </Button>
                </td>
              )}
            </tr>
          )}
        </tbody></table></Well>
      );
    }
    return (
      <Alert bsStyle='warning'>No Products</Alert>
    )
  }

  renderProducersList() {
    var length = this.state.producers.length
    if (length > 0) {
      var rowLength = 5;
      var columns = Math.ceil(length / rowLength);
      var reversedRows = [];
      var rows = [];
      for (var c = 0; c < columns; c++) {
        reversedRows.unshift(this.state.producers.slice(c*rowLength, Math.min(length, (c*rowLength) + rowLength)));
      }
      for (var i = 0; i < columns; i++) {
        rows.unshift(reversedRows.shift());
      }

      return (
        <Well><table><tbody>
          {rows.map((row, index) =>
            <tr key={index}>
              {row.map(producer =>
                <td key={producer.id}>
                  <Button bsStyle='link' onClick={() => this.handleSelectedProducer(producer)}>
                    <img src={Router.route(IMAGE_ASSET, {fileName: producer.image_file})} />{' '}
                    {producer.name}
                  </Button>
                </td>
              )}
            </tr>
          )}
        </tbody></table></Well>
      );
    }
    return (
      <Alert bsStyle='warning'>No Producers</Alert>
    )
  }

  render() {

    return (
      <PanelGroup accordion id='game-panel-group'
        activeKey={this.state.gamePanelActiveKey}
        onSelect={this.handleGameSelect}
        >
        <Panel eventKey='1' bsStyle='success'>
          <Panel.Heading>
            <Panel.Title toggle>
              Game Definitions
            </Panel.Title>
          </Panel.Heading>

          <Panel.Body collapsible>
            <PanelGroup accordion id='productTypes-panel-group'
              activeKey={this.state.productTypesPanelActiveKey}
              onSelect={this.handleProductTypesSelect}
              >
              <Panel eventKey='1' bsStyle='success'>
                <Panel.Heading>
                  <Panel.Title toggle>
                    Products
                  </Panel.Title>
                </Panel.Heading>

                <Panel.Body collapsible>

                  <PanelGroup accordion id='productType-panel-group'
                    activeKey={this.state.productTypePanelActiveKey}
                    onSelect={this.handleProductTypeSelect}
                    >
                    {this.state.productTypes.map(productType =>
                      <Panel key={productType.id} eventKey={productType.id} bsStyle='success'>
                        <Panel.Heading>
                          <Panel.Title toggle>
                            <img src={Router.route(IMAGE_ASSET, {fileName: productType.image_file})} />{' '}
                            {productType.name}
                          </Panel.Title>
                        </Panel.Heading>
                        <Panel.Body collapsible>
                          {this.renderProductList(productType)}
                          <ButtonToolbar>
                            <Button onClick={this.handleNewProductSelect} bsStyle='primary'>
                              Add Product
                            </Button>
                            <Button onClick={() => this.handleSelectedProductType(productType)}>
                              Select Product Type
                            </Button>
                          </ButtonToolbar>

                        </Panel.Body>
                      </Panel>
                    )}
                  </PanelGroup>

                  <ButtonToolbar>
                    <Button onClick={this.handleNewProductTypeSelect} bsStyle='primary'>
                      Add Product Type
                    </Button>
                  </ButtonToolbar>

                </Panel.Body>
              </Panel>
            </PanelGroup>

            <PanelGroup accordion id='producer-panel-group'
              activeKey={this.state.producersPanelActiveKey}
              onSelect={this.handleProducersSelect}
              >
              <Panel eventKey='1' bsStyle='success'>
                <Panel.Heading>
                  <Panel.Title toggle>
                    Producers
                  </Panel.Title>
                </Panel.Heading>

                <Panel.Body collapsible>
                  {this.renderProducersList()}
                  <ButtonToolbar>
                    <Button onClick={this.handleNewProducerSelect} bsStyle='primary'>
                      Add Producer
                    </Button>
                  </ButtonToolbar>
                </Panel.Body>

              </Panel>
            </PanelGroup>
          </Panel.Body>
        </Panel>
      </PanelGroup>
    );
  }
}
