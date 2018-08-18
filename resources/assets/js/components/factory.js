
import React from 'react';

import { Panel, PanelGroup, Alert, Label, ButtonToolbar, Button, Table } from 'react-bootstrap';
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
              <th>Number of Production Lines</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{this.props.total_items}</td>
              <td>{this.props.productionLines.length}</td>
            </tr>
          </tbody>
        </Table>
        <ButtonToolbar>
          <Button bsStyle='primary'>Add Production Line</Button>
        </ButtonToolbar>
        <br/>
      </div>
    );
  }

  renderFactoryProductionLines() {
    if (this.props.productionLines.length > 0) {
      return (
        <PanelGroup
          accordion
          id="production-panel-group"
          activeKey={this.state.activeKey}
          onSelect={this.handleSelect}
        >
        {this.renderFactoryDetails()}
        {this.props.productionLines.map(panel =>
          <ProductionPanel
            {...panel}
            key={panel.id}
            eventKey={panel.id}
          />
        )}
        </PanelGroup>
      );
    }
    return (
      <div>
        {this.renderFactoryDetails()}
        <Alert bsStyle="danger">No Production Lines, Add a Production Line to this Factory</Alert>
      </div>
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
