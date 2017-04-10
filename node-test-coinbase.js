

var coinbase = require("./exchangeRateSources").coinbase

var name = coinbase.getName()
console.log("coinbase.getName() = ", name)

const currencyPairs = [
  { source: 'BTC', dest: 'USD' },
//  { source: 'ETH', dest: 'USD' } //TODO: can't correctly handle pairs yet
]

console.log("coinbase.getCurrencyPairs(", currencyPairs, ")...")

var ret = coinbase.getCurrencyPairs( currencyPairs, function(response) {
  //console.log("  response.data: ", response.data)
  console.log("  response.data.data:", response.data.data)
  const { amount, currency } = response.data.data;
//  var result = { source: source, dest: dest, value: amount }
  console.log("  amount", amount)
  console.log("  currency", currency)
})

console.log("RESPONSE:")


