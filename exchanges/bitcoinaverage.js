const axios = require('axios');

function bitcoinaverage(source, dest) {

  return axios.get(`https://apiv2.bitcoinaverage.com/convert/global?from=${source}&to=${dest}&amount=1`)
    .then((response) => {
      const { success, price, time} = res.data;
      return {
        success,
        price,
        time,
        exchange: 'bitcoinaverage',
        pair: `${source}${dest}`,
      };
    })

}

module.exports = bitcoinaverage

