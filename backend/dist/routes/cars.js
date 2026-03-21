"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const carController_1 = require("../controllers/carController");
const router = (0, express_1.Router)();
// List all cars with filtering & pagination
router.get('/', (req, res, next) => {
    try {
        (0, carController_1.getAllCars)(req, res);
    }
    catch (error) {
        next(error);
    }
});
// Get exclusive/featured deals only
router.get('/exclusive', (req, res, next) => {
    try {
        (0, carController_1.getExclusiveDeals)(req, res);
    }
    catch (error) {
        next(error);
    }
});
// Get all available brands with car counts
router.get('/brands', (req, res, next) => {
    try {
        (0, carController_1.getBrandsWithCounts)(req, res);
    }
    catch (error) {
        next(error);
    }
});
// Get all filter options with counts
router.get('/filters', (req, res, next) => {
    try {
        (0, carController_1.getFilterOptions)(req, res);
    }
    catch (error) {
        next(error);
    }
});
// Get similar cars (must be before /:id to avoid route conflict)
router.get('/similar/:id', (req, res, next) => {
    try {
        (0, carController_1.getSimilarCars)(req, res);
    }
    catch (error) {
        next(error);
    }
});
// Get single car details
router.get('/:id', (req, res, next) => {
    try {
        (0, carController_1.getCarById)(req, res);
    }
    catch (error) {
        next(error);
    }
});
exports.default = router;
