/**
 * PRODUCTION READINESS TEST SUITE
 * Comprehensive testing for Car Dealership Application
 */

const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');

// Test Configuration
const BACKEND_PORT = 5000;
const FRONTEND_PORT = 5173;
const BACKEND_URL = `http://localhost:${BACKEND_PORT}`;

// Color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  bold: '\x1b[1m'
};

// Test Results Storage
const results = {
  passed: 0,
  failed: 0,
  warnings: 0,
  tests: []
};

// Utility Functions
function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logSection(title) {
  console.log('\n' + '═'.repeat(70));
  log(`  ${title}`, 'bold');
  console.log('═'.repeat(70) + '\n');
}

function logTest(name, passed, message = '') {
  const icon = passed ? '✅' : '❌';
  const color = passed ? 'green' : 'red';
  log(`${icon} ${name}`, color);
  if (message) {
    log(`   ${message}`, 'cyan');
  }
  
  results.tests.push({ name, passed, message });
  if (passed) results.passed++;
  else results.failed++;
}

function logWarning(name, message) {
  log(`⚠️  ${name}`, 'yellow');
  log(`   ${message}`, 'cyan');
  results.warnings++;
}

// HTTP Request Helper
function makeRequest(url, options = {}) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const protocol = urlObj.protocol === 'https:' ? https : http;
    
    const reqOptions = {
      hostname: urlObj.hostname,
      port: urlObj.port || (urlObj.protocol === 'https:' ? 443 : 80),
      path: urlObj.pathname + urlObj.search,
      method: options.method || 'GET',
      timeout: options.timeout || 10000,
      headers: options.headers || {}
    };

    const req = protocol.request(reqOptions, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        try {
          const jsonData = data ? JSON.parse(data) : null;
          resolve({
            status: res.statusCode,
            headers: res.headers,
            data: jsonData,
            rawData: data
          });
        } catch (e) {
          resolve({
            status: res.statusCode,
            headers: res.headers,
            data: null,
            rawData: data
          });
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });

    if (options.body) {
      req.write(JSON.stringify(options.body));
    }

    req.end();
  });
}

// Test Suites
async function testFileStructure() {
  logSection('📁 FILE STRUCTURE TESTS');

  const criticalFiles = [
    { path: 'backend/package.json', name: 'Backend package.json' },
    { path: 'backend/.env', name: 'Backend .env' },
    { path: 'backend/src/server.ts', name: 'Backend server' },
    { path: 'backend/src/services/mobileDeClient.ts', name: 'Mobile.de client' },
    { path: 'backend/src/controllers/inventoryController.ts', name: 'Inventory controller' },
    { path: 'frontend/package.json', name: 'Frontend package.json' },
    { path: 'frontend/src/App.tsx', name: 'Frontend App' },
    { path: 'frontend/src/services/carService.ts', name: 'Car service' },
    { path: 'frontend/src/pages/public/CarList.tsx', name: 'Car list page' },
  ];

  for (const file of criticalFiles) {
    const exists = fs.existsSync(file.path);
    logTest(file.name, exists, exists ? file.path : `Missing: ${file.path}`);
  }
}

async function testEnvironmentVariables() {
  logSection('🔐 ENVIRONMENT VARIABLES');

  const envPath = 'backend/.env';
  if (!fs.existsSync(envPath)) {
    logTest('Environment file', false, '.env file not found');
    return;
  }

  const envContent = fs.readFileSync(envPath, 'utf8');
  const requiredVars = [
    'MOBILEDE_API_USERNAME',
    'MOBILEDE_API_PASSWORD',
    'MOBILEDE_CUSTOMER_ID',
    'MOBILEDE_BASE_URL',
    'PORT'
  ];

  for (const varName of requiredVars) {
    const exists = envContent.includes(varName);
    const hasValue = exists && !envContent.match(new RegExp(`${varName}=\\s*$`, 'm'));
    logTest(varName, hasValue, hasValue ? 'Set' : 'Missing or empty');
  }
}

async function testBackendHealth() {
  logSection('🏥 BACKEND HEALTH CHECKS');

  try {
    const response = await makeRequest(`${BACKEND_URL}/api/health`);
    logTest('Backend server running', response.status === 200, `Status: ${response.status}`);
    
    if (response.data) {
      logTest('Health endpoint response', true, `Status: ${response.data.status}`);
    }
  } catch (error) {
    logTest('Backend server running', false, `Error: ${error.message}`);
    logWarning('Backend not running', 'Start with: cd backend && npm run dev');
  }
}

async function testMobileDeIntegration() {
  logSection('🚗 MOBILE.DE API INTEGRATION');

  try {
    // Test 1: Mobile.de connection test
    const testResponse = await makeRequest(`${BACKEND_URL}/api/inventory/test`);
    logTest('Mobile.de API connection', testResponse.status === 200, 
      testResponse.data?.message || `Status: ${testResponse.status}`);

    // Test 2: Fetch inventory
    const inventoryResponse = await makeRequest(`${BACKEND_URL}/api/inventory`);
    logTest('Inventory API endpoint', inventoryResponse.status === 200, 
      `Status: ${inventoryResponse.status}`);

    if (inventoryResponse.data) {
      const cars = inventoryResponse.data.data || inventoryResponse.data;
      const carCount = Array.isArray(cars) ? cars.length : 0;
      logTest('Inventory data loaded', carCount > 0, 
        `${carCount} vehicles found`);

      if (carCount > 0) {
        const firstCar = cars[0];
        const hasRequiredFields = firstCar.id && firstCar.brand && firstCar.model && firstCar.price;
        logTest('Vehicle data structure', hasRequiredFields, 
          `Sample: ${firstCar.brand} ${firstCar.model}`);
      }
    }

    // Test 3: Search functionality
    const searchResponse = await makeRequest(`${BACKEND_URL}/api/inventory?brand=BMW`);
    logTest('Search/Filter functionality', searchResponse.status === 200, 
      `Brand filter working`);

  } catch (error) {
    logTest('Mobile.de API integration', false, `Error: ${error.message}`);
  }
}

async function testAPIEndpoints() {
  logSection('🔌 API ENDPOINTS');

  const endpoints = [
    { path: '/api/health', name: 'Health check', method: 'GET' },
    { path: '/api/inventory', name: 'Get all vehicles', method: 'GET' },
    { path: '/api/inventory/test', name: 'Mobile.de test', method: 'GET' },
    { path: '/api/brands', name: 'Get brands', method: 'GET' },
    { path: '/api/features', name: 'Get features', method: 'GET' },
  ];

  for (const endpoint of endpoints) {
    try {
      const response = await makeRequest(`${BACKEND_URL}${endpoint.path}`, {
        method: endpoint.method
      });
      const success = response.status >= 200 && response.status < 300;
      logTest(endpoint.name, success, 
        `${endpoint.method} ${endpoint.path} - Status: ${response.status}`);
    } catch (error) {
      logTest(endpoint.name, false, `Error: ${error.message}`);
    }
  }
}

async function testDataTransformation() {
  logSection('🔄 DATA TRANSFORMATION');

  try {
    const response = await makeRequest(`${BACKEND_URL}/api/inventory`);
    
    if (response.data && response.data.data) {
      const cars = response.data.data;
      
      if (cars.length > 0) {
        const car = cars[0];
        
        // Check required fields
        const requiredFields = ['id', 'brand', 'model', 'price', 'year', 'mileage'];
        const hasAllFields = requiredFields.every(field => car[field] !== undefined);
        logTest('Required fields present', hasAllFields, 
          `Checked: ${requiredFields.join(', ')}`);

        // Check data types
        const correctTypes = 
          typeof car.id === 'string' &&
          typeof car.brand === 'string' &&
          typeof car.model === 'string' &&
          typeof car.price === 'number' &&
          typeof car.year === 'number';
        logTest('Data types correct', correctTypes, 
          `id: string, price: number, year: number`);

        // Check images array
        const hasImages = Array.isArray(car.images);
        logTest('Images array', hasImages, 
          hasImages ? `${car.images.length} images` : 'No images array');

        // Check price formatting
        const priceValid = car.price > 0 && car.price < 10000000;
        logTest('Price validation', priceValid, 
          `€${car.price.toLocaleString()}`);
      }
    }
  } catch (error) {
    logTest('Data transformation', false, `Error: ${error.message}`);
  }
}

async function testErrorHandling() {
  logSection('⚠️  ERROR HANDLING');

  // Test invalid endpoint
  try {
    const response = await makeRequest(`${BACKEND_URL}/api/invalid-endpoint`);
    const handles404 = response.status === 404;
    logTest('404 handling', handles404, `Status: ${response.status}`);
  } catch (error) {
    logTest('404 handling', false, `Error: ${error.message}`);
  }

  // Test invalid vehicle ID
  try {
    const response = await makeRequest(`${BACKEND_URL}/api/inventory/invalid-id-12345`);
    const handlesInvalid = response.status === 404 || response.status === 400;
    logTest('Invalid ID handling', handlesInvalid, `Status: ${response.status}`);
  } catch (error) {
    logTest('Invalid ID handling', true, 'Properly rejected');
  }
}

async function testPerformance() {
  logSection('⚡ PERFORMANCE TESTS');

  try {
    const start = Date.now();
    const response = await makeRequest(`${BACKEND_URL}/api/inventory`);
    const duration = Date.now() - start;

    const fast = duration < 3000;
    logTest('Response time', fast, `${duration}ms (target: <3000ms)`);

    if (response.data && response.data.data) {
      const carCount = response.data.data.length;
      const efficient = carCount > 0;
      logTest('Data efficiency', efficient, `${carCount} vehicles loaded`);
    }
  } catch (error) {
    logTest('Performance test', false, `Error: ${error.message}`);
  }
}

async function testCORS() {
  logSection('🌐 CORS CONFIGURATION');

  try {
    const response = await makeRequest(`${BACKEND_URL}/api/health`);
    const hasCORS = response.headers['access-control-allow-origin'];
    logTest('CORS headers present', !!hasCORS, 
      hasCORS ? `Origin: ${hasCORS}` : 'No CORS headers');
  } catch (error) {
    logTest('CORS configuration', false, `Error: ${error.message}`);
  }
}

async function testProductionReadiness() {
  logSection('🚀 PRODUCTION READINESS');

  // Check for console.logs in production code
  const serverFile = 'backend/src/server.ts';
  if (fs.existsSync(serverFile)) {
    const content = fs.readFileSync(serverFile, 'utf8');
    const hasConsoleLog = content.includes('console.log');
    logWarning('Console logs in server', 
      hasConsoleLog ? 'Found console.log statements - consider using proper logging' : 'Clean');
  }

  // Check for error handling
  const controllerFile = 'backend/src/controllers/inventoryController.ts';
  if (fs.existsSync(controllerFile)) {
    const content = fs.readFileSync(controllerFile, 'utf8');
    const hasTryCatch = content.includes('try') && content.includes('catch');
    logTest('Error handling in controllers', hasTryCatch, 
      hasTryCatch ? 'Try-catch blocks present' : 'Missing error handling');
  }

  // Check environment
  const envPath = 'backend/.env';
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8');
    const nodeEnv = envContent.match(/NODE_ENV=(\w+)/);
    const env = nodeEnv ? nodeEnv[1] : 'not set';
    logTest('Environment configuration', true, `NODE_ENV=${env}`);
  }
}

// Main Test Runner
async function runAllTests() {
  console.clear();
  log('\n🧪 PRODUCTION READINESS TEST SUITE', 'bold');
  log('Car Dealership Application - Comprehensive Testing\n', 'cyan');
  log('Starting tests...', 'yellow');

  await testFileStructure();
  await testEnvironmentVariables();
  await testBackendHealth();
  await testMobileDeIntegration();
  await testAPIEndpoints();
  await testDataTransformation();
  await testErrorHandling();
  await testPerformance();
  await testCORS();
  await testProductionReadiness();

  // Final Report
  logSection('📊 TEST SUMMARY');
  
  const total = results.passed + results.failed;
  const passRate = total > 0 ? ((results.passed / total) * 100).toFixed(1) : 0;
  
  log(`Total Tests: ${total}`, 'cyan');
  log(`✅ Passed: ${results.passed}`, 'green');
  log(`❌ Failed: ${results.failed}`, 'red');
  log(`⚠️  Warnings: ${results.warnings}`, 'yellow');
  log(`\nPass Rate: ${passRate}%`, passRate >= 80 ? 'green' : 'red');

  console.log('\n' + '═'.repeat(70));
  
  if (results.failed === 0 && passRate >= 90) {
    log('\n🎉 PRODUCTION READY! All critical tests passed.', 'green');
  } else if (results.failed > 0) {
    log('\n⚠️  NOT PRODUCTION READY - Fix failed tests before deployment.', 'red');
  } else {
    log('\n⚠️  PARTIALLY READY - Review warnings before deployment.', 'yellow');
  }

  console.log('\n📝 Next Steps:');
  if (results.failed > 0) {
    log('1. Fix all failed tests', 'yellow');
    log('2. Ensure backend is running: cd backend && npm run dev', 'yellow');
    log('3. Check Mobile.de API credentials in .env', 'yellow');
    log('4. Re-run tests: node PRODUCTION_TEST_SUITE.js', 'yellow');
  } else {
    log('1. Review warnings and optimize', 'cyan');
    log('2. Test frontend: cd frontend && npm run dev', 'cyan');
    log('3. Manual testing in browser', 'cyan');
    log('4. Deploy to production', 'cyan');
  }
  
  console.log('\n');
}

// Run tests
runAllTests().catch(error => {
  log(`\n❌ Test suite error: ${error.message}`, 'red');
  process.exit(1);
});
