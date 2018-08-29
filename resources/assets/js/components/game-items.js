import AppDispatcher from '../dispatcher.js';
import React from 'react';
import ReactDOM from 'react-dom';
import GameItemsStore from '../stores/game-items-store.js';

import {
  Button,
  ButtonToolbar,
  Label,
  ListGroup,
  ListGroupItem,
  Panel,
  PanelGroup,
  Well,
} from 'react-bootstrap';

import {
  GAME_ITEMS_ID
} from '../constants.js';

export default class GameItems extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleGameSelect = this.handleGameSelect.bind(this);
    this.handleProductsSelect = this.handleProductsSelect.bind(this);
    this.handleProducersSelect = this.handleProducersSelect.bind(this);

    this.state = {
      products: GameItemsStore.getProducts(),
      producers: GameItemsStore.getProducers(),
      gamePanelActiveKey: '0',
      productsPanelActiveKey: '0',
      producersPanelActiveKey: '0'
    }
  }

  _onChange() {
    this.setState({
      products: GameItemsStore.getProducts(),
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

  handleProductsSelect(productsPanelActiveKey) {
    this.setState({productsPanelActiveKey});
  }

  handleProducersSelect(producersPanelActiveKey) {
    this.setState({producersPanelActiveKey});
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
              <PanelGroup accordion id='product-panel-group'
                activeKey={this.state.productsPanelActiveKey}
                onSelect={this.handleProductsSelect}
                >
                <Panel eventKey='1' bsStyle='success'>
                  <Panel.Heading>
                    <Panel.Title toggle>
                      Game Products
                    </Panel.Title>
                  </Panel.Heading>

                  <Panel.Body collapsible>
                    <ListGroup>
                      {this.state.products.map(product => {
                        return <ListGroupItem>
                          {product.name}
                        </ListGroupItem>
                      })}
                    </ListGroup>
                  </Panel.Body>

                </Panel>
              </PanelGroup>
              <ButtonToolbar>
                <Button>Add Product</Button>
              </ButtonToolbar>
            </Well>

            <Well>
              <PanelGroup accordion id='producer-panel-group'
                activeKey={this.state.producersPanelActiveKey}
                onSelect={this.handleProducersSelect}
                >
                <Panel eventKey='1' bsStyle='success'>
                  <Panel.Heading>
                    <Panel.Title toggle>
                      Game Producers
                    </Panel.Title>
                  </Panel.Heading>

                  <Panel.Body collapsible>
                    <ListGroup>
                      {this.state.producers.map(producer => {
                        return <ListGroupItem>
                          {producer.name}
                        </ListGroupItem>
                      })}
                    </ListGroup>
                  </Panel.Body>

                </Panel>
              </PanelGroup>
              <ButtonToolbar>
                <Button>Add Producer</Button>
              </ButtonToolbar>
            </Well>

          </Panel.Body>
        </Panel>
      </PanelGroup>
    );
  }
}
