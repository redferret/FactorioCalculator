import AppDispatcher from '../../dispatcher.js';
import EditProductTypeModalStore from '../../stores/edit-product-type-modal-store.js';
import GameItemsStore from '../../stores/game-items-store.js';
import Input from '../input.js';
import ModalsStore from '../../stores/modals-store.js';
import React from 'react';
import Router from '../../router.js';

import {
  Alert,
  Button,
  ButtonToolbar,
  Col,
  Form,
  Grid,
  Label,
  Modal,
  Row,
  Table,
  Well,
} from 'react-bootstrap';

import {
  EDIT_PRODUCT_TYPE_MODAL_ID,
  GAME_ITEMS_ID,
  IMAGE_ASSET,
  SPINNER_MODAL_ID,
  UPDATE_PRODUCT_TYPE,
} from '../../constants.js';

export default class EditProductTypeModal extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleHideModal = this.handleHideModal.bind(this);
    this.handleApplyProductTypeChanges = this.handleApplyProductTypeChanges.bind(this);
    this.updateNameValue = this.updateNameValue.bind(this);

    this._isMounted = false;

    let productType = EditProductTypeModalStore.getProductType();
    this.state = {
      name: productType.name,
      selectedProductType: productType,
      show: ModalsStore.shouldShow()
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
    ModalsStore.on(EDIT_PRODUCT_TYPE_MODAL_ID, this._onChange.bind(this));
    EditProductTypeModalStore.on(EDIT_PRODUCT_TYPE_MODAL_ID, this._onChange.bind(this));
  }

  componentWillUnmount() {
    this._isMounted = false;
    ModalsStore.removeListener(EDIT_PRODUCT_TYPE_MODAL_ID, this._onChange.bind(this));
    EditProductTypeModalStore.removeListener(EDIT_PRODUCT_TYPE_MODAL_ID, this._onChange.bind(this));
  }

  handleHideModal() {
    ModalsStore.hideModal();
  }

  updateNameValue(event) {
    this.setState({
      name: event.target.value
    });
  }

  handleApplyProductTypeChanges() {
    AppDispatcher.dispatch({
      action: UPDATE_PRODUCT_TYPE,
      data: {
        id: this.state.selectedProductType.id,
        name: this.state.name
      },
      emitOn: [{
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
    let productType = this.state.selectedProductType;
    return (
      <Modal
        show={this.state.show}
        onHide={this.handleHideModal}
        >
        <Modal.Header>
          <Modal.Title>
            <Form inline>
              <Input initialValue={productType.name} isStatic={true}
                label={
                  <img src={Router.route(IMAGE_ASSET, {fileName: productType.image_file})} />
                }
              />
            </Form>
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Grid>
            <Row>
              <Col md={3}>
                <Input type='text' name='name' initialValue={productType.name} label='Name'
                  callback={(event) => this.updateNameValue(event)}/>
              </Col>
            </Row>
          </Grid>
        </Modal.Body>

        <Modal.Footer>
          <ButtonToolbar>
            <Button bsStyle='success' onClick={this.handleApplyProductTypeChanges}>Apply</Button>
            <Button onClick={this.handleHideModal}>Cancel</Button>
          </ButtonToolbar>
        </Modal.Footer>
      </Modal>
    );
  }
}
