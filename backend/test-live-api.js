const axios = require('axios');
const xml2js = require('xml2js');

// Test mobile.de API with new credentials
async function testMobileDeAPI() {
  console.log('🧪 Testing Mobile.de API with NEW credentials...\n');

  const credentials = Buffer.from('dlr_dimitriosmikhovsky:kovoExT0mG3Y').toString('base64');
  
  try {
    console.log('📡 Making API request...');
    const response = await axios.get('https://services.mobile.de/search-api/search', {
      params: {
        customerNumber: '712285',
        pageSize: 3
      },
      headers: {
        'Authorization': `Basic ${credentials}`,
        'Accept': 'application/xml',
        'User-Agent': 'Nordhessen-Automobile/1.0'
      },
      timeout: 10000
    });

    console.log('✅ API Response received!');
    console.log('Status:', response.status);
    console.log('Content-Type:', response.headers['content-type']);
    console.log('Response size:', response.data.length, 'characters\n');

    // Parse XML to JSON
    console.log('🔄 Parsing XML response...');
    const parser = new xml2js.Parser({ explicitArray: false });
    const result = await parser.parseStringPromise(response.data);
    
    const searchResult = result['search:search-result'];
    const total = searchResult['search:total'];
    const ads = searchResult['search:ads']['ad:ad'];
    
    console.log('📊 Results:');
    console.log('Total vehicles:', total);
    console.log('Vehicles in this page:', Array.isArray(ads) ? ads.length : 1);
    
    if (ads) {
      const firstAd = Array.isArray(ads) ? ads[0] : ads;
      console.log('\n🚗 Sample vehicle:');
      console.log('ID:', firstAd.$.key);
      console.log('URL:', firstAd.$.url);
      
      if (firstAd['ad:vehicle']) {
        const vehicle = firstAd['ad:vehicle'];
        console.log('Make:', vehicle['ad:make']);
        console.log('Model:', vehicle['ad:model']);
        
        if (firstAd['ad:price']) {
          console.log('Price:', firstAd['ad:price']['ad:consumer-price-amount'], firstAd['ad:price']['ad:currency']);
        }
      }
    }

    console.log('\n🎉 SUCCESS! Mobile.de API is working perfectly!');
    console.log('✅ Credentials are valid');
    console.log('✅ Data is being returned');
    console.log('✅ Ready for integration');

  } catch (error) {
    console.error('❌ API Test failed:');
    console.error('Status:', error.response?.status);
    console.error('Message:', error.message);
    
    if (error.response?.data) {
      console.error('Response:', error.response.data.substring(0, 500));
    }
  }
}

// Install xml2js if not present
console.log('Installing xml2js parser...');
require('child_process').exec('npm install xml2js', (error) => {
  if (error) {
    console.log('xml2js might already be installed, continuing...');
  }
  testMobileDeAPI();
});