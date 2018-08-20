
var EventEmitter = require('events').EventEmitter;

import * as Routes from '../routes.js';

class ProductionLineStore extends EventEmitter {

  constructor() {
    super();
  }

  balanceProductionLine(id) {
    this.productionLinePromise = fetch(Routes.BALANCE_PRODUCTION + id).then(response => response.json());
  }

  emitChange(id) {
    this.emit('change' + id);
  }

  addChangeListener(callback, id) {
    this.on('change' + id, callback);
  }

  removeChangeListener(callback, id) {
    this.removeListener('change' + id, callback);
  }

}

export default new ProductionLineStore();
