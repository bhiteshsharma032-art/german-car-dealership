import { Request, Response } from 'express';
import inventoryController from './inventoryController';

// This controller now ONLY serves mobile.de data - NO MOCK DATA EVER
export class CarController {
  // Get all cars from mobile.de (NO MOCK DATA)
  async getAllCars(req: Request, res: Response) {
    console.log('🚗 CarController: Redirecting to mobile.de inventory (NO MOCK DATA)');
    return inventoryController.getInventory(req, res);
  }

  // Get car by ID from mobile.de (NO MOCK DATA)  
  async getCarById(req: Request, res: Response) {
    console.log('🔍 CarController: Getting car by ID from mobile.de (NO MOCK DATA)');
    // For now, redirect to get all cars - frontend will filter by ID
    return inventoryController.getInventory(req, res);
  }

  // Get brands from mobile.de data (NO MOCK DATA)
  async getBrands(req: Request, res: Response) {
    console.log('🏷️ CarController: Getting brands from mobile.de (NO MOCK DATA)');
    // For now, redirect to get all cars - frontend will extract brands
    return inventoryController.getInventory(req, res);
  }
}

export default new CarController();