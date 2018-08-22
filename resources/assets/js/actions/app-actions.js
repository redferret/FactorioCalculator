
class Actions {
  constructor() {
    this._actions = new Map();
  }
  register(actionName, action) {
    this._actions.set(actionName, action);
  }
  call(actionName, data) {
    let action = this._actions.get(actionName);
    if (action instanceof Function) {
      action(data);
    }
  }
}

export default new Actions();
