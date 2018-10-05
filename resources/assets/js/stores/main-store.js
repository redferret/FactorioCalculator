var EventEmitter = require('events').EventEmitter;

class MainStore extends EventEmitter {
  constructor() {
    super();
  }

}

export default new MainStore();
