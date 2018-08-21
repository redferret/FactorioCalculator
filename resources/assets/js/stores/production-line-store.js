
var EventEmitter = require('events').EventEmitter;

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
    this.emit(id);
  }

}

export default new ProductionLineStore();
