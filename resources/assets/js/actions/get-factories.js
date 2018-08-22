
import Actions from './app-actions.js';
import Router from '../router.js';
import { GET_FACTORIES } from '../constants.js';
import FactoryStore from '../stores/factory-store.js';

Actions.register(GET_FACTORIES, data => {
  fetch(Router.route(GET_FACTORIES)).then(response => {
    return response.json();
  }).then(factories => {
    FactoryStore.setFactories(factories);
    FactoryStore.emitChange(data.componentId);
  });
});
