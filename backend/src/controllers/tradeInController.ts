import { Request, Response } from 'express';
import { sendTradeInEmail } from '../services/emailService';

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

// In-memory storage for serverless environments (Vercel)
// In production, replace this with a real database (Supabase, PostgreSQL, etc.)
let tradeInsStore: TradeInRequest[] = [];

// Controller methods
export const createTradeIn = async (req: Request, res: Response) => {
  try {
    const newTradeIn: TradeInRequest = {
      ...req.body,
      id: `ti_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString(),
      status: 'new'
    };
    
    tradeInsStore.unshift(newTradeIn); // add to top
    
    // Send email notification
    try {
      await sendTradeInEmail(newTradeIn);
      console.log('Trade-in email sent successfully');
    } catch (emailError) {
      console.error('Failed to send trade-in email:', emailError);
      // Don't fail the request if email fails
    }
    
    res.status(201).json({
      success: true,
      data: newTradeIn,
      message: 'Trade-in request successfully created'
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
    res.json({
      success: true,
      data: tradeInsStore,
      total: tradeInsStore.length
    });
  } catch (error: any) {
    console.error('Get trade-ins error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get trade-ins',
      error: error.message
    });
  }
};

export const updateTradeInStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    const index = tradeInsStore.findIndex(t => t.id === id);
    if (index === -1) {
      return res.status(404).json({ success: false, message: 'Trade-in not found' });
    }
    
    tradeInsStore[index].status = status;
    
    res.json({
      success: true,
      data: tradeInsStore[index],
      message: 'Status updated successfully'
    });
  } catch (error: any) {
    console.error('Update trade-in error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update trade-in',
      error: error.message
    });
  }
};

export const deleteTradeIn = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const initialLength = tradeInsStore.length;
    tradeInsStore = tradeInsStore.filter(t => t.id !== id);
    
    if (tradeInsStore.length === initialLength) {
      return res.status(404).json({ success: false, message: 'Trade-in not found' });
    }
    
    res.json({
      success: true,
      message: 'Trade-in deleted successfully'
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
