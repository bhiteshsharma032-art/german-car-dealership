const axios = require('axios');

async function debugMobileDeXML() {
  console.log('🔍 Debugging Mobile.de XML Response...\n');

  const credentials = Buffer.from('dlr_dimitriosmikhovsky:kovoExT0mG3Y').toString('base64');
  
  try {
    const response = await axios.get('https://services.mobile.de/search-api/search', {
      params: {
        customerNumber: '712285',
        pageSize: 1
      },
      headers: {
        'Authorization': `Basic ${credentials}`,
        'Accept': 'application/xml',
        'User-Agent': 'Nordhessen-Automobile/1.0'
      },
      timeout: 10000
    });

    console.log('📊 Raw XML Response (first 2000 characters):');
    console.log('=' .repeat(80));
    console.log(response.data.substring(0, 2000));
    console.log('=' .repeat(80));
    
    // Look for specific vehicle data patterns
    console.log('\n🔍 Looking for vehicle data patterns:');
    
    const patterns = [
      'ad:mileage',
      'ad:power',
      'ad:fuel',
      'ad:transmission',
      'ad:first-registration',
      'ad:category',
      'ad:condition',
      'ad:images'
    ];
    
    patterns.forEach(pattern => {
      const matches = response.data.match(new RegExp(`<${pattern}[^>]*>.*?</${pattern}>`, 'g'));
      if (matches) {
        console.log(`✅ Found ${pattern}:`, matches[0].substring(0, 200));
      } else {
        console.log(`❌ Missing ${pattern}`);
      }
    });

  } catch (error) {
    console.error('❌ Debug failed:', error.message);
  }
}

debugMobileDeXML();