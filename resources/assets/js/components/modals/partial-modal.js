import ModalsStore from '../../stores/modals-store.js';
import React from 'react';

import { Modal } from 'react-bootstrap';
import { MODAL_ID } from '../../constants.js';

export default class PartialModal extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleHideModal = this.handleHideModal.bind(this);
    this.renderModalPartials = this.renderModalPartials.bind(this);

    this._isMounted = false;

    this.state = {
      modal: ModalsStore.getCurrentModal(),
      show: ModalsStore.shouldShow()
    }
  }

  _onChange() {
    if (this._isMounted) {
      this.setState({
        modal: ModalsStore.getCurrentModal(),
        show: ModalsStore.shouldShow()
      });
    }
  }

  componentDidMount() {
    this._isMounted = true;
    ModalsStore.on(MODAL_ID, this._onChange.bind(this));
  }

  componentWillUnmount() {
    this._isMounted = false;
    ModalsStore.removeListener(MODAL_ID, this._onChange.bind(this));
  }

  handleHideModal() {
    ModalsStore.hideModal();
  }

  renderModalPartials() {
    return (
      <div>
        {this.state.modal.header?
          <Modal.Header>
            <Modal.Title>
              {this.state.modal.header}
            </Modal.Title>
          </Modal.Header> : ''
        }

        {this.state.modal.body?
          <Modal.Body>
            {this.state.modal.body}
          </Modal.Body> : ''
        }

        {this.state.modal.footer?
          <Modal.Footer>
            {this.state.modal.footer}
          </Modal.Footer> : ''
        }
      </div>
    )
  }

  render() {

    if (this.state.modal.modalSize) {
      return (
        <Modal
          show={this.state.show}
          onHide={this.handleHideModal}
          bsSize={this.state.modal.modalSize}
          >
          {this.renderModalPartials()}
        </Modal>
      )
    }

    return (
      <Modal
        show={this.state.show}
        onHide={this.handleHideModal}
        >
        {this.renderModalPartials()}
      </Modal>
    )
  }
}
