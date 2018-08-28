
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
