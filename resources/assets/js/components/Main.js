import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { Panel, PanelGroup, Alert } from 'react-bootstrap';
import ProductionPanel from './production-panel.js';

export default class Main extends Component {
    
  constructor(props, context) {
    super(props, context);

    this.handleSelect = this.handleSelect.bind(this);

    this.state = {
      activeKey: '1',
      productionPanels: [
        {eventKey: "1", heading: "Production Line 1", body: "Stats"}, 
        {eventKey: "2", heading: "Copper Production 1", body: "Stats"},
        {eventKey: "3", heading: "Iron Production 1", body: "Stats"},
        {eventKey: "4", heading: "Green Circuit Production 1", body: "Stats"}]
    };
  }
    
  renderPanels() {
    // Perform a fetch to get each panel from the server
    return this.state.productionPanels.map((child) => 
      <ProductionPanel key={child.eventKey} eventKey={child.eventKey} heading={child.heading} body={child.body} />
    );
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
        {this.renderPanels()}
      </PanelGroup>
    );
  }
};

const RootElement = document.getElementById('root');

if (RootElement) {
  ReactDOM.render(<Main />, RootElement);
} else {
  console.log("Something went wrong, couldn't find 'root' element");
}