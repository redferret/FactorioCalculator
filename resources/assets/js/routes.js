import * as Constants from './constants.js';
import Router from './router.js';

/**
 * Root route for the application
 */
Router.registerRoute(Constants.ROOT_URL, args => {
  return $('meta[name="rootURL"]').attr('content');
});
const ROOT = Router.route(Constants.ROOT_URL);

Router.registerRoute(Constants.IMAGE_ASSET, args => {
  return 'https://wiki.factorio.com/images/' + args.fileName;
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

Router.registerRoute(Constants.EDIT_INPUTS, args => {
  return ROOT + '/productionlines/'+args.id+'/inputs';
});

/**
 * Routes for getting data
 */
Router.registerRoute(Constants.GET_FACTORIES, args => {
  return ROOT + '/factories';
});
Router.registerRoute(Constants.GET_INPUT_OUTPUT_PRODUCTION_LINES, args => {
  return ROOT + '/productionlines/'+args.id+'/inputsOutputs';
});
Router.registerRoute(Constants.GET_PRODUCTION_LINES, args => {
  return ROOT + '/productionlines';
});
Router.registerRoute(Constants.GET_PRODUCTION_LINE, args => {
  return ROOT + '/productionlines/' + args.id;
});
Router.registerRoute(Constants.GET_PRODUCTS, args => {
  return ROOT + '/products';
});
Router.registerRoute(Constants.GET_PRODUCT_TYPES, args => {
  return ROOT + '/productTypes';
});
Router.registerRoute(Constants.GET_PRODUCERS, args => {
  return ROOT + '/producers';
});

/**
 * Special Routes
 */
Router.registerRoute(Constants.RE_CALCULATE_PRODUCTION_LINES, args => {
  return ROOT + '/productionlines/recalculate';
});

/**
 * Routes for editing data
 */
Router.registerRoute(Constants.UPDATE_FACTORY, args => {
  return ROOT + '/factories/'+args.id;
});
Router.registerRoute(Constants.UPDATE_PRODUCTION_LINE, args => {
  return ROOT + '/productionlines/'+args.id;
});
Router.registerRoute(Constants.UPDATE_PRODUCTION_LINE_PRODUCER, args => {
  return ROOT + '/productionlines/'+args.id+'/producer';
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
