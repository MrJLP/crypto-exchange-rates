
var bitcoinaverage = require("./exchangeRateSources").bitcoinaverage 

var name = bitcoinaverage.getName()
console.log("bitcoinaverage.getName() = ", name)

const currencyPairs = [
  { source: 'BTC', dest: 'USD' }
]

console.log("bitcoinaverage.getCurrencyPairs(", currencyPairs, ")...")

var ret = bitcoinaverage.getCurrencyPairs( currencyPairs, function(value) {

  console.log("  value: ", value)
})

console.log("RESPONSE:")


