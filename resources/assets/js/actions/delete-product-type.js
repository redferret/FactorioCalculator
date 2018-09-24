import Actions from './app-actions.js';
import GameItemsStore from '../stores/game-items-store.js';
import ModalsStore from '../stores/modals-store.js';
import Router from '../router.js';

import { DELETE_PRODUCT_TYPE } from '../constants.js';

Actions.register(DELETE_PRODUCT_TYPE, payload => {
  fetch(Router.route(DELETE_PRODUCT_TYPE, {id: payload.data.id}),
    Router.method('DELETE')
  ).then(response => {
    return response.json();
  }).then(productType => {
    GameItemsStore.removeProductType(productType.id);
    ModalsStore.hideModal();
    Actions.finish(payload);
  });
});
