var Dispatcher = require('flux').Dispatcher;
var AppDispatcher = new Dispatcher();

import Actions from './actions/app-actions.js';

require('./actions/balance-production.js');
require('./actions/get-factories.js');
require('./actions/get-product-production-lines.js');
require('./actions/get-product.js');
require('./actions/re-calculate-production.js');

AppDispatcher.register((payload) => {
  Actions.call(payload.action, payload.data);
  return true;
});

export default AppDispatcher;
