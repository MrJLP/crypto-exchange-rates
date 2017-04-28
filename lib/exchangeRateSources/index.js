'use strict'

const PLUGINS_IN_USE = [
  "coinbase",
  "bitstamp",
  "bitcoinaverage",
  "bravenewcoin",
]

PLUGINS_IN_USE.forEach( function(element) {
  // exchange names used for both both property and filename to be required
  exports[element] = require("./" + element)
})

