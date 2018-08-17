import React, { Component } from 'react';
import { Panel, Label, Well, Table, Button, Alert } from 'react-bootstrap';


export default class ProductionPanel extends React.Component {
    
  constructor(props) {
    super(props);
  }
    
  renderProductDetails() {
    if (this.props.productDetails !== null) {
      return (
        <div>
          <h4><Label bsStyle='success'>Production Details</Label></h4>
          <Table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Crafting Time</th>
                <th>Number of Items Per Second</th>
                <th>Total Seconds Per Item</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{this.props.productDetails.name}</td>
                <td>{this.props.productDetails.crafting_time}</td>
                <td>#</td>
                <td>#</td>
              </tr>
            </tbody>
          </Table>
          <Button bsStyle='primary'>Select Product</Button>{' '}
          <Button bsStyle='warning'>Remove Product from Production Line</Button>
          {this.renderUserOptions()}
        </div>
      );
    }
    
    return (
      <div>
        <Alert bsStyle='danger'>Produces Nothing, Select a Product for this Production Line</Alert>
        <Button bsStyle='primary'>Add Product</Button>
        {this.renderUserOptions()}
      </div>
    );
  }
    
  renderUserOptions() {
    return (
      <div>
        <br/>
        <Button bsStyle='primary'>Select Production Line</Button>{' '}
        <Button bsStyle='warning'>Remove Production Line from Factory</Button>
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
