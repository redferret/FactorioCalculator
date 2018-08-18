import React from 'react';
import {Label, Button } from 'react-bootstrap';

export default class BalanceProductionButton extends React.Component {
  constructor(props) {
    super(props);
    this.handleSelect = this.handleSelect.bind(this);
  }
  handleSelect(e) {
    alert("Balance Production");
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
