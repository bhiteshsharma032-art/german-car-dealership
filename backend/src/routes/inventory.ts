import { Router } from 'express';
import inventoryController from '../controllers/inventoryController';

const router = Router();

// Mobile.de Search-API routes (READ-ONLY - for displaying inventory)
router.get('/test', inventoryController.testConnection);        // GET /api/inventory/test
router.get('/filters', inventoryController.getFilterOptions);   // GET /api/inventory/filters
router.get('/search', inventoryController.searchVehicles);      // GET /api/inventory/search
router.get('/', inventoryController.getInventory);             // GET /api/inventory

export default router;