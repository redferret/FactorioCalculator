import AppDispatcher from '../../dispatcher.js';
import Input from '../input.js';
import ModalsStore from '../../stores/modals-store.js';
import NewProductTypeModalStore from '../../stores/new-product-type-modal-store.js';
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

import {
  NEW_PRODUCT_TYPE_MODAL_ID,
} from '../../constants.js';

export default class NewProductTypeModal extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleHideModal = this.handleHideModal.bind(this);
    this._isMounted = false;
    this.state = {
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
    ModalsStore.on(NEW_PRODUCT_TYPE_MODAL_ID, this._onChange.bind(this));
    NewProductTypeModalStore.on(NEW_PRODUCT_TYPE_MODAL_ID, this._onChange.bind(this));
  }

  componentWillUnmount() {
    this._isMounted = false;
    ModalsStore.removeListener(NEW_PRODUCT_TYPE_MODAL_ID, this._onChange.bind(this));
    NewProductTypeModalStore.removeListener(NEW_PRODUCT_TYPE_MODAL_ID, this._onChange.bind(this));
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
            New ProductType
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          Modal Body
        </Modal.Body>

        <Modal.Footer>
          <ButtonToolbar>
            <Button bsStyle='success'>Add ProductType</Button>
            <Button onClick={this.handleHideModal}>Cancel</Button>
          </ButtonToolbar>
        </Modal.Footer>
      </Modal>
    );
  }
}
