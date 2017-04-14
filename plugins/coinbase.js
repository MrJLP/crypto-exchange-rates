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

/////

exports.getName = () => 'coinbase'

exports.getCurrencyPairs = function(pairs, callback) {

  var promises = []

  pairs.forEach( function(element, index, array) {
    var currencyPair = `${element.source}-${element.dest}`
    if ( ! availablePairs.includes(currencyPair) ) {
      console.log(`ERR: ${currencyPair} not found, using default instead`)
      currencyPair = 'BTC-USD'
    }

    p = axios.get(`https://api.coinbase.com/v2/prices/${currencyPair}/spot`,
                    { headers: {'CB-VERSION': VERSION_DATE } })
    promises.push(p)
  })

  axios.all(promises).then( function(responses) {
                       results = []
                       responses.forEach( function(response, index, array) {
                         var value = response.data.data['amount'] || "";
                         results.push( { source: pairs[index].source, dest: pairs[index].dest, value: value } )
                       })
                       callback(results)
                     })
                     .catch(function(error) {
                       console.log(error)
                     })

}

