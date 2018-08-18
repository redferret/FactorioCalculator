import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { Panel, PanelGroup, Alert, Label } from 'react-bootstrap';
import Factory from './factory.js';

export default class Main extends Component {

  constructor(props, context) {
    super(props, context);

    this.handleSelect = this.handleSelect.bind(this);

    this.state = {
      activeKey: "0",
      factories: []
    };
  }

  handleSelect(activeKey) {
    this.setState({ activeKey });
  }

  componentDidMount() {
    fetch(this.props.baseURL + '/factories').then(results => {
      return results.json();
    }).then(data => {
      console.log("factories", data);
      this.setState({factories: data});
    }).catch(error => console.log(error));
  }

  render() {
    return (
      <PanelGroup
        accordion
        id="factory-panel-group"
        activeKey={this.state.activeKey}
        onSelect={this.handleSelect}
      >
      <div>
        <h3><Label bsStyle="primary">Your Factories</Label></h3>
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

const RootElement = document.getElementById('root');

if (RootElement) {
  var baseURL = RootElement.getAttribute('url');
  ReactDOM.render(<Main baseURL={baseURL}/>, RootElement);
} else {
  console.log("Something went wrong, couldn't find 'root' element");
}
