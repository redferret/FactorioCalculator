import ProductionLineDetails from './production-line-details.js';
import ProductionLineStore from '../stores/production-line-store.js';
import React from 'react';

import { PRODUCTION_LINE_ID } from '../constants.js';
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
    this.state = {
      productionLine: this.props
    };
  }

  _onChange() {
    this.setState({productionLine: ProductionLineStore.getProductionLine()});
  }

  componentDidMount() {
    ProductionLineStore.on(PRODUCTION_LINE_ID + this.props.id, this._onChange.bind(this));
  }

  componentWillUnmount() {
    ProductionLineStore.removeListener(PRODUCTION_LINE_ID + this.props.id, this._onChange.bind(this));
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
            {...this.state.productionLine}
          />
        </Panel.Body>
      </Panel>
    );
  }
};
