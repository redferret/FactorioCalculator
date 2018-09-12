
import Actions from './app-actions.js';
import Router from '../router.js';
import EditInputsModalStore from '../stores/edit-inputs-modal-store.js';
import { GET_PRODUCTION_LINES } from '../constants.js';

Actions.register(GET_PRODUCTION_LINES, payload => {
  fetch(Router.route(GET_PRODUCTION_LINES, {
    id: payload.data.id
  })).then(response => {
    return response.json();
  }).then(productionLines => {
    Actions.finish(payload);
  });
});
