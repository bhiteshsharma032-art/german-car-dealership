
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

// Load .env from frontend
dotenv.config({ path: path.join(process.cwd(), 'frontend', '.env') });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error('❌ Missing Supabase credentials in .env');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey); // Using SERVICE ROLE key to bypass RLS

async function testSubmission() {
  console.log('🚀 Starting Supabase Test Submission (SERVICE ROLE)...');
  
  const testData = {
    name: 'TEST (SERVICE ROLE)',
    email: 'test@example.com',
    phone: '123456789',
    address: 'Test Street 1, Kassel',
    vin: 'TESTVIN-BYPASS-RLS',
    license_plate: 'KS-BYPASS-123',
    first_registration: '01/2020',
    mileage: '50000',
    expected_price: '25000',
    accident_free: 'Ja',
    message: 'This is a test submission using the service role key.',
    created_at: new Date().toISOString()
  };

  try {
    const { data, error } = await supabase
      .from('tradein_submissions')
      .insert([testData])
      .select();

    if (error) {
      console.error('❌ Supabase Insert Error:', error.message);
      console.error('Details:', error);
    } else {
      console.log('✅ Success! Data inserted into tradein_submissions (Bypassing RLS):');
      console.log(JSON.stringify(data, null, 2));
    }
  } catch (err) {
    console.error('❌ Unexpected Error:', err);
  }
}

testSubmission();
