"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const features_data_1 = require("../data/features.data");
const router = (0, express_1.Router)();
router.get('/', (req, res) => {
    const { category } = req.query;
    let features = features_data_1.carFeatures;
    if (category && typeof category === 'string') {
        features = (0, features_data_1.getFeaturesByCategory)(category);
    }
    const response = {
        success: true,
        data: features,
        message: `${features.length} Ausstattungsmerkmale verfügbar`,
    };
    res.status(200).json(response);
});
exports.default = router;
