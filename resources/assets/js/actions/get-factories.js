import Actions from './app-actions.js';
import FactoryStore from '../stores/factory-store.js';
import Router, { checkStatus, parseJSON, handleError } from '../router.js';

import { GET_FACTORIES } from '../constants.js';

Actions.register(GET_FACTORIES, payload => {
  fetch(Router.route(GET_FACTORIES))
  .then(checkStatus)
  .then(parseJSON)
  .then(factories => {
    FactoryStore.setFactories(factories);
    Actions.finish(payload);
  }).catch(handleError);
});
