"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminOnly = exports.authMiddleware = void 0;
const auth_1 = require("../utils/auth");
const errorHandler_1 = require("./errorHandler");
const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw (0, errorHandler_1.createError)('Keine Authentifizierung vorhanden', 401);
        }
        const token = authHeader.substring(7); // Remove 'Bearer '
        const payload = (0, auth_1.verifyToken)(token);
        if (!payload) {
            throw (0, errorHandler_1.createError)('Ungültiger oder abgelaufener Token', 401);
        }
        req.user = payload;
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.authMiddleware = authMiddleware;
const adminOnly = (req, res, next) => {
    if (!req.user || req.user.role !== 'admin') {
        throw (0, errorHandler_1.createError)('Zugriff verweigert. Admin-Rechte erforderlich.', 403);
    }
    next();
};
exports.adminOnly = adminOnly;
