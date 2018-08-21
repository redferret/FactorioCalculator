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

  switch(action) {
    case Actions.BALANCE_PRODUCTION:
      ProductionLineStore.balanceProductionLine(data.id);
      ProductionLineStore.emitChange(data.componentId);
      break;

    case Actions.GET_PRODUCT:
      ProductStore.getProduct(data.id);
      ProductStore.emitChange(data.componentId);
      break;
  }
  return true;
});

export default AppDispatcher;
