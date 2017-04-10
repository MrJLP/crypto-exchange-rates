const axios = require('axios');

const availablePairs = [
  'btceur',
  'eurusd',
  'xrpusd',
  'xrpeur',
];


// takes in source and dest currencies, returns an object to be used for axios HTTP request
var doHttpRequest = function(source, dest, callback) {

  var currencyPair = `${source.toLowerCase()}{dest.toLowerCase()}`
  if ( ! availablePairs.includes(currencyPair) ) {
    currencyPair = 'btceur'
  }

  axios.get(`https://www.bitstamp.net/api/v2/ticker/${currencyPair}`)
       .then(callback)
       .catch(function(error) {
         console.log(error)
       })
}

/////

exports.getName = () => 'bitstamp'

exports.getCurrencyPairs = function (pairs, callback) {

  // TODO: this will not work with multiple pairs, need to use axios.all() for that

  pairs.forEach( function(element, index, array) {
    doHttpRequest(element.source, element.dest, callback)
    console.log(`made HTTP request... source: ${element.source}, dest: ${element.dest}`)
  }) 

}



