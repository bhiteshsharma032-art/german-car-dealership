// Simple test script for mobile.de proxy
const axios = require('axios');

const PROXY_URL = 'http://localhost:5001';

async function testProxy() {
  console.log('🧪 Testing Mobile.de Proxy Server...\n');

  try {
    // Test 1: Health check
    console.log('1. Testing health endpoint...');
    const health = await axios.get(`${PROXY_URL}/health`);
    console.log('✅ Health:', health.data.status);

    // Test 2: API connection test
    console.log('\n2. Testing mobile.de API connection...');
    const test = await axios.get(`${PROXY_URL}/api/test`);
    console.log('✅ API Test:', test.data.message);
    console.log('   Status:', test.data.status);

    // Test 3: Fetch inventory
    console.log('\n3. Testing inventory fetch...');
    const inventory = await axios.get(`${PROXY_URL}/api/inventory?pageSize=5`);
    console.log('✅ Inventory:', inventory.data.message);
    console.log('   Vehicles found:', inventory.data.total);
    
    if (inventory.data.vehicles.length > 0) {
      console.log('   Sample vehicle:', {
        id: inventory.data.vehicles[0].id,
        brand: inventory.data.vehicles[0].brand,
        model: inventory.data.vehicles[0].model,
        price: inventory.data.vehicles[0].price
      });
    }

    console.log('\n🎉 All tests passed! Proxy is working correctly.');

  } catch (error) {
    console.error('\n❌ Test failed:');
    console.error('Status:', error.response?.status);
    console.error('Message:', error.response?.data?.message || error.message);
    
    if (error.response?.data?.error) {
      console.error('API Error:', error.response.data.error);
    }
  }
}

// Run tests
testProxy();