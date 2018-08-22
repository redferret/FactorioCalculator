
import Actions from './app-actions.js';
import * as Routes from '../routes.js';
import { GET_PRODUCT_PRODUCTION_LINES } from '../constants.js';
import ProductModalStore from '../stores/product-modal-store.js';

Actions.register(GET_PRODUCT_PRODUCTION_LINES, data => {
  fetch(Routes.getProductProductionLines(data.id)).then(response => {
    return response.json();
  }).then(productionLines => {
    ProductModalStore.setProductProductionLines(productionLines);
    ProductModalStore.emitChange(data.componentId);
  });
});
