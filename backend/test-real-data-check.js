const axios = require('axios');

// Colors for better output
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

function log(color, message) {
  console.log(`${color}${message}${colors.reset}`);
}

async function testRealDataFetching() {
  console.log(`${colors.bold}🔍 COMPREHENSIVE REAL DATA TEST${colors.reset}`);
  console.log('================================================================================');
  
  let allTestsPassed = true;
  
  // Test 1: Check if server is running
  log(colors.blue, '\n📡 TEST 1: Server Connection');
  try {
    const healthCheck = await axios.get('http://localhost:5001/api/health', { timeout: 5000 });
    log(colors.green, '✅ Server is running on port 5001');
  } catch (error) {
    log(colors.red, '❌ Server not running on port 5001');
    
    // Try port 5000
    try {
      const healthCheck = await axios.get('http://localhost:5000/api/health', { timeout: 5000 });
      log(colors.green, '✅ Server is running on port 5000');
    } catch (error2) {
      log(colors.red, '❌ Server not running on port 5000 either');
      log(colors.yellow, '💡 Please start the backend server first: npm start');
      return;
    }
  }
  
  // Determine correct port
  let serverPort = 5001;
  try {
    await axios.get('http://localhost:5001/api/health', { timeout: 2000 });
  } catch {
    serverPort = 5000;
  }
  
  log(colors.blue, `\n📊 TEST 2: Inventory API Response (Port ${serverPort})`);
  try {
    const response = await axios.get(`http://localhost:${serverPort}/api/inventory?pageSize=3`, {
      headers: { 'Content-Type': 'application/json' },
      timeout: 15000
    });
    
    log(colors.green, `✅ API responded with status: ${response.status}`);
    
    if (response.data.success) {
      log(colors.green, `✅ API success: ${response.data.message || 'OK'}`);
      log(colors.green, `✅ Total vehicles available: ${response.data.total || 'Unknown'}`);
      log(colors.green, `✅ Vehicles in response: ${response.data.data?.length || 0}`);
    } else {
      log(colors.red, `❌ API returned success: false`);
      log(colors.red, `❌ Error: ${response.data.error || 'Unknown error'}`);
      allTestsPassed = false;
    }
    
    // Test 3: Analyze vehicle data quality
    log(colors.blue, '\n🚗 TEST 3: Vehicle Data Quality Analysis');
    
    if (response.data.data && response.data.data.length > 0) {
      const vehicles = response.data.data;
      let realDataCount = 0;
      let placeholderDataCount = 0;
      
      console.log('\n--- DETAILED VEHICLE ANALYSIS ---');
      
      vehicles.forEach((vehicle, index) => {
        console.log(`\n🚙 Vehicle ${index + 1}: ${vehicle.id}`);
        console.log(`   Title: ${vehicle.title || 'N/A'}`);
        console.log(`   Make/Model: ${vehicle.make} ${vehicle.model}`);
        console.log(`   Price: ${vehicle.price?.formatted || 'N/A'}`);
        
        // Check mileage
        const mileage = vehicle.mileage?.value || 0;
        const mileageStatus = mileage > 0 ? '✅ REAL' : '❌ PLACEHOLDER';
        console.log(`   Mileage: ${vehicle.mileage?.formatted || 'N/A'} ${mileageStatus}`);
        
        // Check power
        const power = vehicle.power?.kw || 0;
        const powerStatus = power > 0 ? '✅ REAL' : '❌ PLACEHOLDER';
        console.log(`   Power: ${vehicle.power?.formatted || 'N/A'} ${powerStatus}`);
        
        // Check year
        const year = vehicle.year;
        const yearStatus = year ? '✅ REAL' : '❌ PLACEHOLDER';
        console.log(`   Year: ${year || 'N/A'} ${yearStatus}`);
        
        // Check fuel type
        const fuel = vehicle.fuelType;
        const fuelStatus = fuel && fuel !== 'undefined' ? '✅ REAL' : '❌ PLACEHOLDER';
        console.log(`   Fuel: ${fuel || 'N/A'} ${fuelStatus}`);
        
        // Check transmission
        const transmission = vehicle.transmission;
        const transmissionStatus = transmission && transmission !== 'undefined' ? '✅ REAL' : '❌ PLACEHOLDER';
        console.log(`   Transmission: ${transmission || 'N/A'} ${transmissionStatus}`);
        
        // Check color
        const color = vehicle.exteriorColor;
        const colorStatus = color && color !== 'undefined' && color !== 'Unknown' ? '✅ REAL' : '❌ PLACEHOLDER';
        console.log(`   Color: ${color || 'N/A'} ${colorStatus}`);
        
        // Determine if this vehicle has real data
        const hasRealData = mileage > 0 || power > 0 || year || (fuel && fuel !== 'undefined');
        if (hasRealData) {
          realDataCount++;
          log(colors.green, `   ✅ REAL DATA DETECTED`);
        } else {
          placeholderDataCount++;
          log(colors.red, `   ❌ PLACEHOLDER DATA DETECTED`);
        }
      });
      
      // Test 4: Overall data quality assessment
      log(colors.blue, '\n📈 TEST 4: Data Quality Summary');
      console.log(`Total vehicles analyzed: ${vehicles.length}`);
      console.log(`Vehicles with real data: ${realDataCount}`);
      console.log(`Vehicles with placeholder data: ${placeholderDataCount}`);
      
      const realDataPercentage = (realDataCount / vehicles.length) * 100;
      
      if (realDataPercentage >= 80) {
        log(colors.green, `✅ EXCELLENT: ${realDataPercentage.toFixed(1)}% real data`);
      } else if (realDataPercentage >= 50) {
        log(colors.yellow, `⚠️  PARTIAL: ${realDataPercentage.toFixed(1)}% real data`);
        allTestsPassed = false;
      } else {
        log(colors.red, `❌ POOR: ${realDataPercentage.toFixed(1)}% real data`);
        allTestsPassed = false;
      }
      
    } else {
      log(colors.red, '❌ No vehicle data in response');
      allTestsPassed = false;
    }
    
  } catch (error) {
    log(colors.red, `❌ API request failed: ${error.message}`);
    if (error.code === 'ECONNREFUSED') {
      log(colors.yellow, '💡 Server connection refused - is the backend running?');
    }
    allTestsPassed = false;
  }
  
  // Test 5: Direct Mobile.de API test
  log(colors.blue, '\n🌐 TEST 5: Direct Mobile.de API Test');
  try {
    const mobileDeResponse = await axios.get('https://services.mobile.de/search-api/search', {
      headers: {
        'Authorization': 'Basic ' + Buffer.from('dlr_dimitriosmikhovsky:kovoExT0mG3Y').toString('base64'),
        'Accept': 'application/xml',
        'User-Agent': 'Nordhessen-Automobile/1.0'
      },
      params: {
        customerNumber: '712285',
        pageSize: 1
      },
      timeout: 10000
    });
    
    log(colors.green, '✅ Direct Mobile.de API connection successful');
    log(colors.green, `✅ Response size: ${response.data.length} characters`);
    
    // Check if XML contains vehicle data
    if (response.data.includes('<ad:ad key=')) {
      log(colors.green, '✅ XML contains vehicle ads');
    } else {
      log(colors.red, '❌ XML does not contain vehicle ads');
    }
    
  } catch (error) {
    log(colors.red, `❌ Direct Mobile.de API failed: ${error.message}`);
    allTestsPassed = false;
  }
  
  // Final result
  console.log('\n================================================================================');
  if (allTestsPassed) {
    log(colors.green, `${colors.bold}🎉 ALL TESTS PASSED! Real data is being fetched correctly!${colors.reset}`);
    log(colors.green, '✅ Your inventory should show real vehicle details');
  } else {
    log(colors.red, `${colors.bold}❌ SOME TESTS FAILED! Issues detected with real data fetching${colors.reset}`);
    log(colors.yellow, '💡 Possible solutions:');
    log(colors.yellow, '   1. Restart the backend server: npm start');
    log(colors.yellow, '   2. Check if the updated code is deployed');
    log(colors.yellow, '   3. Verify Mobile.de API credentials');
  }
  console.log('================================================================================');
}

// Run the test
testRealDataFetching().catch(error => {
  log(colors.red, `💥 Test crashed: ${error.message}`);
});