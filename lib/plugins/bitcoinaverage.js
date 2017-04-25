const axios = require('axios')

exports.getName = () => 'bitcoinaverage'

exports.getCurrencyPairs = function(pairs, callback) {

  var promises = []

  pairs.forEach( function(element, index, array) {

    if ( ! element || ! element.source || ! element.dest ) {
       console.log("ERR: Invalid currency pair: ", element)
    }

    p = axios.get(`https://apiv2.bitcoinaverage.com/convert/global?from=${element.source}&to=${element.dest}&amount=1` )
    promises.push(p)
  })

  axios.all(promises).then( function(responses) {
    results = []
    responses.forEach( function(response, index, array) {
      var { success, price, time } = response.data
      price = String(price) // ABC requires price as string
      results.push( { source: pairs[index].source, dest: pairs[index].dest, value: price} )
    })
    callback(results)
  })
  .catch(function(error) {
    console.log(error)
  })
}

