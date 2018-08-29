var EventEmitter = require('events').EventEmitter;

class NewProductModalStore extends EventEmitter {
  constructor() {
    super();
  }

  emitChange(id) {
    this.emit(id);
  }
}

export default new NewProductModalStore();
