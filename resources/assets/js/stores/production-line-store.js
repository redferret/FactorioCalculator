
var EventEmitter = require('events').EventEmitter;

class ProductionLineStore extends EventEmitter {

  constructor() {
    super();
  }

  setUpdatedProductionLine(data) {
    this._productionLine = data;
  }

  getUpdatedProductionLine() {
    return this._productionLine;
  }

  emitChange(id) {
    this.emit(id);
  }

}

export default new ProductionLineStore();
