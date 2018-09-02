var EventEmitter = require('events').EventEmitter;

class EditProductTypeModalStore extends EventEmitter {
  constructor() {
    super();
    this._type = null;
  }

  setProductType(type) {
    this._type = type;
  }

  getProductType() {
    return this._type;
  }

  emitChange(id) {
    this.emit(id);
  }
}

export default new EditProductTypeModalStore();
