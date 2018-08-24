
import FactoryStore from '../stores/factory-store.js';
import ProductionLinePanel from './production-line-panel.js';
import React from 'react';

import {
  Alert,
  Button,
  ButtonToolbar,
  Label,
  Panel,
  PanelGroup,
  Table,
} from 'react-bootstrap';

export default class Factory extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.handleSelectProductionLine = this.handleSelectProductionLine.bind(this);

    this.state = {
      activeKey: '0',
    };
  }

  handleSelectProductionLine(activeKey) {
    this.setState({ activeKey });
  }

  renderFactoryDetails() {
    return (
      <div>
        <h4><Label bsStyle='success'>Factory Details</Label></h4>
        <Table>
          <thead>
            <tr>
              <th>Number of Production Lines</th>
              <th>Total Items Produced</th>
              <th>Total Items Consumed</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{this.props.production_lines.length}</td>
              <td>{this.props.total_items}</td>
              <td>#</td>
            </tr>
          </tbody>
        </Table>
      </div>
    );
  }

  renderFactoryProductionLines() {
    if (this.props.production_lines.length > 0) {
      return (
        <PanelGroup
          accordion
          id='production-panel-group'
          activeKey={this.state.activeKey}
          onSelect={this.handleSelectProductionLine}
        >
        {this.props.production_lines.map(productionLine =>
          <ProductionLinePanel
            {...productionLine}
            key={productionLine.id}
            eventKey={productionLine.id}
          />
        )}
        </PanelGroup>
      );
    }
    return (
      <div>
        <Alert bsStyle='danger'>No Production Lines, Add a Production Line to this Factory</Alert>
      </div>
    );
  }

  render() {
    return (
      <Panel bsStyle='primary' eventKey={this.props.eventKey}>
        <Panel.Heading>
          <Panel.Title toggle>
              {this.props.name}
          </Panel.Title>
        </Panel.Heading>
        <Panel.Body collapsible>
          {this.renderFactoryDetails()}
          {this.renderFactoryProductionLines()}
          <ButtonToolbar>
            <Button bsStyle='primary'>Add Production Line</Button>
          </ButtonToolbar>
        </Panel.Body>
      </Panel>
    );
  }
}
