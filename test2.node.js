#!/usr/bin/env node

'use strict'

const currencyPairs = [ { source: 'BTC', dest: 'USD' }, { source: 'ETH', dest: 'USD' } ]

const pluginNames = [ 'coinbase', 'bitstamp', 'bitcoinaverage', 'bravenewcoin' ]

var exchangeRateSources = require("./lib2/exchangeRateSources")

var totalResults = {}
pluginNames.forEach( function(name, index, array) {

  var plugin = exchangeRateSources[name]

  var name = plugin.getName()
  console.log("\ngetName() = ", name)

  console.log("getCurrencyPairs(" + currencyPairs + ")...")
  var ret = plugin.getCurrencyPairs( currencyPairs, function(results) {
    console.log("\n", name + ": " + results)
    totalResults[name] = results
  })
})




