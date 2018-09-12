import AppDispatcher from '../dispatcher.js';
import EditFactoryModal from './modals/edit-factory-modal.js';
import EditFactoryModalStore from '../stores/edit-factory-modal-store.js';
import FactoryStore from '../stores/factory-store.js';
import MainStore from '../stores/main-store.js';
import ModalsStore from '../stores/modals-store.js';
import NewProductionLineModal from './modals/new-production-line-modal.js';
import NewProductionLineModalStore from '../stores/new-production-line-modal-store.js';
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
  ALL_FACTORIES,
  FACTORY_PANEL_,
  LOAD_FACTORY,
  EDIT_FACTORY_MODAL_ID,
  MAIN_MODAL_CHANGE,
  NEW_PRODUCTION_LINE_MODAL_ID,
  RE_RENDER,
} from '../constants.js';

export default class Factory extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.handleSelectProductionLine = this.handleSelectProductionLine.bind(this);
    this.handleAddProductionLine = this.handleAddProductionLine.bind(this);
    this.handleSelectFactory = this.handleSelectFactory.bind(this);

    this.FACTORY_PANEL_ID = FACTORY_PANEL_ + this.props.id;

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
    FactoryStore.on(this.FACTORY_PANEL_ID, this._onChange.bind(this));
    FactoryStore.on(ALL_FACTORIES, this._onChange.bind(this));
    AppDispatcher.dispatch({
      action: LOAD_FACTORY,
      emitOn:[{
        store: FactoryStore,
        componentIds: [this.FACTORY_PANEL_ID]
      }]
    });
  }

  componentWillUnmount() {
    FactoryStore.removeListener(this.FACTORY_PANEL_ID, this._onChange.bind(this));
    FactoryStore.removeListener(ALL_FACTORIES, this._onChange.bind(this));
  }

  handleSelectProductionLine(activeKey) {
    this.setState({ activeKey });
  }

  handleAddProductionLine() {
    NewProductionLineModalStore.reset();
    NewProductionLineModalStore.setFactoryComponentId(this.FACTORY_PANEL_ID);
    NewProductionLineModalStore.setFactoryId(this.props.id);
    ModalsStore.showModal({
      id: NEW_PRODUCTION_LINE_MODAL_ID,
      store: NewProductionLineModalStore // Can probably remove
    });
  };

  handleSelectFactory() {
    EditFactoryModalStore.setFactory(this.state.factory);
    ModalsStore.showModal({
      id: EDIT_FACTORY_MODAL_ID,
      store: EditFactoryModalStore // Can probably remove
    });
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
    let panelStyle = this.state.factory.production_lines.length > 0 ?
      'primary' : 'danger';
    return (
      <Panel bsStyle={panelStyle} eventKey={this.props.eventKey}>
        <Panel.Heading>
          <Panel.Title toggle>
            {this.state.factory.name}
          </Panel.Title>
        </Panel.Heading>
        <Panel.Body collapsible>
          {this.renderFactoryDetails()}
          {this.renderFactoryProductionLines()}
          <ButtonToolbar>
            <Button bsStyle='primary' onClick={this.handleAddProductionLine}>Add Production Line</Button>
            <Button onClick={this.handleSelectFactory}>Select Factory</Button>
          </ButtonToolbar>
        </Panel.Body>
      </Panel>
    );
  }
}
