import Actions from './app-actions.js';
import Router from '../router.js';
import { ADD_PRODUCTION_LINE } from '../constants.js';
import ModalsStore from '../stores/modals-store.js';
import FactoryStore from '../stores/factory-store.js';

Actions.register(ADD_PRODUCTION_LINE, payload => {
  fetch(Router.route(ADD_PRODUCTION_LINE),
    Router.method('POST', payload.data.values)
  ).then(response => {
    return response.json();
  }).then(productionLine => {
    console.log(productionLine);
    FactoryStore.addNewProductionLineToFactory(productionLine)
    Actions.finish(payload);
    ModalsStore.hideModal();
  });
});
