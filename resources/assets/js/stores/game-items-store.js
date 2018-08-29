var EventEmitter = require('events').EventEmitter;

class GameItemsStore extends EventEmitter {
  constructor() {
    super();
  }

  emitChange(id) {
    this.emit(id);
  }
}

export default new GameItemsStore();
