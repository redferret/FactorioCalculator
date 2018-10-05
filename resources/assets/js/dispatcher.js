var Dispatcher = require('flux').Dispatcher;
var AppDispatcher = new Dispatcher();

import Actions from './actions/app-actions.js';

AppDispatcher.register((payload) => {
  try {
    Actions.call(payload);
  } catch (error) {
    console.error('Unable to perform or complete action', payload, error);
  }
  return true;
});

export default AppDispatcher;
