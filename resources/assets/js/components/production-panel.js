import React, { Component } from 'react';
import { Panel, Label, Well, Table, Button, Alert, ButtonToolbar } from 'react-bootstrap';

export default class ProductionPanel extends React.Component {

  constructor(props) {
    super(props);
  }

  renderProductDetails() {
    if (this.props.produces !== null) {

      var headerTitle = 'Number of Assemblers';
      if (this.props.produces.producer.is_miner) {
        headerTitle = 'Number of Miners';
      }

      var balanced = this.props.produces.assembly_count === this.props.produces.desired_assembly_count;
      var label = <Label bsStyle='success'>Production Details - Balanced</Label>;
      var balanceButton = <div></div>;
      
      if (!balanced) {
        label = <Label bsStyle='warning'>Production Details - Not Balanced</Label>;
        balanceButton = <Button bsStyle='success' bsSize='xsmall'>Balance Production</Button>
      }

      return (
        <div>
          <h4>{label}</h4>
          {balanceButton}
          <Table>
            <thead>
              <tr>
                <th>Name</th>
                <th>{headerTitle}</th>
                <th>Number of Items Per Second</th>
                <th>Total Seconds Per Item</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{this.props.produces.name}</td>
                <td>{this.props.produces.assembly_count}</td>
                <td>{this.props.produces.items_per_second}</td>
                <td>{this.props.produces.seconds_per_item}</td>
              </tr>
            </tbody>
          </Table>
          <ButtonToolbar>
            <Button bsStyle='primary' bsSize='small'>Select Product</Button>{' '}
            <Button bsSize='small'>Remove Product from Production Line</Button>
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
          <Button bsSize='xsmall'>Edit Production Line</Button>
          {this.renderProductDetails()}
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
