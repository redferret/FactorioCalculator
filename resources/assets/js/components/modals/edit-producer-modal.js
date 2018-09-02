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

export default class EditProducerModal extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleHideModal = this.handleHideModal.bind(this);
    this.handleApplyProducerChanges = this.handleApplyProducerChanges.bind(this);
    this.updateValues = this.updateValues.bind(this);

    this._isMounted = false;

    let producer = EditProducerModalStore.getProducer();
    this.state = {
      values: {
        speed: producer.speed,
        producer_type: producer.producer_type,
        power: producer.power
      },
      selectedProducer: producer,
      show: ModalsStore.shouldShow()
    }
  }

  _onChange() {
    if (this._isMounted) {
      this.setState({
        selectedProducer: EditProducerModalStore.getProducer(),
        show: ModalsStore.shouldShow()
      });
    }
  }

  componentDidMount() {
    this._isMounted = true;
    ModalsStore.on(EDIT_PRODUCER_MODAL_ID, this._onChange.bind(this));
    EditProducerModalStore.on(EDIT_PRODUCER_MODAL_ID, this._onChange.bind(this));
  }

  componentWillUnmount() {
    this._isMounted = false;
    ModalsStore.removeListener(EDIT_PRODUCER_MODAL_ID, this._onChange.bind(this));
    EditProducerModalStore.removeListener(EDIT_PRODUCER_MODAL_ID, this._onChange.bind(this));
  }

  handleHideModal() {
    ModalsStore.hideModal();
  }

  updateValues(event) {
    let value = event.target.value;
    let values = this.state.values;
    values[event.target.name] = value;
    this.setState({
      values: values
    });
  }

  handleApplyProducerChanges() {
    AppDispatcher.dispatch({
      action: UPDATE_PRODUCER,
      data: {
        id: this.state.selectedProducer.id,
        values: this.state.values
      },
      emitOn: [{
        store: GameItemsStore,
        componentIds: [GAME_ITEMS_ID]
      }]
    });
    ModalsStore.hideModal();
    ModalsStore.showModal({
      id: SPINNER_MODAL_ID,
      store: ModalsStore
    });
  }

  render() {
    let producer = this.state.selectedProducer;
    return (
      <Modal
        show={this.state.show}
        onHide={this.handleHideModal}
        >
        <Modal.Header>
          <Modal.Title>
            <Form inline>
              <Input initialValue={producer.name} isStatic={true}
                label={
                  <img src={Router.route(IMAGE_ASSET, {fileName: producer.image_file})} />
                }
              />
            </Form>
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Grid>
            <Row>
              <Col md={3}>
                <Input type='number' name='speed' initialValue={producer.speed} label='Speed'
                  callback={(event) => this.updateValues(event)}/>
                <Input type='number' name='producer_type' initialValue={producer.producer_type} label='Producer Type'
                  help='0 - Miner, 1 - Assembly Machine, 2 - Furnace, 3 - Pump'
                  callback={(event) => this.updateValues(event)}/>
              </Col>
              <Col>
                {producer.power?
                  <Input type='number' name='power' initialValue={producer.power} label='Power'
                    callback={(event) => this.updateValues(event)}/>: ''
                }
              </Col>
            </Row>
          </Grid>
          <p style={{'color': 'grey'}}>
            Changing this producer won't change any current producer attached to a production line, only
            future production lines that add this producer will be applied. If you want to change a production line's
            producer properties, select the production line and update the properties of the producer directly.
            The type can't be changed once attached to a production line.
          </p>
        </Modal.Body>

        <Modal.Footer>
          <ButtonToolbar>
            <Button bsStyle='success' onClick={this.handleApplyProducerChanges}>Apply</Button>
            <Button onClick={this.handleHideModal}>Cancel</Button>
          </ButtonToolbar>
        </Modal.Footer>
      </Modal>
    );
  }
}
