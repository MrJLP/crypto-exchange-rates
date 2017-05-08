# crypto-exchange-rates

This is a Javascript library that provides an interface for retrieving cryptocurrency exchange rate values compatible with the [ABCExchangeRateLib](https://developer.airbitz.co/javascript/#abcexchangeratelib) API.

There are two NPM config variables used to configure library. These can be set via environment variable, NPM command line or NPM config in package.json.

**npm_config_bravenewcoin_api_key**
Set with Mashable API key used for BraveNewCoin

**npm_config_crypto_exchange_rate_timeout**
Time in milliseconds for default timeout of HTTP request. If not defined then set to 5000 (5 seconds).


# TODO
* add more exchange plugins?
* another base class method to handle ticker responses with multiple currency pairs, if more exchanges to be added

Initial code started off from fork of donbobvanbirt/coin-ticker repo (https://github.com/donbobvanbirt/coin-ticker).
