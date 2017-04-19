

const axios = require('axios');

class ExchangeRateLibBase {

  constructor (exchangeName, baseURL, timeout) {
    this.exchangeName = exchangeName 
    this.baseURL = baseURL
    this.timeout = timeout
//    this.allowedPairs = [] // this could be dynamically figured out but for now check hard-coded list

    this.axiosInstance = axios.create({ baseURL: this.baseURL, timeout: this.timeout })

  }
    // these are defined in each plugin sub-class


  // given a pair, create request ie. URL plus maybe header too
  makeRequest(source, dest) {
    throw Error("must define this method")
  } 

  // get rate price from axios response, by default return entire body
  processResponse(response) {
    return response.data
  }

  /////

  getName() {
    return this.exchangeName
  }

  getCurrencyPair(pairs, callback) {

    // TODO: param checking

    var promises = []

    // check that 
    pairs.forEach( function(element, index, array) {

      //TODO: have allowedParis be an array of tuples, not strings

//      var currencyPair = `${element.source}-${element.dest}`
//      if ( ! availablePairs.includes(currencyPair) ) {
//        console.log(`ERR: ${currencyPair} not found, using default instead`)
//        currencyPair = 'BTC-USD'
//      }

      var req = this.makeRequest(element.source, element.dest)
      p = this.axiosInstance.get(req)
      promises.push(p)
    })

    axios.all(promises).then( function(responses) {
      results = []
      responses.forEach( function(response, index, array) {
        var value = this.processResponse(response)
        results.push( { source: pairs[index].source, dest: pairs[index].dest, value: value } )
      })
      callback(results)
    })
    .catch(function(error) {
      console.log(error)
    })

  }

}

module.exports = exports = ExchangeRateLibBase

