'use strict'

class Bitfinex extends require('./ExchangeRateLibBase')
{
  constructor() {
    super('bitfinex', 'https://api.bitfinex.com')

    this.allowedPairs = [
      [ 'BTC', 'USD' ],
      [ 'LTC', 'USD' ],
      [ 'LTC', 'BTC' ],
      [ 'ETH', 'USD' ],
      [ 'ETH', 'BTC' ],
      [ 'ETC', 'USD' ],
      [ 'ETC', 'BTC' ],
      [ 'BFX', 'USD' ],
      [ 'BFX', 'BTC' ],
      [ 'RRT', 'USD' ],
      [ 'RRT', 'USD' ],
      [ 'RRT', 'BTC' ],
      [ 'ZEC', 'USD' ],
      [ 'ZEC', 'BTC' ],
    ]
  }

  makeRequest(source, dest) {
    var currencyPair = source.toLowerCase() + dest.toLowerCase()
    return { url: "v1/pubticker/" + currencyPair }
  }

  processResponse(response) {
    return response.data['last_price']
  }
}

module.exports = exports = Bitfinex

