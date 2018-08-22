var EventEmitter = require('events').EventEmitter;
import * as Routes from '../routes.js';
import { MODAL_ID } from '../constants.js';

class ProductModalStore extends EventEmitter {

  constructor() {
    super();
    this.state = {
      selectedProduct: null,
      show: false
    };
    this._productProductionLines = [];
  }

  showModal() {
    this.state.show = true;
  }

  hideModal() {
    this.state = {
      selectedProduct: null,
      show: false
    };
    this.emitChange(MODAL_ID);
  }

  shouldShow() {
    return this.state.show;
  }

  setSelectedProduct(product) {
    this.state.selectedProduct = product;
  }

  getSelectedProduct() {
    return this.state.selectedProduct;
  }

  setSelectedProductionLine(selectedProductionLine) {
    this._selectedProductionLine = selectedProductionLine;
  }

  getSelectedProductionLine(selectedProductionLine) {
    return this._selectedProductionLine;
  }

  setProductProductionLines(productionLines) {
    this._productProductionLines = productionLines;
  }

  getProductProductionLines() {
    return this._productProductionLines;
  }

  emitChange(id) {
    this.emit(id);
  }

}

export default new ProductModalStore();