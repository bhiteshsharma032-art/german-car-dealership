// Test script for mobile.de Seller-API integration
const axios = require('axios');

const API_BASE = 'http://localhost:5000/api';

async function testMobileDeIntegration() {
  console.log('🧪 Testing Mobile.de Seller-API Integration\n');

  try {
    // Test 1: Health check
    console.log('1. Testing server health...');
    const health = await axios.get(`${API_BASE}/health`);
    console.log('✅ Server health:', health.data.status);

    // Test 2: Mobile.de API connection test
    console.log('\n2. Testing mobile.de API connection...');
    try {
      const connection = await axios.get(`${API_BASE}/mobilede/test-connection`);
      console.log('✅ Mobile.de connection:', connection.data.message);
      console.log('   Sellers found:', connection.data.sellersCount);
      
      if (connection.data.sellers && connection.data.sellers.length > 0) {
        console.log('   First seller:', {
          id: connection.data.sellers[0].mobileSellerId,
          siteId: connection.data.sellers[0].siteId,
          readonly: connection.data.sellers[0].readonly
        });
      }
    } catch (error) {
      console.log('❌ Mobile.de connection failed:');
      console.log('   Status:', error.response?.status);
      console.log('   Message:', error.response?.data?.message);
      
      if (error.response?.status === 401) {
        console.log('\n🔐 401 Unauthorized - Check your credentials:');
        console.log('   - Verify MOBILEDE_API_USERNAME is correct');
        console.log('   - Verify MOBILEDE_API_PASSWORD is correct');
        console.log('   - Ensure API access is activated by mobile.de');
        console.log('   - Check if using correct base URL');
      }
      
      return; // Stop here if connection fails
    }

    // Test 3: Get sellers
    console.log('\n3. Testing sellers endpoint...');
    try {
      const sellers = await axios.get(`${API_BASE}/mobilede/sellers`);
      console.log('✅ Sellers retrieved:', sellers.data.sellers.length);
    } catch (error) {
      console.log('❌ Sellers fetch failed:', error.response?.data?.message);
    }

    // Test 4: Get inventory
    console.log('\n4. Testing inventory endpoint...');
    try {
      const inventory = await axios.get(`${API_BASE}/inventory`);
      console.log('✅ Inventory retrieved:', inventory.data.total, 'vehicles');
      
      if (inventory.data.vehicles && inventory.data.vehicles.length > 0) {
        console.log('   Sample vehicle:', {
          id: inventory.data.vehicles[0].mobileAdId,
          make: inventory.data.vehicles[0].make,
          model: inventory.data.vehicles[0].model
        });
      }
    } catch (error) {
      console.log('❌ Inventory fetch failed:', error.response?.data?.message);
    }

    console.log('\n🎉 Integration test completed!');

  } catch (error) {
    console.error('\n❌ Test failed:', error.message);
    
    if (error.code === 'ECONNREFUSED') {
      console.log('\n💡 Server not running. Start it with:');
      console.log('   cd backend && npm run dev');
    }
  }
}

// Run tests
testMobileDeIntegration();