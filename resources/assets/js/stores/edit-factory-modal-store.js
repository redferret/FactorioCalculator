var EventEmitter = require('events').EventEmitter;

class EditProducerModalStore extends EventEmitter {
  constructor() {
    super();
  }

  emitChange(id) {
    this.emit(id);
  }
}

export default new EditProducerModalStore();
