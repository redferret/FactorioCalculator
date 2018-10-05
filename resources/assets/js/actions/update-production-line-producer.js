
import Actions, { checkStatus, parseJSON, handleError } from './app-actions.js';
import EditProductionLineModalStore from '../stores/edit-production-line-modal-store.js';
import FactoryStore from '../stores/factory-store.js';
import ModalsStore from '../stores/modals-store.js';
import Router from '../router.js';

import {
  GET_FACTORIES,
  UPDATE_PRODUCTION_LINE_PRODUCER,
} from '../constants.js';

Actions.register(UPDATE_PRODUCTION_LINE_PRODUCER, payload => {
  fetch(Router.route(UPDATE_PRODUCTION_LINE_PRODUCER, {id: payload.id}),
    Router.method('PUT', payload.values)
  )
  .then(checkStatus)
  .then(parseJSON)
  .then(productionLine => {
    // do something with producer
    return fetch(Router.route(GET_FACTORIES));
  })
  .then(checkStatus)
  .then(parseJSON)
  .then(factories => {
    FactoryStore.setFactories(factories);
    Actions.finish(payload);
    ModalsStore.hideModal();
  }).catch(handleError);
});
