import Actions from './app-actions.js';
import FactoryStore from '../stores/factory-store.js';
import GameItemsStore from '../stores/game-items-store.js';
import ModalSpinnerStore from '../stores/modal-spinner-store.js';
import ModalsStore from '../stores/modals-store.js';
import Router, { checkStatus, parseJSON, handleError } from '../router.js';

import { DEFAULT_MESSAGE } from '../stores/modal-spinner-store.js';

import {
  GET_PRODUCERS,
  GET_PRODUCT_TYPES,
  GET_FACTORIES,
  INITIAL_APP_LOAD,
  RE_CALCULATE_PRODUCTION_LINES,
} from '../constants.js';


Actions.register(INITIAL_APP_LOAD, payload => {
  fetch(Router.route(GET_FACTORIES))
  .then(checkStatus)
  .then(parseJSON)
  .then(factories => {
    FactoryStore.setFactories(factories);
    return fetch(Router.route(GET_PRODUCERS))
  })
  .then(checkStatus)
  .then(parseJSON)
  .then(producers => {
    GameItemsStore.setProducers(producers);
    return fetch(Router.route(GET_PRODUCT_TYPES));
  })
  .then(checkStatus)
  .then(parseJSON)
  .then(productTypes => {
    GameItemsStore.setProductTypes(productTypes);
    ModalsStore.hideModal();
    ModalSpinnerStore.setSpinnerMessage(DEFAULT_MESSAGE);
    Actions.finish(payload);
  }).catch(handleError);
});
