import AppDispatcher from '../../dispatcher.js';
import Input from '../input.js';
import NewProductionLineModalStore from '../../stores/new-production-line-modal-store.js';
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
  NEW_PRODUCTION_LINE_MODAL_ID,
} from '../../constants.js';

export default class NewProductionLineModal extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleHideModal = this.handleHideModal.bind(this);

    this.state = {
      show: false
    }
  }

  _onChange() {
    this.setState({

    });
  }

  componentDidMount() {
    NewProductionLineModalStore.on(NEW_PRODUCTION_LINE_MODAL_ID, this._onChange.bind(this));
  }

  componentWillUnmount() {
    NewProductionLineModalStore.removeListener(NEW_PRODUCTION_LINE_MODAL_ID, this._onChange.bind(this));
  }

  handleHideModal() {
    this.setState({
      show: false
    })
  }

  render() {
    return (
      <Modal
        show={this.state.show}
        bsSize='large'
        >
        <Modal.Header>
          <Modal.Title>
            New Production Line
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          Modal Body
        </Modal.Body>

        <Modal.Footer>
          <ButtonToolbar>
            <Button bsStyle='success'>Add Production Line</Button>
            <Button onClick={this.handleHideModal}>Cancel</Button>
          </ButtonToolbar>
        </Modal.Footer>
      </Modal>
    );
  }
}
