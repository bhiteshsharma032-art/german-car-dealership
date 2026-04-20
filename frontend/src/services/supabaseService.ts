import { supabase } from '../lib/supabase';

/**
 * Supabase Form Submission Service
 * Stores all form submissions in Supabase tables in parallel with email sending.
 * 
 * Required Supabase tables:
 * 
 * 1. `contact_submissions` — for Contact form
 *    - id (uuid, primary key, default gen_random_uuid())
 *    - salutation (text)
 *    - first_name (text)
 *    - last_name (text)
 *    - email (text)
 *    - phone (text)
 *    - subject (text)
 *    - car_reference (text, nullable)
 *    - message (text)
 *    - created_at (timestamptz, default now())
 * 
 * 2. `tradein_submissions` — for Trade-In form
 *    - id (uuid, primary key, default gen_random_uuid())
 *    - name (text)
 *    - email (text)
 *    - phone (text)
 *    - address (text)
 *    - vin (text)
 *    - license_plate (text, nullable)
 *    - first_registration (text)
 *    - mileage (text)
 *    - expected_price (text, nullable)
 *    - accident_free (text, nullable)
 *    - accident_damage (text, nullable)
 *    - previous_owners (text, nullable)
 *    - repainted (text, nullable)
 *    - repainted_details (text, nullable)
 *    - replaced_engine_or_gearbox (text, nullable)
 *    - replaced_engine_or_gearbox_details (text, nullable)
 *    - exterior_color (text, nullable)
 *    - is_metallic (boolean, default false)
 *    - interior_color (text, nullable)
 *    - service_history (text, nullable)
 *    - last_inspection_km (text, nullable)
 *    - last_inspection_date (text, nullable)
 *    - tuv_valid_until (text, nullable)
 *    - upholstery (text, nullable)
 *    - financing (text, nullable)
 *    - financing_details (text, nullable)
 *    - smokers_car (text, nullable)
 *    - re_import (text, nullable)
 *    - message (text, nullable)
 *    - created_at (timestamptz, default now())
 */

export interface ContactFormData {
  salutation: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  subject: string;
  carReference?: string;
  message: string;
}

export interface TradeInFormData {
  name: string;
  address: string;
  phone: string;
  email: string;
  vin: string;
  licensePlate: string;
  firstRegistration: string;
  accidentFree: string;
  accidentDamage: string;
  previousOwners: string;
  repainted: string;
  repaintedDetails: string;
  replacedEngineOrGearbox: string;
  replacedEngineOrGearboxDetails: string;
  exteriorColor: string;
  isMetallic: boolean;
  interiorColor: string;
  serviceHistory: string;
  lastInspectionKm: string;
  lastInspectionDate: string;
  tuvValidUntil: string;
  mileage: string;
  upholstery: string;
  expectedPrice: string;
  financing: string;
  financingDetails: string;
  smokersCar: string;
  reImport: string;
  message: string;
}

/**
 * Save a contact form submission to Supabase.
 * Fire-and-forget — errors are logged but don't affect the main flow.
 */
export async function saveContactToSupabase(data: ContactFormData): Promise<void> {
  try {
    const { error } = await supabase.from('contact_submissions').insert({
      salutation: data.salutation,
      first_name: data.firstName,
      last_name: data.lastName,
      email: data.email,
      phone: data.phone,
      subject: data.subject,
      car_reference: data.carReference || null,
      message: data.message,
    });

    if (error) {
      console.error('Supabase contact insert error:', error);
    } else {
      console.log('Contact submission saved to Supabase');
    }
  } catch (err) {
    console.error('Supabase contact save failed:', err);
  }
}

/**
 * Save a trade-in form submission to Supabase.
 * Fire-and-forget — errors are logged but don't affect the main flow.
 */
export async function saveTradeInToSupabase(data: TradeInFormData): Promise<void> {
  try {
    const { error } = await supabase.from('tradein_submissions').insert({
      name: data.name,
      email: data.email,
      phone: data.phone,
      address: data.address,
      vin: data.vin,
      license_plate: data.licensePlate || null,
      first_registration: data.firstRegistration,
      mileage: data.mileage,
      expected_price: data.expectedPrice || null,
      accident_free: data.accidentFree || null,
      accident_damage: data.accidentDamage || null,
      previous_owners: data.previousOwners || null,
      repainted: data.repainted || null,
      repainted_details: data.repaintedDetails || null,
      replaced_engine_or_gearbox: data.replacedEngineOrGearbox || null,
      replaced_engine_or_gearbox_details: data.replacedEngineOrGearboxDetails || null,
      exterior_color: data.exteriorColor || null,
      is_metallic: data.isMetallic || false,
      interior_color: data.interiorColor || null,
      service_history: data.serviceHistory || null,
      last_inspection_km: data.lastInspectionKm || null,
      last_inspection_date: data.lastInspectionDate || null,
      tuv_valid_until: data.tuvValidUntil || null,
      upholstery: data.upholstery || null,
      financing: data.financing || null,
      financing_details: data.financingDetails || null,
      smokers_car: data.smokersCar || null,
      re_import: data.reImport || null,
      message: data.message || null,
    });

    if (error) {
      console.error('Supabase trade-in insert error:', error);
    } else {
      console.log('Trade-in submission saved to Supabase');
    }
  } catch (err) {
    console.error('Supabase trade-in save failed:', err);
  }
}
