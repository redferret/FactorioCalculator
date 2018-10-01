import Actions from './app-actions.js';
import FactoryStore from '../stores/factory-store.js';
import GameItemsStore from '../stores/game-items-store.js';
import ModalSpinnerStore from '../stores/modal-spinner-store.js';
import ModalsStore from '../stores/modals-store.js';
import Router from '../router.js';

import { DEFAULT_MESSAGE } from '../stores/modal-spinner-store.js';

import {
  GET_PRODUCERS,
  GET_PRODUCT_TYPES,
  GET_FACTORIES,
  INITIAL_APP_LOAD,
  RE_CALCULATE_PRODUCTION_LINES,
} from '../constants.js';


Actions.register(INITIAL_APP_LOAD, payload => {
  fetch(Router.route(GET_FACTORIES)).then(response => {
    return response.json();
  }).then(factories => {
    FactoryStore.setFactories(factories);
    return fetch(Router.route(GET_PRODUCERS))
  }).then(response => {
    return response.json();
  }).then(producers => {
    GameItemsStore.setProducers(producers);
    return fetch(Router.route(GET_PRODUCT_TYPES));
  }).then(response => {
    return response.json();
  }).then(productTypes => {
    GameItemsStore.setProductTypes(productTypes);
    Actions.finish(payload);
    ModalsStore.hideModal();
    ModalSpinnerStore.setSpinnerMessage(DEFAULT_MESSAGE);
  });
});
