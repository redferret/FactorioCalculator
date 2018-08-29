import AppDispatcher from '../dispatcher.js';
import EditProductionLineModal from './modals/edit-production-line-modal.js';
import EditProductionLineModalStore from '../stores/edit-production-line-modal-store.js';
import FactoryStore from '../stores/factory-store.js';
import Input from './input.js';
import MainStore from '../stores/main-store.js';
import ModalsStore from '../stores/modals-store.js';
import React from 'react';

import {
  Alert,
  Button,
  ButtonToolbar,
  Panel,
  Table,
} from 'react-bootstrap';

import {
  GET_PRODUCTION_LINES,
  MAIN_ID,
  MAIN_MODAL_CHANGE,
  EDIT_PRODUCTION_LINE_MODAL_ID,
  UPDATE_PRODUCTION_LINE,
} from '../constants.js';

export default class ProductionLineDetails extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.addProductToProduction = this.addProductToProduction.bind(this);
    this.handleShowModal = this.handleShowModal.bind(this);
    this.removeFromProduction = this.removeFromProduction.bind(this);
    this.itemsPerSecondChanged = this.itemsPerSecondChanged.bind(this);
  }

  handleShowModal() {
    ModalsStore.setCurrentModal(<EditProductionLineModal/>);
    EditProductionLineModalStore.setSelectedProductionLine(this.props);
    AppDispatcher.dispatch({
      action: GET_PRODUCTION_LINES,
      data: {
        id: this.props.id
      },
      emitOn: [{
        store: MainStore,
        componentIds: [MAIN_MODAL_CHANGE]
      }, {
        store: EditProductionLineModalStore,
        componentIds: [EDIT_PRODUCTION_LINE_MODAL_ID]
      }]
    });
    EditProductionLineModalStore.showModal();
  }

  itemsPerSecondChanged(event) {
    AppDispatcher.dispatch({
      action: UPDATE_PRODUCTION_LINE,
      data: {
        productionLineId: this.props.id,
        name: event.target.name,
        value: event.target.value,
      },
      emitOn: [{
        store: FactoryStore,
        componentIds: [MAIN_ID]
      }]
    });
  }

  removeFromProduction(e) {
    alert("Remove "+this.props.produces.name+" from Production " + this.props.produces.production_line_id);
  }

  addProductToProduction(e) {
    alert("Add Product to Production "+ this.props.id);
  }

  renderProductionDetails() {
    if (this.props.produces !== null) {

      let assemblyCountTitle = 'undefined';
      switch(this.props.producer.producer_type) {
        case 0:
          assemblyCountTitle = 'Number of Miners';
          break;
        case 1:
          assemblyCountTitle = 'Number of Assemblers';
          break;
        case 2:
          assemblyCountTitle = 'Number of Furnaces';
          break;
      }

      let inputValue = this.props.items_per_second;
      let itemsPerSecond = this.props.is_output ?
        <Input type='number' name='items_per_second'
          callback={this.itemsPerSecondChanged}
          initialValue={inputValue} /> :
        <Input type='number' isStatic={true}
          initialValue={inputValue} />;

      return (
        <div>
          <Table>
            <thead>
              <tr>
                <th>Name</th>
                <th>{assemblyCountTitle}</th>
                <th>Items Produced / Second</th>
                <th>Items Consumed</th>
                <th>Seconds Per Item</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{this.props.produces.name}</td>
                <td>{this.props.assembly_count}</td>
                <td>{itemsPerSecond}</td>
                <td>#</td>
                <td>{this.props.seconds_per_item}</td>
              </tr>
            </tbody>
          </Table>
          <ButtonToolbar>
            <Button onClick={this.handleShowModal} bsStyle='primary' bsSize='small'>Select Production Line</Button>{' '}
            <Button onClick={this.removeFromProduction} bsSize='small'>Remove Product from Production Line</Button>
          </ButtonToolbar>
        </div>
      );
    }

    return (
      <div>
        <br/>
        <Alert bsStyle='danger'>Produces Nothing, Select a Product for this Production Line</Alert>
        <ButtonToolbar>
          <Button onClick={this.addProductToProduction} bsStyle='primary'>Add Product</Button>
        </ButtonToolbar>
      </div>
    );
  }

  render() {
    return (
      <Panel bsStyle='info' eventKey={this.props.eventKey}>
        <Panel.Heading>
          <Panel.Title toggle>
            {this.props.name}
          </Panel.Title>
        </Panel.Heading>
        <Panel.Body collapsible>
          {this.renderProductionDetails()}
        </Panel.Body>
      </Panel>
    )
  }

}
