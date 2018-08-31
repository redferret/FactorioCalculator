import AppDispatcher from '../../dispatcher.js';
import Input from '../input.js';
import ModalsStore from '../../stores/modals-store.js';
import EditProductModalStore from '../../stores/edit-product-modal-store.js';
import React from 'react';

import {
  Alert,
  Button,
  ButtonToolbar,
  Label,
  Modal,
  Table,
  Well,
} from 'react-bootstrap';

import { ROOT } from '../../routes.js';

import {
  EDIT_PRODUCT_MODAL_ID,
} from '../../constants.js';

export default class EditProductModal extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleHideModal = this.handleHideModal.bind(this);
    this._isMounted = false;
    this.state = {
      show: ModalsStore.shouldShow(),
      selectedProduct: EditProductModalStore.getSelectedProduct()
    }
  }

  _onChange() {
    if (this._isMounted) {
      this.setState({
        show: ModalsStore.shouldShow(),
        selectedProduct: EditProductModalStore.getSelectedProduct()
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

  render() {
    return (
      <Modal
        show={this.state.show}
        onHide={this.handleHideModal}
        bsSize='large'
        >
        <Modal.Header>
          <Modal.Title>
            <img src={ROOT + '/images/' + this.state.selectedProduct.image_file} />
            {this.state.selectedProduct.name}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>

        </Modal.Body>

        <Modal.Footer>
          <ButtonToolbar>
            <Button bsStyle='success'>Apply</Button>
            <Button onClick={this.handleHideModal}>Cancel</Button>
          </ButtonToolbar>
        </Modal.Footer>
      </Modal>
    );
  }
}
