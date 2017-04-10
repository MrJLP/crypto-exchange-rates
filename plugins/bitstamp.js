const axios = require('axios');

const availablePairs = [
  'btcusd',
  'btceur',
  'eurusd',
  'xrpusd',
  'xrpeur',
  'xrpbtc',
];


/////

exports.getName = () => 'bitstamp'

exports.getCurrencyPairs = function(pairs, callback) {

  promises = []
  pairs.forEach( function(element, index, array) {

    var currencyPair = `${element.source.toLowerCase()}${element.dest.toLowerCase()}`
    if ( ! availablePairs.includes(currencyPair) ) {
      console.log("ERR: pair not found: ", currencyPair)
      currencyPair = 'btcusd'
    }

    p = axios.get(`https://www.bitstamp.net/api/v2/ticker/${currencyPair}`)
    promises.push(p)

    console.log(`HTTP request: source: ${element.source}, dest: ${element.dest}`)
  })

  axios.all(promises).then( function(responses) {
                       results = []
                       responses.forEach( function(response, index, array) {
                         const { bid, ask, last, low, high, volume, timestamp } = response.data;
                         //var value = response.data.data['amount'] || "";
                         results.push( { source: pairs[index].source, dest: pairs[index].dest, value: last} )
                       })
                       callback(results)
                     })
                     .catch(function(error) {
                       console.log(error)
                     })
}


