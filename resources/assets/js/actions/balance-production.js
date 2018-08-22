
import Actions from './app-actions.js';
import Router from '../router.js';
import { BALANCE_PRODUCTION } from '../constants.js';
import ProductionLineStore from '../stores/production-line-store.js';

Actions.register(BALANCE_PRODUCTION, data => {
  fetch(Router.route(BALANCE_PRODUCTION, {id: data.id}),
    Router.method('GET')
  ).then(response => {
    return response.json();
  }).then(productionLine => {
    ProductionLineStore.setProductionLine(productionLine);
    ProductionLineStore.emitChange(data.componentId);
  });
});
