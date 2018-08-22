
class Router {
  constructor() {
    this._routes = new Map();
    this._methods = new Map();
  }

  registerRoute(name, route) {
    this._routes.set(name, route);
  }

  registerMethod(name, method) {
    this._methods.set(name, method);
  }

  route(name, args) {
    let route = this._routes.get(name);
    return route(args);
  }

  method(name, data) {
    let method = this._methods.get(name);
    return method(data);
  }
}

export default new Router();
