var EventEmitter = require('events').EventEmitter;

const DEFAULT_VALUES = {
  name: '',
  crafting_time: 1,
  hardness: 0,
  stock_size: 1,
  is_fluid: 0,
  product_type_id: 1
}

class NewProductModalStore extends EventEmitter {
  constructor() {
    super();
    this._values = DEFAULT_VALUES;
  }

  resetValues() {
    this._values = DEFAULT_VALUES;
  }

  setValues(values) {
    console.log(values);
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
