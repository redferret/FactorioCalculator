import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class Main extends Component {
  render() {
    return <div>Welcome Back!</div>;
  }
};

if (document.getElementById('root')) {
  ReactDOM.render(<Main />, document.getDocumentById('root'));
}