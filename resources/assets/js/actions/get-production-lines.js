
import Actions from './app-actions.js';
import Router from '../router.js';
import { GET_PRODUCTION_LINES } from '../constants.js';
import ProductModalStore from '../stores/product-modal-store.js';

Actions.register(GET_PRODUCTION_LINES, data => {
  fetch(Router.route(GET_PRODUCTION_LINES, {id: data.id})).then(response => {
    return response.json();
  }).then(productionLines => {
    console.log('Got Message ', productionLines);
    ProductModalStore.setInputProductionLines(productionLines.inputs);
    ProductModalStore.setOutputProductionLines(productionLines.outputs);
    ProductModalStore.emitChange(data.componentId);
  });
});
