import axios from 'axios';

it('connect to server', () => {
  expect.assertions(1);
  return expect(axios.get("http://localhost:3001/api/btcusd")).rejects;
});

//it('data should have a status:"OK" field in json', done => {
  //axios.get("http://localhost:3001/api/btcusd")
    //.then((res) => {
      //expect(res.status).toBe("OK");
      //done();
    //});
//});
