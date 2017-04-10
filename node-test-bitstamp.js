

var bitstamp = require("./exchangeRateSources").bitstamp

var name = bitstamp.getName()
console.log("bitstamp.getName() = ", name)

const currencyPairs = [
  { source: 'BTC', dest: 'EUR' },
  { source: 'ETH', dest: 'EUR' }
]

console.log("bitstamp.getCurrencyPairs(", currencyPairs, ")...")

var ret = bitstamp.getCurrencyPairs( currencyPairs, function(value) {
  console.log("  value: ", value)
})

console.log("RESPONSE:")


