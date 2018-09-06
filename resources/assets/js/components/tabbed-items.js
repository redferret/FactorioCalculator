
import React from 'react';
import ReactDOM from 'react-dom';

import {
  Col,
  Nav,
  NavItem,
  Row,
  Tab,
} from 'react-bootstrap';

class TabbedItems extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.handleTabSelect = this.handleTabSelect.bind(this);
    this.state = {
      activeKey: 0
    };
  }

  handleTabSelect(activeKey) {
    this.setState({activeKey});
  }

  render() {
    let tabs = this.props.tabs;
    return (
      <Tab.Container
        id='producer-list'
        defaultActiveKey={1}
        activeKey={this.state.activeKey}
        onSelect={this.handleTabSelect}
        >
        <Row>
          <Col sm={this.props.sm}>
            <Nav bsStyle='tabs'>
              {tabs.map((tab, index) =>
                <NavItem key={index} eventKey={index}>
                  {this.props.tabCallback(tab)}
                </NavItem>
              )}
            </Nav>
            <Tab.Content animation>
              {tabs.map((tab, index) =>
                <Tab.Pane key={index} eventKey={index}>
                  {this.props.tabContentCallback(tab)}
                </Tab.Pane>
              )}
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    )
  }
}

TabbedItems.defaultProps = {
  tabs: [],
  tabCallback: () => 'You need to Register a Tab Callback',
  tabContentCallback: () => 'Tab Content',
  sm: 12,
}

export default TabbedItems;
