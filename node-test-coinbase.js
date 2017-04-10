

var coinbase = require("./exchangeRateSources").coinbase

var name = coinbase.getName()
console.log("coinbase.getName() = ", name)

const currencyPairs = [
  { source: 'BTC', dest: 'USD' },
//  { source: 'ETH', dest: 'USD' } //TODO: can't correctly handle pairs yet
]

console.log("coinbase.getCurrencyPairs(", currencyPairs, ")...")

var ret = coinbase.getCurrencyPairs( currencyPairs, function(value) {
  //console.log("  response.data: ", response.data)
  console.log("  value", value)
})

console.log("RESPONSE:")


