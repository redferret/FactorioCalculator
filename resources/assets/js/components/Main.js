import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { Panel, PanelGroup, Alert, Label } from 'react-bootstrap';
import ProductionPanel from './production-panel.js';

export default class Main extends Component {
    
  constructor(props, context) {
    super(props, context);

    this.handleSelect = this.handleSelect.bind(this);

    this.state = {
      activeKey: "0",
      productionPanels: []
    };
  }
  
  componentDidMount() {
    fetch(this.props.baseURL + '/productionLines').then(results => {
      return results.json();
    }).then(data => {
      console.log(data);
      this.setState({productionPanels: data});
    }).catch(error => console.log(error));
  }
  
  handleSelect(activeKey) {
    this.setState({ activeKey });
  }
  
  render() {
    return ( 
      <PanelGroup 
        accordion
        id="accordion-controlled-example"
        activeKey={this.state.activeKey}
        onSelect={this.handleSelect}
      >
      <div>
        <h3><Label bsStyle="primary">Your Production Lines</Label></h3>
      </div>
        {this.state.productionPanels.map(panel =>
          <ProductionPanel 
            key={panel.id} 
            eventKey={panel.id} 
            name={panel.name}
            productDetails={panel.produces}
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
