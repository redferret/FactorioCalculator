import Actions from './app-actions.js';
import FactoryStore from '../stores/factory-store.js';
import ModalsStore from '../stores/modals-store.js';
import Router from '../router.js';
import { DELETE_FACTORY } from '../constants.js';

Actions.register(DELETE_FACTORY, payload => {
  fetch(Router.route(DELETE_FACTORY, {id: payload.data.id}),
    Router.method('DELETE')
  ).then(response => {
    return response.json();
  }).then(factory => {
    if (factory.response != 'failed') {
      FactoryStore.removeFactory(factory.id);
    } else {
      console.log(factory);
    }
    ModalsStore.hideModal();
    Actions.finish(payload);
  });
});
