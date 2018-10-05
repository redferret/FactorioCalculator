
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
        store.emit(id);
      })
    });
  }
}

export function handleError(error) {
  console.error('HTTP request failed', error);
}

export function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    var error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
}

export function parseJSON(response) {
  return response.json();
}

export default new Actions();
