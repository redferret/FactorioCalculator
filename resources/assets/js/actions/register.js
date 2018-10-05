import Actions from './app-actions.js';
import AuthStore from '../stores/auth-store.js';
import Router from '../router.js';

import { REGISTER } from '../constants.js';

Actions.register(REGISTER, payload => {
  fetch(Router.route(REGISTER),
    Router.method('POST', payload.values)
  ).then(response => {
    if (response.status == 422) {
      return response.json();
    } else if (response.status == 200) {
      window.location.replace(response.url);
    }
  }).then(errors => {
    AuthStore.setErrors(errors);
    Actions.finish(payload);
  });
});
