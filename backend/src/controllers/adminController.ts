import { Response } from 'express';
import { ApiResponse } from '../types/api';
import { AuthRequest } from '../middleware/auth';
import { generateToken } from '../utils/auth';
import { createError } from '../middleware/errorHandler';
import inventoryController from './inventoryController';

// PRODUCTION ADMIN CONTROLLER - USES ONLY MOBILE.DE DATA

export const adminLogin = (req: AuthRequest, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    const errorResponse = createError('Benutzername und Passwort sind erforderlich', 400);
    return res.status(400).json(errorResponse);
  }

  const adminUsername = process.env.ADMIN_USERNAME || 'admin';
  const adminPassword = process.env.ADMIN_PASSWORD || 'dealer2024';

  if (username !== adminUsername || password !== adminPassword) {
    const errorResponse = createError('Ungültige Anmeldedaten', 401);
    return res.status(401).json(errorResponse);
  }

  const token = generateToken(username, 'admin');

  const response: ApiResponse<{ token: string; user: { username: string; role: string } }> = {
    success: true,
    data: {
      token,
      user: {
        username,
        role: 'admin',
      },
    },
    message: 'Erfolgreich angemeldet',
  };

  res.status(200).json(response);
};

// Get all cars from mobile.de for admin (NO MOCK DATA)
export const getAllCarsAdmin = (req: AuthRequest, res: Response) => {
  console.log('👨‍💼 AdminController: Getting cars from mobile.de (NO MOCK DATA)');
  return inventoryController.getInventory(req, res);
};

// Add car - redirect to mobile.de (cars should be added on mobile.de platform)
export const addCar = (req: AuthRequest, res: Response) => {
  res.status(501).json({
    success: false,
    message: 'Cars should be added directly on mobile.de platform. This will automatically sync to your website.'
  });
};

// Update car - redirect to mobile.de (cars should be updated on mobile.de platform)
export const updateCar = (req: AuthRequest, res: Response) => {
  res.status(501).json({
    success: false,
    message: 'Cars should be updated directly on mobile.de platform. Changes will automatically sync to your website.'
  });
};

// Delete car - redirect to mobile.de (cars should be deleted on mobile.de platform)
export const deleteCar = (req: AuthRequest, res: Response) => {
  res.status(501).json({
    success: false,
    message: 'Cars should be deleted directly on mobile.de platform. This will automatically sync to your website.'
  });
};

// Get car by ID from mobile.de (NO MOCK DATA)
export const getCarByIdAdmin = (req: AuthRequest, res: Response) => {
  console.log('👨‍💼 AdminController: Getting car by ID from mobile.de (NO MOCK DATA)');
  return inventoryController.getInventory(req, res);
};