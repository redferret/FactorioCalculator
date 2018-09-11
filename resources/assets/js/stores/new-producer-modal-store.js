var EventEmitter = require('events').EventEmitter;

class NewProducerModalStore extends EventEmitter {
  constructor() {
    super();
    this.resetValues();
  }

  resetValues() {
    this._values = {
      name: '',
      speed: 1,
      producer_type: 1,
      power: 0,
      image_file: ''
    }
  }

  getValues() {
    return this._values;
  }

  emitChange(id) {
    this.emit(id);
  }
}

export default new NewProducerModalStore();
