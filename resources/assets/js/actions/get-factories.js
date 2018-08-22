
import Actions from './app-actions.js';
import * as Routes from '../routes.js';
import { GET_FACTORIES } from '../constants.js';
import FactoryStore from '../stores/factory-store.js';

Actions.register(GET_FACTORIES, data => {
  fetch(Routes.getFactories()).then(response => {
    return response.json();
  }).then(factories => {
    FactoryStore.setFactories(factories);
    FactoryStore.emitChange(data.componentId);
  });
});
