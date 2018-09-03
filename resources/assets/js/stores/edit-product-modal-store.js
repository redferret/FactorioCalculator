var EventEmitter = require('events').EventEmitter;

class EditProductModalStore extends EventEmitter {
  constructor() {
    super();
    this._selectedProduct = null;
    this._newValues = {};
  }

  setProductValues(values) {
    this._newValues = values;
  }

  getProductValues() {
    return this._newValues;
  }

  getSelectedProduct() {
    return this._selectedProduct;
  }

  setSelectedProduct(product) {
    this._selectedProduct = product;
    this._newValues = {
      crafting_time: this._selectedProduct.crafting_time,
      hardness: this._selectedProduct.hardness,
      stock_size: this._selectedProduct.stock_size
    };
  }

  emitChange(id) {
    this.emit(id);
  }
}

export default new EditProductModalStore();
