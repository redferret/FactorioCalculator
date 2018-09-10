var EventEmitter = require('events').EventEmitter;

class NewProductTypeModalStore extends EventEmitter {
  constructor() {
    super();
    this._values = {
      name: '',
      image_file: ''
    }
  }

  resetValues() {
    this._values = {
      name: '',
      image_file: ''
    }
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

export default new NewProductTypeModalStore();
