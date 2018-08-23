
import Actions from './app-actions.js';
import Router from '../router.js';
import { RE_CALCULATE_PRODUCTION } from '../constants.js';
import FactoryStore from '../stores/factory-store.js';

Actions.register(RE_CALCULATE_PRODUCTION, data => {
  fetch(Router.route(RE_CALCULATE_PRODUCTION, {id: data.id}),
    Router.method('POST', {
      itemsPerSecond: data.itemsPerSecond
    })
  ).then(response => {
    return response.json();
  }).then(updatedFactories => {
    
  });
});