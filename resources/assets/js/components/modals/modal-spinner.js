import AppDispatcher from '../../dispatcher.js';
import Input from '../input.js';
import ModalsStore from '../../stores/modals-store.js';
import NewFactoryModalStore from '../../stores/new-factory-modal-store.js';
import React from 'react';
import { css } from 'react-emotion';
// First way to import
import { BeatLoader } from 'react-spinners';

import { Modal } from 'react-bootstrap';
import { SPINNER_MODAL_ID } from '../../constants.js';

export default class ModalSpinner extends React.Component {
  constructor(props, context) {
    super(props, context);

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
    ModalsStore.on(SPINNER_MODAL_ID, this._onChange.bind(this));
  }

  componentWillUnmount() {
    this._isMounted = false;
    ModalsStore.removeListener(SPINNER_MODAL_ID, this._onChange.bind(this));
  }

  render() {
    return (
      <Modal
        show={this.state.show}
        bsSize='large'
        >
        <Modal.Body>
          Sending Request... Please wait
          <br/>
          <BeatLoader
            sizeUnit={"px"}
            size={20}
            color={'#80aef7'}
            loading={true}
          />
        </Modal.Body>
      </Modal>
    );
  }
}
