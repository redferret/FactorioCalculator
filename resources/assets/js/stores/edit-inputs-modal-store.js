var EventEmitter = require('events').EventEmitter;

class EditInputsModalStore extends EventEmitter {
  constructor() {
    super();
    this._productionLine = null;
    this._inputs = new Set();
  }

  setProductionLine(productionLine) {
    this._productionLine = productionLine;
  }

  setInputs(inputs) {
    this._inputs = new Set(inputs);
  }

  getProductionLine() {
    return this._productionLine;
  }

  getInputs() {
    return Array.from(this._inputs);
  }

  addInput(productionLine) {
    this._inputs.add(productionLine);
  }

  removeInput(productionLine) {
    this._inputs.delete(productionLine);
  }

  emitOn(id) {
    this.emit(id);
  }
}

export default new EditInputsModalStore();
