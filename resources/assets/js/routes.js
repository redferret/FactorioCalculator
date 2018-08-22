
export const ROOT = document.head.querySelector('meta[name="rootURL"]').content;

export function getFactories() {
  return ROOT + '/factories';
}

export function balanceProductionLine(id) {
  return ROOT + '/productionline/'+id+'/balance';
}

export function getProductProductionLines(id) {
  return ROOT + '/product/'+id+'/productionlines';
}

export function recalculateProductionLine(id) {
  return ROOT + '/productionline/'+id+'/recalculate';
}

export function GET(data) {
  return {
    method: 'GET',
    headers: Routes.HEADERS,
    body: JSON.stringify(data)
  };
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
