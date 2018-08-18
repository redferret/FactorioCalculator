
import React from 'react';

import { Panel, PanelGroup, Alert, Label, Button, Table } from 'react-bootstrap';
import ProductionPanel from './production-panel.js';

export default class Factory extends React.Component {
    
  constructor(props, context) {
    super(props, context);

    this.handleSelect = this.handleSelect.bind(this);

    this.state = {
      activeKey: "0",
      productionLines: []
    };
  }
  
  handleSelect(activeKey) {
    this.setState({ activeKey });
  }
  
  renderFactoryDetails() {
    return (
      <div>
        <h4><Label bsStyle='success'>Factory Details</Label></h4>
        <Table>
          <thead>
            <tr>
              <th>Total Items Produced</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>#</td>
            </tr>
          </tbody>
        </Table>
      </div>
    );
  }
  
  renderFactoryProductionLines() {
    return (
      <PanelGroup 
        accordion
        id="accordion-controlled-example"
        activeKey={this.state.activeKey}
        onSelect={this.handleSelect}
      >
      <div>
        {this.renderFactoryDetails()}
        <h3><Label bsStyle="primary">Production Lines</Label></h3>
      </div>
      {this.props.productionLines.map(panel =>
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
  
  render() {
    return ( 
      <div>
        <Panel eventKey={this.props.eventKey}>
          <Panel.Heading>
            <Panel.Title toggle>
              <h4>
                {this.props.name}
              </h4>
            </Panel.Title>
          </Panel.Heading>
          <Panel.Body collapsible>
            {this.renderFactoryProductionLines()}
          </Panel.Body>
        </Panel>
      </div>
    );
  }
}

Factory.defaultProps = {
  id: -1,
  name: "",
  productionLines: []
};