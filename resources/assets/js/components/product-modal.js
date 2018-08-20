
import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import ProductStore from '../stores/product-store.js';

export default class ProductModal extends React.Component {

  constructor(props, context) {
    super(props, context);
  }


  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.handleHide}>
        <Modal.Header>
          <Modal.Title>{this.props.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Stuff about the Product
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.handleHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
