import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

// Create a single supabase client for interacting with your database
// We use the Service Role Key here so the backend has full access to the database
export const supabase = createClient(supabaseUrl, supabaseServiceKey);

/**
 * Saves a contact form submission to Supabase
 */
export const saveContactSubmission = async (data: any) => {
  try {
    const { error } = await supabase
      .from('contact_submissions')
      .insert([
        {
          salutation: data.salutation,
          first_name: data.firstName,
          last_name: data.lastName,
          email: data.email,
          phone: data.phone,
          subject: data.subject,
          car_reference: data.carReference,
          message: data.message,
          created_at: new Date().toISOString(),
        },
      ]);

    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error('Error saving to Supabase (Contact):', error);
    return { success: false, error };
  }
};

/**
 * Saves a trade-in request to Supabase
 */
export const saveTradeInSubmission = async (data: any) => {
  try {
    const { error } = await supabase
      .from('tradein_submissions')
      .insert([
        {
          name: data.name,
          email: data.email,
          phone: data.phone,
          address: data.address,
          vin: data.vin,
          license_plate: data.licensePlate,
          first_registration: data.firstRegistration,
          mileage: data.mileage,
          expected_price: data.expectedPrice,
          accident_free: data.accidentFree,
          accident_damage: data.accidentDamage,
          previous_owners: data.previousOwners,
          repainted: data.repainted,
          repainted_details: data.repaintedDetails,
          replaced_engine_or_gearbox: data.replacedEngineOrGearbox,
          replaced_engine_or_gearbox_details: data.replacedEngineOrGearboxDetails,
          exterior_color: data.exteriorColor,
          is_metallic: data.isMetallic,
          interior_color: data.interiorColor,
          service_history: data.serviceHistory,
          last_inspection_km: data.lastInspectionKm,
          last_inspection_date: data.lastInspectionDate,
          tuv_valid_until: data.tuvValidUntil,
          upholstery: data.upholstery,
          financing: data.financing,
          financing_details: data.financingDetails,
          smokers_car: data.smokersCar,
          re_import: data.reImport,
          message: data.message,
          created_at: new Date().toISOString(),
        },
      ]);

    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error('Error saving to Supabase (Trade-In):', error);
    return { success: false, error };
  }
};

/**
 * Saves a financing request to Supabase
 */
export const saveFinancingSubmission = async (data: any) => {
  try {
    const { error } = await supabase
      .from('financing_submissions')
      .insert([
        {
          name: data.name,
          email: data.email,
          phone: data.phone,
          vehicle_price: data.vehiclePrice,
          down_payment: data.downPayment,
          term: data.term,
          message: data.message,
          created_at: new Date().toISOString(),
        },
      ]);

    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error('Error saving to Supabase (Financing):', error);
    return { success: false, error };
  }
};

/**
 * Retrieves all contact submissions from Supabase
 */
export const getContactSubmissions = async () => {
  try {
    const { data, error } = await supabase
      .from('contact_submissions')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('Error fetching from Supabase (Contact):', error);
    return { success: false, error };
  }
};

/**
 * Retrieves all trade-in submissions from Supabase
 */
export const getTradeInSubmissions = async () => {
  try {
    const { data, error } = await supabase
      .from('tradein_submissions')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    
    // Map snake_case to camelCase for the frontend if necessary
    const mappedData = data.map((item: any) => ({
      id: item.id,
      createdAt: item.created_at,
      status: item.status || 'new',
      name: item.name,
      email: item.email,
      phone: item.phone,
      address: item.address,
      vin: item.vin,
      licensePlate: item.license_plate,
      firstRegistration: item.first_registration,
      mileage: item.mileage,
      expectedPrice: item.expected_price,
      accidentFree: item.accident_free,
      accidentDamage: item.accident_damage,
      previousOwners: item.previous_owners,
      repainted: item.repainted,
      repaintedDetails: item.repainted_details,
      replacedEngineOrGearbox: item.replaced_engine_or_gearbox,
      replacedEngineOrGearboxDetails: item.replaced_engine_or_gearbox_details,
      exteriorColor: item.exterior_color,
      isMetallic: item.is_metallic,
      interiorColor: item.interior_color,
      serviceHistory: item.service_history,
      lastInspectionKm: item.last_inspection_km,
      lastInspectionDate: item.last_inspection_date,
      tuvValidUntil: item.tuv_valid_until,
      upholstery: item.upholstery,
      financing: item.financing,
      financingDetails: item.financing_details,
      smokersCar: item.smokers_car,
      reImport: item.re_import,
      message: item.message,
    }));

    return { success: true, data: mappedData };
  } catch (error) {
    console.error('Error fetching from Supabase (Trade-In):', error);
    return { success: false, error };
  }
};

/**
 * Updates a trade-in submission status in Supabase
 */
export const updateTradeInStatusInDB = async (id: string, status: string) => {
  try {
    const { error } = await supabase
      .from('tradein_submissions')
      .update({ status })
      .eq('id', id);

    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error('Error updating status in Supabase:', error);
    return { success: false, error };
  }
};

/**
 * Deletes a trade-in submission from Supabase
 */
export const deleteTradeInFromDB = async (id: string) => {
  try {
    const { error } = await supabase
      .from('tradein_submissions')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error('Error deleting from Supabase:', error);
    return { success: false, error };
  }
};

/**
 * Retrieves all financing submissions from Supabase
 */
export const getFinancingSubmissions = async () => {
  try {
    const { data, error } = await supabase
      .from('financing_submissions')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('Error fetching from Supabase (Financing):', error);
    return { success: false, error };
  }
};
