
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

// Load .env from frontend
dotenv.config({ path: path.join(process.cwd(), 'frontend', '.env') });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testMinimal() {
  console.log('🚀 Testing MINIMAL submission (Anon Key)...');
  
  const testData = {
    name: 'MINIMAL TEST',
    email: 'minimal@test.com'
  };

  try {
    const { data, error } = await supabase
      .from('tradein_submissions')
      .insert([testData])
      .select();

    if (error) {
      console.error('❌ Error:', error.code, error.message);
    } else {
      console.log('✅ Success! Minimal insert worked.');
      console.log(data);
    }
  } catch (err) {
    console.error('❌ Fatal:', err);
  }
}

testMinimal();
