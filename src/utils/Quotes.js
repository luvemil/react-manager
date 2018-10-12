import axios from 'axios';

function get_bitfinex_quote(symbol="btcusd") {
  const api_endpoint = "https://api.bitfinex.com/v1/pubticker/";
  return axios.get(api_endpoint + symbol)
    .then(res => res.data.last_price);
}

function transform_to_symbol(name) {
  switch(name) {
    case 'ETH':
      return 'ethusd';
    case 'BTC':
    default:
      return 'btcusd';
  }
}

function get_quote(data) {
  switch(data.exchange) {
    case 'bitfinex':
      return get_bitfinex_quote(transform_to_symbol(data.name));
    default:
      return Promise.resolve(NaN);
  }
}

export default get_quote;
