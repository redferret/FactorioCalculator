import AppDispatcher from '../dispatcher.js';
import React from 'react';

import {
  Button,
  Label,
} from 'react-bootstrap';

import {
  BALANCE_PRODUCTION,
  PRODUCTION_LINE_ID,
} from '../constants.js';

export default class BalanceProductionButton extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect(e) {
    let id = this.props.id;
    AppDispatcher.dispatch({
      action: BALANCE_PRODUCTION,
      data: {
        id: id,
        componentId: PRODUCTION_LINE_ID + id
      }
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
