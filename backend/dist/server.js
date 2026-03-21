"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
const errorHandler_1 = require("./middleware/errorHandler");
const requestLogger_1 = require("./middleware/requestLogger");
const health_1 = __importDefault(require("./routes/health"));
const brands_1 = __importDefault(require("./routes/brands"));
const features_1 = __importDefault(require("./routes/features"));
const admin_1 = __importDefault(require("./routes/admin"));
const inventory_1 = __importDefault(require("./routes/inventory"));
const mobilede_1 = __importDefault(require("./routes/mobilede"));
const tradeIns_1 = __importDefault(require("./routes/tradeIns"));
// Load environment variables
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
// Middleware
app.use((0, cors_1.default)({
    origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
    credentials: true,
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Request logging
if (process.env.NODE_ENV === 'development') {
    app.use((0, morgan_1.default)('dev'));
}
app.use(requestLogger_1.requestLogger);
// Routes
app.use('/api/health', health_1.default);
app.use('/api/brands', brands_1.default);
app.use('/api/features', features_1.default);
app.use('/api/admin', admin_1.default);
app.use('/api/inventory', inventory_1.default); // Mobile.de Live Inventory (ONLY SOURCE)
app.use('/api/mobilede', mobilede_1.default); // Mobile.de API testing
app.use('/api/trade-ins', tradeIns_1.default);
// Error handling middleware (must be last)
app.use(errorHandler_1.errorHandler);
// Start server
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
    console.log(`🌍[server]: Environment: ${process.env.NODE_ENV}`);
    console.log(`🚗[server]: Mobile.de Live Inventory Integration`);
    console.log(`📡[server]: Mobile.de Search-API ready:`);
    console.log(`  - Test: GET /api/inventory/test`);
    console.log(`  - Live Inventory: GET /api/inventory`);
    console.log(`  - Customer ID: ${process.env.MOBILEDE_CUSTOMER_ID || '712285'}`);
});
exports.default = app;
