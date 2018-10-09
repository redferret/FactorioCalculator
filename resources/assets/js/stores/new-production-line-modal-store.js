var EventEmitter = require('events').EventEmitter;

class NewProductionLineModalStore extends EventEmitter {

  constructor() {
    super();
    this.reset();
  }

  reset() {
    this._values = {
      name: '',
      items_per_second: 0,
      selectedProduct: null,
      selectedProducer: null,
      factory_id: -1
    }
  }

  getValue(key) {
    return this._values[key];
  }

  getValues() {
    return this._values;
  }

  setValue(key, value) {
    this._values[key] = value;
  }

  setFactoryId(id) {
    this.setValue('factory_id', id);
  }

  setFactoryComponentId(id) {
    this._factoryComponentId = id;
  }

  getFactoryComponentId() {
    return this._factoryComponentId;
  }

}

export default new NewProductionLineModalStore();
