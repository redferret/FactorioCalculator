
import React from 'react';
import ReactDOM from 'react-dom';
import Router from '../router.js';

import {
  Alert,
  Button,
  Col,
  Grid,
  Row,
} from 'react-bootstrap';

import {
  IMAGE_ASSET,
} from '../constants.js';

class ItemTable extends React.Component {

  render() {
    let items = this.props.items;
    var length = items.length
    if (length > 0) {
      var rowLength = this.props.rowLength;
      var rowCount = Math.ceil(length / rowLength);
      var reversedRows = [];
      var rows = [];
      for (var c = 0; c < rowCount; c++) {
        reversedRows.unshift(items.slice(c*rowLength, Math.min(length, (c*rowLength) + rowLength)));
      }
      for (var i = 0; i < rowCount; i++) {
        rows.unshift(reversedRows.shift());
      }

      return (
        <Grid>
          {rows.map((row, index) =>
            <Row key={index}>
              {row.map((item, index) =>
                item != null?
                  <Col key={index} sm={this.props.sm}>
                    {this.props.noButton?
                      this.props.itemCallback(item)
                    :
                    <Button id={'item_' + item.id} bsStyle='link' onClick={() => this.props.onClickCallback(item)}>
                      {this.props.itemCallback(item)}
                    </Button>}
                    {this.props.itemContent(item)}
                  </Col>
                  :
                  <Alert key={index} bsStyle='warning'>Item is Null</Alert>
              )}
            </Row>
          )}
        </Grid>
      );
    }
    return (
      <Alert bsStyle='warning'>{this.props.emptyItemsMessage}</Alert>
    );
  }
}

ItemTable.defaultProps = {
  itemCallback: () => console.error('An Item Callback must be registered with an ItemTable'),
  itemContent: () => '',
  emptyItemsMessage: 'No Items',
  onClickCallback: (item) => {},
  rowLength: 6,
  sm:2,
}

export default ItemTable;
