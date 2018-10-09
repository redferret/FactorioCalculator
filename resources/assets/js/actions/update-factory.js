import Actions from './app-actions.js';
import FactoryStore from '../stores/factory-store.js';
import ModalsStore from '../stores/modals-store.js';
import Router, { checkStatus, parseJSON, handleError } from '../router.js';

import { UPDATE_FACTORY } from '../constants.js';

Actions.register(UPDATE_FACTORY, payload => {
  fetch(Router.route(UPDATE_FACTORY, {id: payload.id}),
  Router.method('PUT', {
    name: payload.name
  }))
  .then(checkStatus)
  .then(parseJSON)
  .then(factory => {
    FactoryStore.setFactory(factory);
    ModalsStore.hideModal();
    Actions.finish(payload);
  }).catch(handleError);
});
