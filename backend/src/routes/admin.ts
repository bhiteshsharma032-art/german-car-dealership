import { Router, Response, NextFunction } from 'express';
import {
  adminLogin,
  getAllCarsAdmin,
  addCar,
  updateCar,
  deleteCar,
  getCarByIdAdmin,
} from '../controllers/adminController';
import { authMiddleware, adminOnly, AuthRequest } from '../middleware/auth';

const router = Router();

// Public route - login
router.post('/login', (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    adminLogin(req, res);
  } catch (error) {
    next(error);
  }
});

// Protected routes - require authentication
router.use(authMiddleware);
router.use(adminOnly);

// Get all cars for admin (from mobile.de)
router.get('/cars', (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    getAllCarsAdmin(req, res);
  } catch (error) {
    next(error);
  }
});

// Get car by ID (from mobile.de)
router.get('/cars/:id', (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    getCarByIdAdmin(req, res);
  } catch (error) {
    next(error);
  }
});

// Add new car (redirect to mobile.de)
router.post('/cars', (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    addCar(req, res);
  } catch (error) {
    next(error);
  }
});

// Update car (redirect to mobile.de)
router.put('/cars/:id', (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    updateCar(req, res);
  } catch (error) {
    next(error);
  }
});

// Delete car (redirect to mobile.de)
router.delete('/cars/:id', (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    deleteCar(req, res);
  } catch (error) {
    next(error);
  }
});

// Get dashboard stats (from mobile.de data)
router.get('/stats', (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    getAllCarsAdmin(req, res); // Use same mobile.de data for stats
  } catch (error) {
    next(error);
  }
});

export default router;
