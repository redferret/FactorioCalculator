import React, { Component } from 'react';
import { Panel } from 'react-bootstrap';

class ProductionPanel extends React.Component {
    
  constructor(props) {
    super(props);
  }
    
  render() {
    return (
      <Panel eventKey={this.props.eventKey}>
        <Panel.Heading>
          <Panel.Title toggle>
            <h4>
              {this.props.heading}
            </h4>
          </Panel.Title>
        </Panel.Heading>
        <Panel.Body collapsible>
          {this.props.body}
        </Panel.Body>
      </Panel>
    );
  }
};
ProductionPanel.defaultProps = {
   eventKey: "0",
   heading:"",
   body:""
};

export default ProductionPanel;