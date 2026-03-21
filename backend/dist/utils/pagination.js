"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginate = exports.parsePaginationParams = void 0;
const parsePaginationParams = (page, limit) => {
    const parsedPage = parseInt(page || '1', 10);
    const parsedLimit = parseInt(limit || '10', 10);
    return {
        page: parsedPage > 0 ? parsedPage : 1,
        limit: parsedLimit > 0 && parsedLimit <= 100 ? parsedLimit : 10,
    };
};
exports.parsePaginationParams = parsePaginationParams;
const paginate = (items, params) => {
    const { page, limit } = params;
    const total = items.length;
    const totalPages = Math.ceil(total / limit);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    return {
        data: items.slice(startIndex, endIndex),
        pagination: {
            total,
            page,
            limit,
            totalPages,
            hasNext: page < totalPages,
            hasPrev: page > 1,
        },
    };
};
exports.paginate = paginate;
