import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { Alert } from 'react-bootstrap';

export default class Main extends Component {
  render() {
    return <Alert bsStyle="info">Welcome Back!</Alert>;
  }
};

const RootElement = document.getElementById('root');

if (RootElement) {
  ReactDOM.render(<Main />, RootElement);
} else {
  console.log("Something went wrong, couldn't find 'root' element");
}