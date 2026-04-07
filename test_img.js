
const axios = require('axios');
const xml2js = require('xml2js');
async function test() {
  const credentials = Buffer.from('dlr_dimitriosmikhovsky:kovoExT0mG3Y').toString('base64');
  const res = await axios.get('https://services.mobile.de/search-api/search?customerNumber=712285&max-results=1', {
    headers: { Authorization: 'Basic ' + credentials, Accept: 'application/xml' }
  });
  const parser = new xml2js.Parser({ explicitArray: false });
  const parsed = await parser.parseStringPromise(res.data);
  const ad = parsed['search:search-result']['search:ads']['ad:ad'];
  const representations = ad['ad:images']['ad:image']['ad:representation'];
  console.log(JSON.stringify(representations, null, 2));
}
test().catch(console.error);
