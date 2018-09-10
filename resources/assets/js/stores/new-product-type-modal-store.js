var EventEmitter = require('events').EventEmitter;

class NewProductTypeModalStore extends EventEmitter {
  constructor() {
    super();
  }

  setName(name) {
    this._name = name;
  }

  getName() {
    return this._name;
  }

  emitChange(id) {
    this.emit(id);
  }
}

export default new NewProductTypeModalStore();
