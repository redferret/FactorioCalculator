
var EventEmitter = require('events').EventEmitter;

class FactoryStore extends EventEmitter {

  constructor() {
    super();
    this._factories = [];
  }

  setFactory(factory) {
    let index = this._factories.findIndex(test => {
      return factory.id == test.id;
    });
    if (index < 0) {
      this._factories[this._factories.length] = factory;
    } else {
      this._factories[index] = factory;
    }
  }

  setFactories(factories) {
    this._factories = factories;
  }

  addNewProductionLineToFactory(productionLine) {
    let index = this._factories.findIndex(test => {
      return productionLine.factory_id == test.id;
    });
    if (index < 0) {
      console.error('No Factory Found: productionLine.id = ' + productionLine.id);
    } else {
      let factory = this._factories[index];
      factory.production_lines[factory.production_lines.length] = productionLine;
    }
  }

  removeProductionLine(productionLine) {
    let index = this._factories.findIndex(test => {
      return productionLine.factory_id == test.id;
    });
    if (index < 0) {
      console.error('No Factory Found: productionLine.id = ' + productionLine.id);
    } else {
      let factory = this._factories[index];
      index = factory.production_lines.findIndex(test => {
        return productionLine.id == test.id;
      });
      factory.production_lines.splice(index, 1);
    }
  }

  getFactories() {
    return this._factories;
  }

  getFactory(id) {
    return this._factories.find(factory => {
      if (factory.id == id) {
        return factory;
      }
    });
  }

  removeFactory(id) {
    let index = this._factories.findIndex(test => {
      return id == test.id;
    });
    this._factories.splice(index, 1);
  }

};

export default new FactoryStore();
