import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Main extends Component {
  render() {
    if (this.props.isAuthorized === "false") {
      return <div>You're a Guest</div>;
    } else {
      return <div>Welcome Back!</div>;
    }
  }
};

export default Main;

if (document.getElementById('root')) {
  var rootElement = document.getElementById('root');
  var isAuthorized = rootElement.getAttribute('isAuthorized');
  ReactDOM.render(<Main isAuthorized={isAuthorized} />, rootElement);
}