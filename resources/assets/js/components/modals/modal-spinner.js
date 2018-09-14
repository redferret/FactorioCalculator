import ModalSpinnerStore from '../../stores/modal-spinner-store.js';
import React from 'react';
import { css } from 'react-emotion';
// First way to import
import { SPINNER_MODAL_ID } from '../../constants.js';
import { DEFAULT_MESSAGE } from '../../stores/modal-spinner-store.js';
import { BeatLoader } from 'react-spinners';

export class ModalBody extends React.Component {
  render() {
    return (
      <div>
        {ModalSpinnerStore.getSpinnerMessage()}
        <br/>
        <BeatLoader
          sizeUnit={"px"}
          size={20}
          color={'#80aef7'}
          loading={true}
        />
      </div>
    );
  }
}
