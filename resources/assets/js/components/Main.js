import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { Panel, PanelGroup, Alert, Label } from 'react-bootstrap';
import Factory from './factory.js';
import FactoryStore from '../stores/factory-store.js';
import { RootElement } from '../bootstrap.js';

class Main extends Component {

  constructor(props, context) {
    super(props, context);

    this.handleFactorySelect = this.handleFactorySelect.bind(this);

    this.state = {
      activeKey: '0',
      factories: []
    };
  }

  handleFactorySelect(activeKey) {
    this.setState({ activeKey });
  }

  componentDidMount() {
    FactoryStore.fetchFactoryPromise.then(data => {
      this.setState({factories: data});
    });
  }

  render() {
    return (
      <PanelGroup
        accordion
        id='factory-panel-group'
        activeKey={this.state.activeKey}
        onSelect={this.handleFactorySelect}
      >
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
