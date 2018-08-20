var Dispatcher = require('flux').Dispatcher;
var AppDispatcher = new Dispatcher();

import * as Routes from './routes.js';
import * as Actions from './actions.js';

// Register callback with AppDispatcher
AppDispatcher.register((payload) => {

  let action = payload.action;
  let data = payload.data;
  let store = payload.store;

  switch(action) {
    case Actions.BALANCE_PRODUCTION:
      fetch(Routes.BALANCE_PRODUCTION);
      break;

    default:
      return true;
  }

  // If action was responded to, emit change event
  store.emitChange();

  return true;

});

export default AppDispatcher;
