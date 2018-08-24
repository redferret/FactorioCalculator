import AppDispatcher from '../dispatcher.js';
import ProductModalStore from '../stores/product-modal-store.js';
import React from 'react';
import Input from './input.js';

import {
  Alert,
  Button,
  ButtonToolbar,
  Table,
} from 'react-bootstrap';

import {
  GET_PRODUCTION_LINES,
  MAIN_ID,
  MODAL_ID,
  RE_CALCULATE_PRODUCTION,
} from '../constants.js';

export default class ProductionLineDetails extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.addProductToProduction = this.addProductToProduction.bind(this);
    this.handleShowProductModal = this.handleShowProductModal.bind(this);
    this.removeFromProduction = this.removeFromProduction.bind(this);
    this.itemsPerSecondChanged = this.itemsPerSecondChanged.bind(this);
  }

  handleShowProductModal() {
    ProductModalStore.setSelectedProductionLine(this.props);
    AppDispatcher.dispatch({
      action: GET_PRODUCTION_LINES,
      data: {
        id: this.props.id,
        componentId: MODAL_ID
      }
    });
    ProductModalStore.showModal();
  }

  itemsPerSecondChanged(event) {
    AppDispatcher.dispatch({
      action: RE_CALCULATE_PRODUCTION,
      data: {
        id: this.props.id,
        itemsPerSecond: event.target.value,
        componentId: MAIN_ID
      }
    });
  }

  removeFromProduction(e) {
    alert("Remove "+this.props.produces.name+" from Production " + this.props.produces.production_line_id);
  }

  addProductToProduction(e) {
    alert("Add Product to Production "+ this.props.id);
  }

  render() {
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

      let isOutput = this.props.production_line_id === null;

      let inputValue = this.props.items_per_second;
      let itemsPerSecond = isOutput ?
        <Input type='number' name='itemsPerSecond'
          callback={this.itemsPerSecondChanged}
          initialValue={inputValue} /> :
        <Input type='number' name='itemsPerSecond'
          initialValue={inputValue}
          isStatic={true} />;

      return (
        <div>
          <Table>
            <thead>
              <tr>
                <th>Name</th>
                <th>{assemblyCountTitle}</th>
                <th>Items Produced</th>
                <th>Items Consumed</th>
                <th>Seconds Per Item Produced</th>
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
            <Button onClick={this.handleShowProductModal} bsStyle='primary' bsSize='small'>Select Production Line</Button>{' '}
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
}
