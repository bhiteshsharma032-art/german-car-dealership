"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidMileage = exports.isValidPrice = exports.isValidYear = exports.isValidEmail = void 0;
const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};
exports.isValidEmail = isValidEmail;
const isValidYear = (year) => {
    const currentYear = new Date().getFullYear();
    return year >= 1900 && year <= currentYear + 1;
};
exports.isValidYear = isValidYear;
const isValidPrice = (price) => {
    return price > 0 && price < 10000000;
};
exports.isValidPrice = isValidPrice;
const isValidMileage = (mileage) => {
    return mileage >= 0 && mileage < 1000000;
};
exports.isValidMileage = isValidMileage;
