import React from 'react';
import { Panel, Label, Well, Table, Button, Alert, ButtonToolbar } from 'react-bootstrap';
import ProductDetails from './product-details.js';
import ProductionLineStore from '../stores/production-line-store.js';

export default class ProductionPanel extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.handleEditProduction = this.handleEditProduction.bind(this);
  }

  handleEditProduction(e) {
    alert("Edit Production "+this.props.id);
  }

  _onChange() {
    // Store signals change after completing HTTP request, get the new
    // data from the promise
  }

  componentDidMount() {
    ProductionLineStore.addChangeListener(this._onChange.bind(this));
  }

  componentWillUnmount() {
    ListStore.removeChangeListener(this._onChange.bind(this));
  }

  render() {
    return (
      <Panel eventKey={this.props.eventKey}>
        <Panel.Heading>
          <Panel.Title toggle>
            <h4>
              {this.props.name}
            </h4>
          </Panel.Title>
        </Panel.Heading>
        <Panel.Body collapsible>
          <Button onClick={this.handleEditProduction} bsSize='xsmall'>Edit Production Line</Button>
          <ProductDetails
            {...this.props}
          />
        </Panel.Body>
      </Panel>
    );
  }
};
ProductionPanel.defaultProps = {
   eventKey: '0',
   name:'',
   productDetails: []
};
