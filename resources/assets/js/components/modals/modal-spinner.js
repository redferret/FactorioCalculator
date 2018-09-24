import ModalSpinnerStore from '../../stores/modal-spinner-store.js';
import React from 'react';
import { css } from 'react-emotion';
// First way to import
import { SPINNER_MODAL_ID } from '../../constants.js';
import { DEFAULT_MESSAGE } from '../../stores/modal-spinner-store.js';
import { FadeLoader } from 'react-spinners';
import {
  Grid,
  Row,
  Col,
} from 'react-bootstrap';

export class ModalBody extends React.Component {
  render() {
    return (
      <Grid>
        <Row>
          <Col sm={1}>
            <FadeLoader
              sizeUnit={"px"}
              size={60}
              color={'#80aef7'}
              loading={true}
            />
          </Col>
          <Col sm={5} className='spinner-message'>
            {ModalSpinnerStore.getSpinnerMessage()}
          </Col>
        </Row>
      </Grid>
    );
  }
}
