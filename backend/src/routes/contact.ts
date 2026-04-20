import { Router } from 'express';
import { 
  submitContactForm, 
  submitFinancingForm, 
  getContacts, 
  getFinancing 
} from '../controllers/contactController';
import { authMiddleware } from '../middleware/auth';

const router = Router();

// Public routes for form submissions
router.post('/', submitContactForm);
router.post('/financing', submitFinancingForm);

// Protected admin routes
router.get('/', authMiddleware, getContacts);
router.get('/financing', authMiddleware, getFinancing);

export default router;
