"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createError = exports.errorHandler = void 0;
const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Ein interner Serverfehler ist aufgetreten';
    // Log error for debugging
    console.error('Error:', {
        message: err.message,
        stack: err.stack,
        statusCode,
        path: req.path,
        method: req.method,
    });
    const response = {
        success: false,
        error: message,
    };
    // Don't leak error details in production
    if (process.env.NODE_ENV === 'production' && statusCode === 500) {
        response.error = 'Ein interner Serverfehler ist aufgetreten';
    }
    res.status(statusCode).json(response);
};
exports.errorHandler = errorHandler;
const createError = (message, statusCode = 500) => {
    const error = new Error(message);
    error.statusCode = statusCode;
    error.isOperational = true;
    return error;
};
exports.createError = createError;
