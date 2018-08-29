var EventEmitter = require('events').EventEmitter;

class NewProductionLineModalStore extends EventEmitter {
  constructor() {
    super();
  }

  emitChange(id) {
    this.emit(id);
  }
}

export default new NewProductionLineModalStore();
