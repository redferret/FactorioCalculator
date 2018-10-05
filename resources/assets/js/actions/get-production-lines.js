
import Actions, { checkStatus, parseJSON, handleError } from './app-actions.js';
import Router from '../router.js';
import EditInputsModalStore from '../stores/edit-inputs-modal-store.js';
import { GET_PRODUCTION_LINES } from '../constants.js';

Actions.register(GET_PRODUCTION_LINES, payload => {
  fetch(Router.route(GET_PRODUCTION_LINES, {id: payload.id}))
  .then(checkStatus)
  .then(parseJSON)
  .then(productionLines => {
    Actions.finish(payload);
  }).catch(handleError);
});
