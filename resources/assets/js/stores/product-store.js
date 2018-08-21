
var EventEmitter = require('events').EventEmitter;

class ProductStore extends EventEmitter {

  constructor() {
    super();
  }

  getProduct(id) {
    return this._product;
  }

  setProduct(product) {
    this._product = product;
  }

  emitChange(id) {
    this.emit(id);
  }

  addChangeListener(callback, id) {
    this.on(id, callback);
  }

  removeChangeListener(callback, id) {
    this.removeListener(id, callback);
  }

}

export default new ProductStore();
