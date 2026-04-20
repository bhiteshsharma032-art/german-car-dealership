import { Request, Response } from 'express';
import { sendTradeInEmail, sendTradeInConfirmationEmail } from '../services/emailService';
import { 
  saveTradeInSubmission, 
  getTradeInSubmissions, 
  updateTradeInStatusInDB,
  deleteTradeInFromDB
} from '../services/supabaseService';

// Define the interface for a trade-in request
export interface TradeInRequest {
  id: string;
  createdAt: string;
  status: 'new' | 'reviewed' | 'contacted' | 'completed';
  
  // Personal Data
  name: string; // Name, Vorname
  address: string; // Plz, Ort, Straße und Nr.
  phone: string;
  email: string;
  
  // Vehicle Data
  vin: string; // Fahrgestellnummer
  licensePlate: string; // Kennzeichen
  firstRegistration: string; // Erstzulassung
  
  accidentFree: 'Ja' | 'Nein' | '';
  accidentDamage: string;
  
  previousOwners: string;
  
  repainted: 'Ja' | 'Nein' | '';
  repaintedDetails: string;
  
  replacedEngineOrGearbox: 'Ja' | 'Nein' | '';
  replacedEngineOrGearboxDetails: string;
  
  exteriorColor: string;
  isMetallic: boolean;
  
  interiorColor: string;
  
  serviceHistory: 'Ja' | 'Nein' | '';
  
  lastInspectionKm: string;
  lastInspectionDate: string;
  
  tuvValidUntil: string;
  mileage: string;
  
  upholstery: 'Stoff' | 'Leder' | 'Teilleder' | '';
  expectedPrice: string;
  
  financing: 'Ja' | 'Nein' | '';
  financingDetails: string;
  
  smokersCar: 'Ja' | 'Nein' | '';
  reImport: 'Ja' | 'Nein' | '';

  // Kept from previous generic form just in case
  make?: string;
  model?: string;
  fuelType?: string;
  transmission?: string;
  message?: string;
}

// Controller methods
export const createTradeIn = async (req: Request, res: Response) => {
  try {
    const newTradeIn: TradeInRequest = {
      ...req.body,
      id: `ti_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString(),
      status: 'new'
    };
    
    // Perform parallel execution: Emails + DB
    const emailPromise = sendTradeInEmail(newTradeIn).catch(err => {
      console.error('Trade-in email error:', err);
    });
    
    const clientEmailPromise = sendTradeInConfirmationEmail(newTradeIn).catch(err => {
      console.error('Trade-in client confirmation email error:', err);
    });

    const dbPromise = saveTradeInSubmission(newTradeIn).catch(err => {
      console.error('Trade-in database error:', err);
    });
    
    // Wait for all to be initiated 
    await Promise.allSettled([emailPromise, clientEmailPromise, dbPromise]);
    
    res.status(201).json({
      success: true,
      data: newTradeIn,
      message: 'Trade-in request successfully created and saved'
    });
  } catch (error: any) {
    console.error('Create trade-in error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create trade-in request',
      error: error.message
    });
  }
};

export const getTradeIns = async (req: Request, res: Response) => {
  try {
    const result = await getTradeInSubmissions();
    
    if (!result.success) {
      throw result.error;
    }

    res.json({
      success: true,
      data: result.data,
      total: result.data?.length || 0
    });
  } catch (error: any) {
    console.error('Get trade-ins error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get trade-ins from Supabase',
      error: error.message
    });
  }
};

export const updateTradeInStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    const result = await updateTradeInStatusInDB(id, status);
    
    if (!result.success) {
      throw result.error;
    }
    
    res.json({
      success: true,
      message: 'Status updated successfully in Supabase'
    });
  } catch (error: any) {
    console.error('Update trade-in error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update trade-in status',
      error: error.message
    });
  }
};

export const deleteTradeIn = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const result = await deleteTradeInFromDB(id);
    
    if (!result.success) {
      throw result.error;
    }
    
    res.json({
      success: true,
      message: 'Trade-in deleted successfully from Supabase'
    });
  } catch (error: any) {
    console.error('Delete trade-in error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete trade-in',
      error: error.message
    });
  }
};
