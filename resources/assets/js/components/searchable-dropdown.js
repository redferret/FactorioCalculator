import MenuItems from './menu-items.js';
import React from 'react';

import {
  Dropdown,
  MenuItem,
} from 'react-bootstrap';

class SearchableDropdown extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.handleMenuItemSelect = this.handleMenuItemSelect.bind(this);
    this.handleMenuToggle = this.handleMenuToggle.bind(this);
    this.state = {
      menuOpen: false
    }
  }

  handleMenuToggle() {
    this.setState({
      menuOpen:!this.state.menuOpen
    });
  }

  handleMenuItemSelect(item) {
    this.setState({
      menuOpen: false
    });
    this.props.itemSelectCallback(item);
  }

  render() {
    return (
      <Dropdown open={this.state.menuOpen} onToggle={this.handleMenuToggle} id={this.props.id}>
        <Dropdown.Toggle>{this.props.toggleText}</Dropdown.Toggle>
        <MenuItems>
          {this.props.items.map((item, index) =>
            <MenuItem key={index} eventKey={index}
              onClick={(event)=>this.handleMenuItemSelect(item)}>
              {this.props.itemCallback(item)}
            </MenuItem>
          )}
        </MenuItems>
      </Dropdown>
    )
  }
}

SearchableDropdown.defaultProps = {
  toggleText: 'Dropdown',
  itemCallback: (item) => 'No Content',
  itemSelectCallback: (item) => {},
  items: []
}

export default SearchableDropdown;
