import Input from '../input.js';
import ProducerTable from './producer-table.js';
import React from 'react';
import Router from '../../router.js';
import { IMAGE_ASSET } from '../../constants.js';

export default class ProducerPumps extends React.Component {
  render() {
    let product = this.props.product;
    let productName = product? product.name : '';
    let productImage = product? product.image_file : 'Questionmark.png';
    return <ProducerTable
      headTr={
        <tr>
          <th>Name</th>
          <th>Number of Pumps</th>
          <th>Units Needed / Second</th>
          <th>{this.props.producer.name} Speed</th>
          <th>Average Yield (%)</th>
        </tr>
      }
      bodyTr={
        <tr>
          <td>
            <img width={32} height={32}  src={Router.route(IMAGE_ASSET, {fileName: productImage})} />{' '}
            {productName}
          </td>
          <td><Input initialValue={this.props.assembly_count} isStatic={true}/></td>
          <td>{this.props.itemsPerSecond}</td>
          <td>
            <Input type='number' name='speed'
            callback={(event) => this.props.dispatchProducerChanged(event)}
            initialValue={this.props.producer.speed}/>
          </td>
          <td>
            <Input type='number' name='yield'
              callback={(event) => this.props.dispatchProducerChanged(event)}
              initialValue={this.props.producer.yield}/>
          </td>
        </tr>
      }
    />;
  }
}
