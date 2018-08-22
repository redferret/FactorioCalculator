
var EventEmitter = require('events').EventEmitter;

class FactoryStore extends EventEmitter {

  constructor() {
    super();
    this._factories = [];
  }

  setFactories(factories) {
    this._factories = factories;
  }

  getFactories() {
    return this._factories;
  }

  emitChange(id) {
    this.emit(id);
  }

};

export default new FactoryStore();
