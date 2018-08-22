import * as Constants from './constants.js';
import Router from './router.js';

const HEADERS = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
};

Router.registerRoute(Constants.ROOT_URL, args => {
  return document.head.querySelector('meta[name="rootURL"]').content;
})

const ROOT = Router.route(Constants.ROOT_URL);

Router.registerRoute(Constants.GET_FACTORIES, args => {
  return ROOT + '/factories';
});

Router.registerRoute(Constants.BALANCE_PRODUCTION, args => {
  return ROOT + '/productionline/'+args.id+'/balance';
});

Router.registerRoute(Constants.GET_PRODUCT_PRODUCTION_LINES, args => {
  return ROOT + '/product/'+args.id+'/productionlines';
});

Router.registerRoute(Constants.RE_CALCULATE_PRODUCTION, args => {
  return ROOT + '/productionline/'+args.id+'/recalculate';
});

Router.registerMethod('POST', data => {
  return {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify(data)
  };
});

Router.registerMethod('GET', data => {
  return {
    method: 'GET',
    headers: HEADERS,
    body: JSON.stringify(data)
  };
});
