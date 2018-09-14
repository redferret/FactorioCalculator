var EventEmitter = require('events').EventEmitter;
import { EDIT_PRODUCTION_LINE_MODAL_ID } from '../constants.js';

class EditProductionLineModalStore extends EventEmitter {

  constructor() {
    super();
    this._productionLines = [];
    this._outputProductionLines = [];
    this._inputProductionLines = [];
  }

  setSelectedProductionLine(selectedProductionLine) {
    this._selectedProductionLine = selectedProductionLine;
  }

  getSelectedProductionLine(selectedProductionLine) {
    return this._selectedProductionLine;
  }

  setInputProductionLines(productionLines) {
    this._inputProductionLines = [];
    this._inputProductionLines = productionLines;
  }

  getInputProductionLines() {
    return this._inputProductionLines;
  }

  setOutputProductionLines(productionLines) {
    this._outputProductionLines = [];
    this._outputProductionLines = productionLines;
  }

  getOutputProductionLines() {
    return this._outputProductionLines;
  }

  emitChange(id) {
    this.emit(id);
  }

}

export default new EditProductionLineModalStore();
