import AppDispatcher from '../../dispatcher.js';
import GameItemsStore from '../../stores/game-items-store.js';
import Input from '../input.js';
import ModalsStore from '../../stores/modals-store.js';
import NewProducerModalStore from '../../stores/new-producer-modal-store.js';
import React from 'react';

import {
  Alert,
  Button,
  ButtonToolbar,
  Col,
  Grid,
  Row,
} from 'react-bootstrap';

import {
  ADD_PRODUCER,
  GAME_ITEMS_ID,
  NEW_PRODUCER_MODAL_ID,
  SPINNER_MODAL_ID,
} from '../../constants.js';

export class ModalHeader extends React.Component {
  render() {
    return (
      <div>Add New Producer</div>
    )
  }
}

export class ModalBody extends React.Component {

  constructor() {
    super();
    this.handleInputChange = this.handleInputChange.bind(this);
    let defaultValues = NewProducerModalStore.getValues();
    this.state = {
      isMiner: defaultValues.producer_type == 0
    }
  }

  handleInputChange(event) {
    let values = NewProducerModalStore.getValues();
    values[event.target.name] = event.target.value;

    if (event.target.name == 'producer_type') {
      this.setState({
        isMiner: values.producer_type == 0
      })
    }
  }

  render() {
    let defaultValues = NewProducerModalStore.getValues();
    return (
      <div>
        <Grid>
          <Row>
            <Col sm={3}>
              <Input type='text' name='name' initialValue={defaultValues.name} label='Producer Name'
                callback={(event) => this.handleInputChange(event)}/>
              <Input type='number' name='speed' initialValue={defaultValues.speed} label='Speed'
                callback={(event) => this.handleInputChange(event)}/>
            </Col>
            <Col sm={3}>
              <Input type='number' name='producer_type' initialValue={defaultValues.producer_type} label='Producer Type'
                help='0 - Miner, 1 - Assembly Machine, 2 - Furnace, 3 - Pump, 4 - Refinery'
                callback={(event) => this.handleInputChange(event)}/>
              {this.state.isMiner?
                <Input type='number' name='power' initialValue={defaultValues.power} label='Power'
                  callback={(event) => this.handleInputChange(event)}/>
                :
                ''
              }
              <Input type='text' name='image_file' initialValue={defaultValues.image_file} label='File Name'
                help='Pulls Image from external site wiki.factorio.com'
                callback={(event) => this.handleInputChange(event)}/>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export class ModalFooter extends React.Component {

  constructor() {
    super();
  }

  handleAddProducer() {
    ModalsStore.hideModal();
    ModalsStore.showModal({id: SPINNER_MODAL_ID});
    AppDispatcher.dispatch({
      action: ADD_PRODUCER,
      data: {
        values: NewProducerModalStore.getValues()
      },
      emitOn: [{
        store: GameItemsStore,
        componentIds: [GAME_ITEMS_ID]
      }]
    })
  }

  render() {
    return (
      <ButtonToolbar>
        <Button bsStyle='success' onClick={this.handleAddProducer}>Add Producer</Button>
        <Button onClick={() => ModalsStore.hideModal()}>Cancel</Button>
      </ButtonToolbar>
    );
  }
}
