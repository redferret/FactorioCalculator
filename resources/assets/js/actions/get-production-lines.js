
import Actions from './app-actions.js';
import Router from '../router.js';
import { GET_PRODUCTION_LINES } from '../constants.js';
import ProductModalStore from '../stores/product-modal-store.js';

Actions.register(GET_PRODUCTION_LINES, payload => {
  fetch(Router.route(GET_PRODUCTION_LINES, {id: payload.data.id})).then(response => {
    return response.json();
  }).then(productionLines => {
    ProductModalStore.setInputProductionLines(productionLines.inputs);
    ProductModalStore.setOutputProductionLines(productionLines.outputs);
    Actions.finish(payload);
  });
});
