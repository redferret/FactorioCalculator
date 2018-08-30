import AppDispatcher from '../dispatcher.js';
import GameItemsStore from '../stores/game-items-store.js';
import React from 'react';
import ReactDOM from 'react-dom';

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

import { ROOT } from '../routes.js';

import {
  GAME_ITEMS_ID,
  GET_GAME_ITEMS,
} from '../constants.js';

export default class GameItems extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleGameSelect = this.handleGameSelect.bind(this);
    this.handleProductTypesSelect = this.handleProductTypesSelect.bind(this);
    this.handleProductTypeSelect = this.handleProductTypeSelect.bind(this);
    this.handleProducersSelect = this.handleProducersSelect.bind(this);

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

  renderProductList(productType) {
    if (productType.products.length > 0) {
      return (
        <Well>
          {productType.products.map(product =>
            <div key={product.id}>
              <img src={ROOT + '/images/' + product.image_name} />{' '}
              {product.name}
            </div>
          )}
        </Well>
      );
    }
    return (
      <Alert bsStyle='warning'>No Products</Alert>
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

            <Well>
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
                              <img src={ROOT + '/images/' + productType.image_name} />{' '}
                              {productType.name}
                            </Panel.Title>
                          </Panel.Heading>
                          <Panel.Body collapsible>
                            {this.renderProductList(productType)}
                            <ButtonToolbar>
                              <Button bsStyle='primary'>Add Product</Button>
                            </ButtonToolbar>

                          </Panel.Body>
                        </Panel>
                      )}
                    </PanelGroup>

                    <ButtonToolbar>
                      <Button bsStyle='primary'>Add Product Type</Button>
                    </ButtonToolbar>

                  </Panel.Body>
                </Panel>
              </PanelGroup>
            </Well>

            <Well>
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
                    <ListGroup>
                      {this.state.producers.map(producer =>
                        <ListGroupItem key={producer.id}>
                          <img src={ROOT + '/images/' + producer.image_name} />{' '}
                          {producer.name}
                        </ListGroupItem>
                      )}
                    </ListGroup>
                  </Panel.Body>

                </Panel>
              </PanelGroup>
              <ButtonToolbar>
                <Button bsStyle='primary'>Add Producer</Button>
              </ButtonToolbar>
            </Well>

          </Panel.Body>
        </Panel>
      </PanelGroup>
    );
  }
}
