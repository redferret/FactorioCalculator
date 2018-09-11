import AppDispatcher from '../../dispatcher.js';
import AddInputModalStore from '../../stores/add-input-modal-store.js';
import FactoryStore from '../../stores/factory-store.js';
import MenuItems from '../menu-items.js';
import ModalsStore from '../../stores/modals-store.js';
import Router from '../../router.js';
import React from 'react';
import ItemTable from '../item-table.js';

import {
  Button,
  ButtonToolbar,
  Grid,
  Row,
  Col,
  MenuItem,
  Dropdown,
} from 'react-bootstrap';

import {
  ADD_INPUT,
  ADD_INPUT_MODAL_ID,
  IMAGE_ASSET,
  SPINNER_MODAL_ID,
} from '../../constants.js';

export class ModalHeader extends React.Component {

  render() {
    let productionLine = AddInputModalStore.getProductionLine();
    return (
      <div>Add Input to {productionLine.name}</div>
    );
  }
}

export class ModalBody extends React.Component {

  constructor() {
    super();
    this.handleMenuItemSelect = this.handleMenuItemSelect.bind(this);
    this.handleMenuToggle = this.handleMenuToggle.bind(this);
    this.handleAddProductionLine = this.handleAddProductionLine.bind(this);
    this.handleRemoveProductionLine = this.handleRemoveProductionLine.bind(this);
    this._isMounted = false;

    this.state = {
      menuOpen: false,
      selectedFactoryId: -1,
      inputs: AddInputModalStore.getInputs()
    }
  }

  _onChange() {
    if(this._isMounted) {
      this.setState({
        inputs: AddInputModalStore.getInputs()
      });
    }
  }

  componentDidMount() {
    AddInputModalStore.on(ADD_INPUT_MODAL_ID, this._onChange.bind(this));
    this._isMounted = true;
  }

  componentWillUnmount() {
    AddInputModalStore.removeListener(ADD_INPUT_MODAL_ID, this._onChange.bind(this));
    this._isMounted = false;
  }

  handleMenuItemSelect(factory) {
    this.setState({
      menuOpen: false,
      selectedFactoryId: factory.id
    });
  }

  handleMenuToggle() {
    this.setState({
      menuOpen:!this.state.menuOpen
    });
  }

  handleAddProductionLine(productionLine) {
    AddInputModalStore.addInput(productionLine);
    this.setState({
      inputs: AddInputModalStore.getInputs()
    })
  }

  handleRemoveProductionLine(productionLine) {
    AddInputModalStore.removeInput(productionLine);
    this.setState({
      inputs: AddInputModalStore.getInputs()
    })
  }

  render() {
    let productionLine = AddInputModalStore.getProductionLine();
    let factories = FactoryStore.getFactories();
    let selectedFactory = FactoryStore.getFactory(this.state.selectedFactoryId);
    return (
      <Grid>
        <Row>
          <Col sm={9}>
            <Row>
              <Col sm={5}>
                <div>Production Line: {productionLine.name}</div>
                <ItemTable items={AddInputModalStore.getInputs()} rowLength={1}
                  emptyItemsMessage='No Inputs'
                  onClickCallback={this.handleRemoveProductionLine}
                  itemCallback={(productionLine =>
                    <div>
                      <img src={Router.route(IMAGE_ASSET, {fileName: productionLine.product.image_file})} />
                      {productionLine.name}
                    </div>
                  )} />
              </Col>
              <Col sm={7} className='border-left'>
                <Dropdown open={this.state.menuOpen} onToggle={this.handleMenuToggle} id='factory-menu'>
                  <Dropdown.Toggle>Factories</Dropdown.Toggle>
                  <MenuItems>
                    {factories.map(factory =>
                      <MenuItem key={factory.id} eventKey={factory.id}
                        onClick={(event)=>this.handleMenuItemSelect(factory)}>
                        {factory.name}
                      </MenuItem>
                    )}
                  </MenuItems>
                </Dropdown>
                {selectedFactory?
                  <ItemTable items={selectedFactory.production_lines} rowLength={2}
                    emptyItemsMessage='No Production Lines'
                    onClickCallback={this.handleAddProductionLine}
                    itemCallback={(productionLine =>
                      <div>
                        <img src={Router.route(IMAGE_ASSET, {fileName: productionLine.product.image_file})} />
                        {productionLine.name}
                      </div>
                    )} />
                  : ''}
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col sm={9}>
            <div className='help-text'>
              <p>
                Select a Factory on the right and then select the
                Production Line you want to add as an Input to {productionLine.name}.
                To remove the input, select the Production Line on the left.
              </p>
            </div>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export class ModalFooter extends React.Component {
  render() {
    return (
      <ButtonToolbar>
        <Button bsStyle='success'>Apply</Button>
        <Button onClick={()=>ModalsStore.hideModal()}>Cancel</Button>
      </ButtonToolbar>
    )
  }
}
