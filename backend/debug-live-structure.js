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

async function debugLiveStructure() {
  try {
    console.log('🔍 Fetching live XML structure from Mobile.de...');
    
    const response = await axios.get(`${MOBILE_DE_CONFIG.baseURL}/search`, {
      headers: {
        'Authorization': getAuthHeader(),
        'Accept': 'application/xml',
        'User-Agent': 'Nordhessen-Automobile/1.0'
      },
      params: {
        customerNumber: MOBILE_DE_CONFIG.customerId,
        pageSize: 1 // Get just 1 car for detailed analysis
      },
      timeout: 10000
    });

    console.log('✅ Got XML response, parsing...');
    
    // Parse XML to JSON
    const parser = new xml2js.Parser({ explicitArray: false });
    const parsed = await parser.parseStringPromise(response.data);
    
    // Extract first ad
    const searchResult = parsed['search:search-result'];
    const ads = searchResult['search:ads']?.['ad:ad'] || [];
    const adsArray = Array.isArray(ads) ? ads : [ads];
    
    if (adsArray.length > 0) {
      const firstAd = adsArray[0];
      console.log('\n🚗 First Ad Complete Structure:');
      console.log('================================================================================');
      console.log(JSON.stringify(firstAd, null, 2));
      console.log('================================================================================');
      
      // Check if ad:specifics exists
      const vehicle = firstAd['ad:vehicle'] || {};
      console.log('\n🔍 Vehicle section keys:', Object.keys(vehicle));
      
      if (vehicle['ad:specifics']) {
        console.log('\n✅ Found ad:specifics section:');
        console.log(JSON.stringify(vehicle['ad:specifics'], null, 2));
      } else {
        console.log('\n❌ No ad:specifics section found in vehicle');
        console.log('Available vehicle keys:', Object.keys(vehicle));
      }
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Response:', error.response.data);
    }
  }
}

debugLiveStructure();