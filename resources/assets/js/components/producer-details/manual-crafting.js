import Input from '../input.js';
import ProducerTable from './producer-table.js';
import React from 'react';
import Router from '../../router.js';
import { IMAGE_ASSET } from '../../constants.js';

export default class ManualCrafting extends React.Component {
  render() {
    let product = this.props.product;
    let productName = product? product.name : '';
    let productImage = product? product.image_file : 'Questionmark.png';
    return <ProducerTable
      headTr={
        <tr>
          <th>Name</th>
          <th>Products Needed / Hour</th>
        </tr>
      }
      bodyTr={
        <tr>
          <td>
            <img width={32} height={32}  src={Router.plainRoute(IMAGE_ASSET, {fileName: productImage})} />{' '}
            {productName}
          </td>
          <td>
            <Input type='number' isStatic={true}
              initialValue={this.props.items_per_second * 3600} />
          </td>
        </tr>
      }
     />;
  }
}
