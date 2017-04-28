'use strict'

class Bitstamp extends require('./ExchangeRateLibBase')
{
  constructor() {
    super('bitstamp', 'https://www.bitstamp.net', 2000)

    this.allowedPairs = [
      [ 'BTC', 'USD' ],
      [ 'BTC', 'EUR' ],
      [ 'EUR', 'USD' ],
      [ 'XRP', 'USD' ],
      [ 'XRP', 'EUR' ],
      [ 'XRP', 'BTC' ],
    ]
  }

  makeRequest(source, dest) {
    var currencyPair = source.toLowerCase() + dest.toLowerCase()
    return { url: "api/v2/ticker/" + currencyPair }
  }

  processResponse(response) {
    return response.data['last']
  }
}

module.exports = exports = Bitstamp

