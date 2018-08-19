import React from 'react';
import {Label, Button } from 'react-bootstrap';

export default class BalanceProductionButton extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.handleSelect = this.handleSelect.bind(this);
  }
  handleSelect(e) {
    fetch(window.baseURL + '/balance')
    .then(response => {
      return response.json();
    }).then(data => {
      console.log(data);
    });
  }
  render() {
    var label = <Label bsStyle='success'>Production Details - Balanced</Label>;

    if (!this.props.balanced) {
      label = <Label bsStyle='warning'>Production Details - Not Balanced</Label>;
    }

    if (this.props.balanced) {
      return <h4>{label}</h4>;
    }
    return (
      <div>
        <h4>{label}</h4>
        <Button onClick={this.handleSelect} bsStyle='success' bsSize='xsmall'>Balance Production</Button>
      </div>
    );
  }
}
BalanceProductionButton.defaultProps = {
  balanced: true
};
