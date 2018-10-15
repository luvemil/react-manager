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

function test_proxy(symbol) {
  return axios.get("/api/btcusd")
    .then(res => res.last_price)
    .catch(() => { console.log("error"); return NaN; });
}

function get_quote(data) {
  switch(data.exchange) {
    case 'bitfinex':
      //return get_bitfinex_quote(transform_to_symbol(data.name));
      return test_proxy(transform_to_symbol(data.name));
    default:
      return Promise.resolve(NaN);
  }
}

export default get_quote;
