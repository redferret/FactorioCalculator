var EventEmitter = require('events').EventEmitter;

class NewProductModalStore extends EventEmitter {
  constructor() {
    super();
    this.resetValues();
    this._consumerRequirements = new Set();
  }

  resetValues() {
    this._values = {
      name: '',
      crafting_time: 1,
      hardness: 0,
      stock_size: 1,
      is_fluid: 0,
      product_type_id: 1
    };
    this._consumerRequirements = new Set();
  }

  addConsumerProduct(product) {
    product.consumer_requirement = 1;
    this._consumerRequirements.add(product);
  }

  removeConsumerProduct(product) {
    this._consumerRequirements.delete(product);
  }

  getConsumerProducts() {
    return Array.from(this._consumerRequirements);
  }

  setValues(values) {
    this._values = values;
  }

  getValues() {
    return this._values;
  }

  emitChange(id) {
    this.emit(id);
  }
}

export default new NewProductModalStore();
