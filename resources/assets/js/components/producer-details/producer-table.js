import React from 'react';
import { Table } from 'react-bootstrap';
export default class ProducerTable extends React.Component {
  render() {
    return (
      <Table>
        <thead>
          {this.props.headTr}
        </thead>
        <tbody>
          {this.props.bodyTr}
        </tbody>
      </Table>
    );
  }
}
