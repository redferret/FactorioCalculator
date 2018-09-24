import Actions from './app-actions.js';
import GameItemsStore from '../stores/game-items-store.js';
import ModalsStore from '../stores/modals-store.js';
import Router from '../router.js';

import { DELETE_PRODUCT } from '../constants.js';

Actions.register(DELETE_PRODUCT, payload => {
  fetch(Router.route(DELETE_PRODUCT, {id: payload.data.id}),
    Router.method('DELETE')
  ).then(response => {
    return response.json();
  }).then(product => {
    GameItemsStore.removeProduct(product);
    ModalsStore.hideModal();
    Actions.finish(payload);
  });
});
