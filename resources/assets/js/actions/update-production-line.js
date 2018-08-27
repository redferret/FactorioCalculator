
import Actions from './app-actions.js';
import FactoryStore from '../stores/factory-store.js';
import Router from '../router.js';

import { UPDATE_PRODUCTION_LINE } from '../constants.js';

Actions.register(UPDATE_PRODUCTION_LINE, payload => {
  fetch(Router.route(UPDATE_PRODUCTION_LINE, {id: payload.data.productionLineId}),
    Router.method('PUT', {
      name: payload.data.name,
      value: payload.data.value
    })
  ).then(response => {
    return response.json();
  }).then(data => {
    FactoryStore.setFactories(data.factories);
    Actions.finish(payload);
  })
});
