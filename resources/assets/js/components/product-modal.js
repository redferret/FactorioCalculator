
import React from 'react';
import { Modal, Button, ButtonToolbar, Alert, Table, Well} from 'react-bootstrap';
import ProductModalStore from '../stores/product-modal-store.js';
import ProductStore from '../stores/product-store.js';
import AppDispatcher from '../dispatcher.js';
import * as Actions from '../actions.js';

const MODAL_ID = 'product-modal';

export default class ProductModal extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.renderModalBody = this.renderModalBody.bind(this);
    this.handleBackSelect = this.handleBackSelect.bind(this);
    this.handleShowProductModal = this.handleShowProductModal.bind(this);
    this.handleHideProductModal = this.handleHideProductModal.bind(this);

    this.state = {
      selectedProduct: ProductModalStore.getSelectedProduct(),
      productStack: [],
      show: false
    }
  }

  componentDidMount() {
    ProductModalStore.addChangeListener(this._onChange.bind(this));
    ProductStore.addChangeListener(this._onSelectProduct.bind(this), MODAL_ID);
  }

  componentWillUnmount() {
    ProductModalStore.removeChangeListener(this._onChange.bind(this));
    ProductStore.removeChangeListener(this._onSelectProduct.bind(this), MODAL_ID);
  }

  handleShowProductModal(e) {
    ProductModalStore.showModal();
  }

  handleHideProductModal() {
    this.setState({productStack: []});
    ProductModalStore.hideModal();
  }

  _onSelectProduct() {
    ProductStore.productPromise.then(data => {
      ProductModalStore.setSelectedProduct(data);
      this.setState({selectedProduct: data});
    });
  }

  _onChange() {
    this.setState({selectedProduct: ProductModalStore.getSelectedProduct()});
    this.setState({show: ProductModalStore.shouldShow()})
  }

  _fetchProduct(product) {
    AppDispatcher.dispatch({
      action: Actions.GET_PRODUCT,
      data: {
        id: product.id,
        componentId: MODAL_ID
      }
    });
  }

  handleSelectInput(product) {
    this.state.productStack.unshift(this.state.selectedProduct);
    if (product.products === null || product.products === undefined) {
      this._fetchProduct(product);
    } else {
      this.setState({selectedProduct: product});
    }
  }

  handleBackSelect() {
    if (this.state.productStack.peek() !== undefined) {
      this.setState({selectedProduct: this.state.productStack.shift()});
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
                onClick={this.handleSelectInput.bind(this, product)}
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

    if (this.state.selectedProduct === null) {
      return <div></div>;
    }

    if (this.state.selectedProduct.products !== undefined) {
      products = this.state.selectedProduct.products;
    }

    let backButton = '';

    if (this.state.productStack.length > 0) {
      backButton = <Button onClick={this.handleBackSelect}>Back</Button>;
    }

    return (
      <Modal
        show={this.state.show}
        onHide={this.handleHideProductModal}
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
            <Button onClick={this.handleHideProductModal}>Close</Button>
          </ButtonToolbar>
        </Modal.Footer>
      </Modal>
    );
  }
}
