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

    this.state = {
      gamePanelActiveKey: '0'
    }
  }

  _onChange() {

  }

  componentDidMount() {
    GameItemsStore.on(GAME_ITEMS_ID, this._onChange.bind(this));
  }

  componentWillUnmount() {
    GameItemsStore.removeListener(GAME_ITEMS_ID, this._onChange.bind(this));
  }

  handleGameSelect(gamePanelActiveKey) {
    this.setState({gamePanelActiveKey});
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
              <PanelGroup>
                <Panel bsStyle='success'>
                  <Panel.Heading>
                    Game Products
                  </Panel.Heading>
                  <Panel.Body>
                    <ListGroup>
                      <ListGroupItem>Item 1</ListGroupItem>
                      <ListGroupItem>Item 2</ListGroupItem>
                    </ListGroup>
                  </Panel.Body>
                </Panel>
              </PanelGroup>
              <ButtonToolbar>
                <Button>Add Product</Button>
              </ButtonToolbar>
            </Well>
            <Well>
              <PanelGroup>
                <Panel bsStyle='success'>
                  <Panel.Heading>
                    Game Producers
                  </Panel.Heading>
                  <Panel.Body>
                    <ListGroup>
                      <ListGroupItem>Item 1</ListGroupItem>
                      <ListGroupItem>Item 2</ListGroupItem>
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
