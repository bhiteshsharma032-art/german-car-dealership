import { Request, Response } from 'express';
import { sendContactEmail, sendFinancingEmail, sendContactConfirmationEmail, sendFinancingConfirmationEmail } from '../services/emailService';
import { 
  saveContactSubmission, 
  saveFinancingSubmission,
  getContactSubmissions,
  getFinancingSubmissions
} from '../services/supabaseService';

export interface ContactFormData {
  salutation: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  subject: string;
  carReference?: string;
  message: string;
  privacy: boolean;
}

export interface FinancingFormData {
  name: string;
  email: string;
  phone: string;
  vehiclePrice: string;
  downPayment: string;
  term: string;
  message: string;
  privacy: boolean;
}

// Handle contact form submission
export const submitContactForm = async (req: Request, res: Response) => {
  try {
    const formData: ContactFormData = req.body;
    
    // Validate required fields
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone || !formData.subject || !formData.message) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields'
      });
    }
    
    // Perform actions in parallel
    const emailPromise = sendContactEmail(formData);
    const clientEmailPromise = sendContactConfirmationEmail(formData);
    const dbPromise = saveContactSubmission(formData);
    
    // Wait for all to finish (or handle errors individually)
    await Promise.allSettled([emailPromise, clientEmailPromise, dbPromise]);
    
    res.status(200).json({
      success: true,
      message: 'Contact form submitted and saved successfully'
    });
  } catch (error: any) {
    console.error('Contact form error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit contact form',
      error: error.message
    });
  }
};

// Handle financing form submission
export const submitFinancingForm = async (req: Request, res: Response) => {
  try {
    const formData: FinancingFormData = req.body;
    
    // Validate required fields
    if (!formData.name || !formData.email || !formData.phone) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields'
      });
    }
    
    // Perform actions in parallel
    const emailPromise = sendFinancingEmail(formData);
    const clientEmailPromise = sendFinancingConfirmationEmail(formData);
    const dbPromise = saveFinancingSubmission(formData);
    
    await Promise.allSettled([emailPromise, clientEmailPromise, dbPromise]);
    
    res.status(200).json({
      success: true,
      message: 'Financing request submitted and saved successfully'
    });
  } catch (error: any) {
    console.error('Financing form error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit financing request',
      error: error.message
    });
  }
};

// Get all contact submissions from Supabase
export const getContacts = async (req: Request, res: Response) => {
  try {
    const result = await getContactSubmissions();
    
    if (!result.success) {
      throw result.error;
    }

    res.json({
      success: true,
      data: result.data,
      total: result.data?.length || 0
    });
  } catch (error: any) {
    console.error('Get contacts error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get contact inquiries from Supabase',
      error: error.message
    });
  }
};

// Get all financing submissions from Supabase
export const getFinancing = async (req: Request, res: Response) => {
  try {
    const result = await getFinancingSubmissions();
    
    if (!result.success) {
      throw result.error;
    }

    res.json({
      success: true,
      data: result.data,
      total: result.data?.length || 0
    });
  } catch (error: any) {
    console.error('Get financing error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get financing inquiries from Supabase',
      error: error.message
    });
  }
};
