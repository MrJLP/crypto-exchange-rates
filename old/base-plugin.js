
const axios = require('axios');

/////
exports.basePlugin = function(pluginConfig) {

  this.name    = pluginConfig['name'] || ""
  this.baseUrl = pluginConfig['baseUrl'] || ""


  this.getName() { return this.name }

  this.getCurrencyPairs = function(pairs, callback) {

    var promises = []

    pairs.forEach( function(element, index, array) {
      var currencyPair = `${element.source}-${element.dest}`
      if ( ! availablePairs.includes(currencyPair) ) {
        currencyPair = 'BTC-USD'
        console.log(`ERR: ${currencyPair} not found, using default instead}`)
      }

      p = axios.get(`https://api.coinbase.com/v2/prices/${currencyPair}/spot`,
                    { headers: {'CB-VERSION': VERSION_DATE } })

      // save axios promises
      promises.push(p)

      console.log(`HTTP request: source: ${element.source}, dest: ${element.dest}`)
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

}



