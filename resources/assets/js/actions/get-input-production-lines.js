
import Actions from './app-actions.js';
import Router from '../router.js';
import EditInputsModalStore from '../stores/edit-inputs-modal-store.js';

import {
  GET_REQUIRED_INPUT_PRODUCTS,
  GET_INPUT_OUTPUT_PRODUCTION_LINES,
  GET_INPUT_PRODUCTION_LINES,
} from '../constants.js';

Actions.register(GET_INPUT_PRODUCTION_LINES, payload => {
  fetch(Router.route(GET_INPUT_OUTPUT_PRODUCTION_LINES, {
    id: payload.data.id
  })).then(response => {
    return response.json();
  }).then(productionLines => {
    EditInputsModalStore.setInputs(productionLines.inputs);
    return fetch(Router.route(GET_REQUIRED_INPUT_PRODUCTS, {id: payload.data.id}));
  }).then(response => {
    return response.json();
  }).then(products => {
    EditInputsModalStore.setRequiredProducts(products);
    Actions.finish(payload);
  });
});
