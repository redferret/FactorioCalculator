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
  Grid,
  Label,
  MenuItem,
  Modal,Form,
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

export default class EditProductModal extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleHideModal = this.handleHideModal.bind(this);
    this.handleApplyProductChanges = this.handleApplyProductChanges.bind(this);
    this.updateValues = this.updateValues.bind(this);

    this._isMounted = false;
    let selectedProduct = EditProductModalStore.getSelectedProduct();

    this.state = {
      values: {
        crafting_time: selectedProduct.crafting_time,
        hardness: selectedProduct.hardness,
        stock_size: selectedProduct.stock_size
      },
      show: ModalsStore.shouldShow(),
      selectedProduct: selectedProduct
    }
  }

  _onChange() {
    if (this._isMounted) {
      this.setState({
        show: ModalsStore.shouldShow()
      });
    }
  }

  componentDidMount() {
    this._isMounted = true;
    ModalsStore.on(EDIT_PRODUCT_MODAL_ID, this._onChange.bind(this));
    EditProductModalStore.on(EDIT_PRODUCT_MODAL_ID, this._onChange.bind(this));
  }

  componentWillUnmount() {
    this._isMounted = false;
    ModalsStore.removeListener(EDIT_PRODUCT_MODAL_ID, this._onChange.bind(this));
    EditProductModalStore.removeListener(EDIT_PRODUCT_MODAL_ID, this._onChange.bind(this));
  }

  handleHideModal() {
    ModalsStore.hideModal();
  }

  updateValues(event) {
    let value = event.target.value;
    let values = this.state.values;
    switch(event.target.name) {
      case 'crafting_time':
        values.crafting_time = value;
        this.setState({
          values: values
        });
        break;
      case 'hardness':
        values.hardness = value;
        this.setState({
          values: values
        });
        break;
      case 'stock_size':
        values.stock_size = value;
        this.setState({
          values: values
        });
        break;
    }
  }

  handleApplyProductChanges() {
    AppDispatcher.dispatch({
      action: UPDATE_PRODUCT,
      data: {
        id: this.state.selectedProduct.id,
        values: this.state.values
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
    let product = this.state.selectedProduct;
    return (
      <Modal
        show={this.state.show}
        onHide={this.handleHideModal}
        >
        <Modal.Header>
          <Modal.Title>
            <Form inline>
              <Input initialValue={product.name} isStatic={true}
                label={
                  <img src={Router.route(IMAGE_ASSET, {fileName: product.image_file})} />
                }
              />
            </Form>
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
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
        </Modal.Body>

        <Modal.Footer>
          <ButtonToolbar>
            <Button bsStyle='success' onClick={this.handleApplyProductChanges}>Apply</Button>
            <Button onClick={this.handleHideModal}>Cancel</Button>
          </ButtonToolbar>
        </Modal.Footer>
      </Modal>
    );
  }
}
