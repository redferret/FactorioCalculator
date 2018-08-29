var EventEmitter = require('events').EventEmitter;

class NewFactoryModalStore extends EventEmitter {
  constructor() {
    super();
  }

  emitChange(id) {
    this.emit(id);
  }
}

export default new NewFactoryModalStore();
