var EventEmitter = require('events').EventEmitter;

class NewProductionLineModalStore extends EventEmitter {
  constructor() {
    super();
    this._product = null;
    this._producer = null;
    this._name = '';
    this._itemsPerSecond = 0;
  }

  reset() {
    this._product = null;
    this._producer = null;
    this._name = '';
    this._itemsPerSecond = 0;
  }

  setFactoryId(id) {
    this._factoryId = id;
  }

  getFactoryId() {
    return this._factoryId;
  }

  setFactoryComponentId(id) {
    this._factoryComponentId = id;
  }

  getFactoryComponentId() {
    return this._factoryComponentId;
  }

  setProduct(product) {
    this._product = product;
  }

  setProducer(producer) {
    this._producer = producer;
  }

  setName(name) {
    this._name = name;
  }

  setItemsPerSecond(itemsPerSecond) {
    this._itemsPerSecond = itemsPerSecond;
  }

  getItemsPerSecond() {
    return this._itemsPerSecond;
  }

  getProduct() {
    return this._product;
  }

  getName() {
    return this._name;
  }

  getProducer() {
    return this._producer;
  }

  emitChange(id) {
    this.emit(id);
  }
}

export default new NewProductionLineModalStore();
