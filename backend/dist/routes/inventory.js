"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const inventoryController_1 = __importDefault(require("../controllers/inventoryController"));
const router = (0, express_1.Router)();
// Mobile.de Search-API routes (READ-ONLY - for displaying inventory)
router.get('/test', inventoryController_1.default.testConnection); // GET /api/inventory/test
router.get('/filters', inventoryController_1.default.getFilterOptions); // GET /api/inventory/filters
router.get('/search', inventoryController_1.default.searchVehicles); // GET /api/inventory/search
router.get('/', inventoryController_1.default.getInventory); // GET /api/inventory
exports.default = router;
