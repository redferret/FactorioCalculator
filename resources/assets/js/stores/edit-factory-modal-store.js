var EventEmitter = require('events').EventEmitter;

class EditProducerModalStore extends EventEmitter {
  constructor() {
    super();
    this._factory = null;
  }

  setFactoryName(name) {
    this._newFactoryName = name;
  }

  getFactoryName() {
    return this._newFactoryName;
  }

  getFactory() {
    return this._factory;
  }

  setFactory(factory) {
    this._factory = factory;
    this._newFactoryName = factory.name;
  }

  emitChange(id) {
    this.emit(id);
  }
}

export default new EditProducerModalStore();
