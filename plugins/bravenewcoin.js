const axios = require('axios');

// hardcode here for now, maybe put in config or pass into constructor
const MASHAPE_API_KEY = 'API_KEY'

// many more pairs are supported but limit to these that Airbitz uses
const availablePairs = [
  'BTC-USD',
  'BTC-EUR',
  'ETH-USD',
  'ETH-EUR'
]

/////

exports.getName = () => 'bravenewcoin'

exports.getCurrencyPairs = function(pairs, callback) {

  var promises = []

  console.log("pairs: ", pairs)
  pairs.forEach( function(element, index, array) {
    console.log("element: ", element)
    var currencyPair = `${element.source}-${element.dest}`
    if ( ! availablePairs.includes(currencyPair) ) {
      console.log(`ERR: ${currencyPair} not found, using default instead`)
      currencyPair = 'BTC-USD'
    }

    p = axios.get(`https://bravenewcoin-v1.p.mashape.com/convert?from=${element.source}&qty=1&to=${element.dest}`,
                    { headers: {'X-Mashape-Key': MASHAPE_API_KEY, 'Accept': 'application/json' } })
    promises.push(p)
  })

  axios.all(promises).then( function(responses) {
    results = []
    responses.forEach( function(response, index, array) {
      var value = response.data['to_quantity'] || "";
      value = String(value)
      results.push( { source: pairs[index].source, dest: pairs[index].dest, value: value } )
    })
    callback(results)
  })
  .catch(function(error) {
    console.log(error)
  })

}


