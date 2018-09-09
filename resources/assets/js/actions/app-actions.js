
class Actions {
  constructor() {
    this._actions = new Map();
  }
  register(actionName, action) {
    this._actions.set(actionName, action);
  }
  call(payload) {
    let action = this._actions.get(payload.action);
    if (action instanceof Function) {
      action(payload);
    } else if (action == undefined || action == null) {
      console.error('Action ' + payload.action + ' not registered');
    }
  }
  finish(payload) {
    payload.emitOn.map(emitter => {
      var store = emitter.store;
      emitter.componentIds.map(id => {
        store.emitChange(id);
      })
    });
  }
}

export default new Actions();
