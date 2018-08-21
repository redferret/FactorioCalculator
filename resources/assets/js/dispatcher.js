var Dispatcher = require('flux').Dispatcher;
var AppDispatcher = new Dispatcher();

import * as Routes from './routes.js';
import * as Actions from './actions.js';
import ProductionLineStore from './stores/production-line-store.js';
import ProductStore from './stores/product-store.js';

// Register callback with AppDispatcher
AppDispatcher.register((payload) => {

  let action = payload.action;
  let data = payload.data;
  var promise = null;

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
  }
  return true;
});

export default AppDispatcher;
