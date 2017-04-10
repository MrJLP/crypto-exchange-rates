

var bitstamp = require("./exchangeRateSources").bitstamp

var name = bitstamp.getName()
console.log("bitstamp.getName() = ", name)

const currencyPairs = [
  { source: 'BTC', dest: 'EUR' },
  { source: 'ETH', dest: 'EUR' }
]

console.log("bitstamp.getCurrencyPairs(", currencyPairs, ")...")

var ret = bitstamp.getCurrencyPairs( currencyPairs, function(response) {

  //console.log("  response.data:", response.data)

  //TODO: processing of reponse should be done in exchangeRateSource
  const { bid, ask, last, low, high, volume, timestamp } = response.data; // ignore unused fields
  console.log("  last: ", last)
})

console.log("RESPONSE:")


