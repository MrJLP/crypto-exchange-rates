
'use strict'

const axios = require('axios');

var logDebug = require('debug')('crypto-exchange-rates:debug')

let npmConfigTimeout = process.env["npm_config_crypto_exchange_rate_timeout"]

class ExchangeRateLibBase {

  constructor (exchangeName, baseURL) {
    this.exchangeName = exchangeName
    this.baseURL = baseURL
    this.timeout = npmConfigTimeout || 5000 // default of 5s if not defined in NPM config
    this.allowedPairs = [] // defined in sub-class
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

    logDebug("getCurrencyPairs(%o, %o)", pairs, callback)

    // param checking - throws exception if not valid
    self.validateInput(pairs, callback)

    // make sure currency pairs are valid, if not then replace with default pair
    pairs = self.verifyCurrencyPairs(pairs)
    logDebug("getCurrencyPairs: after verifyCurrencyPairs() pairs=%o", pairs)

    // make requests
    var promises = []
    pairs.forEach( function(element, index, array) {
      var req = self.makeRequest(element.source, element.dest)
      var p = self.axiosInstance.get(req.url, req)
      promises.push(p)
    })

    // wraps exceptions so Promise.all can wait for all to resolve
    let wrapPromise = function(promise) {
      return promise.then(
        function(response){
          return { response: response, status: "resolved" }
        },
        function(error){
          return { error: error, status: "rejected" }
        })
    }

    Promise.all( promises.map(wrapPromise) ).then( function(resultArray) {
      logDebug("Promise.all.then: responses: ", resultArray)
      let returnResults = []
      resultArray.forEach( function(result, index, array) {
        if ( result.status != "resolved" ) {
          logDebug("ERROR: %O", result.error)
          //
          //TODO: How should it handle errors?
          //      1. leave out responses that had error
          //      2. include source & dest but have value undefined for responses with error
          //      3. ??
          // for now will set 'value' to undefined, and also include 'error' to show error

          // if so then uncomment out below
          returnResults.push( { source: pairs[index].source, dest: pairs[index].dest, value: undefined, error: result.error.toString() } )
        }
        else {
          var value = self.processResponse(result.response)
          returnResults.push( { source: pairs[index].source, dest: pairs[index].dest, value: value } )
        }
      })
      logDebug("Promise.all.then: callback(%o)", returnResults)
      callback(returnResults)
    })
  }

  // throw exception here if using invalid args rather than later on for clarity
  validateInput(pairs, callback) {
    if ( typeof pairs != 'object' || ! Array.isArray(pairs)) {
      throw Error("1st arg expected to be an array of currency pairs: ", typeof pairs)
    }
    if ( typeof callback != 'function' ) {
      throw Error("2nd arg expected to be a callback function: ", typeof callback)
    }

    pairs.forEach( function(element, index) {
      if ( typeof element != 'object' ) {
        throw Error("not an array of objects")
      }
      if ( element.source == undefined ) {
        throw Error("'source' not defined in pair")
      }
      if ( element.dest == undefined ) {
        throw Error("'dest' not defined in pair")
      }
    })
  }

  // make sure currency pairs are valid, if not replace with default BTC-USD per spec
  verifyCurrencyPairs(pairs) {
    const DEFAULT_CURRENCY_PAIR = { source: 'BTC', dest: 'USD' }

    var self = this
    var returnPairs = pairs.slice()

    pairs.forEach( function(input, index, array) {
      var isAllowed = false
      for ( let i = 0 ; i < self.allowedPairs.length ; i++ ) {
        let allowedPair = self.allowedPairs[i]
        if ( input.source == allowedPair[0] && input.dest == allowedPair[1] ) {
          isAllowed = true
          break
        }
      }

      // if it got here then it's not allowed - override with default
      if ( ! isAllowed ) {
        returnPairs[index] = DEFAULT_CURRENCY_PAIR
      }
    })
    return returnPairs
  }
}

module.exports = exports = ExchangeRateLibBase 

