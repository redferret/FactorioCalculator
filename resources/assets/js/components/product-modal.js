
import React from 'react';
import { Modal, Button, ButtonToolbar, Alert, Table, Well} from 'react-bootstrap';
import ProductStore from '../stores/product-store.js';

export default class ProductModal extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.renderModalBody = this.renderModalBody.bind(this);
    this.popProductFromStack = this.popProductFromStack.bind(this);

    this.state = {
      selectedProduct: this.props.selectedProduct,
      productStack: []
    }
  }

  pushProductToStack(product) {
    this.state.productStack.unshift(product);
    this.setState({selectedProduct: product});
  }

  popProductFromStack() {
    this.state.productStack.shift();
    if (this.state.productStack.peek() !== undefined) {
      this.setState({selectedProduct: this.state.productStack.peek()});
    } else {
      this.setState({selectedProduct: this.props.selectedProduct});
    }
  }

  renderOutputProductDetails() {
    return (
      <Table>
        <thead><tr>
          <th>Crafting Time Per Item</th>
          <th>Actual Production (Items/Sec)</th>
          <th>Surplus/Deficit (Items/Sec)</th>
        </tr></thead>
        <tbody><tr>
          <td>{this.state.selectedProduct.crafting_time}</td>
          <td>Not Implemented Yet</td>
          <td>Not Implemented Yet</td>
        </tr></tbody>
      </Table>
    );
  }

  renderModalBody(products) {

    if (products.length === 0) {
      return (
        <Modal.Body>
          {this.renderOutputProductDetails()}
          <Alert bsStyle='warning'>There are no defined Inputs</Alert>
        </Modal.Body>
      );
    }

    return (
      <Modal.Body>
        {this.renderOutputProductDetails()}
        <Well>
          <div className='list-group'>
            {products.map(product =>
              <a key={product.id}
                onClick={this.pushProductToStack.bind(this, product)}
                className='list-group-item list-group-item-action'
              >
                <h4>{product.name}</h4>
                <Table>
                  <thead><tr>
                    <th>Assemblers Needed</th>
                    <th>Crafting Time Per Item</th>
                    <th>Items Needed / Sec</th>
                    <th>Actual Production (Items/Sec)</th>
                    <th>Surplus/Deficit (Items/Sec)</th>
                  </tr></thead>
                  <tbody><tr>
                    <td>{product.desired_assembly_count}</td>
                    <td>{product.crafting_time}</td>
                    <td>{product.items_per_second}</td>
                    <td>Not Implemented Yet</td>
                    <td>Not Implemented Yet</td>
                  </tr></tbody>
                </Table>
              </a>
            )}
          </div>
        </Well>
      </Modal.Body>
    );
  }

  render() {

    let products = [];

    if (this.state.selectedProduct.products !== undefined) {
      products = this.state.selectedProduct.products;
    }

    let backButton = '';

    if (this.state.selectedProduct.product_id !== null) {
      backButton = <Button onClick={this.popProductFromStack}>Back</Button>;
    }

    return (
      <Modal
        show={this.props.show}
        onHide={this.props.handleHide}
        bsSize='large'
        >
        <Modal.Header>
          <Modal.Title>
            {this.state.selectedProduct.name} Inputs
          </Modal.Title>
        </Modal.Header>

        {this.renderModalBody(products)}

        <Modal.Footer>
          <ButtonToolbar>
            <Button bsStyle='primary'>Add Input</Button>
            {backButton}
            <Button onClick={this.props.handleHide}>Close</Button>
          </ButtonToolbar>
        </Modal.Footer>
      </Modal>
    );
  }
}
