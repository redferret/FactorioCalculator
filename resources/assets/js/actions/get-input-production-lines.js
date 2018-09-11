
import Actions from './app-actions.js';
import Router from '../router.js';
import AddInputModalStore from '../stores/add-input-modal-store.js';

import {
  GET_INPUT_OUTPUT_PRODUCTION_LINES,
  GET_INPUT_PRODUCTION_LINES,
} from '../constants.js';

Actions.register(GET_INPUT_PRODUCTION_LINES, payload => {
  fetch(Router.route(GET_INPUT_OUTPUT_PRODUCTION_LINES, {
    id: payload.data.id
  })).then(response => {
    return response.json();
  }).then(productionLines => {
    AddInputModalStore.setInputs(productionLines.inputs);
    Actions.finish(payload);
  });
});
