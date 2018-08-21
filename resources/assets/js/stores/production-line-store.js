
var EventEmitter = require('events').EventEmitter;

const CHANGE = 'change_';

class ProductionLineStore extends EventEmitter {

  constructor() {
    super();
  }

  setProductionLine(data) {
    this._productionLine = data;
  }

  getProductionLine() {
    return this._productionLine;
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
