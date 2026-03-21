const axios = require('axios');

async function testAfterRestart() {
  try {
    console.log('🧪 Testing API after restart...');
    
    // Wait a moment for server to be ready
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const response = await axios.get('http://localhost:5001/api/inventory?pageSize=2', {
      headers: {
        'Content-Type': 'application/json'
      },
      timeout: 15000
    });
    
    console.log('✅ API Response Status:', response.status);
    
    if (response.data.success && response.data.data) {
      console.log('\n🚗 Vehicle Details After Restart:');
      response.data.data.forEach((vehicle, index) => {
        console.log(`\n--- Vehicle ${index + 1} ---`);
        console.log('ID:', vehicle.id);
        console.log('Title:', vehicle.title);
        console.log('Make/Model:', `${vehicle.make} ${vehicle.model}`);
        console.log('Price:', vehicle.price.formatted);
        console.log('Mileage:', vehicle.mileage?.formatted || 'N/A');
        console.log('Year:', vehicle.year || 'N/A');
        console.log('Fuel:', vehicle.fuelType || 'N/A');
        console.log('Transmission:', vehicle.transmission || 'N/A');
        console.log('Power:', vehicle.power?.formatted || 'N/A');
        console.log('Color:', vehicle.exteriorColor || 'N/A');
        
        // Check if we have real data now
        const hasRealData = vehicle.mileage?.value > 0 || vehicle.power?.kw > 0 || vehicle.year;
        console.log('Real Data:', hasRealData ? '✅ YES' : '❌ NO');
      });
      
      console.log('\n📊 Summary:');
      console.log('Total vehicles:', response.data.data.length);
      const vehiclesWithRealData = response.data.data.filter(v => 
        v.mileage?.value > 0 || v.power?.kw > 0 || v.year
      );
      console.log('Vehicles with real data:', vehiclesWithRealData.length);
      
      if (vehiclesWithRealData.length > 0) {
        console.log('🎉 SUCCESS! Real vehicle details are now showing correctly!');
      } else {
        console.log('⚠️  Still showing placeholder data - server may need more time to restart');
      }
    }
    
  } catch (error) {
    console.error('❌ Error testing after restart:', error.message);
    if (error.code === 'ECONNREFUSED') {
      console.log('💡 Server not ready yet - please restart the backend server manually');
    }
  }
}

// Run test after a delay to allow server startup
setTimeout(testAfterRestart, 3000);