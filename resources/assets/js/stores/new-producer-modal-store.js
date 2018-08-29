var EventEmitter = require('events').EventEmitter;

class NewProducerModalStore extends EventEmitter {
  constructor() {
    super();
  }

  emitChange(id) {
    this.emit(id);
  }
}

export default new NewProducerModalStore();
