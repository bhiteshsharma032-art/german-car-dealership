"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTradeIn = exports.updateTradeInStatus = exports.getTradeIns = exports.createTradeIn = void 0;
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
const dataFilePath = path_1.default.join(__dirname, '../../data/tradeIns.json');
// Helper to ensure file exists
async function ensureDataFile() {
    try {
        await promises_1.default.mkdir(path_1.default.dirname(dataFilePath), { recursive: true });
        try {
            await promises_1.default.access(dataFilePath);
        }
        catch {
            await promises_1.default.writeFile(dataFilePath, JSON.stringify([]), 'utf-8');
        }
    }
    catch (error) {
        console.error('Error ensuring data file:', error);
    }
}
// Controller methods
const createTradeIn = async (req, res) => {
    try {
        await ensureDataFile();
        const tradeInsData = await promises_1.default.readFile(dataFilePath, 'utf-8');
        const tradeIns = JSON.parse(tradeInsData);
        const newTradeIn = {
            ...req.body,
            id: `ti_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            createdAt: new Date().toISOString(),
            status: 'new'
        };
        tradeIns.unshift(newTradeIn); // add to top
        await promises_1.default.writeFile(dataFilePath, JSON.stringify(tradeIns, null, 2), 'utf-8');
        res.status(201).json({
            success: true,
            data: newTradeIn,
            message: 'Trade-in request successfully created'
        });
    }
    catch (error) {
        console.error('Create trade-in error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to create trade-in request',
            error: error.message
        });
    }
};
exports.createTradeIn = createTradeIn;
const getTradeIns = async (req, res) => {
    try {
        await ensureDataFile();
        const tradeInsData = await promises_1.default.readFile(dataFilePath, 'utf-8');
        const tradeIns = JSON.parse(tradeInsData);
        res.json({
            success: true,
            data: tradeIns,
            total: tradeIns.length
        });
    }
    catch (error) {
        console.error('Get trade-ins error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to get trade-ins',
            error: error.message
        });
    }
};
exports.getTradeIns = getTradeIns;
const updateTradeInStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        await ensureDataFile();
        const tradeInsData = await promises_1.default.readFile(dataFilePath, 'utf-8');
        const tradeIns = JSON.parse(tradeInsData);
        const index = tradeIns.findIndex(t => t.id === id);
        if (index === -1) {
            return res.status(404).json({ success: false, message: 'Trade-in not found' });
        }
        tradeIns[index].status = status;
        await promises_1.default.writeFile(dataFilePath, JSON.stringify(tradeIns, null, 2), 'utf-8');
        res.json({
            success: true,
            data: tradeIns[index],
            message: 'Status updated successfully'
        });
    }
    catch (error) {
        console.error('Update trade-in error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to update trade-in',
            error: error.message
        });
    }
};
exports.updateTradeInStatus = updateTradeInStatus;
const deleteTradeIn = async (req, res) => {
    try {
        const { id } = req.params;
        await ensureDataFile();
        const tradeInsData = await promises_1.default.readFile(dataFilePath, 'utf-8');
        let tradeIns = JSON.parse(tradeInsData);
        const initialLength = tradeIns.length;
        tradeIns = tradeIns.filter(t => t.id !== id);
        if (tradeIns.length === initialLength) {
            return res.status(404).json({ success: false, message: 'Trade-in not found' });
        }
        await promises_1.default.writeFile(dataFilePath, JSON.stringify(tradeIns, null, 2), 'utf-8');
        res.json({
            success: true,
            message: 'Trade-in deleted successfully'
        });
    }
    catch (error) {
        console.error('Delete trade-in error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to delete trade-in',
            error: error.message
        });
    }
};
exports.deleteTradeIn = deleteTradeIn;
