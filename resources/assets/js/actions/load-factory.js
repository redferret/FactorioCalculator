import Actions from './app-actions.js';
import { LOAD_FACTORY } from '../constants.js';

Actions.register(LOAD_FACTORY, payload => {
  Actions.finish(payload);
});
