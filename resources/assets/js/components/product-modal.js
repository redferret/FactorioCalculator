
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

  handleSelectProductionLine(productionLine) {
    this.state.productionLineStack.unshift(this.state.selectedProductionLine);
    ProductModalStore.setSelectedProductionLine(productionLine);
    this._fetchProductionLines(productionLine.id);
  }

  dispatchInputChanged(event) {
    console.log(event.target.name ,event.target.value);
  }

  renderOutputProductDetails() {
    let producer = this.state.selectedProductionLine.producer;
    let product = this.state.selectedProductionLine.produces;
    let isMiner = this.state.selectedProductionLine.producer.producer_type === 0;
    let isInput = this.state.selectedProductionLine.production_line_id !== null;

    let consumerRequirementTH = isInput ?
      <th>Consumer Requirement</th> : <th></th>;
    let consumerRequirementTD = isInput ?
      <td>
        <Input type='number' name='consumerRequirement'
        callback={this.dispatchInputChanged}
        initialValue={this.state.selectedProductionLine.consumer_requirement} />
      </td> : <td></td>;


    if (isMiner) {
      return (
        <Table>
          <thead><tr>
            {consumerRequirementTH}
            <th>Crafting Time Per Item</th>
            <th>Stock Count</th>
            <th>Miner(s) Speed</th>
            <th>Miner(s) Power</th>
            <th>Item Hardness</th>
            <th>Actual Production (Items/Sec)</th>
            <th>Surplus/Deficit (Items/Sec)</th>
          </tr></thead>
          <tbody><tr>
            {consumerRequirementTD}
            <td>
              <Input type='number' name='hardness' isStatic={true}
              callback={this.dispatchInputChanged}
              initialValue={product.crafting_time} />
            </td>
            <td>
              <Input type='number' name='hardness' isStatic={true}
              callback={this.dispatchInputChanged}
              initialValue={product.stock_size} />
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
              <Input type='number' name='hardness' isStatic={true}
              callback={this.dispatchInputChanged}
              initialValue={product.hardness} />
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
            {consumerRequirementTH}
            <th>Crafting Time Per Item</th>
            <th>Stock Count</th>
            <th>Assember(s) Speed</th>
            <th>Actual Production (Items/Sec)</th>
            <th>Surplus/Deficit (Items/Sec)</th>
          </tr></thead>
          <tbody><tr>
            {consumerRequirementTD}
            <td>
              <Input type='number' name='hardness' isStatic={true}
              callback={this.dispatchInputChanged}
              initialValue={product.crafting_time} />
            </td>
            <td>
              <Input type='number' name='hardness' isStatic={true}
              callback={this.dispatchInputChanged}
              initialValue={product.stock_size} />
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

  renderProductionLines(productionLines) {
    return (
      <Well>
        <div className='list-group'> {
          productionLines.map(productionLine => {
            let produces = productionLine.produces;
            return (
              <div key={produces.id}>
                <Label>Production Line: {productionLine.name}</Label>
                <a
                onClick={this.handleSelectProductionLine.bind(this,productionLine)}
                className='list-group-item list-group-item-action'
                >
                  <h4>{produces.name}</h4>
                  <Table>
                    <thead><tr>
                      <th>Assemblers Needed</th>
                      <th>Crafting Time Per Item</th>
                      <th>Items Needed / Sec</th>
                      <th>Actual Production (Items/Sec)</th>
                      <th>Surplus/Deficit (Items/Sec)</th>
                    </tr></thead>
                    <tbody><tr>
                      <td>
                        <Input type='number' name='hardness' isStatic={true}
                        callback={this.dispatchInputChanged}
                        initialValue={productionLine.assembly_count} />
                      </td>
                      <td>
                        <Input type='number' name='hardness' isStatic={true}
                        callback={this.dispatchInputChanged}
                        initialValue={produces.crafting_time} />
                      </td>
                      <td>
                        <Input type='number' name='hardness' isStatic={true}
                        callback={this.dispatchInputChanged}
                        initialValue={productionLine.items_per_second} />
                      </td>
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
    );
  }

  renderModalBody() {
    let inputProductionLines = ProductModalStore.getInputProductionLines();
    let outputProductionLines = ProductModalStore.getOutputProductionLines();

    let outputElements = outputProductionLines.length === 0 ?
      <Alert bsStyle='warning'>This is a Primary Output</Alert> :
      this.renderProductionLines(outputProductionLines);

    let inputElements = inputProductionLines.length === 0 ?
      <Alert bsStyle='warning'>This is a Primary Input</Alert> :
      this.renderProductionLines(inputProductionLines);

    return (
      <Modal.Body>
        {this.renderOutputProductDetails()}
        <h4><Label bsStyle='primary'>Production Consumers</Label></h4>
        {outputElements}
        <h4><Label bsStyle='success'>Production Inputs</Label></h4>
        {inputElements}
      </Modal.Body>
    );
  }

  render() {

    if (this.state.selectedProductionLine === undefined ||
         this.state.selectedProductionLine === null) {
      return <div></div>;
    }

    return (
      <Modal
        show={this.state.show}
        onHide={this.handleHideProductModal}
        bsSize='large'
        >
        <Modal.Header>
          <Modal.Title>
            {this.state.selectedProductionLine.produces.name}
          </Modal.Title>
        </Modal.Header>

        {this.renderModalBody()}

        <Modal.Footer>
          <ButtonToolbar>
            <Button bsStyle='success'>Add Input</Button>
            <Button bsStyle='primary'>Add Consumer</Button>
            <Button onClick={this.handleHideProductModal}>Close</Button>
          </ButtonToolbar>
        </Modal.Footer>
      </Modal>
    );
  }
}
