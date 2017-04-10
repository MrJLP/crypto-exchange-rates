

var coinbase = require("./exchangeRateSources").coinbase

var name = coinbase.getName()
console.log("coinbase.getName() = ", name)

const currencyPairs = [
  { source: 'BTC', dest: 'USD' },
  { source: 'ETH', dest: 'USD' }
]

console.log("coinbase.getCurrencyPairs(", currencyPairs, ")...")

var ret = coinbase.getCurrencyPairs( currencyPairs, function(results) {
  console.log("RESULTS:\n", results)
})

console.log("RESPONSE:")


