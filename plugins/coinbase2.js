
var ExchangeRateLibBase = require('./exchange-rate-lib-base.js') // XXX: need new?


//const PLUGIN_NAME = 'coinbase'

let VERSION_DATE = '2017-04-19'

  let allowedPairs = [
    ['BTC', 'USD'],
    ['BTC', 'EUR'],
    ['ETH', 'USD'],
    ['ETH', 'EUR'],
  ]

class coinbase extends ExchangeRateLibBase
{
  // needs CB-VERSION header to avoid API warning


  /////

  constructor (id, x, y, width, height) {
    super('coinbase', 'https://api.coinbase.com', 2000)

  }

  makeRequest(source, dest) {
    return {
      url:     `/v2/prices/${source}-${dest}/spot`,
      headers: {
        'CB-VERSION' : VERSION_DATE
       }
    }
  }

  processResponse(response) {
    return response.data.data['amount'] || "";
  }

}


