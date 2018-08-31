import AppDispatcher from '../../dispatcher.js';
import Input from '../input.js';
import ModalsStore from '../../stores/modals-store.js';
import NewProductModalStore from '../../stores/new-product-modal-store.js';
import React from 'react';

import {
  Alert,
  Button,
  ButtonToolbar,
  Col,
  DropdownButton,
  Dropdown,
  Grid,
  Label,
  MenuItem,
  Modal,Form,
  Row,
  Table,
  Well,
} from 'react-bootstrap';

import {
  NEW_PRODUCT_MODAL_ID,
} from '../../constants.js';

export default class NewProductModal extends React.Component {
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
    ModalsStore.on(NEW_PRODUCT_MODAL_ID, this._onChange.bind(this));
    NewProductModalStore.on(NEW_PRODUCT_MODAL_ID, this._onChange.bind(this));
  }

  componentWillUnmount() {
    this._isMounted = false;
    ModalsStore.removeListener(NEW_PRODUCT_MODAL_ID, this._onChange.bind(this));
    NewProductModalStore.removeListener(NEW_PRODUCT_MODAL_ID, this._onChange.bind(this));
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
            New Product
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Grid>
            <Row>
              <Col md={3}>
                <Input type='text' initialValue='New Product' label='Product Name'/>
                <Input type='number' initialValue='1' label='Crafting Time'/>
                <Input type='number' initialValue='1' label='Stock Size'/>
              </Col>
              <Col>
                <Input type='number' initialValue='0' label='Hardness' help='Set to 0 if product is not an Ore'/>
              </Col>
            </Row>
            <Row>
              <Col md={3}>
                
              </Col>
            </Row>
          </Grid>
        </Modal.Body>

        <Modal.Footer>
          <ButtonToolbar>
            <Button bsStyle='success'>Add Product</Button>
            <Button onClick={this.handleHideModal}>Cancel</Button>
          </ButtonToolbar>
        </Modal.Footer>
      </Modal>
    );
  }
}
