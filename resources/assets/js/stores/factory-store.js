
var EventEmitter = require('events').EventEmitter;

class FactoryStore extends EventEmitter {

  constructor() {
    super();
    this._factories = [];
  }

  setFactory(factory) {
    let index = this._factories.findIndex(test => {
      return factory.id == test.id;
    });
    if (index < 0) {
      this._factories.unshift(factory);
    } else {
      this._factories[index] = factory;
    }
  }

  setFactories(factories) {
    this._factories = factories;
  }

  getFactories() {
    return this._factories;
  }

  getFactory(id) {
    return this._factories.find(factory => {
      if (factory.id === id) {
        return factory;
      }
    });
  }

  emitChange(id) {
    this.emit(id);
  }

};

export default new FactoryStore();
