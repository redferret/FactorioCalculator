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
  UPDATE_PRODUCTION_LINE,
  SPINNER_MODAL_ID
} from '../constants.js';

export default class ProductionLineDetails extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.addProductToProduction = this.addProductToProduction.bind(this);
    this.handleShowModal = this.handleShowModal.bind(this);
    this.removeFromProduction = this.removeFromProduction.bind(this);
    this.itemsPerSecondChanged = this.itemsPerSecondChanged.bind(this);
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
        store: MainStore,
        componentIds: [MAIN_MODAL_CHANGE]
      }, {
        store: EditProductionLineModalStore,
        componentIds: [EDIT_PRODUCTION_LINE_MODAL_ID]
      }]
    });
  }

  itemsPerSecondChanged(event) {
    if (this.props.items_per_second != event.target.value) {
      ModalsStore.showModal({
        id: SPINNER_MODAL_ID,
        store: ModalsStore
      });
      AppDispatcher.dispatch({
        action: UPDATE_PRODUCTION_LINE,
        data: {
          productionLineId: this.props.id,
          name: event.target.name,
          value: event.target.value,
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

  removeFromProduction(e) {
    alert("Remove "+this.props.product.name+" from Production " + this.props.product.production_line_id);
  }

  addProductToProduction(e) {
    alert("Add Product to Production "+ this.props.id);
  }

  renderProductionDetails() {
    if (this.props.product !== null) {

      let producerCountTitle = 'undefined';
      let madeWithTitle = 'undefined';
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
              <tr>
                <th>Name</th>
                <th>{producerCountTitle}</th>
                <th>Items Produced / Second</th>
                <th>Items Consumed</th>
                <th>Seconds Per Item</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <img src={Router.route(IMAGE_ASSET, {fileName: this.props.product.image_file})} />{' '}
                  {this.props.product.name}
                </td>
                <td>{this.props.assembly_count}</td>
                <td>{itemsPerSecond}</td>
                <td>#</td>
                <td>{this.props.seconds_per_item}</td>
              </tr>
            </tbody>
          </Table>
          <Grid>
            <Row>
              <Label>{madeWithTitle}</Label>
            </Row>
            <Row>
              <img src={Router.route(IMAGE_ASSET, {fileName: this.props.producer.image_file})} />
              {' ' + this.props.producer.name}
            </Row>
          </Grid>
          <br/>
          <ButtonToolbar>
            <Button onClick={this.handleShowModal} bsStyle='primary' bsSize='small'>Select Production Line</Button>{' '}
            <Button onClick={this.removeFromProduction} bsSize='small'>Remove Product from Production Line</Button>
          </ButtonToolbar>
        </div>
      );
    }

    return (
      <div>
        <br/>
        <Alert bsStyle='danger'>Produces Nothing, Select a Product for this Production Line</Alert>
        <ButtonToolbar>
          <Button onClick={this.addProductToProduction} bsStyle='primary'>Add Product</Button>
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
