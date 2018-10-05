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

}

export default new EditProducerModalStore();
