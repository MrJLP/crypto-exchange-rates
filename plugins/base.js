const axios = require('axios');

/////

var makeExchangeHttpCall = function(allowedPairs, makeRequest, processResponse, pairs, callback) {

  var invalidParams = false

  // make sure params passed in are valid
  if ( typeof pairs != 'array' || pairs.length == 0 ) {
    console.log("ERR: pairs is not an array or empty array")
    invalidParams = true //TODO: return null?
  }
  pairs.forEach((element) => {
    if ( typeof element != 'object' ) {
      console.log("ERR: pair not an object")
      invalidParams = true //TODO: return null?
    }
    ['source', 'dest'].forEach((key) => {
      if ( key not in element ) {
        console.log("ERR: pair missing ", key)
        invalidParams = true //TODO: return null?
      }
    })
  })
  if ( invalidParams ) {
    return null // 
  }

  var promises = []

  pairs.forEach( function(element, index, array) {
    var currencyPair = [ element.source, element.dest ]
    if ( ! allowedPairs.includes(currencyPair) ) {
      console.log(`ERR: invalid currency pair, using default instead`)
      currencyPair = 'BTC-USD'
    }

    var req = makeRequest(element)
    p = axios.get(req)
    promises.push(p)
  })

  axios.all(promises).then( function(responses) {
    results = []
    responses.forEach( function(response, index, array) {
      var value = processResponse(response)
      results.push( { source: pairs[index].source, dest: pairs[index].dest, value: value } )
    })
    callback(results)
  })
  .catch(function(error) {
    console.log(error)
  })

}

module.exports = exports = makeExchangeHttpCall //??? not sure whether to export a function or an object

