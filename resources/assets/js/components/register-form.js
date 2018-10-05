import AppDispatcher from '../dispatcher.js';
import Input from './input.js';
import AuthStore from '../stores/auth-store.js';
import React from 'react';
import Router from '../router.js';
import { REGISTER } from '../constants.js';

import {
  Button,
  Col,
  Form,
  FormControl,
  FormGroup,
} from 'react-bootstrap';

export default class RegisterForm extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.postRegister = this.postRegister.bind(this);
    this.handleInputChanged = this.handleInputChanged.bind(this);

    this.state = {
      values: {
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
      }
    }
  }

  _onChange() {

  }

  componentDidMount() {
    AuthStore.on('register-form', this._onChange.bind(this));
  }

  componentWillUnmount() {
    AuthStore.removeListener('register-form', this._onChange.bind(this));
  }

  handleInputChanged(event) {
    let values = this.state.values;
    values[event.target.name] = event.target.value;
    this.setState({
      values: values
    })
  }

  postRegister() {
    AppDispatcher.dispatch({
      action: REGISTER,
      values: this.state.values,
      emitOn: []
    });
  }

  render() {
    return (
      <Form horizontal>
        <Input smOffset={2} sm={4} name='name' type='text' placeholder='John Doe' label='Name'
          initialValue={this.state.values.name} autoComplete='on'
          callback={(event) => this.handleInputChanged(event)}/>

        <Input smOffset={2} sm={4} name='email' type='email' placeholder='Example@gmail.com' label='Email'
          initialValue={this.state.values.email}
          callback={(event) => this.handleInputChanged(event)} autoComplete='on'/>

        <Input smOffset={2} sm={4} name='password' type='password' label='Password'
          initialValue={this.state.values.password}
          callback={(event) => this.handleInputChanged(event)}/>

        <Input smOffset={2} sm={4} name='password_confirmation' type='password' label='Confirm Password'
          initialValue={this.state.values.password_confirmation}
          callback={(event) => this.handleInputChanged(event)}/>

        <FormGroup>
          <Col smOffset={2} sm={10}>
            <Button onClick={this.postRegister}>Register</Button>
          </Col>
        </FormGroup>
      </Form>
    );
  }
}
