
var EventEmitter = require('events').EventEmitter;

import * as Routes from '../routes.js';

const CHANGE = 'change_';

class ProductionLineStore extends EventEmitter {

  constructor() {
    super();
  }

  balanceProductionLine(id) {
    this.productionLinePromise = fetch(Routes.BALANCE_PRODUCTION + id).then(response => response.json());
  }

  emitChange(id) {
    this.emit(CHANGE + id);
  }

  addChangeListener(callback, id) {
    this.on(CHANGE + id, callback);
  }

  removeChangeListener(callback, id) {
    this.removeListener(CHANGE + id, callback);
  }

}

export default new ProductionLineStore();
