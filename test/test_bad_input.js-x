
var expect = require('chai').expect;

var exchangeRateSources = require('../index.js');

const pluginExchangeNames = [
  'coinbase',
  'bitstamp',
  'bitcoinaverage',
  'bravenewcoin'
]

describe('Negative cases', function() {
  pluginExchangeNames.forEach(function(exchangeName, index, array) {

    var plugin = exchangeRateSources[exchangeName];

    describe(exchangeName + '.getCurrencyPairs() no params', function() {
      it('getCurrencyPairs()', done => {
        var results = plugin.getCurrencyPairs()
        expect(results).equal(null)
        //TODO: what should it return
        done()
      })
    })

    describe(exchangeName + '.getCurrencyPairs() no pairs param, only callback', function() {
      it('getCurrencyPairs()', done => {
        var results = plugin.getCurrencyPairs( function(results) {
          //TODO: what should it return
        })
        done()
      })
    })

    describe(exchangeName + '.getCurrencyPairs() null for pairs', function() {
      const pairs = null
      it(`getCurrencyPairs(${pairs})`, done => {
        var results = plugin.getCurrencyPairs(pair, function(results) {
          //TODO: what should it return
        })
        done()
      })
    })

    describe(exchangeName + '.getCurrencyPairs() empty array', function() {
      it('getCurrencyPairs([])', done => {
        var results = plugin.getCurrencyPairs([], function(results) {
          //TODO: return empty array back?
          expect(results).an('array')
          expect(results.length).equals(0)
        })
        done()
      })
    })

    describe(exchangeName + '.getCurrencyPairs() bad object properties', function() {
      const pairs = [ { x: 'BTC', y: 'USD' } ]
      it(`getCurrencyPairs(${pairs})`, done => {
        var results = plugin.getCurrencyPairs(pairs, function(results) {
          // TODO: should use default of BTC-USD?
          expect(results).an('array')
          expect(results.length).equals(1)
          expect(results).keys('source', 'dest', 'value')
          expect(results.source).a('string')
          expect(results.dest).a('string')
          expect(results.value).a('string')
          expect(results.source).equal('BTC')
          expect(results.dest).equal('USD')
        })
        done()
      })
    })


  })
})


