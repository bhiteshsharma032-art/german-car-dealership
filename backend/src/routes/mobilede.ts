import { Router } from 'express';
import mobileDeController from '../controllers/mobileDeController';

const router = Router();

// Test connection to mobile.de API
router.get('/test-connection', mobileDeController.testConnection);

// Get all sellers for this API user
router.get('/sellers', mobileDeController.getSellers);

export default router;