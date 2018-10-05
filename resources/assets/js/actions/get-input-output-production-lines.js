
import Actions, { checkStatus, parseJSON, handleError } from './app-actions.js';
import Router from '../router.js';
import { GET_INPUT_OUTPUT_PRODUCTION_LINES } from '../constants.js';
import EditProductionLineModalStore from '../stores/edit-production-line-modal-store.js';

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
