var EventEmitter = require('events').EventEmitter;

class AuthStore extends EventEmitter {
  constructor() {
    super();
  }

  setErrors(errors) {
    this._errors = errors;
  }

  getErrors() {
    return this._errors.errors;
  }

  getMessage() {
    return this._errors.message;
  }
}

export default new AuthStore();
