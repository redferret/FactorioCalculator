import AppDispatcher from '../../dispatcher.js';
import EditProducerModalStore from '../../stores/edit-producer-modal-store.js';
import GameItemsStore from '../../stores/game-items-store.js';
import Input from '../input.js';
import ModalsStore from '../../stores/modals-store.js';
import React from 'react';
import Router from '../../router.js';

import {
  Alert,
  Button,
  ButtonToolbar,
  Col,
  Form,
  Grid,
  Label,
  Modal,
  Row,
  Table,
  Well,
} from 'react-bootstrap';

import {
  EDIT_PRODUCER_MODAL_ID,
  GAME_ITEMS_ID,
  IMAGE_ASSET,
  UPDATE_PRODUCER,
  SPINNER_MODAL_ID,
} from '../../constants.js';

export class ModalHeader extends React.Component {
  render() {
    let producer = EditProducerModalStore.getProducer();
    return (
      <Form inline>
        <Input initialValue={producer.name} isStatic={true}
          label={
            <img src={Router.route(IMAGE_ASSET, {fileName: producer.image_file})} />
          }
        />
      </Form>
    )
  }
}

export class ModalBody extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.updateValues = this.updateValues.bind(this);
    let values = EditProducerModalStore.getProducerValues();
    this.state = {
      isMiner: values.producer_type == 0
    }
  }

  updateValues(event) {
    let value = event.target.value;
    let values = EditProducerModalStore.getProducerValues();
    values[event.target.name] = value;

    if (event.target.name == 'producer_type') {
      this.setState({
        isMiner: values.producer_type == 0
      })
    }
  }

  render() {
    let defaultValues = EditProducerModalStore.getProducerValues();
    return (
      <div>
        <Grid>
          <Row>
            <Col sm={3}>
              <Input type='number' name='speed' initialValue={defaultValues.speed} label='Speed'
                callback={(event) => this.updateValues(event)}/>
              <Input type='number' name='producer_type' initialValue={defaultValues.producer_type} label='Producer Type'
                help='0 - Miner, 1 - Assembly Machine, 2 - Furnace, 3 - Pump'
                callback={(event) => this.updateValues(event)}/>
            </Col>
            <Col sm={3}>
              {this.state.isMiner?
                <Input type='number' name='power' initialValue={defaultValues.power} label='Power'
                  callback={(event) => this.updateValues(event)}/>: ''
              }
            </Col>
          </Row>
        </Grid>
        <p className='help-text'>
          Changing this producer won't change any current producer attached to a production line, only
          future production lines that add this producer will be applied. If you want to change a production line's
          producer properties, select the production line and update the properties of the producer directly.
          The type can't be changed once attached to a production line.
        </p>
      </div>
    )
  }
}

export class ModalFooter extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.handleApplyProducerChanges = this.handleApplyProducerChanges.bind(this);
  }

  handleApplyProducerChanges() {
    ModalsStore.hideModal();
    ModalsStore.showModal({
      id: SPINNER_MODAL_ID
    });
    let producer = EditProducerModalStore.getProducer();
    AppDispatcher.dispatch({
      action: UPDATE_PRODUCER,
      data: {
        id: producer.id,
        values: EditProducerModalStore.getProducerValues()
      },
      emitOn: [{
        store: GameItemsStore,
        componentIds: [GAME_ITEMS_ID]
      }]
    });
  }

  handleDeleteProducer() {

  }

  render() {
    return (
      <ButtonToolbar>
        <Button bsStyle='success' onClick={this.handleApplyProducerChanges}>Apply</Button>
        <Button bsStyle='danger' onClick={this.handleDeleteProducer}>Delete Producer</Button>
        <Button onClick={() => {ModalsStore.hideModal()}}>Cancel</Button>
      </ButtonToolbar>
    )
  }
}
