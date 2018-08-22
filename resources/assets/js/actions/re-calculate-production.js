
import Actions from './app-actions.js';
import * as Routes from '../routes.js';
import { RE_CALCULATE_PRODUCTION } from '../constants.js';
import FactoryStore from '../stores/factory-store.js';

Actions.register(RE_CALCULATE_PRODUCTION, data => {
  fetch(Routes.recalculateProductionLine(data.id),
    Routes.POST({
      itemsPerSecond: data.itemsPerSecond
    })
  ).then(response => {
    return response.json();
  }).then(updatedFactories => {
    FactoryStore.setFactories(updatedFactories);
    FactoryStore.emitChange(data.componentId);
  });
});
