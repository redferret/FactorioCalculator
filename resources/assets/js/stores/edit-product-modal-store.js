var EventEmitter = require('events').EventEmitter;

class EditProductModalStore extends EventEmitter {
  constructor() {
    super();
    this._selectedProduct = null;
  }

  getSelectedProduct() {
    return this._selectedProduct;
  }

  setSelectedProduct(product) {
    this._selectedProduct = product;
  }

  emitChange(id) {
    this.emit(id);
  }
}

export default new EditProductModalStore();
