import Actions from './app-actions.js';
import EditInputsModalStore from '../stores/edit-inputs-modal-store.js';
import Router, { checkStatus, parseJSON, handleError } from '../router.js';

import {
  GET_REQUIRED_INPUT_PRODUCTS,
  GET_INPUT_OUTPUT_PRODUCTION_LINES,
  GET_INPUT_PRODUCTION_LINES,
} from '../constants.js';

Actions.register(GET_INPUT_PRODUCTION_LINES, payload => {
  fetch(Router.route(GET_INPUT_OUTPUT_PRODUCTION_LINES, {id: payload.id}))
  .then(checkStatus)
  .then(parseJSON)
  .then(productionLines => {
    EditInputsModalStore.setInputs(productionLines.inputs);
    return fetch(Router.route(GET_REQUIRED_INPUT_PRODUCTS, {id: payload.id}));
  })
  .then(checkStatus)
  .then(parseJSON)
  .then(products => {
    EditInputsModalStore.setRequiredProducts(products);
    EditInputsModalStore.validateInputs();
    Actions.finish(payload);
  }).catch(handleError);
});
