var EventEmitter = require('events').EventEmitter;
import * as Routes from '../routes.js';

const CHANGE = 'change_';

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
    this.emitChange();
  }

  hideModal() {
    this.state = {
      selectedProduct: null,
      show: false
    };
    this.emitChange();
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

  emitChange() {
    this.emit(CHANGE);
  }

  addChangeListener(callback) {
    this.on(CHANGE, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(CHANGE + id, callback);
  }

}

export default new ProductModalStore();
