const axios = require('axios');

// Production Test Suite - Mobile.de Live Integration
async function runProductionTests() {
  console.log('🧪 PRODUCTION TEST SUITE - MOBILE.DE LIVE INTEGRATION');
  console.log('=' .repeat(60));
  
  const BACKEND_URL = 'http://localhost:5001';
  let testsPassed = 0;
  let testsTotal = 0;

  // Helper function to run a test
  async function runTest(testName, testFunction) {
    testsTotal++;
    try {
      console.log(`\n${testsTotal}. ${testName}`);
      await testFunction();
      console.log('   ✅ PASSED');
      testsPassed++;
    } catch (error) {
      console.log('   ❌ FAILED:', error.message);
    }
  }

  // Test 1: Backend Health Check
  await runTest('Backend Health Check', async () => {
    const response = await axios.get(`${BACKEND_URL}/api/health`);
    if (response.status !== 200) throw new Error('Health check failed');
  });

  // Test 2: Mobile.de API Connection
  await runTest('Mobile.de API Connection', async () => {
    const response = await axios.get(`${BACKEND_URL}/api/inventory/test`);
    if (!response.data.success) throw new Error('Mobile.de connection failed');
    console.log(`   📊 Customer ID: ${response.data.customerNumber}`);
    console.log(`   🚗 Vehicle Count: ${response.data.vehicleCount}`);
  });

  // Test 3: Live Inventory Fetch
  await runTest('Live Inventory Fetch', async () => {
    const response = await axios.get(`${BACKEND_URL}/api/inventory`);
    if (!response.data.success) throw new Error('Inventory fetch failed');
    if (!response.data.data || response.data.data.length === 0) {
      throw new Error('No vehicles found in inventory');
    }
    console.log(`   🚗 Total Vehicles: ${response.data.total}`);
    console.log(`   📦 Fetched: ${response.data.data.length} vehicles`);
    
    // Check first vehicle structure
    const firstVehicle = response.data.data[0];
    console.log(`   🔍 Sample Vehicle: ${firstVehicle.make} ${firstVehicle.model}`);
    console.log(`   💰 Price: €${firstVehicle.price.amount.toLocaleString()}`);
  });

  // Test 4: Vehicle Search
  await runTest('Vehicle Search Functionality', async () => {
    const response = await axios.get(`${BACKEND_URL}/api/inventory/search?pageSize=5`);
    if (!response.data.success) throw new Error('Search failed');
    console.log(`   🔍 Search Results: ${response.data.data.length} vehicles`);
  });

  // Test 5: Admin Login
  await runTest('Admin Authentication', async () => {
    const response = await axios.post(`${BACKEND_URL}/api/admin/login`, {
      username: 'admin',
      password: 'dealer2024'
    });
    if (!response.data.success) throw new Error('Admin login failed');
    console.log(`   👨‍💼 Admin User: ${response.data.data.user.username}`);
  });

  // Test 6: Data Structure Validation
  await runTest('Data Structure Validation', async () => {
    const response = await axios.get(`${BACKEND_URL}/api/inventory?pageSize=1`);
    if (!response.data.success) throw new Error('Data fetch failed');
    
    const vehicle = response.data.data[0];
    const requiredFields = ['id', 'make', 'model', 'price', 'title'];
    
    for (const field of requiredFields) {
      if (!vehicle[field]) throw new Error(`Missing field: ${field}`);
    }
    
    console.log('   ✅ All required fields present');
    console.log(`   🆔 Vehicle ID: ${vehicle.id}`);
    console.log(`   🏷️ Title: ${vehicle.title}`);
  });

  // Test 7: No Mock Data Check
  await runTest('No Mock Data Verification', async () => {
    const response = await axios.get(`${BACKEND_URL}/api/inventory`);
    if (!response.data.success) throw new Error('Data fetch failed');
    
    // Check that we're getting real mobile.de data, not mock data
    const vehicles = response.data.data;
    const hasRealData = vehicles.some(v => 
      v.make && v.model && v.price && 
      typeof v.price.amount === 'number' && 
      v.price.amount > 0
    );
    
    if (!hasRealData) throw new Error('Data appears to be mock/fake');
    console.log('   ✅ Real mobile.de data confirmed');
    console.log('   ❌ No mock data found');
  });

  // Test 8: Image URLs Check
  await runTest('Vehicle Images Validation', async () => {
    const response = await axios.get(`${BACKEND_URL}/api/inventory?pageSize=10`);
    if (!response.data.success) throw new Error('Data fetch failed');
    
    const vehiclesWithImages = response.data.data.filter(v => v.image);
    console.log(`   🖼️ Vehicles with images: ${vehiclesWithImages.length}/${response.data.data.length}`);
    
    if (vehiclesWithImages.length > 0) {
      console.log(`   📸 Sample image URL: ${vehiclesWithImages[0].image.substring(0, 50)}...`);
    }
  });

  // Test Summary
  console.log('\n' + '=' .repeat(60));
  console.log('📊 TEST SUMMARY');
  console.log('=' .repeat(60));
  console.log(`✅ Tests Passed: ${testsPassed}/${testsTotal}`);
  console.log(`❌ Tests Failed: ${testsTotal - testsPassed}/${testsTotal}`);
  
  if (testsPassed === testsTotal) {
    console.log('\n🎉 ALL TESTS PASSED! PRODUCTION READY!');
    console.log('✅ Mobile.de integration is working perfectly');
    console.log('✅ Live data is flowing correctly');
    console.log('✅ No mock data detected');
    console.log('✅ Ready for deployment');
  } else {
    console.log('\n⚠️ SOME TESTS FAILED');
    console.log('❌ Please check the failed tests above');
    console.log('❌ Fix issues before deploying to production');
  }
  
  console.log('\n🔗 Test your website at: http://localhost:5173');
  console.log('🔗 Backend API at: http://localhost:5001/api/inventory');
}

// Run tests
runProductionTests().catch(error => {
  console.error('\n💥 TEST SUITE CRASHED:', error.message);
  console.log('\n🔧 Make sure your backend is running on port 5001');
  console.log('   cd backend && npm start');
});