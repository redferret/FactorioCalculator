import AppDispatcher from '../dispatcher.js';
import EditProductionLineModal from './modals/edit-production-line-modal.js';
import EditProductionLineModalStore from '../stores/edit-production-line-modal-store.js';
import FactoryStore from '../stores/factory-store.js';
import Input from './input.js';
import MainStore from '../stores/main-store.js';
import ModalsStore from '../stores/modals-store.js';
import React from 'react';
import Router from '../router.js';

import {
  Alert,
  Button,
  ButtonToolbar,
  Panel,
  Label,
  Table,
  Grid,
  Row,
  Col,
} from 'react-bootstrap';

import {
  EDIT_PRODUCTION_LINE_MODAL_ID,
  FACTORY_PANEL_,
  GET_PRODUCTION_LINES,
  IMAGE_ASSET,
  MAIN_ID,
  MAIN_MODAL_CHANGE,
  MODAL_ID,
  SPINNER_MODAL_ID,
  UPDATE_PRODUCTION_LINE_PRODUCER,
  UPDATE_PRODUCTION_LINE,
} from '../constants.js';

export default class ProductionLineDetails extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.handleShowModal = this.handleShowModal.bind(this);
    this.changeProduct = this.changeProduct.bind(this);
    this.itemsPerSecondChanged = this.itemsPerSecondChanged.bind(this);
    this.dispatchProducerChanged = this.dispatchProducerChanged.bind(this);
  }

  handleShowModal() {
    ModalsStore.setToShowModal(EDIT_PRODUCTION_LINE_MODAL_ID);
    EditProductionLineModalStore.setSelectedProductionLine(this.props);
    AppDispatcher.dispatch({
      action: GET_PRODUCTION_LINES,
      data: {
        id: this.props.id
      },
      emitOn: [{
        store: ModalsStore,
        componentIds: [MODAL_ID]
      }]
    });
  }

  itemsPerSecondChanged(event) {
    let values = {};
    values[event.target.name] = event.target.value;

    if (this.props.items_per_second != event.target.value) {
      ModalsStore.showModal({
        id: SPINNER_MODAL_ID
      });
      AppDispatcher.dispatch({
        action: UPDATE_PRODUCTION_LINE,
        data: {
          productionLineId: this.props.id,
          values: values
        },
        emitOn: [{
          store: MainStore,
          componentIds: [MAIN_ID]
        }, {
          store: FactoryStore,
          componentIds: [FACTORY_PANEL_ + this.props.factory_id]
        }]
      });
    }
  }

  changeProduct(e) {

  }

  dispatchProducerChanged(event) {
    let values = {};
    values[event.target.name] = event.target.value;

    ModalsStore.showModal({
      id: SPINNER_MODAL_ID
    });
    let productionLine = this.props;
    AppDispatcher.dispatch({
      action: UPDATE_PRODUCTION_LINE_PRODUCER,
      data: {
        id: productionLine.id,
        values: values
      },
      emitOn: [{
        store: MainStore,
        componentIds: [MAIN_ID]
      }, {
        store: FactoryStore,
        componentIds: [FACTORY_PANEL_ + this.props.factory_id]
      }]
    });
  }

  renderTHDetails(producerCountTitle) {
    return (
      <tr>
        <th>Name</th>
        <th>{producerCountTitle}</th>
        <th>Items Produced / Second</th>
        <th>{this.props.producer.name} Speed</th>
        <th>Items Consumed</th>
        <th>Seconds Per Item</th>
      </tr>
    )
  }

  renderTDDetails(itemsPerSecond) {
    return (
      <tr>
        <td>
          <img src={Router.route(IMAGE_ASSET, {fileName: this.props.product.image_file})} />{' '}
          {this.props.product.name}
        </td>
        <td><Input initialValue={this.props.assembly_count} isStatic={true}/></td>
        <td>{itemsPerSecond}</td>
        <td>
          <Input type='number' name='speed'
          callback={(event) => this.dispatchProducerChanged(event)}
          initialValue={this.props.producer.speed}/>
        </td>
        <td>#</td>
        <td><Input initialValue={this.props.seconds_per_item} isStatic={true}/></td>
      </tr>
    )
  }

  renderTHForMiner(producerCountTitle) {
    return (
      <tr>
        <th>Name</th>
        <th>{producerCountTitle}</th>
        <th>Items Produced / Second</th>
        <th>{this.props.producer.name} Speed</th>
        <th>{this.props.producer.name} Power</th>
        <th>Items Consumed</th>
        <th>Seconds Per Item</th>
      </tr>
    )
  }

  renderTDForMiner(itemsPerSecond) {
    return (
      <tr>
        <td>
          <img src={Router.route(IMAGE_ASSET, {fileName: this.props.product.image_file})} />{' '}
          {this.props.product.name}
        </td>
        <td><Input initialValue={this.props.assembly_count} isStatic={true}/></td>
        <td>{itemsPerSecond}</td>
        <td>
          <Input type='number' name='speed'
          callback={(event) => this.dispatchProducerChanged(event)}
          initialValue={this.props.producer.speed}/>
        </td>
        <td>
          <Input type='number' name='power'
          callback={(event) => this.dispatchProducerChanged(event)}
          initialValue={this.props.producer.power}/>
        </td>
        <td>#</td>
        <td><Input initialValue={this.props.seconds_per_item} isStatic={true}/></td>
      </tr>
    )
  }

  renderProductionDetails() {
    let producerCountTitle = 'undefined';
    let madeWithTitle = 'undefined';
    let isMiner = this.props.producer.producer_type === 0;
    switch(this.props.producer.producer_type) {
      case 0:
        producerCountTitle = 'Number of Miners';
        madeWithTitle = 'Mined With';
        break;
      case 1:
        producerCountTitle = 'Number of Assemblers';
        madeWithTitle = 'Assembled In';
        break;
      case 2:
        producerCountTitle = 'Number of Furnaces';
        madeWithTitle = 'Smelted In';
        break;
      case 3:
        producerCountTitle = 'Number of Pumpjacks';
        madeWithTitle = 'Pumped with';
    }

    let inputValue = this.props.items_per_second;
    let itemsPerSecond = this.props.is_output ?
      <Input type='number' name='items_per_second'
        callback={this.itemsPerSecondChanged}
        initialValue={inputValue} /> :
      <Input type='number' isStatic={true}
        initialValue={inputValue} />;

    return (
      <div>
        <Table>
          <thead>
            {isMiner? this.renderTHForMiner(producerCountTitle) : this.renderTHDetails(producerCountTitle)}
          </thead>
          <tbody>
            {isMiner? this.renderTDForMiner(itemsPerSecond) : this.renderTDDetails(itemsPerSecond)}
          </tbody>
        </Table>
        <div className='made-in-container'>
          <Row>
            <Label>{madeWithTitle}</Label>
          </Row>
          <Row>
            <img src={Router.route(IMAGE_ASSET, {fileName: this.props.producer.image_file})} />
            {' ' + this.props.producer.name}
          </Row>
        </div>
        <br/>
        <ButtonToolbar>
          <Button bsStyle='success'>Add Input</Button>
          <Button bsStyle='primary'>Add Consumer</Button>
          <Button onClick={this.handleShowModal} bsStyle='warning'>Select Production Line</Button>{' '}
          <Button onClick={this.changeProduct}>Change Product</Button>
          <Button>Change Producer</Button>
        </ButtonToolbar>
      </div>
    );
  }

  render() {
    return (
      <Panel bsStyle='info' eventKey={this.props.eventKey}>
        <Panel.Heading>
          <Panel.Title toggle>
            {this.props.name}
          </Panel.Title>
        </Panel.Heading>
        <Panel.Body collapsible>
          {this.renderProductionDetails()}
        </Panel.Body>
      </Panel>
    )
  }

}
