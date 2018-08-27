var Dispatcher = require('flux').Dispatcher;
var AppDispatcher = new Dispatcher();

import Actions from './actions/app-actions.js';

require('./actions/get-factories.js');
require('./actions/get-production-lines.js');
require('./actions/update-producer.js');
require('./actions/update-production-line.js');

AppDispatcher.register((payload) => {
  Actions.call(payload);
  return true;
});

export default AppDispatcher;
