"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const brands_data_1 = require("../data/brands.data");
const errorHandler_1 = require("../middleware/errorHandler");
const router = (0, express_1.Router)();
router.get('/', (req, res) => {
    const response = {
        success: true,
        data: brands_data_1.brands,
        message: `${brands_data_1.brands.length} Marken verfügbar`,
    };
    res.status(200).json(response);
});
router.get('/:id', (req, res) => {
    const { id } = req.params;
    const brand = (0, brands_data_1.getBrandById)(id);
    if (!brand) {
        throw (0, errorHandler_1.createError)('Marke nicht gefunden', 404);
    }
    const response = {
        success: true,
        data: brand,
    };
    res.status(200).json(response);
});
exports.default = router;
