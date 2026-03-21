"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
exports.logger = {
    info: (message, meta) => {
        console.log(`ℹ️  [INFO] ${message}`, meta || '');
    },
    error: (message, error) => {
        console.error(`❌ [ERROR] ${message}`, error || '');
    },
    warn: (message, meta) => {
        console.warn(`⚠️  [WARN] ${message}`, meta || '');
    },
    debug: (message, meta) => {
        if (process.env.NODE_ENV === 'development') {
            console.debug(`🐛 [DEBUG] ${message}`, meta || '');
        }
    },
};
