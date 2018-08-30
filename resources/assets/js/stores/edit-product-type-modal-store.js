var EventEmitter = require('events').EventEmitter;

class EditProductTypeModalStore extends EventEmitter {
  constructor() {
    super();
  }

  emitChange(id) {
    this.emit(id);
  }
}

export default new EditProductTypeModalStore();
