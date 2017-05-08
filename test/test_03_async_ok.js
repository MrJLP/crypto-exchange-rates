
var expect = require('chai').expect
var exchangeRateSources = require('../index.js')

var debug = require('debug')
var log = debug('crypto-exchange-rates:test')

let pluginExchangeNames = [
  'coinbase',
  'bitstamp',
  'bitcoinaverage'
]

// get API key from config, which can be in env var, npm command line or npm config
let bravenewcoinApiKey = process.env["npm_config_bravenewcoin_api_key"]
if ( ! bravenewcoinApiKey ) {
  console.log("Skipping bravewnew coin as no API key was found (npm_config_bravenewcoin_api_key)")
}
else {
  console.log("Adding bravenewcoin since there is an API key defined for it")
  pluginExchangeNames.push('bravenewcoin')
}


// all the allowed pairs for each exchange
const maxPairs = {
  coinbase: [
    { source: 'BTC', dest: 'USD' },
    { source: 'BTC', dest: 'EUR' },
    { source: 'ETH', dest: 'USD' },
    { source: 'ETH', dest: 'EUR' },
  ],
  bitstamp: [
    { source: 'BTC', dest: 'USD' },
    { source: 'BTC', dest: 'EUR' },
    { source: 'EUR', dest: 'USD' },
    { source: 'XRP', dest: 'USD' },
    { source: 'XRP', dest: 'EUR' },
    { source: 'XRP', dest: 'BTC' },
  ],
  bitcoinaverage: [
    { source: 'BTC', dest: 'USD' },
  ],
  bravenewcoin: [
    { source: 'BTC', dest: 'USD' },
    { source: 'BTC', dest: 'EUR' },
    { source: 'ETH', dest: 'USD' },
    { source: 'ETH', dest: 'EUR' },
  ],
}

let validateReturnValues = function(results, hasError = false) {
  log("got results: %o", results)
  expect(results).an('array')
  for ( let i = 0 ; i < results.length ; i++ ) {
    if ( ! results[i].error ) {
      expect(results[i]).keys('source', 'dest', 'value')
      expect(results[i].source).a('string')
      expect(results[i].dest).a('string')
      expect(results[i].value).a('string')
    }
    else {
      expect(results[i]).keys('source', 'dest', 'value', 'error')
      expect(results[i].source).a('string')
      expect(results[i].dest).a('string')
      expect(results[i].value).a('undefined')
      expect(results[i].error).a('string')
      if ( ! hasError ) {
        throw Error(results[i].error)
      }
    }
  }
}


describe('Async OK', function() {

  // one currency pair
  describe("1 pair - BTC-USD", function() {

    pluginExchangeNames.forEach(function(exchangeName, index, array) {

      var plugin = new exchangeRateSources[exchangeName]
      const pairs = [ { source: 'BTC', dest: 'USD' } ]

      it(exchangeName + ".getCurrencyPairs() BTC-USD", function() {
        return new Promise( function(resolve, reject) {
          log("%s: getCurrencyPairs(%o)...", exchangeName, pairs)
          plugin.getCurrencyPairs(pairs, function(results) {
            resolve(results)
          })
        })
        .then( function(results) {
          validateReturnValues(results)
          expect(results.length).equals(1)
        })
/*
        .catch( function(error) {
          expect(true, error)
          expect(false, error)
        })
*/
      })

    })
  })

  // all allowed currency pairs for the exchange
  describe("all allowed pairs", function() {

    pluginExchangeNames.forEach(function(exchangeName, index, array) {

      var plugin = new exchangeRateSources[exchangeName]
      const pairs = maxPairs[exchangeName]

      it(exchangeName + ".getCurrencyPairs() all allowed pairs", function() {
        return new Promise( function(resolve, reject) {
          log("%s: getCurrencyPairs(%o)...", exchangeName, pairs)
          plugin.getCurrencyPairs(pairs, function(results) {
            resolve(results)
          })
        })
        .then( function(results) {
          validateReturnValues(results)
        })
/*
        .catch( function(error) {
          expect(false, error)
        })
*/
      })

    })
  })

  // all allowed currency pairs plus one bogus one
  describe("all allowed pairs + bogus one", function() {

    pluginExchangeNames.forEach(function(exchangeName, index, array) {

      var plugin = new exchangeRateSources[exchangeName]

      var pairs = maxPairs[exchangeName]
      pairs.push({ source: 'XXX', dest: 'YYY' }) // add a bogus pair

      it(exchangeName + ".getCurrencyPairs() all allowed pairs + bogus", function() {
        return new Promise( function(resolve, reject) {
          log("%s: getCurrencyPairs(%o)...", exchangeName, pairs)
          plugin.getCurrencyPairs(pairs, function(results) {
            resolve(results)
          })
        })
        .then( function(results) {
          validateReturnValues(results)

          expect(results.length).equals(pairs.length)
          expect(results[ (pairs.length - 1) ].source).equals('BTC')
          expect(results[ (pairs.length - 1) ].dest).equals('USD')
        })
//        .catch( function(error) {
//          expect(false, error)
//        })
      })
    })

  })
})


