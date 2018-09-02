import Actions from './app-actions.js';
import GameItemsStore from '../stores/game-items-store.js';
import ModalsStore from '../stores/modals-store.js';
import Router from '../router.js';

import {
  UPDATE_PRODUCT_TYPE,
  GET_PRODUCT_TYPES,
} from '../constants.js';

Actions.register(UPDATE_PRODUCT_TYPE, payload => {
  fetch(Router.route(UPDATE_PRODUCT_TYPE, {
    id: payload.data.id
  }), Router.method('PUT', {
    name: payload.data.name
  })).then(response => {
    return response.json()
  }).then(productType => {
    // Do something with productType rather than getting all product types
    return fetch(Router.route(GET_PRODUCT_TYPES));
  }).then(response => {
    return response.json();
  }).then(productTypes => {
    GameItemsStore.setProductTypes(productTypes);
    Actions.finish(payload);
    ModalsStore.hideModal();
  })
});
