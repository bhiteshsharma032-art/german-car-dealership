import { Router } from 'express';
import { submitContactForm, submitFinancingForm } from '../controllers/contactController';

const router = Router();

// Public routes for form submissions
router.post('/', submitContactForm);
router.post('/financing', submitFinancingForm);

export default router;
