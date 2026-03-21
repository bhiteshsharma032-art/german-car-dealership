const axios = require('axios');

async function testInventoryAPI() {
  try {
    console.log('🧪 Testing Inventory API...');
    
    const response = await axios.get('http://localhost:5001/api/inventory?pageSize=1', {
      headers: {
        'Content-Type': 'application/json'
      },
      timeout: 15000
    });
    
    console.log('✅ API Response Status:', response.status);
    console.log('📊 Response Data:', JSON.stringify(response.data, null, 2));
    
    if (response.data.success && response.data.data) {
      console.log('\n🚗 Vehicle Details:');
      response.data.data.forEach((vehicle, index) => {
        console.log(`\n--- Vehicle ${index + 1} ---`);
        console.log('ID:', vehicle.id);
        console.log('Title:', vehicle.title);
        console.log('Make:', vehicle.make);
        console.log('Model:', vehicle.model);
        console.log('Price:', vehicle.price.formatted);
        console.log('Mileage:', vehicle.mileage.formatted);
        console.log('Year:', vehicle.year);
        console.log('Fuel:', vehicle.fuelType);
        console.log('Transmission:', vehicle.transmission);
        console.log('Power:', vehicle.power.formatted);
        console.log('Color:', vehicle.exteriorColor);
        console.log('Features:', vehicle.features?.slice(0, 3).join(', ') + '...');
      });
    }
    
  } catch (error) {
    console.error('❌ Error testing inventory API:', error.message);
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
    }
  }
}

testInventoryAPI();