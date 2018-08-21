
export const ROOT                   = document.head.querySelector('meta[name="rootURL"]').content;
export const BALANCE_PRODUCTION     = ROOT + '/balance/';
export const GET_FACTORIES          = ROOT + '/factories';
export const GET_PRODUCT            = ROOT + '/product/';

export const HEADERS = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
};
