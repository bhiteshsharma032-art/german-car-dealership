
const { execSync } = require('child_process');
const vars = {
  MOBILEDE_BASE_URL: 'https://services.mobile.de',
  MOBILEDE_API_USERNAME: 'dlr_dimitriosmikhovsky',
  MOBILEDE_API_PASSWORD: 'kovoExT0mG3Y',
  MOBILEDE_CUSTOMER_ID: '712285'
};
for(const [k,v] of Object.entries(vars)) {
  try { execSync('npx vercel env rm ' + k + ' production -y', {stdio:'ignore'}); } catch(e) {}
  console.log('Adding', k);
  execSync('npx vercel env add ' + k + ' production', {
    input: v,
    stdio: ['pipe', 'inherit', 'inherit']
  });
}
