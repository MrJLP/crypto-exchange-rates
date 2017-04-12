const axios = require('axios');


function bitcoinaverage(pair) {

  const availablePairs = [
    'BTC-USD',
    'BTC-EUR',
    'ETH-USD',
    'ETH-EUR',
  ];

  const currencyPair = availablePairs.includes(pair) ? pair : 'BTC-USD';

  [ source, dest ] = currencyPair.split("-")


  return axios.get(`https://apiv2.bitcoinaverage.com/convert/global?from=${source}&to=${dest}&amount=1`)
    .then((response) => {
      const { success, price, time} = response.data;
      return {
        success,
        price,
        time,
        exchange: 'bitcoinaverage',
        pair: `${source}-${dest}`,
      };
    })

}

module.exports = bitcoinaverage

