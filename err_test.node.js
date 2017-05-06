#!/usr/bin/env node

'use strict'

var logDebug = require('debug')('crypto-exchange-rates:test')

var exchangeRateSources = require("./lib/exchangeRateSources")

const currencyPairs = [ { source: 'BTC', dest: 'USD' }, { source: 'ETH', dest: 'USD' }, { source: 'ETH', dest: 'USD' } ]

var plugin = new exchangeRateSources.coinbase
plugin.makeRequest = function(source, dest) {
  return { url: "asfdasdfasfd" }
}

var name = plugin.getName()
console.log("getName() = ", name)

var ret = plugin.getCurrencyPairs( currencyPairs, function(results) {
  console.log("RESULTS: ", results)
//  logDebug("RESULTS: %s: %o", name, results)
})




