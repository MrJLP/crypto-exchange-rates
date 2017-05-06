
var expect = require('chai').expect
var exchangeRateSources = require('../index.js')

var debug = require('debug')
var log = debug('crypto-exchange-rates:test')

// get the original exchangeRateLib for two exchanges
// and keep their original makeRequest()
function getPlugin(exchange) {
  var plugin = new exchangeRateSources[exchange]
  plugin.origMakeRequest = plugin.makeRequest
  return plugin
}

describe('Handling bad requests', function() {

  // one currency pair
  describe("bad query parameters", function() {

    const pairs = [ { source: 'BTC', dest: 'USD' } ]

    it("bad URL", function(done) {
      var plugin = getPlugin("coinbase")
      plugin.makeRequest = function(source, dest) {
        return { url: "asfdasdfasfd" }
      }
      var p = new Promise( function(resolve, reject) {
        log("bad URL: getCurrencyPairs(%o)...", pairs)
        plugin.getCurrencyPairs(pairs, function(results) {
          resolve(results)
        })
      })
      p.then( function(results) {
        log("p.then: results: %O", results)
        done()
      })
/*
      .catch( function(error) {
        log("it: p.catch: error: %O", error)
        done()
      })
*/
    })

  })

})


