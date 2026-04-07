
const axios = require('axios');
const xml2js = require('xml2js');
async function test() {
  const credentials = Buffer.from('dlr_dimitriosmikhovsky:kovoExT0mG3Y').toString('base64');
  const res = await axios.get('https://services.mobile.de/search-api/search?customerNumber=712285&max-results=50', {
    headers: { Authorization: 'Basic ' + credentials, Accept: 'application/xml', 'Accept-Language': 'de' }
  });
  const parser = new xml2js.Parser({ explicitArray: false });
  const parsed = await parser.parseStringPromise(res.data);
  const ads = parsed['search:search-result']['search:ads']['ad:ad'];
  for (const ad of ads) {
    let images = ad['ad:images'];
    if (images && images['ad:image']) {
      let array = Array.isArray(images['ad:image']) ? images['ad:image'] : [images['ad:image']];
      if (array[0] && array[0]['ad:representation']) {
        let rep = array[0]['ad:representation'];
        if (Array.isArray(rep)) rep = rep[rep.length-1];
        let url = rep.True.url || rep.url;
        console.log(ad.True.key, url && url.startsWith('https') ? 'HTTPS' : 'HTTP', url);
      }
    }
  }
}
test().catch(console.error);
