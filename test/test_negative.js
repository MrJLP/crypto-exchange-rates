const chai = require('chai');
//        }).then(function(results) {
const { expect } = chai;

const exchangeRateSources = require('../exchangeRateSources.js');

const pluginExchangeNames = [
  'coinbase',
  'bitstamp',
  'bitcoinaverage',
  'bravenewcoin'
]

describe('Negative cases', function() {
  pluginExchangeNames.forEach(function(exchangeName, index, array) {

    var plugin = require('../exchangeRateSources.js')[exchangeName];

    describe(exchangeName + '.getCurrencyPairs() no params', function() {
      const pairs = [ ]
      it(`getCurrencyPairs(${pairs})`, done => {
        var results = plugin.getCurrencyPairs()
        expect(results).equal(null)
        //TODO: what should it return
        done()
      })
    })

    describe(exchangeName + '.getCurrencyPairs() no pair param, only callback', function() {
      it('getCurrencyPairs()', done => {
        var results = plugin.getCurrencyPairs( function(results) {
          //TODO: what should it return
        })
        done()
      })
    })

    describe(exchangeName + '.getCurrencyPairs() null pair', function() {
      const pairs = null
      it(`getCurrencyPairs(${pairs})`, done => {
        var results = plugin.getCurrencyPairs(pair, function(results) {
          //TODO: what should it return
        })
        done()
      })
    })

    describe(exchangeName + '.getCurrencyPairs() number for pair', function() {
      const pairs = 1
      it(`getCurrencyPairs(${pairs})`, done => {
        var results = plugin.getCurrencyPairs(pairs, function(results) {
          //TODO: what should it return
        })
        done()
      })
    })

    describe(exchangeName + '.getCurrencyPairs() string for pair', function() {
      const pairs = 'x'
      it(`getCurrencyPairs(${pairs})`, done => {
        var results = plugin.getCurrencyPairs(pairs, function(results) {
          //TODO: what should it return
        })
        done()
      })
    })

    describe(exchangeName + '.getCurrencyPairs() pair object not in array', function() {
      const pairs = { source: 'BTC', dest: 'USD' }
      it(`getCurrencyPairs(${pairs})`, done => {
        var results = plugin.getCurrencyPairs('x', function(results) {
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
          expect(results).an('array')
          expect(results.length).equals(1)
          expect(results).keys('source', 'dest', 'value')
          expect(results.source).a('string')
          expect(results.dest).a('string')
          expect(results.value).a('string')
          expect(results.source).equal('BTC') // TODO: should use default of BTC-USD?
          expect(results.dest).equal('USD')
        })
        done()
      })
    })


  })
})


