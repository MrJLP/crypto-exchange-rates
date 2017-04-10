
var bitcoinaverage = require("./exchangeRateSources").bitcoinaverage 

var name = bitcoinaverage.getName()
console.log("name:", name)

const currencyPairs = [
  { source: 'BTC', dest: 'USD' }
]

console.log("bitcoinaverage.getCurrencyPairs(", currencyPairs, ")...")

var ret = bitcoinaverage.getCurrencyPairs( currencyPairs, function(response) {

  //console.log("  response.data:", response.data)

  //TODO: processing of reponse should be done in exchangeRateSource
  const { success, price, time } = response.data;
  console.log("  price: ", price)
})

console.log("RESPONSE:")


