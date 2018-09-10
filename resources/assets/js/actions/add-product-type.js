
import Actions from './app-actions.js';
import Router from '../router.js';
import GameItemsStore from '../stores/game-items-store.js';
import ModalsStore from '../stores/modals-store.js';
import FactoryStore from '../stores/factory-store.js';

import {
  ADD_PRODUCT_TYPE,
  GET_PRODUCT_TYPES,
 } from '../constants.js';

Actions.register(ADD_PRODUCT_TYPE, payload => {
  fetch(Router.route(ADD_PRODUCT_TYPE),
    Router.method('POST', payload.data.values)
  ).then(response => {
    return response.json();
  }).then(productType => {
    return fetch(Router.route(GET_PRODUCT_TYPES));
  }).then(response => {
    return response.json();
  }).then(productTypes => {
    GameItemsStore.setProductTypes(productTypes);
    Actions.finish(payload);
    ModalsStore.hideModal();
  });
});
