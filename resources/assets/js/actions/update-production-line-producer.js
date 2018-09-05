
import Actions from './app-actions.js';
import EditProductionLineModalStore from '../stores/edit-production-line-modal-store.js';
import FactoryStore from '../stores/factory-store.js';
import ModalsStore from '../stores/modals-store.js';
import Router from '../router.js';

import {
  GET_FACTORIES,
  UPDATE_PRODUCTION_LINE_PRODUCER,
} from '../constants.js';

Actions.register(UPDATE_PRODUCTION_LINE_PRODUCER, payload => {
  fetch(Router.route(UPDATE_PRODUCTION_LINE_PRODUCER, {
    id: payload.data.id
  }),
    Router.method('PUT', payload.data.values)
  ).then(response => {
    return response.json();
  }).then(productionLine => {
    // do something with producer
    return fetch(Router.route(GET_FACTORIES));
  }).then(response => {
    return response.json();
  }).then(factories => {
    FactoryStore.setFactories(factories);
    Actions.finish(payload);
    ModalsStore.hideModal();
  });
});
