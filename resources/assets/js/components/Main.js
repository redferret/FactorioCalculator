
import AppDispatcher from '../dispatcher.js';
import Factory from './factory.js';
import FactoryStore from '../stores/factory-store.js';
import GameItems from './game-items.js';
import MainStore from '../stores/main-store.js';
import ModalsStore from '../stores/modals-store.js';
import NewFactoryModalStore from '../stores/new-factory-modal-store.js';
import PartialModal from './modals/partial-modal.js';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import {
  Alert,
  Button,
  ButtonToolbar,
  Label,
  ListGroup,
  ListGroupItem,
  Panel,
  PanelGroup,
  Well,
} from 'react-bootstrap';

import { RootElement } from '../bootstrap.js';

import {
  GET_FACTORIES,
  INITIAL_APP_LOAD,
  MAIN_ID,
  NEW_FACTORY_MODAL_ID,
  RE_RENDER,
} from '../constants.js';

class Main extends Component {

  constructor(props, context) {
    super(props, context);

    this.handleGameSelect = this.handleGameSelect.bind(this);
    this.handleFactorySelect = this.handleFactorySelect.bind(this);
    this.handleNewFactory = this.handleNewFactory.bind(this);
    this.state = {
      factoryPanelActiveKey: '0',
      factories: []
    };
  }

  _onChange() {
    this.setState({
      factories: FactoryStore.getFactories()
    });
  }

  handleNewFactory() {
    ModalsStore.showModal({
      id: NEW_FACTORY_MODAL_ID,
      store: NewFactoryModalStore
    });
  }

  handleFactorySelect(factoryPanelActiveKey) {
    this.setState({ factoryPanelActiveKey });
  }

  handleGameSelect(gamePanelActiveKey) {
    this.setState({ gamePanelActiveKey });
  }

  componentDidMount() {
    MainStore.on(MAIN_ID, this._onChange.bind(this));
    AppDispatcher.dispatch({
      action: INITIAL_APP_LOAD,
      emitOn: [{
        store: MainStore,
        componentIds: [MAIN_ID]
      }]
    });
  }

  componentWillUnmount() {
    MainStore.removeListener(MAIN_ID, this._onChange.bind(this));
  }

  render() {
    return (
      <div>
        <PanelGroup
          accordion
          id='factory-panel-group'
          activeKey={this.state.factoryPanelActiveKey}
          onSelect={this.handleFactorySelect}
        >
          <PartialModal/>
          <div>
            <h3><Label bsStyle='primary'>Your Factories</Label></h3>
          </div>
          {this.state.factories.map(factory =>
            <Factory
              key={factory.id}
              eventKey={factory.id}
              id={factory.id}
            />
          )}
        </PanelGroup>
        <ButtonToolbar>
          <Button bsStyle='primary' onClick={this.handleNewFactory}>
              Add New Factory
          </Button>
        </ButtonToolbar>
        <br/>
        <GameItems/>
      </div>
    );
  }
}

if (RootElement) {
  ReactDOM.render(<Main />, RootElement);
} else {
  console.log("Something went wrong, couldn't find 'root' element");
}
