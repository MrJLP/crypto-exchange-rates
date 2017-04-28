'use strict'

class Coinbase extends require('./ExchangeRateLibBase')
{
  constructor() {
    super('coinbase', 'https://api.coinbase.com', 2000)

    this.VERSION_DATE = '2017-04-19'

    this.allowedPairs = [
      [ 'BTC', 'USD'],
      [ 'BTC', 'EUR'],
      [ 'ETH', 'USD'],
      [ 'ETH', 'EUR'],
    ]
  }

  makeRequest(source, dest) {
    return {
      url:     `/v2/prices/${source}-${dest}/spot`,
      headers: {
        'CB-VERSION' : this.VERSION_DATE
      }
    }
  }

  processResponse(response) {
    return response.data.data['amount']
  }
}

module.exports = exports = Coinbase

