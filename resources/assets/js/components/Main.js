import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import AppDispatcher from '../dispatcher.js';
import Factory from './factory.js';
import FactoryStore from '../stores/factory-store.js';
import ProductModal from './product-modal.js';

import {
  Alert,
  Label,
  Panel,
  PanelGroup
} from 'react-bootstrap';

import { RootElement } from '../bootstrap.js';

import {
  GET_FACTORIES,
  MAIN_ID,
} from '../constants.js';




class Main extends Component {

  constructor(props, context) {
    super(props, context);

    this.handleFactorySelect = this.handleFactorySelect.bind(this);

    this.state = {
      activeKey: '0',
      factories: []
    };
  }

  _onLoadedFactories() {
    this.setState({factories: FactoryStore.getFactories()});
  }

  handleFactorySelect(activeKey) {
    this.setState({ activeKey });
  }

  componentDidMount() {
    FactoryStore.on(MAIN_ID, this._onLoadedFactories.bind(this));
    AppDispatcher.dispatch({
      action: GET_FACTORIES,
      data: {
        componentId: MAIN_ID
      }
    });
  }

  componentWillUnmount() {
    FactoryStore.removeListener(MAIN_ID, this._onLoadedFactories.bind(this));
  }

  render() {
    return (
      <PanelGroup
        accordion
        id='factory-panel-group'
        activeKey={this.state.activeKey}
        onSelect={this.handleFactorySelect}
      >
        <ProductModal />
        <div>
          <h3><Label bsStyle='primary'>Your Factories</Label></h3>
        </div>
        {this.state.factories.map(factory =>
          <Factory
            {...factory}
            key={factory.id}
            eventKey={factory.id}
          />
        )}
      </PanelGroup>
    );
  }
}

if (RootElement) {
  ReactDOM.render(<Main />, RootElement);
} else {
  console.log("Something went wrong, couldn't find 'root' element");
}
