var EventEmitter = require('events').EventEmitter;

class EditFactoryModalStore extends EventEmitter {
  constructor() {
    super();
    this._producer = null;
  }

  setProducer(producer) {
    this._producer = producer;
  }

  getProducer() {
    return this._producer;
  }

  emitChange(id) {
    this.emit(id);
  }
}

export default new EditFactoryModalStore();
