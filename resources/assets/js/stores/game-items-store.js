var EventEmitter = require('events').EventEmitter;

class GameItemsStore extends EventEmitter {
  constructor() {
    super();
    this._products = [];
    this._producers = [];
  }

  setProducts(products) {
    this._products = products;
  }

  setProducers(producers) {
    this._producers = producers;
  }

  getProducers() {
    return this._producers;
  }

  getProducts() {
    return this._products;
  }

  emitChange(id) {
    this.emit(id);
  }
}

export default new GameItemsStore();
