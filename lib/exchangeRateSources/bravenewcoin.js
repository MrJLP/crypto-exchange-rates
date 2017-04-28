'use strict'

class BraveNewCoin extends require('./ExchangeRateLibBase')
{
  constructor() {
    super('bravenewcoin', 'https://bravenewcoin-v1.p.mashape.com', 2000)

    this.MASHAPE_API_KEY = ''

    this.allowedPairs = [
      [ 'BTC', 'USD'],
    ]
  }

  makeRequest(source, dest) {
    return {
      url:     `convert?from=${source}&to=${dest}&qty=1`,
      headers: { 'X-Mashape-Key': this.MASHAPE_API_KEY, 'Accept': 'application/json' }
    }
  }

  processResponse(response) {
    var value = response.data['to_quantity']
    return String(value)
  }
}

module.exports = exports = BraveNewCoin

