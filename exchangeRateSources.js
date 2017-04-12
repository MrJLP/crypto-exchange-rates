
var exchangeRateSources =  {
    coinbase:           require("./plugins/coinbase.js"),
    bitstamp:           require("./plugins/bitstamp.js"),
    bitcoinaverage:     require("./plugins/bitcoinaverage.js"),
    bravenewcoin:       require("./plugins/bravenewcoin.js")
}

module.exports = exports = exchangeRateSources 

