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

  setProductionLines(productionLines) {
    this._productionLines = productionLines;
  }

  getProductionLines() {
    return this._productionLines;
  }

  emitChange(id) {
    this.emit(id);
  }

}

export default new ProductModalStore();
