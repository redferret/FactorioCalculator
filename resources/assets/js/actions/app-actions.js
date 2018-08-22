
class Actions {
  constructor() {
    this._actions = new Map();
  }
  register(actionName, callback) {
    this._actions.set(actionName, callback);
  }
  call(actionName, data) {
    let callback = this._actions.get(actionName);
    if (callback instanceof Function) {
      callback(data);
    }
  }
}

export default new Actions();
