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
  }

  getProduct(id) {
    this.productPromise = fetch(Routes.GET_PRODUCT + id).then(response => response.json());
  }

  showModal() {
    this.state.show = true;
    this.emitChange(MODAL_ID);
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

  emitChange(id) {
    this.emit(id);
  }

}

export default new ProductModalStore();
