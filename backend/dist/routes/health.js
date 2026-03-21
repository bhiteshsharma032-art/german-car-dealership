"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get('/', (req, res) => {
    const healthData = {
        status: 'OK',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        environment: process.env.NODE_ENV || 'development',
        version: '1.0.0',
    };
    const response = {
        success: true,
        data: healthData,
        message: 'Server ist betriebsbereit',
    };
    res.status(200).json(response);
});
exports.default = router;
