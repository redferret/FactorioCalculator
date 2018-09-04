
import Actions from './app-actions.js';
import FactoryStore from '../stores/factory-store.js';
import ModalsStore from '../stores/modals-store.js';
import Router from '../router.js';

import { UPDATE_PRODUCTION_LINE } from '../constants.js';

Actions.register(UPDATE_PRODUCTION_LINE, payload => {
  fetch(Router.route(UPDATE_PRODUCTION_LINE, {
    id: payload.data.productionLineId
  }),
    Router.method('PUT', payload.data.values)
  ).then(response => {
    return response.json();
  }).then(data => {
    FactoryStore.setFactories(data.factories);
    Actions.finish(payload);
    ModalsStore.hideModal();
  })
});
