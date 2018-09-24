import Actions from './app-actions.js';
import GameItemsStore from '../stores/game-items-store.js';
import ModalsStore from '../stores/modals-store.js';
import Router from '../router.js';

import { DELETE_PRODUCER } from '../constants.js';

Actions.register(DELETE_PRODUCER, payload => {
  fetch(Router.route(DELETE_PRODUCER, {id: payload.data.id}),
    Router.method('DELETE')
  ).then(response => {
    return response.json();
  }).then(producer => {
    GameItemsStore.removeProducer(producer.id);
    ModalsStore.hideModal();
    Actions.finish(payload);
  });
});
