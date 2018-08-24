
import React from 'react';

import {
  ControlLabel,
  FormControl,
  FormGroup,
} from 'react-bootstrap';

class Input extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      value: this.props.initialValue,
      isValid: true
    };
    this.ignoreBlur = true;
  }

  handleChange(event) {
    switch(event.type) {
      case 'blur':
        if (!this.ignoreBlur) {
          this.props.callback(event);
          this.ignoreBlur = true;
        }
        break;
      case 'keypress':
        if (event.key === 'Enter') {
          this.props.callback(event);
          this.ignoreBlur = true;
          this.DOMRef.blur();
        }
        break;
    }
  }

  render() {

    let validationState = this.state.isValid ? null : 'error';

    if (this.props.isStatic) {
      return (
        <FormGroup controlId="inputFormGroup" validationState={validationState}>
          <FormControl.Static>{this.props.initialValue}</FormControl.Static>
        </FormGroup>
      );
    }

    return (
      <FormGroup
        controlId="inputFormGroup"
        validationState={validationState}
      >
      <FormControl type={this.props.type} name={this.props.name}
        onBlur={this.handleChange.bind(this)}
        onKeyPress={this.handleChange.bind(this)}
        onChange={(event) => {
          this.ignoreBlur = false;
          this.setState({
            value: event.target.value
          });
        }}
        inputRef={(reference) => this.DOMRef = reference}
        value={this.state.value} />
      </FormGroup>
    );
  }
}

Input.defaultProps = {
  isStatic: false,
  type: 'text',
  callback: () => console.warn('No Callback for Input')
};

export default Input;
