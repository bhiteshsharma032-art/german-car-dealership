"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.comparePassword = exports.hashPassword = exports.verifyToken = exports.generateToken = void 0;
const crypto_1 = __importDefault(require("crypto"));
// Simple JWT-like token generation (for demo purposes)
// In production, use a proper JWT library like jsonwebtoken
const generateToken = (username, role = 'admin') => {
    const payload = {
        username,
        role,
        iat: Date.now(),
        exp: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
    };
    const payloadStr = JSON.stringify(payload);
    const payloadBase64 = Buffer.from(payloadStr).toString('base64');
    // Create signature
    const secret = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
    const signature = crypto_1.default
        .createHmac('sha256', secret)
        .update(payloadBase64)
        .digest('base64');
    return `${payloadBase64}.${signature}`;
};
exports.generateToken = generateToken;
const verifyToken = (token) => {
    try {
        const [payloadBase64, signature] = token.split('.');
        if (!payloadBase64 || !signature) {
            return null;
        }
        // Verify signature
        const secret = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
        const expectedSignature = crypto_1.default
            .createHmac('sha256', secret)
            .update(payloadBase64)
            .digest('base64');
        if (signature !== expectedSignature) {
            return null;
        }
        // Decode payload
        const payloadStr = Buffer.from(payloadBase64, 'base64').toString('utf-8');
        const payload = JSON.parse(payloadStr);
        // Check expiration
        if (payload.exp < Date.now()) {
            return null;
        }
        return payload;
    }
    catch (error) {
        return null;
    }
};
exports.verifyToken = verifyToken;
const hashPassword = (password) => {
    return crypto_1.default.createHash('sha256').update(password).digest('hex');
};
exports.hashPassword = hashPassword;
const comparePassword = (password, hash) => {
    return (0, exports.hashPassword)(password) === hash;
};
exports.comparePassword = comparePassword;
