
import React from 'react';
import ReactDOM from 'react-dom';

import AppContent from './app-content.js';
import LoginForm from './login-form.js';
import RegisterForm from './register-form.js';
import ApplicationNavbar from './navbar.js';
import { AppRoot, Login, Register, AppNavbarGuest, AppNavbarUser } from '../bootstrap.js';


if (AppNavbarGuest) {
  ReactDOM.render(<ApplicationNavbar guest/>, AppNavbarGuest);
} else if (AppNavbarUser) {
  ReactDOM.render(<ApplicationNavbar />, AppNavbarUser);
}

if (AppRoot) {
  ReactDOM.render(<AppContent />, AppRoot);
} else if (Login) {
  ReactDOM.render(<LoginForm />, Login);
} else if (Register) {
  ReactDOM.render(<RegisterForm />, Register);
} else {
  console.error('Unable to find an element to render on');
}
