import { Request, Response } from 'express';
import { sendContactEmail, sendFinancingEmail } from '../services/emailService';

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
    
    // Send email
    await sendContactEmail(formData);
    
    res.status(200).json({
      success: true,
      message: 'Contact form submitted successfully'
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
    
    // Send email
    await sendFinancingEmail(formData);
    
    res.status(200).json({
      success: true,
      message: 'Financing request submitted successfully'
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
