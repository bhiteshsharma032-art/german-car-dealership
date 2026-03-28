// Quick test script to verify backend API
const http = require('http');

const tests = [
  {
    name: 'Backend Health Check',
    path: '/api/health',
    port: 5000
  },
  {
    name: 'Get All Cars',
    path: '/api/cars',
    port: 5000
  },
  {
    name: 'Get Mobile.de Inventory',
    path: '/api/mobilede/inventory',
    port: 5000
  }
];

function testEndpoint(test) {
  return new Promise((resolve) => {
    const options = {
      hostname: 'localhost',
      port: test.port,
      path: test.path,
      method: 'GET',
      timeout: 5000
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        resolve({
          name: test.name,
          status: res.statusCode,
          success: res.statusCode === 200,
          dataLength: data.length
        });
      });
    });

    req.on('error', (error) => {
      resolve({
        name: test.name,
        status: 'ERROR',
        success: false,
        error: error.message
      });
    });

    req.on('timeout', () => {
      req.destroy();
      resolve({
        name: test.name,
        status: 'TIMEOUT',
        success: false,
        error: 'Request timeout'
      });
    });

    req.end();
  });
}

async function runTests() {
  console.log('🧪 Testing Backend API...\n');
  console.log('Make sure your backend is running on port 5000\n');
  console.log('Run: cd backend && npm run dev\n');
  console.log('─'.repeat(60));

  for (const test of tests) {
    const result = await testEndpoint(test);
    const icon = result.success ? '✅' : '❌';
    console.log(`${icon} ${result.name}`);
    console.log(`   Status: ${result.status}`);
    if (result.dataLength) {
      console.log(`   Data Length: ${result.dataLength} bytes`);
    }
    if (result.error) {
      console.log(`   Error: ${result.error}`);
    }
    console.log('');
  }

  console.log('─'.repeat(60));
  console.log('\n📝 Next Steps:');
  console.log('1. Start backend: cd backend && npm run dev');
  console.log('2. Start frontend: cd frontend && npm run dev');
  console.log('3. Open browser: http://localhost:5173');
  console.log('4. Run this test again: node test-app.js\n');
}

runTests();
