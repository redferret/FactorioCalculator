import AppDispatcher from '../../dispatcher.js';
import EditProductionLineModalStore from '../../stores/edit-production-line-modal-store.js';
import FactoryStore from '../../stores/factory-store.js';
import Input from '../input.js';
import MainStore from '../../stores/main-store.js';
import ModalsStore from '../../stores/modals-store.js';
import React from 'react';
import Router from '../../router.js';

import {
  Alert,
  Button,
  ButtonToolbar,
  Col,
  Label,
  Modal,
  Row,
  Table,
  Well,
} from 'react-bootstrap';

import {
  ALL_FACTORIES,
  DELETE_PRODUCTION_LINE,
  EDIT_PRODUCTION_LINE_MODAL_ID,
  GET_INPUT_OUTPUT_PRODUCTION_LINES,
  IMAGE_ASSET,
  SPINNER_MODAL_ID,
  UPDATE_PRODUCTION_LINE_PRODUCER,
} from '../../constants.js';

export class ModalHeader extends React.Component {

  constructor(props, context) {
    super(props, context);
    this._isMounted = false;
    this.state = {
      productionLine: EditProductionLineModalStore.getSelectedProductionLine()
    }
  }

  _onChange() {
    if(this._isMounted) {
      this.setState({
        productionLine: EditProductionLineModalStore.getSelectedProductionLine()
      });
    }
  }

  componentDidMount() {
    EditProductionLineModalStore.on(EDIT_PRODUCTION_LINE_MODAL_ID, this._onChange.bind(this));
    this._isMounted = true;
  }

  componentWillUnmount() {
    EditProductionLineModalStore.removeListener(EDIT_PRODUCTION_LINE_MODAL_ID, this._onChange.bind(this));
    this._isMounted = false;
  }

  render() {
    let productionLine = this.state.productionLine;
    return (
      <div>
        <img src={Router.route(IMAGE_ASSET, {fileName: productionLine.product.image_file})} />{' '}
        {productionLine.name}
      </div>
    )
  }
}

export class ModalBody extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.handleSelectProductionLine = this.handleSelectProductionLine.bind(this);

    this._isMounted = false;

    this.state = {
      productionLine: EditProductionLineModalStore.getSelectedProductionLine()
    }
  }

  _onChange() {
    if(this._isMounted) {
      this.setState({
        productionLine: EditProductionLineModalStore.getSelectedProductionLine()
      });
    }
  }

  componentDidMount() {
    EditProductionLineModalStore.on(EDIT_PRODUCTION_LINE_MODAL_ID, this._onChange.bind(this));
    this._isMounted = true;
  }

  componentWillUnmount() {
    EditProductionLineModalStore.removeListener(EDIT_PRODUCTION_LINE_MODAL_ID, this._onChange.bind(this));
    this._isMounted = false;
  }

  handleSelectProductionLine(productionLine) {
    EditProductionLineModalStore.setSelectedProductionLine(productionLine);
    AppDispatcher.dispatch({
      action: GET_INPUT_OUTPUT_PRODUCTION_LINES,
      data: {
        id: productionLine.id
      },
      emitOn: [{
        store: EditProductionLineModalStore,
        componentIds: [EDIT_PRODUCTION_LINE_MODAL_ID]
      }]
    });
  }

  renderProductDetails() {
    let productionLine = EditProductionLineModalStore.getSelectedProductionLine();
    let producer = productionLine.producer;
    let product = productionLine.product;
    let isMiner = producer.producer_type === 0;
    let id = productionLine.id;

    if (isMiner) {
      return (
        <Table>
          <thead><tr>
            <th>Crafting Time Per Item</th>
            <th>Stock Count</th>
            <th>Item Hardness</th>
            <th>Actual Production (Items/Sec)</th>
            <th>Producers Needed</th>
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
              <Input type='number' isStatic={true}
              initialValue={product.hardness} />
            </td>
            <td>
              <Input type='number' isStatic={true}
              initialValue={productionLine.items_per_second} />
            </td>
            <td>{productionLine.assembly_count}</td>
          </tr></tbody>
        </Table>
      );
    } else {
      return (
        <Table>
          <thead><tr>
            <th>Crafting Time Per Item</th>
            <th>Stock Count</th>
            <th>Actual Production (Items/Sec)</th>
            <th>Producers Needed</th>
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
              <Input type='number' isStatic={true}
              initialValue={productionLine.items_per_second} />
            </td>
            <td>{productionLine.assembly_count}</td>
          </tr></tbody>
        </Table>
      );
    }
  }

  renderProductionLines(productionLines) {
    return (
      <div className='production-lines-well'>
        <div className='list-group'> {
          productionLines.map(productionLine => {
            let product = productionLine.product;
            let producer = productionLine.producer;
            return (
              <div key={productionLine.name + product.name + product.id}>
                <Label>Production Line: {productionLine.name}</Label>
                <a
                onClick={() => this.handleSelectProductionLine(productionLine)}
                className='list-group-item list-group-item-action'
                >
                  <Row>
                    <Col sm={4}>
                      <img src={Router.route(IMAGE_ASSET, {fileName: product.image_file})} />{' '}
                      {product.name}
                    </Col>
                    <Col sm={4}>
                      <div className='font-bold'>Production Rate (Items/Sec): </div>
                      {productionLine.items_per_second}
                    </Col>
                    <Col sm={4}>
                      <div className='font-bold'>Number of Producers Needed: </div>
                      {productionLine.assembly_count}
                    </Col>
                  </Row>
                </a>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  render() {
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
}

export class ModalFooter extends React.Component {

  handleDeleteProductionLine() {
    let productionLine = EditProductionLineModalStore.getSelectedProductionLine();
    let confirmation = confirm("Are you sure you want to delete '"+productionLine.name+"'?");
    if (confirmation) {
      ModalsStore.hideModal();
      ModalsStore.showModal({id: SPINNER_MODAL_ID});
      AppDispatcher.dispatch({
        action: DELETE_PRODUCTION_LINE,
        data: {
          id: productionLine.id
        },
        emitOn: [{
          store: FactoryStore,
          componentIds: [ALL_FACTORIES]
        }]
      });
    }
  }

  render() {
    return (
      <ButtonToolbar>
        <Button bsStyle='danger' onClick={this.handleDeleteProductionLine}>Delete Production Line</Button>
      </ButtonToolbar>
    )
  }
}
