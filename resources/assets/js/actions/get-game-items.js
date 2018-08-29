import Actions from './app-actions.js';
import GameItemsStore from '../stores/game-items-store.js';
import Router from '../router.js';

import {
  GET_GAME_ITEMS,
  GET_PRODUCERS,
  GET_PRODUCTS,
} from '../constants.js';


Actions.register(GET_GAME_ITEMS,  payload => {
  fetch(Router.route(GET_PRODUCERS)).then(response => {
    return response.json()
  }).then(producers => {
    GameItemsStore.setProducers(producers);
    return fetch(Router.route(GET_PRODUCTS));
  }).then(response => {
    return response.json();
  }).then(products => {
    GameItemsStore.setProducts(products);
    Actions.finish(payload);
  })
});
