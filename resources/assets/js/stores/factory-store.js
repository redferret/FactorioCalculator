
var EventEmitter = require('events').EventEmitter;

class FactoryStore extends EventEmitter {

  constructor() {
    super();
    this._factories = [];
    this.baseURL = document.getElementById('root').getAttribute('url');
    this.fetchFactoryPromise = fetch(this.baseURL + '/factories')
      .then(response => response.json());
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
};

export default new FactoryStore();
