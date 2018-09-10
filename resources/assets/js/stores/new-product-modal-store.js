var EventEmitter = require('events').EventEmitter;

class NewProductModalStore extends EventEmitter {
  constructor() {
    super();
    this._values = {
      name: '',
      crafting_time: 1,
      hardness: 0,
      stock_size: 1,
      is_fluid: 0,
      product_type_id: 1
    };
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
