import AppDispatcher from '../dispatcher.js';
import EditInputsModalStore from '../stores/edit-inputs-modal-store.js';
import EditProductionLineModal from './modals/edit-production-line-modal.js';
import EditProductionLineModalStore from '../stores/edit-production-line-modal-store.js';
import FactoryStore from '../stores/factory-store.js';
import Input from './input.js';
import MainStore from '../stores/main-store.js';
import ManualCrafting from './producer-details/manual-crafting.js';
import ModalsStore from '../stores/modals-store.js';
import ProducerMiners from './producer-details/producer-miners.js';
import ProducerPumps from './producer-details/producer-pumps.js';
import Producers from './producer-details/producers.js';
import React from 'react';
import Router from '../router.js';

import {
  Alert,
  Button,
  ButtonToolbar,
  Panel,
  Label,
  Table,
  Row,
  Col,
} from 'react-bootstrap';

import {
  ALL_FACTORIES,
  EDIT_INPUTS_MODAL_ID,
  EDIT_PRODUCTION_LINE_MODAL_ID,
  GET_INPUT_OUTPUT_PRODUCTION_LINES,
  GET_INPUT_PRODUCTION_LINES,
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
    this.handleShowEditProductionLineModal = this.handleShowEditProductionLineModal.bind(this);
    this.handleShowEditInputsModal = this.handleShowEditInputsModal.bind(this);
    this.changeProduct = this.changeProduct.bind(this);
    this.itemsPerSecondChanged = this.itemsPerSecondChanged.bind(this);
    this.dispatchProducerChanged = this.dispatchProducerChanged.bind(this);
  }

  handleShowEditInputsModal() {
    EditInputsModalStore.setProductionLine(this.props);
    ModalsStore.setToShowModal(EDIT_INPUTS_MODAL_ID);
    AppDispatcher.dispatch({
      action: GET_INPUT_PRODUCTION_LINES,
      id: this.props.id,
      emitOn: [{
        store: ModalsStore,
        componentIds: [MODAL_ID]
      }]
    });
  }

  handleShowEditProductionLineModal() {
    ModalsStore.setToShowModal(EDIT_PRODUCTION_LINE_MODAL_ID);
    EditProductionLineModalStore.setSelectedProductionLine(this.props);
    AppDispatcher.dispatch({
      action: GET_INPUT_OUTPUT_PRODUCTION_LINES,
      id: this.props.id,
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
        productionLineId: this.props.id,
        values: values,
        emitOn: [{
          store: MainStore,
          componentIds: [MAIN_ID]
        }, {
          store: FactoryStore,
          componentIds: [ALL_FACTORIES]
        }]
      });
    }
  }

  dispatchProducerChanged(event) {
    let values = {};
    values[event.target.name] = event.target.value;

    ModalsStore.showModal({id: SPINNER_MODAL_ID});
    let productionLine = this.props;
    AppDispatcher.dispatch({
      action: UPDATE_PRODUCTION_LINE_PRODUCER,
      id: productionLine.id,
      values: values,
      emitOn: [{
        store: MainStore,
        componentIds: [MAIN_ID]
      }, {
        store: FactoryStore,
        componentIds: [ALL_FACTORIES]
      }]
    });
  }

  changeProduct(e) {

  }

  renderTable() {
    let inputValue = this.props.items_per_second;
    let itemsPerSecond = this.props.is_output ?
      <Input type='number' name='items_per_second'
        callback={this.itemsPerSecondChanged}
        initialValue={inputValue} /> :
      <Input type='number' isStatic={true}
        initialValue={inputValue} />;

    switch(this.props.producer.producer_type) {
      case 0:
        return <ProducerMiners dispatchProducerChanged={this.dispatchProducerChanged}
                  itemsPerSecond={itemsPerSecond} {...this.props}/>;
      case 1:
        return <Producers dispatchProducerChanged={this.dispatchProducerChanged}
                  itemsPerSecond={itemsPerSecond} {...this.props} title='Number of Assemblers'/>;
      case 2:
        return <Producers dispatchProducerChanged={this.dispatchProducerChanged}
                  itemsPerSecond={itemsPerSecond} {...this.props} title='Number of Furnaces'/>;
      case 3:
        return <ProducerPumps dispatchProducerChanged={this.dispatchProducerChanged}
                  itemsPerSecond={itemsPerSecond} {...this.props}/>;
      case 4:
        return <Producers dispatchProducerChanged={this.dispatchProducerChanged}
                itemsPerSecond={itemsPerSecond} {...this.props} title='Number of Storage Tanks'/>;
      case 5:
        return <ManualCrafting {...this.props}/>;
      default:
        return (<div>Invalid Producer Type!</div>)
    }
  }

  renderProductionDetails() {
    let madeWithTitle = '';
    switch(this.props.producer.producer_type) {
      case 0:
        madeWithTitle = 'Mined With';
        break;
      case 1:
        madeWithTitle = 'Assembled In';
        break;
      case 2:
        madeWithTitle = 'Smelted In';
        break;
      case 3:
        madeWithTitle = 'Pumped with';
        break;
      case 4:
        madeWithTitle = 'Processed in';
        break;
    }

    return (
      <div>
        {this.renderTable()}
        <div className='made-in-container'>
          <Row>
            <Label>{madeWithTitle}</Label>
          </Row>
          <Row>
            <img src={Router.plainRoute(IMAGE_ASSET, {fileName: this.props.producer.image_file})} />
            {' ' + this.props.producer.name}
          </Row>
        </div>
        <br/>
        <ButtonToolbar>
          <Button bsStyle='success' onClick={this.handleShowEditInputsModal}>Manage Inputs</Button>
          <Button bsStyle='info' onClick={this.handleShowEditProductionLineModal}>
            Select Production Line
          </Button>
          <Button>Select Process</Button>
          <Button onClick={this.changeProduct}>Change Product</Button>
          <Button>Change Producer</Button>
        </ButtonToolbar>
      </div>
    );
  }

  render() {
    let style = (this.props.is_output? 'success' :
                  (this.props.is_primary? 'warning' : 'info'));
    return (
      <Panel bsStyle={style} eventKey={this.props.eventKey}>
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
