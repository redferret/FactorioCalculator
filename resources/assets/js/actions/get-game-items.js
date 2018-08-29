import Actions from './app-actions.js';
import GameItemsStore from '../stores/game-items-store.js';
import Router from '../router.js';

import {
  GET_GAME_ITEMS,
  GET_PRODUCERS,
  GET_PRODUCT_TYPES,
} from '../constants.js';


Actions.register(GET_GAME_ITEMS,  payload => {
  fetch(Router.route(GET_PRODUCERS)).then(response => {
    return response.json()
  }).then(producers => {
    GameItemsStore.setProducers(producers);
    return fetch(Router.route(GET_PRODUCT_TYPES));
  }).then(response => {
    return response.json();
  }).then(productTypes => {
    GameItemsStore.setProductTypes(productTypes);
    Actions.finish(payload);
  })
});
