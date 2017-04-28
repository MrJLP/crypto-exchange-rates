
'use strict'

var logDebug = require('debug')('crypto-exchange-rates:debug')

const axios = require('axios');

class ExchangeRateLibBase {

  constructor (exchangeName, baseURL, timeout) {
    this.exchangeName = exchangeName
    this.baseURL = baseURL
    this.timeout = timeout || 2000 // arbitrary default of 2s if not defined in sub-class
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

    axios.all(promises).then( function(responses) {
      let results = []
      responses.forEach( function(response, index, array) {
        var value = self.processResponse(response)
        results.push( { source: pairs[index].source, dest: pairs[index].dest, value: value } )
      })
      logDebug("calling callback(%o)", results)
      callback(results)
    })
    .catch(function(error) {
      console.log(error)
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

