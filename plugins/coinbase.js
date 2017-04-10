const axios = require('axios');

// needs CB-VERSION header to avoid warning
const VERSION_DATE = '2017-04-10'
//const PLUGIN_NAME = 'coinbase'

const availablePairs = [
  'BTC-USD',
  'BTC-EUR',
  'ETH-USD',
  'ETH-EUR',
]

// takes in source and dest currencies, returns an object to be used for axios HTTP request
var doHttpRequest = function(source, dest, callback) {

  var currencyPair = `${source}-{dest}`
  if ( ! availablePairs.includes(currencyPair) ) {
    currencyPair = 'BTC-USD'
  }

  axios.get(`https://api.coinbase.com/v2/prices/${currencyPair}/spot`,
                   { headers: {'CB-VERSION': VERSION_DATE}})
    .then(callback)
    .catch(function(error) {
      console.log(error)
    })
}

/////

exports.getName = () => 'coinbase'

exports.getCurrencyPairs = function (pairs, callback) {

  // TODO: this will not work with multiple pairs, need to use axios.all() for that

  pairs.forEach( function(element, index, array) {
    doHttpRequest(element.source, element.dest, callback)
    console.log(`made HTTP request... source: ${element.source}, dest: ${element.dest}`)
  }) 

}


/*

exports.getCurrencyPairs = function(pairs, callback) {

  var promises = []

  pairs.forEach( function(element, index, array) {

    var currencyPair = `${element.source}-{element.dest}`
    if ( ! availablePairs.includes(currencyPair) ) {
      currencyPair = 'BTC-USD'
    }

    req = axios.get(`https://api.coinbase.com/v2/prices/${currencyPair}/spot`,
                    { headers: {'CB-VERSION': VERSION_DATE } })

    // save axios responses to process
    promises.push( req )

    console.log(`HTTP request: source: ${element.source}, dest: ${element.dest}`)
  })

//  axios.all(promises).then(callback)
  axios.all(promises).then( (response) => { console.log(response.data) } )
                     .catch(function(error) {
                       console.log(error)
                     })

//  axios.all(promises).then(callback)
//                     .catch(function(error) {
//                       console.log(error)
//                     })

}
*/

