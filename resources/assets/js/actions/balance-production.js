
import Actions from './app-actions.js';
import * as Routes from '../routes.js';
import { BALANCE_PRODUCTION } from '../constants.js';
import ProductionLineStore from '../stores/production-line-store.js';

Actions.register(BALANCE_PRODUCTION, data => {
  fetch(Routes.BALANCE_PRODUCTION(data.id)).then(response => {
    return response.json();
  }).then(productionLine => {
    ProductionLineStore.setProductionLine(productionLine);
    ProductionLineStore.emitChange(data.componentId);
  });
});
