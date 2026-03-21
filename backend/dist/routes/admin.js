"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const adminController_1 = require("../controllers/adminController");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
// Public route - login
router.post('/login', (req, res, next) => {
    try {
        (0, adminController_1.adminLogin)(req, res);
    }
    catch (error) {
        next(error);
    }
});
// Protected routes - require authentication
router.use(auth_1.authMiddleware);
router.use(auth_1.adminOnly);
// Get all cars for admin (from mobile.de)
router.get('/cars', (req, res, next) => {
    try {
        (0, adminController_1.getAllCarsAdmin)(req, res);
    }
    catch (error) {
        next(error);
    }
});
// Get car by ID (from mobile.de)
router.get('/cars/:id', (req, res, next) => {
    try {
        (0, adminController_1.getCarByIdAdmin)(req, res);
    }
    catch (error) {
        next(error);
    }
});
// Add new car (redirect to mobile.de)
router.post('/cars', (req, res, next) => {
    try {
        (0, adminController_1.addCar)(req, res);
    }
    catch (error) {
        next(error);
    }
});
// Update car (redirect to mobile.de)
router.put('/cars/:id', (req, res, next) => {
    try {
        (0, adminController_1.updateCar)(req, res);
    }
    catch (error) {
        next(error);
    }
});
// Delete car (redirect to mobile.de)
router.delete('/cars/:id', (req, res, next) => {
    try {
        (0, adminController_1.deleteCar)(req, res);
    }
    catch (error) {
        next(error);
    }
});
// Get dashboard stats (from mobile.de data)
router.get('/stats', (req, res, next) => {
    try {
        (0, adminController_1.getAllCarsAdmin)(req, res); // Use same mobile.de data for stats
    }
    catch (error) {
        next(error);
    }
});
exports.default = router;
