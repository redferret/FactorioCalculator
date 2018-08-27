
import Actions from './app-actions.js';
import Router from '../router.js';
import { GET_FACTORIES } from '../constants.js';
import FactoryStore from '../stores/factory-store.js';

Actions.register(GET_FACTORIES, payload => {
  fetch(Router.route(GET_FACTORIES)).then(response => {
    return response.json();
  }).then(factories => {
    FactoryStore.setFactories(factories);
    Actions.finish(payload);
  });
});
