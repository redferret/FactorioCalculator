var Dispatcher = require('flux').Dispatcher;
var AppDispatcher = new Dispatcher();

import * as Routes from './routes.js';
import * as Actions from './actions.js';
import ProductionLineStore from './stores/production-line-store.js';
import ProductStore from './stores/product-store.js';
import FactoryStore from './stores/factory-store.js';

// Register callback with AppDispatcher
AppDispatcher.register((payload) => {

  let action = payload.action;
  let data = payload.data;

  switch(action) {
    case Actions.BALANCE_PRODUCTION:
      fetch(Routes.BALANCE_PRODUCTION + data.id).then(response => {
        return response.json();
      }).then(productionLine => {
        ProductionLineStore.setProductionLine(productionLine);
        ProductionLineStore.emitChange(data.componentId);
      });
      break;

    case Actions.GET_PRODUCT:
      fetch(Routes.GET_PRODUCT + data.id).then(response => {
        return response.json();
      }).then(product => {
        ProductStore.setProduct(product);
        ProductStore.emitChange(data.componentId);
      })
      break;

    case Actions.GET_FACTORIES:
      fetch(Routes.GET_FACTORIES).then(response => {
        return response.json();
      }).then(factories => {
        FactoryStore.setFactories(factories);
        FactoryStore.emitChange(data.componentId);
      })
  }
  return true;
});

export default AppDispatcher;
