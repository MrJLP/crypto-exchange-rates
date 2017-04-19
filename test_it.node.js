#!/usr/bin/env node

const exchanges = [
  'coinbase',
  'bitstamp',
  'bitcoinaverage',
  'bravenewcoin',
]

const currencyPairs = [
  { source: 'BTC', dest: 'USD' },
  { source: 'ETH', dest: 'USD' }
]

console.log("\n\ncurrencyPairs: \n", currencyPairs)

exchanges.forEach( function(exchange, index) {
  plugin = require("./exchangeRateSources")[exchange]

  var name = plugin.getName()
  console.log("\ngetName() = ", name)

  console.log("getCurrencyPairs(", currencyPairs, ")...")
  var ret = plugin.getCurrencyPairs( currencyPairs, function(results) {
    console.log("\n" + exchange + ": ", results)
  })

})

console.log("\nRESULTS:\n")

