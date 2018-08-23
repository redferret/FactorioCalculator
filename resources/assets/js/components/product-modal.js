
import React from 'react';

import AppDispatcher from '../dispatcher.js';
import Input from './input.js';
import ProductModalStore from '../stores/product-modal-store.js';

import {
  Alert,
  Button,
  ButtonToolbar,
  Label,
  Modal,
  Table,
  Well,
} from 'react-bootstrap';

import {
  MODAL_ID,
  GET_PRODUCTION_LINES,
} from '../constants.js';

export default class ProductModal extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.renderModalBody = this.renderModalBody.bind(this);
    this.handleBackSelect = this.handleBackSelect.bind(this);
    this.handleShowProductModal = this.handleShowProductModal.bind(this);
    this.handleHideProductModal = this.handleHideProductModal.bind(this);
    this.dispatchInputChanged = this.dispatchInputChanged.bind(this);

    this.state = {
      selectedProductionLine: ProductModalStore.getSelectedProductionLine(),
      productionLineStack: [],
      show: false
    }
  }

  /**
   * When the modal store emits a change on MODAL_ID
   */
  _onChange() {
    this.setState({
      selectedProductionLine: ProductModalStore.getSelectedProductionLine(),
      show: ProductModalStore.shouldShow()
    });
  }

  _fetchProductionLines(id) {
    AppDispatcher.dispatch({
      action: GET_PRODUCTION_LINES,
      data: {
        id: id,
        componentId: MODAL_ID
      }
    });
  }

  componentDidMount() {
    ProductModalStore.on(MODAL_ID, this._onChange.bind(this));
  }

  componentWillUnmount() {
    ProductModalStore.removeListener(MODAL_ID, this._onChange.bind(this));
  }

  handleShowProductModal(e) {
    ProductModalStore.showModal();
  }

  handleHideProductModal() {
    this.setState({
      productionLineStack: []
    });
    ProductModalStore.hideModal();
  }

  handleSelectInput(productionLine) {
    this.state.productionLineStack.unshift(this.state.selectedProductionLine);
    ProductModalStore.setSelectedProductionLine(productionLine);
    this._fetchProductionLines(productionLine.id);
  }

  handleBackSelect() {
    if (this.state.productionLineStack.peek() !== undefined) {
      let productionLine = this.state.productionLineStack.shift();
      ProductModalStore.setSelectedProductionLine(productionLine);
      this._fetchProductionLines(productionLine.id);
    }
  }

  dispatchInputChanged(event) {
    console.log(event.target.value);
  }

  renderOutputProductDetails() {
    let producer = this.state.selectedProductionLine.producer;
    let product = this.state.selectedProductionLine.produces;
    let isMiner = this.state.selectedProductionLine.producer.is_miner;

    if (isMiner) {
      return (
        <Table>
          <thead><tr>
            <th>Crafting Time Per Item</th>
            <th>Miner(s) Speed</th>
            <th>Miner(s) Power</th>
            <th>Item Hardness</th>
            <th>Actual Production (Items/Sec)</th>
            <th>Surplus/Deficit (Items/Sec)</th>
          </tr></thead>
          <tbody><tr>
            <td>
              <Input type='number' name='itemsPerSecond'
              callback={this.dispatchInputChanged}
              initialValue={product.crafting_time} />
            </td>
            <td>
              <Input type='number' name='speed'
              callback={this.dispatchInputChanged}
              initialValue={producer.speed} />
            </td>
            <td>
              <Input type='number' name='power'
              callback={this.dispatchInputChanged}
              initialValue={producer.power} />
            </td>
            <td>
              <Input type='number' name='hardness'
              callback={this.dispatchInputChanged}
              initialValue={producer.hardness} />
            </td>
            <td>Not Implemented Yet</td>
            <td>Not Implemented Yet</td>
          </tr></tbody>
        </Table>
      );
    } else {
      return (
        <Table>
          <thead><tr>
            <th>Crafting Time Per Item</th>
            <th>Assember(s) Speed</th>
            <th>Actual Production (Items/Sec)</th>
            <th>Surplus/Deficit (Items/Sec)</th>
          </tr></thead>
          <tbody><tr>
            <td>
              <Input type='number' name='itemsPerSecond'
              callback={this.dispatchInputChanged}
              initialValue={product.crafting_time} />
            </td>
            <td>
              <Input type='number' name='speed'
              callback={this.dispatchInputChanged}
              initialValue={producer.speed} />
            </td>
            <td>Not Implemented Yet</td>
            <td>Not Implemented Yet</td>
          </tr></tbody>
        </Table>
      );
    }
  }

  renderModalBody() {
    let productionLines = ProductModalStore.getProductionLines();

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
        <h4><Label bsStyle='success'>Production Inputs</Label></h4>
        <Well>
          <div className='list-group'> {
            productionLines.map(productionLine => {
              let product = productionLine.produces;
              return (
                <div key={product.id}>
                  <Label>Production Line: {productionLine.name}</Label>
                  <a
                  onClick={this.handleSelectInput.bind(this,productionLine)}
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

    if (this.state.selectedProductionLine === undefined ||
         this.state.selectedProductionLine === null) {
      return <div></div>;
    }

    let backButton = '';

    if (this.state.productionLineStack.length > 0) {
      backButton = <Button onClick={this.handleBackSelect}>Back</Button>;
    }

    var modalTitleIfInput = <Label bsStyle='danger'>Output</Label>;

    let isInput = this.state.selectedProductionLine.production_line_id !== null;
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
            {this.state.selectedProductionLine.produces.name} {modalTitleIfInput}
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
