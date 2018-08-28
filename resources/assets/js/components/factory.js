import AppDispatcher from '../dispatcher.js';
import FactoryStore from '../stores/factory-store.js';
import ProductionLineDetails from './production-line-details.js';
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

import {
  LOAD_FACTORY,
  FACTORY_PANEL_,
} from '../constants.js';

export default class Factory extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.handleSelectProductionLine = this.handleSelectProductionLine.bind(this);

    this.state = {
      factory: FactoryStore.getFactory(props.id),
      activeKey: '0',
    };
  }

  _onChange() {
    this.setState({
      factory: FactoryStore.getFactory(this.props.id)
    });
  }

  componentDidMount() {
    FactoryStore.on(FACTORY_PANEL_ + this.props.id, this._onChange.bind(this));
    AppDispatcher.dispatch({
      action: LOAD_FACTORY,
      emitOn:[{
        store: FactoryStore,
        componentIds: [FACTORY_PANEL_ + this.props.id]
      }]
    })
  }

  componentWillUnmount() {
    FactoryStore.removeListener(FACTORY_PANEL_ + this.props.id, this._onChange.bind(this));
  }

  handleSelectProductionLine(activeKey) {
    this.setState({ activeKey });
  }

  renderFactoryDetails() {
    if (this.state.factory.production_lines === undefined) {
      return <div></div>;
    }
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
              <td>{this.state.factory.production_lines.length}</td>
              <td>{this.state.factory.total_items}</td>
              <td>#</td>
            </tr>
          </tbody>
        </Table>
      </div>
    );
  }

  renderFactoryProductionLines() {
    if (this.state.factory.production_lines === undefined) {
      return <div></div>;
    }
    if (this.state.factory.production_lines.length > 0) {
      return (
        <PanelGroup
          accordion
          id='production-panel-group'
          activeKey={this.state.activeKey}
          onSelect={this.handleSelectProductionLine}
        >
        {this.state.factory.production_lines.map(productionLine =>
          <ProductionLineDetails
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
              {this.state.factory.name}
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
