import AppDispatcher from '../../dispatcher.js';
import EditProductionLineModalStore from '../../stores/edit-production-line-modal-store.js';
import ModalsStore from '../../stores/modals-store.js';
import MainStore from '../../stores/main-store.js';
import FactoryStore from '../../stores/factory-store.js';
import Input from '../input.js';
import React from 'react';
import Router from '../../router.js';

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
  EDIT_PRODUCTION_LINE_MODAL_ID,
  FACTORY_PANEL_,
  GET_FACTORIES,
  GET_PRODUCTION_LINES,
  IMAGE_ASSET,
  MAIN_ID,
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
        {productionLine.product.name}
      </div>
    )
  }
}

export class ModalBody extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.dispatchProducerChanged = this.dispatchProducerChanged.bind(this);
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
      action: GET_PRODUCTION_LINES,
      data: {
        id: productionLine.id
      },
      emitOn: [{
        store: EditProductionLineModalStore,
        componentIds: [EDIT_PRODUCTION_LINE_MODAL_ID]
      }]
    });
  }

  dispatchProducerChanged(event, productionLineId) {
    let values = {};
    values[event.target.name] = event.target.value;

    AppDispatcher.dispatch({
      action: UPDATE_PRODUCTION_LINE_PRODUCER,
      data: {
        id: productionLineId,
        values: values
      },
      emitOn:[{
        store: EditProductionLineModalStore,
        componentIds: [EDIT_PRODUCTION_LINE_MODAL_ID]
      }]
    });

    AppDispatcher.dispatch({
      action: GET_FACTORIES,
      emitOn: [{
        store: MainStore,
        componentIds: [MAIN_ID]
      }, {
        store: FactoryStore,
        componentIds: [FACTORY_PANEL_ + this.state.selectedProductionLine.factory_id]
      }]
    });
  }

  renderProductDetails() {
    let productionLine = this.state.productionLine;
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
              callback={(event) => this.dispatchProducerChanged(event, id)}
              initialValue={producer.speed} />
            </td>
            <td>
              <Input type='number' name='power'
              callback={(event) => this.dispatchProducerChanged(event, id)}
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
            <th>{producer.name}(s) Speed</th>
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
              callback={(event) => this.dispatchProducerChanged(event, id)}
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
            let product = productionLine.product;
            let producer = productionLine.producer;
            return (
              <div key={product.id}>
                <Label>Production Line: {productionLine.name}</Label>
                <a
                onClick={() => this.handleSelectProductionLine(productionLine)}
                className='list-group-item list-group-item-action'
                >
                  <img src={Router.route(IMAGE_ASSET, {fileName: product.image_file})} />{' '}
                  {product.name}
                  <Table>
                    <thead><tr>
                      <th>{producer.name} Needed</th>
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
                        initialValue={product.crafting_time} />
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
              </div>
            );
          })}
        </div>
      </Well>
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
