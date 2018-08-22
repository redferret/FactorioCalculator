
import React from 'react';
import { Modal, Button, ButtonToolbar, Alert, Table, Well, Label} from 'react-bootstrap';
import ProductModalStore from '../stores/product-modal-store.js';
import ProductStore from '../stores/product-store.js';
import AppDispatcher from '../dispatcher.js';
import * as Actions from '../actions.js';
import { MODAL_ID } from '../constants.js';

export default class ProductModal extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.renderModalBody = this.renderModalBody.bind(this);
    this.handleBackSelect = this.handleBackSelect.bind(this);
    this.handleShowProductModal = this.handleShowProductModal.bind(this);
    this.handleHideProductModal = this.handleHideProductModal.bind(this);

    this.state = {
      selectedProduct: ProductModalStore.getSelectedProduct(),
      selectedProductionLine: ProductModalStore.getSelectedProductionLine(),
      productStack: [],
      productionLineStack: [],
      show: false
    }
  }

  componentDidMount() {
    ProductModalStore.on(MODAL_ID, this._onChange.bind(this));
    ProductStore.on(MODAL_ID, this._onSelectProduct.bind(this));
  }

  componentWillUnmount() {
    ProductModalStore.removeListener(MODAL_ID, this._onChange.bind(this));
    ProductStore.removeListener(MODAL_ID, this._onSelectProduct.bind(this));
  }

  handleShowProductModal(e) {
    ProductModalStore.showModal();
  }

  handleHideProductModal() {
    this.setState({
      productStack: [],
      productionLineStack: []
    });
    ProductModalStore.hideModal();
  }

  _onSelectProduct() {
    this.setState({selectedProduct: ProductStore.getProduct()});
  }

  /**
   * When the modal store emits a change on MODAL_ID
   */
  _onChange() {
    this.setState({
      selectedProduct: ProductModalStore.getSelectedProduct(),
      selectedProductionLine: ProductModalStore.getSelectedProductionLine(),
      show: ProductModalStore.shouldShow()
    });
  }

  _fetchProductionLines(product) {
    AppDispatcher.dispatch({
      action: Actions.GET_PRODUCT_PRODUCTION_LINES,
      data: {
        id: product.id,
        componentId: MODAL_ID
      }
    });
  }

  handleSelectInput(product, productionLine) {
    this.state.productStack.unshift(this.state.selectedProduct);
    this.state.productionLineStack.unshift(this.state.selectedProductionLine);
    ProductModalStore.setSelectedProduct(product);
    ProductModalStore.setSelectedProductionLine(productionLine);
    this._fetchProductionLines(product);
  }

  handleBackSelect() {
    if (this.state.productStack.peek() !== undefined &&
        this.state.productionLineStack.peek() !== undefined) {
      let product = this.state.productStack.shift();
      ProductModalStore.setSelectedProduct(product);
      ProductModalStore.setSelectedProductionLine(this.state.productionLineStack.shift());
      this._fetchProductionLines(product);
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

  renderModalBody() {
    let productionLines = ProductModalStore.getProductProductionLines();

    if (productionLines.length === 0) {
      return (
        <Modal.Body>
          {this.renderOutputProductDetails()}
          <Alert bsStyle='warning'>This is a Primary Resource</Alert>
        </Modal.Body>
      );
    }

    return (
      <Modal.Body>
        {this.renderOutputProductDetails()}
        <h4><Label bsStyle='success'>Product Inputs</Label></h4>
        <Well>
          <div className='list-group'> {
            productionLines.map(productionLine => {
              let product = productionLine.produces;
              return (
                <div key={product.id}>
                  <Label>Production Line: {productionLine.name}</Label>
                  <a
                  onClick={this.handleSelectInput.bind(this, product, productionLine)}
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
                </div>
              );
            })}
          </div>
        </Well>
      </Modal.Body>
    );
  }

  render() {

    if (this.state.selectedProduct === null) {
      return <div></div>;
    }

    let backButton = '';

    if (this.state.productStack.length > 0) {
      backButton = <Button onClick={this.handleBackSelect}>Back</Button>;
    }

    var modalTitleIfInput = <Label bsStyle='danger'>Output</Label>;

    let isInput = this.state.selectedProductionLine.product_id !== null;
    if (isInput) {
      modalTitleIfInput = <Label bsStyle='success'>Input</Label>;
    }

    return (
      <Modal
        show={this.state.show}
        onHide={this.handleHideProductModal}
        bsSize='large'
        >
        <Modal.Header>
          <Modal.Title>
            {this.state.selectedProduct.name} {modalTitleIfInput}
          </Modal.Title>
        </Modal.Header>

        {this.renderModalBody()}

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
