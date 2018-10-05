import Actions, { checkStatus, parseJSON, handleError } from './app-actions.js';
import FactoryStore from '../stores/factory-store.js';
import ModalsStore from '../stores/modals-store.js';
import Router from '../router.js';
import { DELETE_FACTORY } from '../constants.js';

Actions.register(DELETE_FACTORY, payload => {
  fetch(Router.route(DELETE_FACTORY, {id: payload.id}), Router.method('DELETE'))
  .then(checkStatus)
  .then(parseJSON)
  .then(factory => {
    if (factory.response != 'failed') {
      FactoryStore.removeFactory(factory.id);
    }
    ModalsStore.hideModal();
    Actions.finish(payload);
  }).catch(handleError);
});
