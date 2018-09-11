var EventEmitter = require('events').EventEmitter;

class AddInputModalStore extends EventEmitter {
  constructor() {
    super();
    this._productionLine = null;
  }

  setProductionLine(productionLine) {
    this._productionLine = productionLine;
  }

  getProductionLine() {
    return this._productionLine;
  }



  emitOn(id) {
    this.emit(id);
  }
}

export default new AddInputModalStore();
