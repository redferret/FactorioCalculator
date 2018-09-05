
import React from 'react';

import {
  ControlLabel,
  FormControl,
  FormGroup,
  HelpBlock,
} from 'react-bootstrap';

class Input extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.handleChange = this.handleChange.bind(this);

    this.state = {
      value: this.props.initialValue,
      isValid: null
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
    this.setState({
      isValid: this.props.validationCallback()
    })
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.isStatic) {
      this.setState({
        value: nextProps.initialValue
      });
    }
  }

  render() {

    let validationState = this.state.isValid;
    let label = this.props.label? <ControlLabel>{this.props.label}</ControlLabel> : '';
    let helpBlock = this.props.help? <HelpBlock>{this.props.help}</HelpBlock> : '';

    if (this.props.isStatic) {
      return (
        <FormGroup controlId="inputFormGroup" validationState={validationState}>
          {label}
          <FormControl.Static>{this.props.initialValue}</FormControl.Static>
          {helpBlock}
        </FormGroup>
      );
    }

    return (
      <FormGroup
        controlId="inputFormGroup"
        validationState={validationState}
      >
        {label}
        <FormControl type={this.props.type} name={this.props.name}
          onBlur={(event) => this.handleChange(event)}
          onKeyPress={(event) => this.handleChange(event)}
          onChange={(event) => {
            this.ignoreBlur = false;
            this.setState({
              value: event.target.value
            });
          }}
          inputRef={(reference) => this.DOMRef = reference}
          value={this.state.value}
          style={this.props.customStyle}/>
        {helpBlock}
      </FormGroup>
    );
  }
}

Input.defaultProps = {
  name: 'default',
  isStatic: false,
  type: 'text',
  label: '',
  help: '',
  initialValue: '',
  customStyle: {
    'marginLeft': 'auto',
    'marginRight': 'auto'
  },
  validationCallback: () => null,
  callback: () => {}
};

export default Input;
