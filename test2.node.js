#!/usr/bin/env node

'use strict'

var debug = require('debug')
var log = debug('crypto-exchange-rates:test')

var exchangeRateSources = require("./lib2/exchangeRateSources")

//const pluginNames = [ 'coinbase' ]
const pluginNames = [ 'coinbase', 'bitstamp', 'bitcoinaverage' ]
//const pluginNames = [ 'coinbase', 'bitstamp', 'bitcoinaverage', 'bravenewcoin' ]
const currencyPairs = [ { source: 'BTC', dest: 'USD' }, { source: 'ETH', dest: 'USD' } ]

log("pluginNames: %o", pluginNames)
log("currencyPairs: %o", currencyPairs)

pluginNames.forEach( function(name, index, array) {

  var plugin = exchangeRateSources[name]

  var name = plugin.getName()
  log("getName() = ", name)

  log("getCurrencyPairs(%o)...", currencyPairs)
  var ret = plugin.getCurrencyPairs( currencyPairs, function(results) {
    log("RESULTS: %s: %o", name, results)
  })
})




