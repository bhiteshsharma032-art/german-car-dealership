
const axios = require('axios');
const xml2js = require('xml2js');
async function test() {
  const credentials = Buffer.from('dlr_dimitriosmikhovsky:kovoExT0mG3Y').toString('base64');
  const res = await axios.get('https://services.mobile.de/search-api/ad/451424213', {
    headers: { Authorization: 'Basic ' + credentials, Accept: 'application/xml', 'Accept-Language': 'de' }
  });
  const parser = new xml2js.Parser({ explicitArray: false });
  const parsed = await parser.parseStringPromise(res.data);
  const ad = parsed['ad:ad'];
  let images = ad['ad:images']['ad:image'];
  if (!Array.isArray(images)) images = [images];
  console.log('Images length:', images.length);
  const firstReps = images[0]['ad:representation'];
  console.log('First image size count:', Array.isArray(firstReps) ? firstReps.length : 1);
  console.log('Highest res URL:', firstReps[firstReps.length-1].True.url || firstReps[firstReps.length-1].url || firstReps.True.url);
}
test().catch(console.error);
