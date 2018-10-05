var EventEmitter = require('events').EventEmitter;

import { SPINNER_MODAL_ID } from '../constants.js';

export const DEFAULT_MESSAGE = 'Sending Request...';

class ModalSpinnerStore extends EventEmitter {
  constructor() {
    super();
    this._spinnerMessage = DEFAULT_MESSAGE;
  }

  getSpinnerMessage() {
    return this._spinnerMessage;
  }

  setSpinnerMessage(message) {
    this._spinnerMessage = message;
  }

}

export default new ModalSpinnerStore();
