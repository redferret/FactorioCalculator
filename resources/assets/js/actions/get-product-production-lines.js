
import Actions from './app-actions.js';
import Router from '../router.js';
import { GET_PRODUCT_PRODUCTION_LINES } from '../constants.js';
import ProductModalStore from '../stores/product-modal-store.js';

Actions.register(GET_PRODUCT_PRODUCTION_LINES, data => {
  fetch(Router.route(GET_PRODUCT_PRODUCTION_LINES, {id: data.id})).then(response => {
    return response.json();
  }).then(productionLines => {
    ProductModalStore.setProductProductionLines(productionLines);
    ProductModalStore.emitChange(data.componentId);
  });
});
