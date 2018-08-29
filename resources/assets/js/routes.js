import * as Constants from './constants.js';
import Router from './router.js';

/**
 * Root route for the application
 */
Router.registerRoute(Constants.ROOT_URL, args => {
  return $('meta[name="rootURL"]').attr('content');
})
const ROOT = Router.route(Constants.ROOT_URL);

/**
 * Routes for getting data
 */
Router.registerRoute(Constants.GET_FACTORIES, args => {
  return ROOT + '/factories';
});
Router.registerRoute(Constants.GET_PRODUCTION_LINES, args => {
  return ROOT + '/productionlines/'+args.id+'/productionlines';
});
Router.registerRoute(Constants.GET_PRODUCTS, args => {
  return ROOT + '/products';
});
Router.registerRoute(Constants.GET_PRODUCT_TYPES, args => {
  return ROOT + '/productTypes';
});
Router.registerRoute(Constants.GET_PRODUCERS, args => {
  return ROOT + '/producers';
})

/**
 * Routes for editing data
 */
Router.registerRoute(Constants.UPDATE_FACTORY, args => {
  return ROOT + '/factories/'+args.id;
});
Router.registerRoute(Constants.UPDATE_PRODUCTION_LINE, args => {
  return ROOT + '/productionlines/'+args.id;
});
Router.registerRoute(Constants.UPDATE_PRODUCT, args => {
  return ROOT + '/products/'+args.id;
});
Router.registerRoute(Constants.UPDATE_PRODUCT_TYPE, args => {
  return ROOT + '/productTypes/'+args.id;
});
Router.registerRoute(Constants.UPDATE_PRODUCER, args => {
  return ROOT + '/producers/'+args.id;
});

/**
 * Routes for deleting data
 */
Router.registerRoute(Constants.DELETE_FACTORY, args => {
  return ROOT + '/factories/'+args.id;
});
Router.registerRoute(Constants.DELETE_PRODUCTION_LINE, args => {
  return ROOT + '/productionlines/'+args.id;
});
Router.registerRoute(Constants.DELETE_PRODUCT, args => {
  return ROOT + '/products/'+args.id;
});
Router.registerRoute(Constants.DELETE_PRODUCT_TYPE, args => {
  return ROOT + '/productTypes/'+args.id;
});
Router.registerRoute(Constants.DELETE_PRODUCER, args => {
  return ROOT + '/producer/'+args.id;
});

/**
 * Routes for adding data
 */
Router.registerRoute(Constants.ADD_FACTORY, args => {
  return ROOT + '/factories';
});
Router.registerRoute(Constants.ADD_PRODUCTION_LINE, args => {
  return ROOT + '/productionlines';
});
Router.registerRoute(Constants.ADD_PRODUCT, args => {
  return ROOT + '/products';
});
Router.registerRoute(Constants.ADD_PRODUCT_TYPE, args => {
  return ROOT + '/productTypes';
});
Router.registerRoute(Constants.ADD_PRODUCER, args => {
  return ROOT + '/producers';
});
