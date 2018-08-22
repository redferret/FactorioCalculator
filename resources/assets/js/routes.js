
export const ROOT                   = document.head.querySelector('meta[name="rootURL"]').content;
export const GET_FACTORIES          = ROOT + '/factories';

export function BALANCE_PRODUCTION(id) {
  return ROOT + '/balance/' + id;
}

export function GET_PRODUCT(id) {
  return ROOT + '/product/' + id;
}
export function GET_PRODUCT_PRODUCTION_LINES(id) {
  return ROOT + '/product/'+id+'/productionLines';
}

export const HEADERS = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
};
