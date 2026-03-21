"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarController = void 0;
const inventoryController_1 = __importDefault(require("./inventoryController"));
// This controller now ONLY serves mobile.de data - NO MOCK DATA EVER
class CarController {
    // Get all cars from mobile.de (NO MOCK DATA)
    async getAllCars(req, res) {
        console.log('🚗 CarController: Redirecting to mobile.de inventory (NO MOCK DATA)');
        return inventoryController_1.default.getInventory(req, res);
    }
    // Get car by ID from mobile.de (NO MOCK DATA)  
    async getCarById(req, res) {
        console.log('🔍 CarController: Getting car by ID from mobile.de (NO MOCK DATA)');
        // For now, redirect to get all cars - frontend will filter by ID
        return inventoryController_1.default.getInventory(req, res);
    }
    // Get brands from mobile.de data (NO MOCK DATA)
    async getBrands(req, res) {
        console.log('🏷️ CarController: Getting brands from mobile.de (NO MOCK DATA)');
        // For now, redirect to get all cars - frontend will extract brands
        return inventoryController_1.default.getInventory(req, res);
    }
}
exports.CarController = CarController;
exports.default = new CarController();
