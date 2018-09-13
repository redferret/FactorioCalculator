var EventEmitter = require('events').EventEmitter;

class GameItemsStore extends EventEmitter {
  constructor() {
    super();
    this._productTypes = [];
    this._producers = [];
    this._products = [];
  }

  getProducts() {
    return this._products;
  }

  setProductTypes(productTypes) {
    this._productTypes = productTypes;
    productTypes.map(type => {
      let typeProducts = type.products;
      this._products.unshift(...typeProducts);
    });
  }

  setProducers(producers) {
    this._producers = producers;
  }

  getProducers() {
    return this._producers;
  }

  getProductTypes() {
    return this._productTypes;
  }

  emitChange(id) {
    this.emit(id);
  }
}

export default new GameItemsStore();
