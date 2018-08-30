var EventEmitter = require('events').EventEmitter;

class EditFactoryModalStore extends EventEmitter {
  constructor() {
    super();
  }

  emitChange(id) {
    this.emit(id);
  }
}

export default new EditFactoryModalStore();
