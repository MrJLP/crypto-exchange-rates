'use strict'

class BtcE extends require('./ExchangeRateLibBase')
{
  constructor() {
    super('btce', 'https://btc-e.com')

    this.allowedPairs = [
      [ 'BTC', 'USD' ],
      [ 'BTC', 'RUR' ],
      [ 'LTC', 'BTC' ],
      [ 'LTC', 'USD' ],
      [ 'LTC', 'RUR' ],
      [ 'LTC', 'EUR' ],
      [ 'NMC', 'BTC' ],
      [ 'NMC', 'USD' ],
      [ 'NVC', 'BTC' ],
      [ 'NVC', 'USD' ],
      [ 'USD', 'RUR' ],
      [ 'EUR', 'USD' ],
      [ 'EUR', 'RUR' ],
      [ 'PPC', 'BTC' ],
      [ 'PPC', 'USD' ],
      [ 'DSH', 'BTC' ],
      [ 'DSH', 'USD' ],
      [ 'ETH', 'BTC' ],
      [ 'ETH', 'USD' ],
      [ 'ETH', 'EUR' ],
      [ 'ETH', 'LTC' ],
      [ 'ETH', 'RUR' ],
    ]
  }

  makeRequest(source, dest) {
    var currencyPair = source.toLowerCase() + "_" + dest.toLowerCase()
    return { url: "api/3/ticker/" + currencyPair }
  }

  processResponse(response) {
    return response.data['last']
  }
}

module.exports = exports = BtcE

