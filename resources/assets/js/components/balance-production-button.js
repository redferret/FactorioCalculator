import React from 'react';
import {Label, Button } from 'react-bootstrap';
import AppDispatcher from '../dispatcher.js';
import * as Actions from '../actions.js';

export default class BalanceProductionButton extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect(e) {
    let id = e.target.dataset.id;
    AppDispatcher.dispatch({
      action: Actions.BALANCE_PRODUCTION,
      data: {id: id}
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
        <Button
          onClick={this.handleSelect}
          data-id={this.props.id}
          bsStyle='success'
          bsSize='xsmall'>
            Balance Production
        </Button>
      </div>
    );
  }
}
BalanceProductionButton.defaultProps = {
  balanced: true
};
