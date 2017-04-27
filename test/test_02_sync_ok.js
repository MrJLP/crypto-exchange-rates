
var expect = require('chai').expect

var exchangeRateSources = require('../index.js')

const pluginExchangeNames = [
  'coinbase',
  'bitstamp',
  'bitcoinaverage',
  'bravenewcoin'
]


describe('Sync OK', function() {
  pluginExchangeNames.forEach(function(exchangeName, index, array) {

    var plugin = exchangeRateSources[exchangeName]

    describe(exchangeName + ' exchangeRateLib:', function() {
      it('exchangeRateLib object', done => {
        expect(plugin).an('object')
        expect(plugin.getName).a('function')
        expect(plugin.getCurrencyPairs).a('function')
        done()
      })
    })

    describe(exchangeName + '.getName()', function() {
      it('getName() = ' + exchangeName, done => {
        var name = plugin.getName()
        expect(name).a('string')
        expect(name).equals(exchangeName)
        done()
      })
    })
  })
})


