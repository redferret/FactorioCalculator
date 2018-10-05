import AppDispatcher from '../../dispatcher.js';
import EditInputsModalStore from '../../stores/edit-inputs-modal-store.js';
import FactoryStore from '../../stores/factory-store.js';
import ItemTable from '../item-table.js';
import SearchableDropdown from '../searchable-dropdown.js';
import ModalsStore from '../../stores/modals-store.js';
import React from 'react';
import Router from '../../router.js';

import {
  Alert,
  Button,
  ButtonToolbar,
  Col,
  Row,
} from 'react-bootstrap';

import {
  ALL_FACTORIES,
  EDIT_INPUTS,
  EDIT_INPUTS_MODAL_ID,
  IMAGE_ASSET,
  SPINNER_MODAL_ID,
} from '../../constants.js';

export class ModalHeader extends React.Component {

  render() {
    let productionLine = EditInputsModalStore.getProductionLine();
    return (
      <div>Manage Inputs for {productionLine.name}</div>
    );
  }
}

export class ModalBody extends React.Component {

  constructor() {
    super();
    this.handleFactorySelect = this.handleFactorySelect.bind(this);
    this.handleAddProductionLine = this.handleAddProductionLine.bind(this);
    this.handleRemoveProductionLine = this.handleRemoveProductionLine.bind(this);
    this._isMounted = false;

    this.state = {
      selectedFactoryId: -1,
      inputs: EditInputsModalStore.getInputs(),
      missingInputs: EditInputsModalStore.getMissingInputs()
    }
  }

  _onChange() {
    if(this._isMounted) {
      this.setState({
        inputs: EditInputsModalStore.getInputs(),
        missingInputs: EditInputsModalStore.getMissingInputs()
      });
    }
  }

  componentDidMount() {
    EditInputsModalStore.on(EDIT_INPUTS_MODAL_ID, this._onChange.bind(this));
    this._isMounted = true;
  }

  componentWillUnmount() {
    EditInputsModalStore.removeListener(EDIT_INPUTS_MODAL_ID, this._onChange.bind(this));
    this._isMounted = false;
  }

  handleFactorySelect(factory) {
    this.setState({
      selectedFactoryId: factory.id
    });
  }

  handleAddProductionLine(productionLine) {
    EditInputsModalStore.addInput(productionLine);
    EditInputsModalStore.validateInputs();
    this.setState({
      inputs: EditInputsModalStore.getInputs(),
      missingInputs: EditInputsModalStore.getMissingInputs()
    });
  }

  handleRemoveProductionLine(productionLine) {
    EditInputsModalStore.removeInput(productionLine);
    EditInputsModalStore.validateInputs();
    this.setState({
      inputs: EditInputsModalStore.getInputs(),
      missingInputs: EditInputsModalStore.getMissingInputs()
    });
  }

  renderMissingInputs() {
    if (this.state.missingInputs.length > 0) {
      return (
        <Alert bsStyle='danger'>
          <div>
            Missing Inputs:
          </div>
          <ItemTable items={this.state.missingInputs} rowLength={1} sm={12}
            noButton itemCallback={(product =>
              <div>
                <img src={Router.route(IMAGE_ASSET, {fileName: product.image_file})} />
                {product.name}
              </div>
            )} />
        </Alert>
      );
    } else {
      return (
        <Alert bsStyle='info'>
          No Missing Inputs
        </Alert>
      );
    }
  }

  renderFactoryProductionLines(selectedFactory) {
    if (selectedFactory) {
      return (
        <div className='production-lines-well'>
          <ItemTable items={selectedFactory.production_lines} rowLength={2} sm={6}
            emptyItemsMessage='No Production Lines'
            onClickCallback={this.handleAddProductionLine}
            itemCallback={(productionLine => {
              let product = productionLine.product;
              let imageFile = product? product.image_file : 'Questionmark.png';
              return (
                <div>
                  <img width={32} height={32} src={Router.route(IMAGE_ASSET, {fileName: imageFile})} />
                  {productionLine.name}
                </div>
              );
            })} />
        </div>
      );
    }
  }

  render() {
    let productionLine = EditInputsModalStore.getProductionLine();
    let factories = FactoryStore.getFactories();
    let selectedFactory = FactoryStore.getFactory(this.state.selectedFactoryId);
    return (
      <div>
        <Row>
          <Col sm={12}>
            <Row>
              <Col sm={5}>
                <h4>Inputs for {productionLine.name}</h4>
                <ItemTable items={this.state.inputs} rowLength={1} sm={12}
                  emptyItemsMessage='No Inputs'
                  onClickCallback={this.handleRemoveProductionLine}
                  itemCallback={(productionLine => {
                    let product = productionLine.product;
                    let imageFile = product? product.image_file : 'Questionmark.png';
                    return (
                      <div>
                        <img width={32} height={32} src={Router.route(IMAGE_ASSET, {fileName: imageFile})} />
                        {productionLine.name}
                      </div>
                    );
                  })} />
                {this.renderMissingInputs()}
              </Col>
              <Col sm={7}>
                <SearchableDropdown toggleText='Factories' id='factory-menu' items={factories}
                  itemSelectCallback={this.handleFactorySelect}
                  itemCallback={(factory) => factory.name} />
                {this.renderFactoryProductionLines(selectedFactory)}
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col sm={12}>
            <div className='help-text'>
              <p>
                Select a Factory on the right and then select the
                Production Line you want to add as an Input to {productionLine.name}.
                To remove the input, select the Production Line on the left.
              </p>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export class ModalFooter extends React.Component {

  handleApplyChanges() {
    ModalsStore.hideModal();
    ModalsStore.showModal({id:SPINNER_MODAL_ID});
    let productionLine = EditInputsModalStore.getProductionLine();
    AppDispatcher.dispatch({
      action: EDIT_INPUTS,
      id: productionLine.id,
      inputs: EditInputsModalStore.getInputs(),
      emitOn:[{
        store: FactoryStore,
        componentIds: [ALL_FACTORIES]
      }]
    });
  }

  render() {
    return (
      <ButtonToolbar>
        <Button bsStyle='success' onClick={this.handleApplyChanges}>Apply</Button>
        <Button onClick={()=>ModalsStore.hideModal()}>Cancel</Button>
      </ButtonToolbar>
    )
  }
}
