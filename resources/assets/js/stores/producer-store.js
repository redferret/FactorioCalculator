
var EventEmitter = require('events').EventEmitter;

class ProducerStore extends EventEmitter {

  constructor() {
    super();
  }

  emitChange() {
    this.emit('change');
  }

  addChangeListener(callback) {
    this.on('change', callback);
  }

  removeChangeListener(callback) {
    this.removeListener('change', callback);
  }

}

export default new ProducerStore();
