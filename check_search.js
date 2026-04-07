
const axios = require('axios');
const xml2js = require('xml2js');
async function test() {
  const credentials = Buffer.from('dlr_dimitriosmikhovsky:kovoExT0mG3Y').toString('base64');
  const res = await axios.get('https://services.mobile.de/search-api/search?customerNumber=712285&minFirstRegistration=2025-01-01', {
    headers: { Authorization: 'Basic ' + credentials, Accept: 'application/xml', 'Accept-Language': 'de' }
  });
  const parser = new xml2js.Parser({ explicitArray: false });
  const parsed = await parser.parseStringPromise(res.data);
  const ads = parsed['search:search-result']['search:ads']['ad:ad'];
  if (Array.isArray(ads)) {
     for (const ad of ads) {
        let imgs = ad['ad:images']['ad:image'];
        console.log('Ad', ad.True.key, 'images array?:', Array.isArray(imgs), 'length:', imgs?.length || 1);
     }
  }
}
test().catch(console.error);
