import AppDispatcher from '../../dispatcher.js';
import Input from '../input.js';
import GameItemsStore from '../../stores/game-items-store.js';
import ModalsStore from '../../stores/modals-store.js';
import NewProductionLineModalStore from '../../stores/new-production-line-modal-store.js';
import ItemTable from '../item-table.js';
import React from 'react';
import Router from '../../router.js';
import TabbedItems from '../tabbed-items.js';

import {
  Button,
  ButtonToolbar,
  Col,
  Grid,
  Label,
  Nav,
  NavItem,
  Row,
  Tab,
} from 'react-bootstrap';

import {
  NEW_PRODUCTION_LINE_MODAL_ID,
  SPINNER_MODAL_ID,
  IMAGE_ASSET,
} from '../../constants.js';

export class ModalHeader extends React.Component {
  render() {
    return (
      <div>New Production Line</div>
    )
  }
}

export class ModalBody extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleItemsPerSecondChange = this.handleItemsPerSecondChange.bind(this);
    this.handleReselectProduct = this.handleReselectProduct.bind(this);
    this.handleProductSelect = this.handleProductSelect.bind(this);
    this.state = {
      selectedProduct: null
    }
  }

  handleProductSelect(product) {
    NewProductionLineModalStore.setProduct(product);
    this.setState({
      selectedProduct: NewProductionLineModalStore.getProduct()
    });
  }

  handleNameChange(event) {
    NewProductionLineModalStore.setName(event.target.value);
  }

  handleItemsPerSecondChange(event) {
    NewProductionLineModalStore.setItemsPerSecond(event.target.value);
  }

  handleReselectProduct() {
    NewProductionLineModalStore.setProduct(null);
    this.setState({
      selectedProduct: null
    })
  }

  render() {
    let selectedProduct = this.state.selectedProduct;
    let productTypes = GameItemsStore.getProductTypes();
    return (
      <Grid>
        <Row>
          <Col md={3}>
            <Input name='name' type='text' label='Production Line Name'
              callback={(event)=>this.handleNameChange(event)}/>
            <Input name='items_per_second' type='number' label='Initial Items Per Second'
              callback={(event)=>this.handleItemsPerSecondChange(event)}/>
          </Col>
        </Row>
        <Row>
          <Col md={10}>
            {selectedProduct == null?
              <div>
                Select a product that will be produced
                <TabbedItems tabs={productTypes}
                  tabCallback={(productType) =>
                    <div>
                      <h4><Label>{productType.name}</Label></h4>
                      <img src={Router.route(IMAGE_ASSET, {fileName:productType.image_file})}/>
                    </div>
                  }
                  tabContentCallback={(productType) =>
                    <ItemTable items={productType.sorted_products} rowLength={3}
                      onClickCallback={this.handleProductSelect}
                      itemCallback={(product) =>
                        <div>
                          <img src={Router.route(IMAGE_ASSET, {fileName: product.image_file})} />{' '}
                          {product.name}
                        </div>
                      }/>
                  }/>
              </div>
               :
              <div>
                Selected Product to be Produced:
                <img src={Router.route(IMAGE_ASSET, {fileName: selectedProduct.image_file})} />
                {selectedProduct.name}
                <ButtonToolbar>
                  <Button onClick={this.handleReselectProduct}>Change Selected Product</Button>
                </ButtonToolbar>
              </div>
            }

          </Col>
        </Row>
      </Grid>
    )
  }
}

export class ModalFooter extends React.Component {
  constructor(props, context) {
    super(props, context);

  }

  render() {
    return (
      <ButtonToolbar>
        <Button bsStyle='success'>Add Production Line</Button>
        <Button onClick={() => ModalsStore.hideModal()}>Cancel</Button>
      </ButtonToolbar>
    )
  }
}
