
import Actions from './app-actions.js';
import FactoryStore from '../stores/factory-store.js';
import GameItemsStore from '../stores/game-items-store.js';
import ModalsStore from '../stores/modals-store.js';
import Router from '../router.js';

import {
  ADD_PRODUCER,
  GET_PRODUCERS,
} from '../constants.js';

Actions.register(ADD_PRODUCER, payload => {
  fetch(Router.route(ADD_PRODUCER),
    Router.method('POST', payload.data.values)
  ).then(response => {
    return response.json();
  }).then(producer => {
    return fetch(Router.route(GET_PRODUCERS));
  }).then(response => {
    return response.json();
  }).then(producers => {
    GameItemsStore.setProducers(producers);
    Actions.finish(payload);
    ModalsStore.hideModal();
  });
});
