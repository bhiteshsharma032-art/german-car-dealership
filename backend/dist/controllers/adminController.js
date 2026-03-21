"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCarByIdAdmin = exports.deleteCar = exports.updateCar = exports.addCar = exports.getAllCarsAdmin = exports.adminLogin = void 0;
const auth_1 = require("../utils/auth");
const errorHandler_1 = require("../middleware/errorHandler");
const inventoryController_1 = __importDefault(require("./inventoryController"));
// PRODUCTION ADMIN CONTROLLER - USES ONLY MOBILE.DE DATA
const adminLogin = (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        const errorResponse = (0, errorHandler_1.createError)('Benutzername und Passwort sind erforderlich', 400);
        return res.status(400).json(errorResponse);
    }
    const adminUsername = process.env.ADMIN_USERNAME || 'admin';
    const adminPassword = process.env.ADMIN_PASSWORD || 'dealer2024';
    if (username !== adminUsername || password !== adminPassword) {
        const errorResponse = (0, errorHandler_1.createError)('Ungültige Anmeldedaten', 401);
        return res.status(401).json(errorResponse);
    }
    const token = (0, auth_1.generateToken)(username, 'admin');
    const response = {
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
exports.adminLogin = adminLogin;
// Get all cars from mobile.de for admin (NO MOCK DATA)
const getAllCarsAdmin = (req, res) => {
    console.log('👨‍💼 AdminController: Getting cars from mobile.de (NO MOCK DATA)');
    return inventoryController_1.default.getInventory(req, res);
};
exports.getAllCarsAdmin = getAllCarsAdmin;
// Add car - redirect to mobile.de (cars should be added on mobile.de platform)
const addCar = (req, res) => {
    res.status(501).json({
        success: false,
        message: 'Cars should be added directly on mobile.de platform. This will automatically sync to your website.'
    });
};
exports.addCar = addCar;
// Update car - redirect to mobile.de (cars should be updated on mobile.de platform)
const updateCar = (req, res) => {
    res.status(501).json({
        success: false,
        message: 'Cars should be updated directly on mobile.de platform. Changes will automatically sync to your website.'
    });
};
exports.updateCar = updateCar;
// Delete car - redirect to mobile.de (cars should be deleted on mobile.de platform)
const deleteCar = (req, res) => {
    res.status(501).json({
        success: false,
        message: 'Cars should be deleted directly on mobile.de platform. This will automatically sync to your website.'
    });
};
exports.deleteCar = deleteCar;
// Get car by ID from mobile.de (NO MOCK DATA)
const getCarByIdAdmin = (req, res) => {
    console.log('👨‍💼 AdminController: Getting car by ID from mobile.de (NO MOCK DATA)');
    return inventoryController_1.default.getInventory(req, res);
};
exports.getCarByIdAdmin = getCarByIdAdmin;
