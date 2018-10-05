import Actions from './app-actions.js';
import Router from '../router.js';

import { REGISTER } from '../constants.js';

Actions.register(REGISTER, payload => {
  fetch(Router.route(REGISTER),
    Router.method('POST', payload.values)
  ).then(response => {
    return response.json();
  }).then(errors => {

    Actions.finish(payload);
  });
});
