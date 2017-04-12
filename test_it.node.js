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

exchanges.forEach( function(exchange, index) {
  plugin = require("./exchangeRateSources")[exchange]
  console.log("\n\n\n", exchange, ": ", plugin)

  var name = plugin.getName()
  console.log("\ngetName() = ", name)

  console.log("getCurrencyPairs(", currencyPairs, ")...")
  var ret = plugin.getCurrencyPairs( currencyPairs, function(results) {
    console.log("RESULTS: ", results)
  })

})

