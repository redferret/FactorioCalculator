var EventEmitter = require('events').EventEmitter;

class NewProductTypeModalStore extends EventEmitter {
  constructor() {
    super();
  }

  emitChange(id) {
    this.emit(id);
  }
}

export default new NewProductTypeModalStore();
