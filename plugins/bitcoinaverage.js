const axios = require('axios');


exports.getName = () => 'bitcoinaverage'

exports.getCurrencyPairs = function (pairs, callback) {

  // TODO: this will not work with multiple pairs, need to use axios.all() for that

  pairs.forEach( function(element, index, array) {

    if ( ! element || ! element.source || ! element.dest ) {
       console.log("Invalid currency pair: ", element)
    }

    axios.get( `https://apiv2.bitcoinaverage.com/convert/global?from=${element.source}&to=${element.dest}&amount=1` )
         .then(callback)
         .catch(function(error) {
           console.log(error)
         })

    console.log(`made HTTP request... source: ${element.source}, dest: ${element.dest}`)
  }) 

}



