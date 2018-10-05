var EventEmitter = require('events').EventEmitter;

class NewFactoryModalStore extends EventEmitter {
  constructor() {
    super();
    this._name = '';
  }

  getNewFactoryName() {
    return this._name;
  }

  setNewFactoryName(name) {
    this._name = name;
  }

}

export default new NewFactoryModalStore();
