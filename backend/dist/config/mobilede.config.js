"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mobileDeConfig = void 0;
exports.validateMobileDeConfig = validateMobileDeConfig;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
function validateMobileDeConfig() {
    const requiredVars = {
        MOBILEDE_BASE_URL: process.env.MOBILEDE_BASE_URL,
        MOBILEDE_API_USERNAME: process.env.MOBILEDE_API_USERNAME,
        MOBILEDE_API_PASSWORD: process.env.MOBILEDE_API_PASSWORD,
        MOBILEDE_CUSTOMER_ID: process.env.MOBILEDE_CUSTOMER_ID
    };
    const missing = Object.entries(requiredVars)
        .filter(([key, value]) => !value)
        .map(([key]) => key);
    if (missing.length > 0) {
        throw new Error(`Missing required mobile.de environment variables: ${missing.join(', ')}\n` +
            'Please set these in your .env file:\n' +
            '- MOBILEDE_BASE_URL (e.g., https://services.mobile.de)\n' +
            '- MOBILEDE_API_USERNAME (from mobile.de activation)\n' +
            '- MOBILEDE_API_PASSWORD (from mobile.de activation)\n' +
            '- MOBILEDE_CUSTOMER_ID (your dealer customer ID)');
    }
    return {
        baseUrl: requiredVars.MOBILEDE_BASE_URL,
        username: requiredVars.MOBILEDE_API_USERNAME,
        password: requiredVars.MOBILEDE_API_PASSWORD,
        customerId: requiredVars.MOBILEDE_CUSTOMER_ID,
        timeout: parseInt(process.env.MOBILEDE_TIMEOUT || '10000')
    };
}
exports.mobileDeConfig = validateMobileDeConfig();
