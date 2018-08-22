import * as Constants from './constants.js';
import Router from './router.js';

Router.registerRoute(Constants.ROOT_URL, args => {
  return document.head.querySelector('meta[name="rootURL"]').content;
})

const ROOT = Router.route(Constants.ROOT_URL);

Router.registerRoute(Constants.RE_CALCULATE_PRODUCTION, args => {
  return ROOT + '/productionline/'+args.id+'/recalculate';
});
Router.registerRoute(Constants.BALANCE_PRODUCTION, args => {
  return ROOT + '/productionline/'+args.id+'/balance';
});

Router.registerRoute(Constants.GET_FACTORIES, args => {
  return ROOT + '/factories';
});
Router.registerRoute(Constants.GET_PRODUCT_PRODUCTION_LINES, args => {
  return ROOT + '/product/'+args.id+'/productionlines';
});
Router.registerRoute(Constants.GET_PRODUCTS, args => {
  return ROOT + '/products';
});
Router.registerRoute(Constants.GET_PRODUCERS, args => {
  return ROOT + '/producers';
})

Router.registerRoute(Constants.EDIT_FACTORY, args => {
  return ROOT + '/factory/'+args.id+'/edit';
});
Router.registerRoute(Constants.EDIT_PRODUCTION_LINE, args => {
  return ROOT + '/productionline/'+args.id+'/edit';
});
Router.registerRoute(Constants.EDIT_PRODUCT, args => {
  return ROOT + '/product/'+args.id+'/edit';
});
Router.registerRoute(Constants.EDIT_PRODUCER, args => {
  return ROOT + '/producer/'+args.id+'/edit';
});

Router.registerRoute(Constants.DELETE_FACTORY, args => {
  return ROOT + '/factory/'+args.id+'';
});
Router.registerRoute(Constants.DELETE_PRODUCTION_LINE, args => {
  return ROOT + '/productionline/'+args.id+'';
});
Router.registerRoute(Constants.DELETE_PRODUCT, args => {
  return ROOT + '/product/'+args.id+'';
});
Router.registerRoute(Constants.DELETE_PRODUCER, args => {
  return ROOT + '/producer/'+args.id+'';
});

Router.registerRoute(Constants.ADD_FACTORY, args => {
  return ROOT + '/factory';
});
Router.registerRoute(Constants.ADD_PRODUCTION_LINE, args => {
  return ROOT + '/productionline';
});
Router.registerRoute(Constants.ADD_PRODUCT, args => {
  return ROOT + '/product';
});
Router.registerRoute(Constants.ADD_PRODUCER, args => {
  return ROOT + '/producer';
});
