
import Actions from './app-actions.js';
import Router from '../router.js';
import { UPDATE_PRODUCER } from '../constants.js';
import ProductModalStore from '../stores/product-modal-store.js';

Actions.register(UPDATE_PRODUCER, payload => {
  fetch(Router.route(UPDATE_PRODUCER, {id: payload.data.productionLineId}),
    Router.method('PUT', {
      name: payload.data.name,
      value: payload.data.value
    })
  ).then(response => {
    return response.json();
  }).then(productionLine => {
    ProductModalStore.setSelectedProductionLine(productionLine);
    Actions.finish(payload);
  });
});
