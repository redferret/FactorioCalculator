import React from 'react';
import ReactDOM from 'react-dom';

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

export default class GameItems extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleGameSelect = this.handleGameSelect.bind(this);

    this.state = {
      gamePanelActiveKey: '0'
    }
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
              <h3><Label bsStyle='success'>Game Products</Label></h3>
              <ListGroup>
                <ListGroupItem>Item 1</ListGroupItem>
                <ListGroupItem>Item 2</ListGroupItem>
              </ListGroup>
              <ButtonToolbar>
                <Button>Add Product</Button>
              </ButtonToolbar>
            </Well>
            <Well>
              <h3><Label bsStyle='success'>Game Producers</Label></h3>
              <ListGroup>
                <ListGroupItem>Item 1</ListGroupItem>
                <ListGroupItem>Item 2</ListGroupItem>
              </ListGroup>
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
