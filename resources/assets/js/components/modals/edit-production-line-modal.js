
import React from 'react';

import AppDispatcher from '../../dispatcher.js';
import Input from '../input.js';
import EditProductionLineModalStore from '../../stores/edit-production-line-modal-store.js';
import FactoryStore from '../../stores/factory-store.js';

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
  GET_FACTORIES,
  GET_PRODUCTION_LINES,
  MAIN_ID,
  EDIT_PRODUCTION_LINE_MODAL_ID,
  UPDATE_PRODUCER,
} from '../../constants.js';

export default class EditProductionLineModal extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.renderModalBody = this.renderModalBody.bind(this);
    this.handleShowProductModal = this.handleShowProductModal.bind(this);
    this.handleHideProductModal = this.handleHideProductModal.bind(this);
    this.dispatchProducerChanged = this.dispatchProducerChanged.bind(this);

    this.state = {
      selectedProductionLine: EditProductionLineModalStore.getSelectedProductionLine(),
      show: false
    }
  }

  /**
   * When the modal store emits a change on
   */
  _onChange() {
    this.setState({
      selectedProductionLine: EditProductionLineModalStore.getSelectedProductionLine(),
      show: EditProductionLineModalStore.shouldShow()
    });
  }

  _fetchProductionLines(id) {
    AppDispatcher.dispatch({
      action: GET_PRODUCTION_LINES,
      data: {
        id: id
      },
      emitOn: [{
        store: EditProductionLineModalStore,
        componentIds: [EDIT_PRODUCTION_LINE_MODAL_ID]
      }]
    });
  }

  componentDidMount() {
    EditProductionLineModalStore.on(EDIT_PRODUCTION_LINE_MODAL_ID, this._onChange.bind(this));
  }

  componentWillUnmount() {
    EditProductionLineModalStore.removeListener(EDIT_PRODUCTION_LINE_MODAL_ID, this._onChange.bind(this));
  }

  handleShowProductModal(e) {
    EditProductionLineModalStore.showModal();
  }

  handleHideProductModal() {
    this.setState({
      productionLineStack: []
    });
    EditProductionLineModalStore.hideModal();
  }

  handleSelectProductionLine(productionLine) {
    EditProductionLineModalStore.setSelectedProductionLine(productionLine);
    this._fetchProductionLines(productionLine.id);
  }

  dispatchProducerChanged(event, productionLineId) {
    AppDispatcher.dispatch({
      action: UPDATE_PRODUCER,
      data: {
        productionLineId: productionLineId,
        name: event.target.name,
        value: event.target.value
      },
      emitOn:[{
        store: EditProductionLineModalStore,
        componentIds: [EDIT_PRODUCTION_LINE_MODAL_ID]
      }]
    });

    AppDispatcher.dispatch({
      action: GET_FACTORIES,
      emitOn: [{
        store: FactoryStore,
        componentIds: [MAIN_ID]
      }]
    });
  }

  renderProductDetails() {
    let producer = this.state.selectedProductionLine.producer;
    let product = this.state.selectedProductionLine.produces;
    let isMiner = this.state.selectedProductionLine.producer.producer_type === 0;
    let isInput = this.state.selectedProductionLine.production_line_id !== null;
    let productionId = this.state.selectedProductionLine.id;

    if (isMiner) {
      return (
        <Table>
          <thead><tr>
            <th>Crafting Time Per Item</th>
            <th>Stock Count</th>
            <th>Miner(s) Speed</th>
            <th>Miner(s) Power</th>
            <th>Item Hardness</th>
            <th>Actual Production (Items/Sec)</th>
            <th>Surplus/Deficit (Items/Sec)</th>
          </tr></thead>
          <tbody><tr>
            <td>
              <Input type='number' isStatic={true}
              initialValue={product.crafting_time} />
            </td>
            <td>
              <Input type='number' isStatic={true}
              initialValue={product.stock_size} />
            </td>
            <td>
              <Input type='number' name='speed'
              callback={(event) => this.dispatchProducerChanged(event, productionId)}
              initialValue={producer.speed} />
            </td>
            <td>
              <Input type='number' name='power'
              callback={(event) => this.dispatchProducerChanged(event, productionId)}
              initialValue={producer.power} />
            </td>
            <td>
              <Input type='number' isStatic={true}
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
            <th>Crafting Time Per Item</th>
            <th>Stock Count</th>
            <th>Assember(s) Speed</th>
            <th>Actual Production (Items/Sec)</th>
            <th>Surplus/Deficit (Items/Sec)</th>
          </tr></thead>
          <tbody><tr>
            <td>
              <Input type='number' isStatic={true}
              initialValue={product.crafting_time} />
            </td>
            <td>
              <Input type='number' isStatic={true}
              initialValue={product.stock_size} />
            </td>
            <td>
              <Input type='number' name='speed'
              callback={(event) => this.dispatchProducerChanged(event, productionId)}
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

            let consumerRequirementElement = productionLine.is_output ?
              <div className='list-group-item'>
                <Label>{this.state.selectedProductionLine.produces.name} Requirement</Label>
                <Input type='number' name='consumer_requirement'
                callback={(event) => {console.log('Not Implemented Yet')}}
                initialValue={productionLine.consumer_requirement} />
              </div> :
              <div></div>;

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
                      <th>Items Produced / Sec</th>
                      <th>Actual Production (Items/Sec)</th>
                      <th>Surplus/Deficit (Items/Sec)</th>
                    </tr></thead>
                    <tbody><tr>
                      <td>
                        <Input type='number' isStatic={true}
                        initialValue={productionLine.assembly_count} />
                      </td>
                      <td>
                        <Input type='number' isStatic={true}
                        initialValue={produces.crafting_time} />
                      </td>
                      <td>
                        <Input type='number' isStatic={true}
                        initialValue={productionLine.items_per_second} />
                      </td>
                      <td>Not Implemented Yet</td>
                      <td>Not Implemented Yet</td>
                    </tr></tbody>
                  </Table>
                </a>
                {consumerRequirementElement}
              </div>
            );
          })}
        </div>
      </Well>
    );
  }

  renderModalBody() {
    let inputProductionLines = EditProductionLineModalStore.getInputProductionLines();
    let outputProductionLines = EditProductionLineModalStore.getOutputProductionLines();

    let outputElements = outputProductionLines.length === 0 ?
      <Alert bsStyle='warning'>This is a Primary Output</Alert> :
      this.renderProductionLines(outputProductionLines);

    let inputElements = inputProductionLines.length === 0 ?
      <Alert bsStyle='warning'>This is a Primary Input</Alert> :
      this.renderProductionLines(inputProductionLines);

    return (
      <Modal.Body>
        {this.renderProductDetails()}
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
