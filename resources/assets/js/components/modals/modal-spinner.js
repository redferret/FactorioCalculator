import React from 'react';
import { css } from 'react-emotion';
// First way to import
import { BeatLoader } from 'react-spinners';

export class ModalBody extends React.Component {
  render() {
    return (
      <div>
        Sending Request... Please wait
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
