import React from 'react';
import { Table, Button, Alert, ButtonToolbar } from 'react-bootstrap';
import BalanceProductionButton from './balance-production-button.js';
import ProductModal from './product-modal.js';

export default class ProductDetails extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.addProductToProduction = this.addProductToProduction.bind(this);
    this.handleShowProductModal = this.handleShowProductModal.bind(this);
    this.handleHideProductModal = this.handleHideProductModal.bind(this);
    this.removeFromProduction = this.removeFromProduction.bind(this);

    this.state = {
      showProductModal: false,
      selectedProduct: null,
      productStack: []
    }
  }

  pushProductToStack(product) {
    this.state.productStack.push(product);
    this.setState({selectedProduct: product});
  }

  popProductFromStatck() {
    this.state.productStack.pop();
    this.setState({selectedProduct: this.state.productStack.peek()});
  }

  handleShowProductModal(e) {
    this.setState({
      showProductModal: true,
      selectedProduct: this.props.produces
    });
  }

  handleHideProductModal() {
    this.setState({
      showProductModal: false,
      selectedProduct: null
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

      var headerTitle = 'Number of Assemblers';
      if (this.props.produces.producer.is_miner) {
        headerTitle = 'Number of Miners';
      }

      var balanced = this.props.produces.assembly_count === this.props.produces.desired_assembly_count;

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
                <th>{headerTitle}</th>
                <th>Number of Items Per Second</th>
                <th>Total Seconds Per Item</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{this.props.produces.name}</td>
                <td>{this.props.produces.assembly_count}</td>
                <td>{this.props.produces.items_per_second}</td>
                <td>{this.props.produces.seconds_per_item}</td>
              </tr>
            </tbody>
          </Table>
          <ButtonToolbar>
            <Button onClick={this.handleShowProductModal} bsStyle='primary' bsSize='small'>Select Product</Button>{' '}
            <Button onClick={this.removeFromProduction} bsSize='small'>Remove Product from Production Line</Button>
          </ButtonToolbar>
          <ProductModal
            show={this.state.showProductModal}
            handleHide={this.handleHideProductModal}
            {...this.state.selectedProduct}
          />
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
