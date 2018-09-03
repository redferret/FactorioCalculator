import Actions from './app-actions.js';
import FactoryStore from '../stores/factory-store.js';
import ModalsStore from '../stores/modals-store.js';
import Router from '../router.js';

import { UPDATE_FACTORY } from '../constants.js';

Actions.register(UPDATE_FACTORY, payload => {
  fetch(Router.route(UPDATE_FACTORY, {
    id: payload.data.id
  }),
    Router.method('PUT', {
      name: payload.data.name
    })
  ).then(response => {
    return response.json();
  }).then(factory => {
    FactoryStore.setFactory(factory);
    ModalsStore.hideModal();
    Actions.finish(payload);
  });
});
