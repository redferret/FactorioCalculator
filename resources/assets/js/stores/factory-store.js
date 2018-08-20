
var EventEmitter = require('events').EventEmitter;

import * as Routes from '../routes.js';

class FactoryStore extends EventEmitter {

  constructor() {
    super();
    this._factories = [];

    this.fetchFactoryPromise = fetch(Routes.GET_FACTORIES).then(response => response.json());
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
