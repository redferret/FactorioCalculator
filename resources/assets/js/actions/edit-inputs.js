
import Actions from './app-actions.js';
import FactoryStore from '../stores/factory-store.js';
import ModalsStore from '../stores/modals-store.js';
import Router from '../router.js';

import {
  EDIT_INPUTS,
  GET_FACTORIES,
  RE_CALCULATE_PRODUCTION_LINES,
} from '../constants.js';

Actions.register(EDIT_INPUTS, payload => {
  fetch(Router.route(EDIT_INPUTS, {
    id: payload.data.id
  }),
    Router.method('PUT', {
      inputs: payload.data.inputs
    })
  ).then(response => {
    return response.json();
  }).then(productionLine => {
    return fetch(Router.route(RE_CALCULATE_PRODUCTION_LINES));
  }).then(response => {
    return response.json();
  }).then(productionLines => {
    return fetch(Router.route(GET_FACTORIES));
  }).then(response => {
    return response.json();
  }).then(factories => {
    FactoryStore.setFactories(factories);
    Actions.finish(payload);
    ModalsStore.hideModal();
  });
});
