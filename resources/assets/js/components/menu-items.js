import React from 'react';
import ReactDOM from 'react-dom';
import {
  Dropdown,
  FormControl,

} from 'react-bootstrap';

class MenuItems extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      value: ''
    };
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
  }

  focusNext() {
    const input = ReactDOM.findDOMNode(this.input);
    if (input) {
      input.focus();
    }
  } 

  render() {
    const { children } = this.props;
    const { value } = this.state;

    return (
      <Dropdown.Menu>
        <FormControl
          ref={c => {
            this.input = c;
          }}
          type="text"
          placeholder="Type to filter..."
          onChange={this.handleChange}
          value={value}
        />
          {React.Children.toArray(children).filter(
            child => !value.trim() || child.props.children.indexOf(value) !== -1
          )}
      </Dropdown.Menu>
    );
  }
}

MenuItems.defaultProps = {
  bsRole: 'menu'
}

export default MenuItems;
