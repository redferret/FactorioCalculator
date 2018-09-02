
import Actions from './app-actions.js';
import EditProductionLineModalStore from '../stores/edit-production-line-modal-store.js';
import Router from '../router.js';

import {
  GET_PRODUCTION_LINE,
  UPDATE_PRODUCTION_LINE_PRODUCER,
} from '../constants.js';

Actions.register(UPDATE_PRODUCTION_LINE_PRODUCER, payload => {
  fetch(Router.route(UPDATE_PRODUCTION_LINE_PRODUCER, {
    id: payload.data.id
  }),
    Router.method('PUT', payload.data.values)
  ).then(response => {
    return response.json();
  }).then(producer => {
    // do something with producer
    return fetch(Router.route(GET_PRODUCTION_LINE, {
      id: payload.data.id
    }));
  }).then(response => {
    return response.json();
  }).then(productionLine => {
    EditProductionLineModalStore.setSelectedProductionLine(productionLine);
    Actions.finish(payload);
  });
});
