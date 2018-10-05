import Actions, { checkStatus, parseJSON, handleError } from './app-actions.js';
import FactoryStore from '../stores/factory-store.js';
import ModalsStore from '../stores/modals-store.js';
import Router from '../router.js';

import { DELETE_PRODUCTION_LINE } from '../constants.js';

Actions.register(DELETE_PRODUCTION_LINE, payload => {
  fetch(Router.route(DELETE_PRODUCTION_LINE, {id: payload.id}), Router.method('DELETE'))
  .then(checkStatus)
  .then(parseJSON)
  .then(productionLine => {
    FactoryStore.removeProductionLine(productionLine);
    ModalsStore.hideModal();
    Actions.finish(payload);
  }).catch(handleError);
});
