
import Actions from './app-actions.js';
import Router from '../router.js';
import { ADD_FACTORY } from '../constants.js';
import ModalsStore from '../stores/modals-store.js';
import FactoryStore from '../stores/factory-store.js';

Actions.register(ADD_FACTORY, payload => {
  fetch(Router.route(ADD_FACTORY),
    Router.method('POST', payload.data.values)
  ).then(response => {
    return response.json();
  }).then(factory => {
    FactoryStore.setFactory(factory);
    Actions.finish(payload);
    ModalsStore.hideModal();
  });
});
