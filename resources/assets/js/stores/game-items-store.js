var EventEmitter = require('events').EventEmitter;

class GameItemsStore extends EventEmitter {
  constructor() {
    super();
    this._productTypes = [];
    this._producers = [];
    this._products = [];
  }

  getProducts() {
    return this._products;
  }

  getProduct(id) {
    let index = this._products.findIndex(test => {
      return id == test.id;
    });
    return this._products[index];
  }

  setProductTypes(productTypes) {
    this._productTypes = productTypes;
    let tempSet = new Set();
    productTypes.map(type => {
      let typeProducts = type.products;
      typeProducts.map(product => {
        tempSet.add(product);
      });
    });
    this._products = Array.from(tempSet);
  }

  setProducers(producers) {
    this._producers = producers;
  }

  getProducers() {
    return this._producers;
  }

  removeProducer(id) {
    let index = this._producers.findIndex(test => {
      return id == test.id;
    });
    this._producers.splice(index, 1);
  }

  removeProductType(id) {
    let index = this._productTypes.findIndex(test => {
      return id == test.id;
    });
    this._productTypes.splice(index, 1);
  }

  removeProduct(product) {
    let index = this._productTypes.findIndex(test => {
      return product.product_type_id == test.id;
    });
    let type = this._productTypes[index];
    let products = type.products;
    index = products.findIndex(test => {
      return product.id == test.id;
    });
    type.products.splice(index, 1);

    products = type.sorted_products;
    index = products.findIndex(test => {
      return product.id == test.id;
    });
    type.sorted_products.splice(index, 1);
  }

  getProductTypes() {
    return this._productTypes;
  }

}

export default new GameItemsStore();
