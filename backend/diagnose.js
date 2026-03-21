// Backend Diagnostic Script
const fs = require('fs');
const path = require('path');

console.log('🔍 Backend Diagnostic Check\n');
console.log('═'.repeat(60));

// Check 1: .env file
console.log('\n1️⃣ Checking .env file...');
const envPath = path.join(__dirname, '.env');
if (fs.existsSync(envPath)) {
  console.log('   ✅ .env file exists');
  const envContent = fs.readFileSync(envPath, 'utf8');
  const hasUsername = envContent.includes('MOBILEDE_API_USERNAME');
  const hasPassword = envContent.includes('MOBILEDE_API_PASSWORD');
  const hasCustomerId = envContent.includes('MOBILEDE_CUSTOMER_ID');
  const hasPort = envContent.includes('PORT');
  
  console.log(`   ${hasUsername ? '✅' : '❌'} MOBILEDE_API_USERNAME`);
  console.log(`   ${hasPassword ? '✅' : '❌'} MOBILEDE_API_PASSWORD`);
  console.log(`   ${hasCustomerId ? '✅' : '❌'} MOBILEDE_CUSTOMER_ID`);
  console.log(`   ${hasPort ? '✅' : '❌'} PORT`);
} else {
  console.log('   ❌ .env file NOT found');
}

// Check 2: node_modules
console.log('\n2️⃣ Checking node_modules...');
const nodeModulesPath = path.join(__dirname, 'node_modules');
if (fs.existsSync(nodeModulesPath)) {
  console.log('   ✅ node_modules exists');
  
  const requiredPackages = ['express', 'cors', 'dotenv', 'axios', 'xml2js'];
  requiredPackages.forEach(pkg => {
    const pkgPath = path.join(nodeModulesPath, pkg);
    const exists = fs.existsSync(pkgPath);
    console.log(`   ${exists ? '✅' : '❌'} ${pkg}`);
  });
} else {
  console.log('   ❌ node_modules NOT found - Run: npm install');
}

// Check 3: Source files
console.log('\n3️⃣ Checking source files...');
const srcPath = path.join(__dirname, 'src');
if (fs.existsSync(srcPath)) {
  console.log('   ✅ src directory exists');
  
  const requiredFiles = [
    'server.ts',
    'routes/inventory.ts',
    'controllers/inventoryController.ts',
    'services/mobileDeClient.ts'
  ];
  
  requiredFiles.forEach(file => {
    const filePath = path.join(srcPath, file);
    const exists = fs.existsSync(filePath);
    console.log(`   ${exists ? '✅' : '❌'} ${file}`);
  });
} else {
  console.log('   ❌ src directory NOT found');
}

// Check 4: TypeScript
console.log('\n4️⃣ Checking TypeScript...');
const tsconfigPath = path.join(__dirname, 'tsconfig.json');
if (fs.existsSync(tsconfigPath)) {
  console.log('   ✅ tsconfig.json exists');
} else {
  console.log('   ❌ tsconfig.json NOT found');
}

console.log('\n═'.repeat(60));
console.log('\n📋 Next Steps:');
console.log('1. If node_modules missing: npm install');
console.log('2. If .env missing: Copy from .env.example');
console.log('3. Start server: npm run dev');
console.log('4. Check terminal for actual error message\n');
