
var EventEmitter = require('events').EventEmitter;

class ProducerStore extends EventEmitter {

  constructor() {
    super();
  }

  emitChange() {
    this.emit('change');
  }

}

export default new ProducerStore();
