var Dispatcher = require('flux').Dispatcher;
var AppDispatcher = new Dispatcher();

// Register callback with AppDispatcher
AppDispatcher.register((payload) => {

  let action = payload.action;
  let data = payload.data;
  let store = payload.store;

  switch(action.actionType) {

    // Respond to add-item action
    case 'balance-production-line':
      console.log('Action \'balance-production-line\' received');
      break;

    default:
      return true;
  }

  // If action was responded to, emit change event
  store.emitChange();

  return true;

});

export default AppDispatcher;
