import AppDispatcher from '../dispatcher.js';
import BalanceProductionButton from './balance-production-button.js';
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
  MAIN_ID,
  MODAL_ID,
  GET_PRODUCT_PRODUCTION_LINES,
  RE_CALCULATE_PRODUCTION,
} from '../constants.js';

export default class ProductionLineDetails extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.addProductToProduction = this.addProductToProduction.bind(this);
    this.handleShowProductModal = this.handleShowProductModal.bind(this);
    this.removeFromProduction = this.removeFromProduction.bind(this);
    this.dispatchMessage = this.dispatchMessage.bind(this);
  }

  handleShowProductModal() {
    ProductModalStore.setSelectedProductionLine(this.props);
    AppDispatcher.dispatch({
      action: GET_PRODUCT_PRODUCTION_LINES,
      data: {
        id: this.props.produces.id,
        componentId: MODAL_ID
      }
    });
    ProductModalStore.showModal();
  }

  dispatchMessage(event) {
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

      let assemblyCountTitle = 'Number of Assemblers';
      if (this.props.produces.producer.is_miner) {
        assemblyCountTitle = 'Number of Miners';
      }

      let isOutput = this.props.product_id === null;
      let balanced = this.props.produces.assembly_count === this.props.produces.desired_assembly_count;

      let inputValue = this.props.produces.items_per_second;
      let itemsPerSecond = isOutput ?
        <Input type='number' name='itemsPerSecond'
          callback={this.dispatchMessage}
          initialValue={inputValue} /> :
        <Input type='number' name='itemsPerSecond'
          initialValue={inputValue}
          isStatic={true} />;

      return (
        <div>
          <BalanceProductionButton
            balanced={balanced}
            {...this.props}
          />
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
                <td>{this.props.produces.assembly_count}</td>
                <td>{itemsPerSecond}</td>
                <td>#</td>
                <td>{this.props.produces.seconds_per_item}</td>
              </tr>
            </tbody>
          </Table>
          <ButtonToolbar>
            <Button onClick={this.handleShowProductModal} bsStyle='primary' bsSize='small'>Select Product</Button>{' '}
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
