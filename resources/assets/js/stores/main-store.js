var EventEmitter = require('events').EventEmitter;
import { MAIN_ID } from '../constants.js';

class MainStore extends EventEmitter {
  constructor() {
    super();
  }

  emitChange(id) {
    this.emit(id);
  }
}

export default new MainStore();
