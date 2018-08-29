var EventEmitter = require('events').EventEmitter;

class MainStore extends EventEmitter {
  constructor() {
    super();
  }

  emitChange(id) {
    this.emit(id);
  }
}

export default new MainStore();
