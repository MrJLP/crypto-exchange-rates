
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

    it("bad URL", function() {
      var plugin = getPlugin("coinbase")
      plugin.makeRequest = function(source, dest) {
        return { url: "asfdasdfasfd" }
      }
      return new Promise( function(resolve, reject) {
        log("bad URL: getCurrencyPairs(%o)...", pairs)
        plugin.getCurrencyPairs(pairs, function(results) {
          resolve(results)
        })
      })
      .then( function(results) {
        log("results: %O", results)
        expect(results).an('array')
        expect(results.length).equals(1)
        expect(results[0]).keys('source', 'dest', 'value', 'error')
        expect(results[0].source).a('string')
        expect(results[0].dest).a('string')
        expect(results[0].value).a('undefined')
        expect(results[0].error).a('string')
        log("expected error: ", results[0].error)
      })
    })

  })

})


