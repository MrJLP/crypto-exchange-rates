
var expect = require('chai').expect;

var exchangeRateSources = require('../index.js');

const pluginExchangeNames = [
  'coinbase',
  'bitstamp',
  'bitcoinaverage',
  'bravenewcoin'
]

describe('Bad input', function() {
  pluginExchangeNames.forEach(function(exchangeName, index, array) {

    var plugin = exchangeRateSources[exchangeName];

    describe(exchangeName + '.getCurrencyPairs() no params', function() {
      it('getCurrencyPairs()', done => {
        expect(function() {
            var results = plugin.getCurrencyPairs()
        }).to.throw()
        done()
      })
    })

    describe(exchangeName + '.getCurrencyPairs() no pairs param, only callback', function() {
      it('getCurrencyPairs()', done => {
        expect(function() {
          var results = plugin.getCurrencyPairs( function(results) {})
        }).to.throw()
        done()
      })
    })

    describe(exchangeName + '.getCurrencyPairs() pairs is null', function() {
      it('getCurrencyPairs(null, callback)', done => {
        expect(function() {
          var results = plugin.getCurrencyPairs(null, function(results) {})
        }).to.throw()
        done()
      })
    })

    describe(exchangeName + '.getCurrencyPairs() pairs is empty array', function() {
      it('getCurrencyPairs([])', done => {
        var results = plugin.getCurrencyPairs([], function(results) {
          expect(results).an('array')
          expect(results.length).equals(0)
        })
        done()
      })
    })

    describe(exchangeName + '.getCurrencyPairs() pairs has bad object properties', function() {
      const pairs = [ { x: 'BTC', y: 'USD' } ]
      it(`getCurrencyPairs(${pairs})`, done => {
        expect(function() {
          var results = plugin.getCurrencyPairs(pairs, function(results) {})
        }).to.throw()
        done()
      })
    })


  })
})


