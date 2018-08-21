
var EventEmitter = require('events').EventEmitter;
import * as Routes from '../routes.js';

const CHANGE = 'change_';

class ProductStore extends EventEmitter {

  constructor() {
    super();
  }

  getProduct(id) {
    this.productPromise = fetch(Routes.GET_PRODUCT + id).then(response => response.json());
  }

  emitChange(id) {
    this.emit(id);
  }

  addChangeListener(callback, id) {
    this.on(id, callback);
  }

  removeChangeListener(callback, id) {
    this.removeListener(id, callback);
  }

}

export default new ProductStore();
