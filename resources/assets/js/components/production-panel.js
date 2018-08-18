import React from 'react';
import { Panel, Label, Well, Table, Button, Alert, ButtonToolbar } from 'react-bootstrap';
import ProductDetails from './product-details.js';

export default class ProductionPanel extends React.Component {

  constructor(props) {
    super(props);
    this.handleEditProduction = this.handleEditProduction.bind(this);
  }

  handleEditProduction(e) {
    alert("Edit Production");
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
          <ProductDetails {...this.props} />
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
