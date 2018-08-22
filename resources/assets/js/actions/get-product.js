
import Actions from './app-actions.js';
import * as Routes from '../routes.js';
import { GET_PRODUCT } from '../constants.js';
import ProductStore from '../stores/product-store.js';

Actions.register(GET_PRODUCT, data => {
  fetch(Routes.GET_PRODUCT(data.id)).then(response => {
    return response.json();
  }).then(product => {
    ProductStore.setProduct(product);
    ProductStore.emitChange(data.componentId);
  });
});
