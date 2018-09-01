
import Actions from './app-actions.js';
import FactoryStore from '../stores/factory-store.js';
import GameItemsStore from '../stores/game-items-store.js';
import ModalsStore from '../stores/modals-store.js';
import Router from '../router.js';

import {
  GET_FACTORIES,
  GET_PRODUCT_TYPES,
  UPDATE_PRODUCT,
} from '../constants.js';

Actions.register(UPDATE_PRODUCT, payload => {
  fetch(Router.route(UPDATE_PRODUCT, {
    id: payload.data.id
  }),
    Router.method('PUT', {
      crafting_time: payload.data.values.crafting_time,
      hardness: payload.data.values.hardness,
      stock_size: payload.data.values.stock_size
    })
  ).then(response => {
    return response.json();
  }).then(data => {
    return fetch(Router.route(GET_FACTORIES));
  }).then(response => {
    return response.json();
  }).then(factories => {
    FactoryStore.setFactories(factories);
    return fetch(Router.route(GET_PRODUCT_TYPES));
  }).then(response => {
    return response.json();
  }).then(productTypes => {
    GameItemsStore.setProductTypes(productTypes);
    Actions.finish(payload);
    ModalsStore.hideModal();
  });
});
