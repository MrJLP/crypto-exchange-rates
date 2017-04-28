
var expect = require('chai').expect

var exchangeRateSources = require('../index.js')

const pluginExchangeNames = [
  'coinbase',
  'bitstamp',
  'bitcoinaverage',
  'bravenewcoin'
]


describe('Sync OK', function() {

  describe('verifying exchangeRateLib properties', function() {

    pluginExchangeNames.forEach(function(exchangeName, index, array) {

      var plugin = new exchangeRateSources[exchangeName]

      it("exchangeRateSources." + exchangeName, done => {
        expect(plugin).an('object')
        expect(plugin.getName).a('function')
        expect(plugin.getCurrencyPairs).a('function')
        done()
      })

    })
  })

  describe("getName()", function() {

    pluginExchangeNames.forEach(function(exchangeName, index, array) {

      var plugin = new exchangeRateSources[exchangeName]

      it(exchangeName + ".getName()" , done => {
        var name = plugin.getName()
        expect(name).a('string')
        expect(name).equals(exchangeName)
        done()
      })

    })
  })
})


