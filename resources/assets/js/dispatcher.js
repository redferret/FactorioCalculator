var Dispatcher = require('flux').Dispatcher;
var AppDispatcher = new Dispatcher();

import * as Routes from './routes.js';
import * as Actions from './actions.js';
import ProductionLineStore from './stores/production-line-store.js';

// Register callback with AppDispatcher
AppDispatcher.register((payload) => {

  let action = payload.action;
  let data = payload.data;

  switch(action) {
    case Actions.BALANCE_PRODUCTION:
      let productionLineId = data.id;
      ProductionLineStore.balanceProductionLine(productionLineId);
      ProductionLineStore.emitChange(productionLineId);
      break;
  }
  return true;
});

export default AppDispatcher;
