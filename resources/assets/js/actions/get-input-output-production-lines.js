import Actions from './app-actions.js';
import EditProductionLineModalStore from '../stores/edit-production-line-modal-store.js';
import Router, { checkStatus, parseJSON, handleError } from '../router.js';

import { GET_INPUT_OUTPUT_PRODUCTION_LINES } from '../constants.js';

Actions.register(GET_INPUT_OUTPUT_PRODUCTION_LINES, payload => {
  fetch(Router.route(GET_INPUT_OUTPUT_PRODUCTION_LINES, {id: payload.id}))
  .then(checkStatus)
  .then(parseJSON)
  .then(productionLines => {
    EditProductionLineModalStore.setInputProductionLines(productionLines.inputs);
    EditProductionLineModalStore.setOutputProductionLines(productionLines.outputs);
    Actions.finish(payload);
  }).catch(handleError);
});
