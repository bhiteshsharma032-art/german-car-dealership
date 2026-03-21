const axios = require('axios');
const xml2js = require('xml2js');

// Mobile.de Search-API Configuration
const MOBILE_DE_CONFIG = {
  baseURL: 'https://services.mobile.de/search-api',
  username: 'dlr_dimitriosmikhovsky',
  password: 'kovoExT0mG3Y',
  customerId: '712285'
};

function getAuthHeader() {
  const credentials = Buffer.from(`${MOBILE_DE_CONFIG.username}:${MOBILE_DE_CONFIG.password}`).toString('base64');
  return `Basic ${credentials}`;
}

async function debugFullXML() {
  try {
    console.log('🔍 Fetching full XML response from Mobile.de...');
    
    const response = await axios.get(`${MOBILE_DE_CONFIG.baseURL}/search`, {
      headers: {
        'Authorization': getAuthHeader(),
        'Accept': 'application/xml',
        'User-Agent': 'Nordhessen-Automobile/1.0'
      },
      params: {
        customerNumber: MOBILE_DE_CONFIG.customerId,
        pageSize: 3 // Get just 3 cars for detailed analysis
      },
      timeout: 10000
    });

    console.log('📊 Full XML Response:');
    console.log('================================================================================');
    console.log(response.data);
    console.log('================================================================================');
    
    // Parse XML to JSON
    const parser = new xml2js.Parser({ explicitArray: false });
    const parsed = await parser.parseStringPromise(response.data);
    
    console.log('\n🔍 Parsed JSON Structure:');
    console.log('================================================================================');
    console.log(JSON.stringify(parsed, null, 2));
    console.log('================================================================================');
    
    // Extract and analyze first ad
    const searchResult = parsed['search:search-result'];
    const ads = searchResult['search:ads']?.['ad:ad'] || [];
    const adsArray = Array.isArray(ads) ? ads : [ads];
    
    if (adsArray.length > 0) {
      console.log('\n🚗 First Ad Analysis:');
      console.log('================================================================================');
      const firstAd = adsArray[0];
      console.log('Ad Key:', firstAd.$?.key);
      console.log('Ad URL:', firstAd.$?.url);
      
      const vehicle = firstAd['ad:vehicle'] || {};
      console.log('\nVehicle Structure:', JSON.stringify(vehicle, null, 2));
      
      const price = firstAd['ad:price'] || {};
      console.log('\nPrice Structure:', JSON.stringify(price, null, 2));
      
      const images = firstAd['ad:images'] || {};
      console.log('\nImages Structure:', JSON.stringify(images, null, 2));
      
      console.log('================================================================================');
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Response:', error.response.data);
    }
  }
}

debugFullXML();