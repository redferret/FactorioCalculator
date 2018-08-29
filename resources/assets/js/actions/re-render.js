import Actions from './app-actions.js';
import { RE_RENDER } from '../constants.js';

Actions.register(RE_RENDER, payload => {
  Actions.finish(payload);
});
