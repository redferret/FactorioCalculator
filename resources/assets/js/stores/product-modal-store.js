var EventEmitter = require('events').EventEmitter;
import { MODAL_ID } from '../constants.js';

class ProductModalStore extends EventEmitter {

  constructor() {
    super();
    this.state = {
      show: false
    };
    this._productionLines = [];
  }

  showModal() {
    this.state.show = true;
  }

  hideModal() {
    this.state.show = false;
    this.emitChange(MODAL_ID);
  }

  shouldShow() {
    return this.state.show;
  }

  setSelectedProductionLine(selectedProductionLine) {
    this._selectedProductionLine = selectedProductionLine;
  }

  getSelectedProductionLine(selectedProductionLine) {
    return this._selectedProductionLine;
  }

  setInputProductionLines(productionLines) {
    this._inputProductionLines = productionLines;
  }

  getInputProductionLines() {
    return this._inputProductionLines;
  }

  setOutputProductionLines(productionLines) {
    this._outputProductionLines = productionLines;
  }

  getOutputProductionLines() {
    return this._outputProductionLines;
  }

  emitChange(id) {
    this.emit(id);
  }

}

export default new ProductModalStore();
