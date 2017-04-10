

var bitstamp = require("./exchangeRateSources").bitstamp

var name = bitstamp.getName()
console.log("bitstamp.getName() = ", name)

const currencyPairs = [
  { source: 'BTC', dest: 'USD' },
  { source: 'BTC', dest: 'EUR' }
]

console.log("bitstamp.getCurrencyPairs(", currencyPairs, ")...")

var ret = bitstamp.getCurrencyPairs( currencyPairs, function(results) {
  console.log("RESULTS: ", results)
})

console.log("RESPONSE:")


