'use strict'

class BitcoinAverage extends require('./ExchangeRateLibBase')
{
  constructor() {
    super('bitcoinaverage', 'https://apiv2.bitcoinaverage.com')

    this.allowedPairs = [
      [ 'BTC', 'USD'],
    ]
  }

  makeRequest(source, dest) {
    return {
      url: `convert/global?from=${source}&to=${dest}&amount=1`
    }
  }

  processResponse(response) {
    var price = response.data['price']
    return String(price)
  }
}

module.exports = exports = BitcoinAverage

