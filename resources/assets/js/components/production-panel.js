import React from 'react';
import { Panel, Label, Well, Table, Button, Alert, ButtonToolbar } from 'react-bootstrap';
import ProductDetails from './product-details.js';
import ProductionLineStore from '../stores/production-line-store.js';

export default class ProductionPanel extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.handleEditProduction = this.handleEditProduction.bind(this);
    this.state = {
      productionLine: this.props
    };
  }

  handleEditProduction(e) {
    alert("Edit Production "+this.props.id);
  }

  _onChange() {
    this.setState({productionLine: ProductionLineStore.getProductionLine()});
    console.log('onChange for productionLine');
  }

  componentDidMount() {
    ProductionLineStore.addChangeListener(this._onChange.bind(this), this.props.id);
  }

  componentWillUnmount() {
    ProductionLineStore.removeChangeListener(this._onChange.bind(this), this.props.id);
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
          <Button onClick={this.handleEditProduction} bsSize='xsmall'>Edit Production Line</Button>
          <ProductDetails
            {...this.state.productionLine}
          />
        </Panel.Body>
      </Panel>
    );
  }
};
