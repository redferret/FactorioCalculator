
export const ROOT          = document.head.querySelector('meta[name="rootURL"]').content;
export const GET_FACTORIES = ROOT + '/factories';

export function BALANCE_PRODUCTION(id) {
  return ROOT + '/productionline/'+id+'/balance';
}

export function GET_PRODUCT(id) {
  return ROOT + '/product/' + id;
}
export function GET_PRODUCT_PRODUCTION_LINES(id) {
  return ROOT + '/product/'+id+'/productionlines';
}

export function RE_CALCULATE_PRODUCTION(id) {
  return ROOT + '/productionline/'+id+'/recalculate';
}

export function POST(data) {
  return {
    method: 'POST',
    headers: Routes.HEADERS,
    body: JSON.stringify(data)
  };
};

export const HEADERS = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
};
