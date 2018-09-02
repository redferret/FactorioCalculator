import Actions from './app-actions.js';
import GameItemsStore from '../stores/game-items-store.js';
import ModalsStore from '../stores/modals-store.js';
import Router from '../router.js';

import {
  GET_PRODUCERS,
  UPDATE_PRODUCER,
} from '../constants.js';

Actions.register(UPDATE_PRODUCER, payload => {
  fetch(Router.route(UPDATE_PRODUCER, {
    id: payload.data.id
  }),
    Router.method('PUT', payload.data.values)
  ).then(response => {
    return response.json();
  }).then(producer => {
    // do something with producer
    return fetch(Router.route(GET_PRODUCERS));
  }).then(response => {
    return response.json();
  }).then(producers => {
    GameItemsStore.setProducers(producers);
    Actions.finish(payload);
    ModalsStore.hideModal();
  });
});
