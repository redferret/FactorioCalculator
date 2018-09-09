
import Actions from './app-actions.js';
import FactoryStore from '../stores/factory-store.js';
import GameItemsStore from '../stores/game-items-store.js';
import ModalsStore from '../stores/modals-store.js';
import Router from '../router.js';

import {
  ADD_PRODUCT,
  GET_PRODUCT_TYPES,
} from '../constants.js';

Actions.register(ADD_PRODUCT, payload => {
  console.log(Router.method('POST', payload.data.values));
  fetch(Router.route(ADD_PRODUCT),
    Router.method('POST', payload.data.values)
  ).then(response => {
    return response.json();
  }).then(product => {
    return fetch(Router.route(GET_PRODUCT_TYPES));
  }).then(response => {
    return response.json();
  }).then(productTypes => {
    GameItemsStore.setProductTypes(productTypes);
    Actions.finish(payload);
    ModalsStore.hideModal();
  });
});
