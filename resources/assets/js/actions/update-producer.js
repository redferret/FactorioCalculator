
import Actions from './app-actions.js';
import EditProductionLineModalStore from '../stores/edit-production-line-modal-store.js';
import Router from '../router.js';

import {
  GET_PRODUCTION_LINE,
  UPDATE_PRODUCER,
} from '../constants.js';

Actions.register(UPDATE_PRODUCER, payload => {
  fetch(Router.route(UPDATE_PRODUCER, {
    id: payload.data.productionLineId
  }),
    Router.method('PUT', {
      name: payload.data.name,
      value: payload.data.value
    })
  ).then(response => {
    return response.json();
  }).then(producer => {
    return fetch(Router.route(GET_PRODUCTION_LINE, {
      id: producer.production_line_id
    }), Router.method('GET'));
  }).then(response => {
    return response.json();
  }).then(productionLine => {
    EditProductionLineModalStore.setSelectedProductionLine(productionLine);
    Actions.finish(payload);
  });
});
