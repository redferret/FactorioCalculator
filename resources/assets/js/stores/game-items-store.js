var EventEmitter = require('events').EventEmitter;

class GameItemsStore extends EventEmitter {
  constructor() {
    super();
    this._productTypes = [];
    this._producers = [];
  }

  setProductTypes(products) {
    this._productTypes = products;
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
