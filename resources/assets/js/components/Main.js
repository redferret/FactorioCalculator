
import AppDispatcher from '../dispatcher.js';
import Factory from './factory.js';
import FactoryStore from '../stores/factory-store.js';
import MainStore from '../stores/main-store.js';
import ModalsStore from '../stores/modals-store.js';
import NewFactoryModalStore from '../stores/new-factory-modal-store.js';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import {
  Alert,
  Button,
  ButtonToolbar,
  Label,
  Panel,
  PanelGroup,
} from 'react-bootstrap';

import { RootElement } from '../bootstrap.js';

import {
  GET_FACTORIES,
  MAIN_ID,
  MAIN_MODAL_CHANGE,
  NEW_FACTORY_MODAL_ID,
  RE_RENDER,
} from '../constants.js';

class Main extends Component {

  constructor(props, context) {
    super(props, context);

    this.handleFactorySelect = this.handleFactorySelect.bind(this);
    this.handleNewFactory = this.handleNewFactory.bind(this);
    this.state = {
      activeKey: '0',
      currentModal: ModalsStore.getCurrentModal(),
      factories: []
    };
  }

  _onModalChange() {
    this.setState({
      currentModal: ModalsStore.getCurrentModal()
    })
  }

  _onLoadedFactories() {
    this.setState({
      factories: FactoryStore.getFactories()
    });
  }

  handleNewFactory() {
    ModalsStore.showModal(NEW_FACTORY_MODAL_ID);
    AppDispatcher.dispatch({
      action: RE_RENDER,
      emitOn: [{
        store: MainStore,
        componentIds: [MAIN_MODAL_CHANGE]
      }, {
        store: NewFactoryModalStore,
        componentIds: [NEW_FACTORY_MODAL_ID]
      }]
    })
  }

  handleFactorySelect(activeKey) {
    this.setState({ activeKey });
  }

  componentDidMount() {
    MainStore.on(MAIN_MODAL_CHANGE, this._onModalChange.bind(this));
    MainStore.on(MAIN_ID, this._onLoadedFactories.bind(this));
    AppDispatcher.dispatch({
      action: GET_FACTORIES,
      emitOn: [{
        store: MainStore,
        componentIds: [MAIN_ID]
      }]
    });
  }

  componentWillUnmount() {
    MainStore.removeListener(MAIN_ID, this._onLoadedFactories.bind(this));
    MainStore.removeListener(MAIN_MODAL_CHANGE, this._onModalChange.bind(this));
  }

  render() {
    return (
      <div>
        <PanelGroup
          accordion
          id='factory-panel-group'
          activeKey={this.state.activeKey}
          onSelect={this.handleFactorySelect}
        >
          {this.state.currentModal}
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
      </div>
    );
  }
}

if (RootElement) {
  ReactDOM.render(<Main />, RootElement);
} else {
  console.log("Something went wrong, couldn't find 'root' element");
}
