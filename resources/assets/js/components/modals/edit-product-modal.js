import AppDispatcher from '../../dispatcher.js';
import Input from '../input.js';
import ModalsStore from '../../stores/modals-store.js';
import EditProductModalStore from '../../stores/edit-product-modal-store.js';
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
  EDIT_PRODUCT_MODAL_ID,
  IMAGE_ASSET,
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
    let product = this.state.selectedProduct;
    return (
      <Modal
        show={this.state.show}
        onHide={this.handleHideModal}
        bsSize='large'
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
                <Input type='number' initialValue={product.crafting_time} label='Crafting Time'/>
                <Input type='number' initialValue={product.stock_size} label='Stock Size'/>
              </Col>
              <Col>
                {product.hardness?
                  <Input type='number' initialValue={product.hardness} label='Hardness'/>: ''
                }
              </Col>
            </Row>
          </Grid>
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
