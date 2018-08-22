var Dispatcher = require('flux').Dispatcher;
var AppDispatcher = new Dispatcher();

import * as Routes from './routes.js';
import * as Actions from './actions.js';
import ProductionLineStore from './stores/production-line-store.js';
import ProductStore from './stores/product-store.js';
import FactoryStore from './stores/factory-store.js';
import ProductModalStore from './stores/product-modal-store.js';

AppDispatcher.register((payload) => {

  let action = payload.action;
  let data = payload.data;

  switch(action) {
    case Actions.BALANCE_PRODUCTION:
      fetch(Routes.BALANCE_PRODUCTION(data.id)).then(response => {
        return response.json();
      }).then(productionLine => {
        ProductionLineStore.setProductionLine(productionLine);
        ProductionLineStore.emitChange(data.componentId);
      });
      break;

    case Actions.GET_PRODUCT:
      fetch(Routes.GET_PRODUCT(data.id)).then(response => {
        return response.json();
      }).then(product => {
        ProductStore.setProduct(product);
        ProductStore.emitChange(data.componentId);
      })
      break;

    case Actions.GET_FACTORIES:
      fetch(Routes.GET_FACTORIES).then(response => {
        return response.json();
      }).then(factories => {
        FactoryStore.setFactories(factories);
        FactoryStore.emitChange(data.componentId);
      });
      break;

    case Actions.GET_PRODUCT_PRODUCTION_LINES:
      fetch(Routes.GET_PRODUCT_PRODUCTION_LINES(data.id)).then(response => {
        return response.json();
      }).then(productionLines => {
        ProductModalStore.setProductProductionLines(productionLines);
        ProductModalStore.emitChange(data.componentId);
      });
      break;

    case Actions.RE_CALCULATE_PRODUCTION:
      fetch(Routes.RE_CALCULATE_PRODUCTION(data.id),
        Routes.POST({
          itemsPerSecond: data.itemsPerSecond
        })
      ).then(response => {
        return response.json();
      }).then(updatedFactories => {
        FactoryStore.setFactories(updatedFactories);
        FactoryStore.emitChange(data.componentId);
      });
      break;
  }
  return true;
});

export default AppDispatcher;
