
import * as Constants from './constants.js';

const HEADERS = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
};

class Routes {
  constructor() {
    this._routes = new Map();
  }
  register(name, route) {
    this._routes.set(name, route);
  }
  route(name, args) {
    let route = this._routes.get(name);
    if (route instanceof Function) {
      return route(args);
    }
  }
}

let Router = new Routes();

Router.register(Constants.GET_FACTORIES, args => {
  return Constants.ROOT_URL + '/factories';
});

Router.register(Constants.BALANCE_PRODUCTION, args => {
  return Constants.ROOT_URL + '/productionline/'+args.id+'/balance';
});

Router.register(Constants.GET_PRODUCT_PRODUCTION_LINES, args => {
  return Constants.ROOT_URL + '/product/'+args.id+'/productionlines';
});

Router.register(Constants.RE_CALCULATE_PRODUCTION, args => {
  return Constants.ROOT_URL + '/productionline/'+args.id+'/recalculate';
});

Router.register(Constants.POST, args => {
  return {
    method: Constants.POST,
    headers: HEADERS,
    body: JSON.stringify(args)
  };
});

Router.register(Constants.GET, args => {
  return {
    method: Constants.GET,
    headers: HEADERS,
    body: JSON.stringify(args)
  };
});

export default Router;
