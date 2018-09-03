var EventEmitter = require('events').EventEmitter;

class EditProductTypeModalStore extends EventEmitter {
  constructor() {
    super();
    this._type = null;
    this._name = '';
  }

  setProductTypeName(name) {
    this._name = name;
  }

  getProductTypeName() {
    return this._name;
  }

  setProductType(type) {
    this._type = type;
    this.setProductTypeName(type.name);
  }

  getProductType() {
    return this._type;
  }

  emitChange(id) {
    this.emit(id);
  }
}

export default new EditProductTypeModalStore();
