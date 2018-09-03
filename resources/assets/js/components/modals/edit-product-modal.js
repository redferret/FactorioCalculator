import AppDispatcher from '../../dispatcher.js';
import EditProductModalStore from '../../stores/edit-product-modal-store.js';
import FactoryStore from '../../stores/factory-store.js';
import GameItemsStore from '../../stores/game-items-store.js'
import Input from '../input.js';
import ModalsStore from '../../stores/modals-store.js';
import React from 'react';
import Router from '../../router.js';

import {
  Alert,
  Button,
  ButtonToolbar,
  Col,
  DropdownButton,
  Form,
  Grid,
  Label,
  MenuItem,
  Modal,
  Row,
  Table,
  Well,
} from 'react-bootstrap';

import {
  ALL_FACTORIES,
  EDIT_PRODUCT_MODAL_ID,
  GAME_ITEMS_ID,
  IMAGE_ASSET,
  UPDATE_PRODUCT,
  SPINNER_MODAL_ID,
} from '../../constants.js';

export class ModalHeader extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      product: EditProductModalStore.getSelectedProduct()
    }
  }
  _onChange() {
    if (this._isMounted) {
      this.setState({
        product: EditProductModalStore.getSelectedProduct()
      })
    }
  }
  componentDidMount() {
    this._isMounted = true;
    EditProductModalStore.on(EDIT_PRODUCT_MODAL_ID, this._onChange.bind(this));
  }
  componentWillUnmount() {
    this._isMounted = false;
    EditProductModalStore.removeListener(EDIT_PRODUCT_MODAL_ID, this._onChange.bind(this));
  }
  render() {
    let product = this.state.product;
    return (
      <Form inline>
        <Input initialValue={product.name} isStatic={true}
          label={
            <img src={Router.route(IMAGE_ASSET, {fileName: product.image_file})} />
          }
        />
      </Form>
    )
  }
}

export class ModalBody extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.updateValues = this.updateValues.bind(this);
    this.state = {
      product: EditProductModalStore.getSelectedProduct()
    }
  }
  _onChange() {
    if (this._isMounted) {
      this.setState({
        product: EditProductModalStore.getSelectedProduct()
      })
    }
  }
  componentDidMount() {
    this._isMounted = true;
    EditProductModalStore.on(EDIT_PRODUCT_MODAL_ID, this._onChange.bind(this));
  }
  componentWillUnmount() {
    this._isMounted = false;
    EditProductModalStore.removeListener(EDIT_PRODUCT_MODAL_ID, this._onChange.bind(this));
  }
  updateValues(event) {
    let value = event.target.value;
    let values = EditProductModalStore.getProductValues();
    values[event.target.name] = value;
    EditProductModalStore.setProductValues(values);
  }
  render() {
    let product = this.state.product;
    return (
      <Grid>
        <Row>
          <Col md={3}>
            <Input type='number' name='crafting_time' initialValue={product.crafting_time} label='Crafting Time'
              callback={(event) => this.updateValues(event)}/>
            <Input type='number' name='stock_size' initialValue={product.stock_size} label='Stock Size'
              callback={(event) => this.updateValues(event)}/>
          </Col>
          <Col>
            {product.hardness?
              <Input type='number' name='hardness' initialValue={product.hardness} label='Hardness'
                callback={(event) => this.updateValues(event)}/>: ''
            }
          </Col>
        </Row>
      </Grid>
    )
  }
}

export class ModalFooter extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.handleApplyProductChanges = this.handleApplyProductChanges.bind(this);
    this.state = {
      product: EditProductModalStore.getSelectedProduct()
    }
  }
  _onChange() {
    if (this._isMounted) {
      this.setState({
        product: EditProductModalStore.getSelectedProduct()
      })
    }
  }
  componentDidMount() {
    this._isMounted = true;
    EditProductModalStore.on(EDIT_PRODUCT_MODAL_ID, this._onChange.bind(this));
  }
  componentWillUnmount() {
    this._isMounted = false;
    EditProductModalStore.removeListener(EDIT_PRODUCT_MODAL_ID, this._onChange.bind(this));
  }
  handleApplyProductChanges() {
    AppDispatcher.dispatch({
      action: UPDATE_PRODUCT,
      data: {
        id: this.state.product.id,
        values: EditProductModalStore.getProductValues()
      },
      emitOn: [{
        store: FactoryStore,
        componentIds: [ALL_FACTORIES]
      }, {
        store: GameItemsStore,
        componentIds: [GAME_ITEMS_ID]
      }]
    });
    ModalsStore.hideModal();
    ModalsStore.showModal({
      id: SPINNER_MODAL_ID,
      store: ModalsStore
    });
  }
  render() {
    return (
      <ButtonToolbar>
        <Button bsStyle='success' onClick={this.handleApplyProductChanges}>Apply</Button>
        <Button onClick={this.handleHideModal}>Cancel</Button>
      </ButtonToolbar>
    )
  }
}
