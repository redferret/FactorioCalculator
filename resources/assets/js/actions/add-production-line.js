import Actions  from './app-actions.js';
import FactoryStore from '../stores/factory-store.js';
import ModalsStore from '../stores/modals-store.js';
import Router, { checkStatus, parseJSON, handleError } from '../router.js';

import { ADD_PRODUCTION_LINE } from '../constants.js';

Actions.register(ADD_PRODUCTION_LINE, payload => {
  fetch(Router.route(ADD_PRODUCTION_LINE), Router.method('POST', payload.values))
  .then(checkStatus)
  .then(parseJSON)
  .then(productionLine => {
    FactoryStore.addNewProductionLineToFactory(productionLine)
    Actions.finish(payload);
    ModalsStore.hideModal();
  }).catch(handleError);
});
