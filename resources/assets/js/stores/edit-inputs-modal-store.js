var EventEmitter = require('events').EventEmitter;

class EditInputsModalStore extends EventEmitter {
  constructor() {
    super();
    this._productionLine = null;
    this._inputs = new Set();
    this._missingInputs = new Set();
  }

  setProductionLine(productionLine) {
    this._productionLine = productionLine;
  }

  setRequiredProducts(products) {
    this._consumerRequirements = new Set(products);
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

  validateInputs() {
    this._missingInputs = new Set();
    this._currentProducts = new Set();
    this._inputs.forEach(productionLine => {
      this._currentProducts.add(productionLine.product);
    });
    let currentProducts = Array.from(this._currentProducts);
    if (currentProducts.length == 0) {
      this._consumerRequirements.forEach(requirement => {
        this._missingInputs.add(requirement.requiredProduct);
      });
    } else {
      this._consumerRequirements.forEach(requirement => {
        let index = currentProducts.findIndex((test) => {
          if (test != null && requirement.requiredProduct != null) {
            return test.id == requirement.requiredProduct.id;
          }
          return false;
        });

        if (index < 0){
          this._missingInputs.add(requirement.requiredProduct);
        }
      });
    }
    this._isValid = this._missingInputs.length == 0;
  }

  getMissingInputs() {
    return Array.from(this._missingInputs);
  }

  areInputsValid() {
    return this._isValid;
  }

}

export default new EditInputsModalStore();
