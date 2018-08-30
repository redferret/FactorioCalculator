var EventEmitter = require('events').EventEmitter;

class EditProductModalStore extends EventEmitter {
  constructor() {
    super();
  }

  emitChange(id) {
    this.emit(id);
  }
}

export default new EditProductModalStore();
