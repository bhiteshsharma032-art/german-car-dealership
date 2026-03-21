"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mobileDeController_1 = __importDefault(require("../controllers/mobileDeController"));
const router = (0, express_1.Router)();
// Test connection to mobile.de API
router.get('/test-connection', mobileDeController_1.default.testConnection);
// Get all sellers for this API user
router.get('/sellers', mobileDeController_1.default.getSellers);
exports.default = router;
