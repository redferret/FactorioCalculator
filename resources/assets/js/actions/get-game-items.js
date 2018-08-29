import Actions from './app-actions.js';
import Router from '../router.js';
import { GET_GAME_ITEMS } from '../constants.js';
import GameItemsStore from '../stores/game-items-store.js';

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
