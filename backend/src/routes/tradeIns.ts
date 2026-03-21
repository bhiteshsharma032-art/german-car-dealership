import { Router } from 'express';
import { createTradeIn, getTradeIns, updateTradeInStatus, deleteTradeIn } from '../controllers/tradeInController';
import { authMiddleware } from '../middleware/auth';

const router = Router();

// Public route to submit a form
router.post('/', createTradeIn);

// Protected admin routes
router.get('/', authMiddleware, getTradeIns);
router.patch('/:id/status', authMiddleware, updateTradeInStatus);
router.delete('/:id', authMiddleware, deleteTradeIn);

export default router;
