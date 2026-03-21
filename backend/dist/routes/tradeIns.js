"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tradeInController_1 = require("../controllers/tradeInController");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
// Public route to submit a form
router.post('/', tradeInController_1.createTradeIn);
// Protected admin routes
router.get('/', auth_1.authMiddleware, tradeInController_1.getTradeIns);
router.patch('/:id/status', auth_1.authMiddleware, tradeInController_1.updateTradeInStatus);
router.delete('/:id', auth_1.authMiddleware, tradeInController_1.deleteTradeIn);
exports.default = router;
