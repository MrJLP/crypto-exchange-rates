'use strict'

let apiKey = process.env["npm_config_bravenewcoin_api_key"]

class BraveNewCoin extends require('./ExchangeRateLibBase')
{
  constructor() {
    super('bravenewcoin', 'https://bravenewcoin-v1.p.mashape.com')

    this.apiKey = apiKey

    this.allowedPairs = [
      [ 'BTC', 'USD'],
    ]
  }

  makeRequest(source, dest) {
    return {
      url:     `convert?from=${source}&to=${dest}&qty=1`,
      headers: { 'X-Mashape-Key': this.apiKey, 'Accept': 'application/json' }
    }
  }

  processResponse(response) {
    var value = response.data['to_quantity']
    return String(value)
  }
}

module.exports = exports = BraveNewCoin

