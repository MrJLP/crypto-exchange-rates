
'use strict'

const axios = require('axios');

class ExchangeRateLibBase {

  constructor (exchangeName, baseURL, timeout) {
    this.exchangeName = exchangeName
    this.baseURL = baseURL
    this.timeout = timeout
    this.axiosInstance = axios.create({ baseURL: this.baseURL, timeout: this.timeout })
  }

  /////

  getName() {
    return this.exchangeName
  }

  makeRequest() {
    throw Error("sub-class must define makeRequest()")
  }

  processResponse() {
    throw Error("sub-class must define processResponse()")
  }

  getCurrencyPairs(pairs, callback) {
    var self = this

    // TODO: param checking


    // check that 
    var promises = []
    pairs.forEach( function(element, index, array) {

      //TODO: have allowedParis be an array of tuples, not strings

//      var currencyPair = `${element.source}-${element.dest}`
//      if ( ! availablePairs.includes(currencyPair) ) {
//        console.log(`ERR: ${currencyPair} not found, using default instead`)
//        currencyPair = 'BTC-USD'
//      }

      var req = self.makeRequest(element.source, element.dest)
      var p = self.axiosInstance.get(req.url, req)
      promises.push(p)
    })

    axios.all(promises).then( function(responses) {
      var results = []
      responses.forEach( function(response, index, array) {
        var value = self.processResponse(response)
        results.push( { source: pairs[index].source, dest: pairs[index].dest, value: value } )
      })
      callback(results)
    })
    .catch(function(error) {
      console.log(error)
    })

  }
}

//////////////////////

class Coinbase extends ExchangeRateLibBase
{
  constructor() {
    super('coinbase', 'https://api.coinbase.com', 2000)

    this.VERSION_DATE = '2017-04-19'

    this.allowedPairs = [
      [ 'BTC', 'USD'],
      [ 'BTC', 'EUR'],
      [ 'ETH', 'USD'],
      [ 'ETH', 'EUR'],
    ]
  }

  makeRequest(source, dest) {
    return {
      url:     `/v2/prices/${source}-${dest}/spot`,
      headers: {
        'CB-VERSION' : this.VERSION_DATE
      }
    }
  }

  processResponse(response) {
    return response.data.data['amount']
  }
}

/////

class Bitstamp extends ExchangeRateLibBase
{
  constructor() {
    super('bitstamp', 'https://www.bitstamp.net', 2000)

    this.allowedPairs = [
      [ 'BTC', 'USD'],
      [ 'BTC', 'EUR'],
      [ 'EUR', 'USD'],
      [ 'XRP', 'USD'],
      [ 'XRP', 'EUR'],
      [ 'XRP', 'BTC'],
    ]
  }

  makeRequest(source, dest) {
    var currencyPair = source.toLowerCase() + dest.toLowerCase()
    return { url: "api/v2/ticker/" + currencyPair }
  }

  processResponse(response) {
    return response.data['last']
  }
}

/////

class BitcoinAverage extends ExchangeRateLibBase
{
  constructor() {
    super('bitcoinaverage', 'https://apiv2.bitcoinaverage.com', 2000)

    this.allowedPairs = [
      [ 'BTC', 'USD'],
    ]
  }

  makeRequest(source, dest) {
    return {
      url: `convert/global?from=${source}&to=${dest}&amount=1`
    }
  }

  processResponse(response) {
    var price = response.data['price']
    return String(price)
  }
}

/////

class BraveNewCoin extends ExchangeRateLibBase
{
  constructor() {
    super('bravenewcoin', 'https://bravenewcoin-v1.p.mashape.com', 2000)

    this.MASHAPE_API_KEY = ''

    this.allowedPairs = [
      [ 'BTC', 'USD'],
    ]
  }

  makeRequest(source, dest) {
    return {
      url:     `convert?from=${source}&to=${dest}&qty=1`,
      headers: { 'X-Mashape-Key': this.MASHAPE_API_KEY, 'Accept': 'application/json' }
    }
  }

  processResponse(response) {
    var value = response.data['to_quantity']
    return String(value)
  }
}

//////////////////////

exports.coinbase = new Coinbase()
exports.bitstamp = new Bitstamp()
exports.bravenewcoin = new BraveNewCoin()
exports.bitcoinaverage = new BitcoinAverage

