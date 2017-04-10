const axios = require('axios');

const availablePairs = [
  'btceur',
  'eurusd',
  'xrpusd',
  'xrpeur',
];


/////

exports.getName = () => 'bitstamp'

exports.getCurrencyPairs = function(pairs, callback) {

  // TODO: this will not work with multiple pairs, need to use axios.all() for that

  pairs.forEach( function(element, index, array) {

    var currencyPair = `${element.source.toLowerCase()}{element.dest.toLowerCase()}`
    if ( ! availablePairs.includes(currencyPair) ) {
      currencyPair = 'btceur'
    }

    axios.get(`https://www.bitstamp.net/api/v2/ticker/${currencyPair}`)
         .then(function(response) {
           const { bid, ask, last, low, high, volume, timestamp } = response.data;
           callback(last)
         })
         .catch(function(error) {
           console.log(error)
         })

    console.log(`made HTTP request... source: ${element.source}, dest: ${element.dest}`)
  }) 

}


