import ProductionLineDetails from './production-line-details.js';
import React from 'react';

import {
  Alert,
  Label,
  Panel,
  Table,
  Well,
} from 'react-bootstrap';

export default class ProductionLinePanel extends React.Component {

  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <Panel bsStyle='info' eventKey={this.props.eventKey}>
        <Panel.Heading>
          <Panel.Title toggle>
            {this.props.name}
          </Panel.Title>
        </Panel.Heading>
        <Panel.Body collapsible>
          <ProductionLineDetails
            {...this.props}
          />
        </Panel.Body>
      </Panel>
    );
  }
};
