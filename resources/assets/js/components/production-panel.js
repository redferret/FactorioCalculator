import React, { Component } from 'react';
import { Panel, Label, Well, Table, Button, Alert, ButtonToolbar } from 'react-bootstrap';

export default class ProductionPanel extends React.Component {

  constructor(props) {
    super(props);
  }

  renderProductDetails() {
    if (this.props.produces !== null) {
      return (
        <div>
          <h4><Label bsStyle='success'>Production Details</Label></h4>
          <Table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Number of Items Per Second</th>
                <th>Total Seconds Per Item</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{this.props.produces.name}</td>
                <td>{this.props.produces.items_per_second}</td>
                <td>{this.props.produces.seconds_per_item}</td>
              </tr>
            </tbody>
          </Table>
          <ButtonToolbar>
            <Button bsStyle='primary' bsSize="small">Select Product</Button>{' '}
            <Button bsSize="small">Remove Product from Production Line</Button>
          </ButtonToolbar>
        </div>
      );
    }

    return (
      <div>
        <br/>
        <Alert bsStyle='danger'>Produces Nothing, Select a Product for this Production Line</Alert>
        <ButtonToolbar>
          <Button bsStyle='primary'>Add Product</Button>
        </ButtonToolbar>
      </div>
    );
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
          <Button bsSize="xsmall">Edit Production Line</Button>
          {this.renderProductDetails()}
        </Panel.Body>
      </Panel>
    );
  }
};
ProductionPanel.defaultProps = {
   eventKey: "0",
   name:"",
   productDetails: []
};
