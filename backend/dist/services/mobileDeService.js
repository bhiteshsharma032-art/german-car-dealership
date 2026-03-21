"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class MobileDeService {
    constructor() {
        this.baseURL = process.env.MOBILE_DE_API_BASE || 'https://services.mobile.de/search-api';
        this.username = process.env.MOBILE_DE_USERNAME;
        this.password = process.env.MOBILE_DE_PASSWORD;
        this.customerNumber = null;
    }
    getAuthHeader() {
        if (!this.username || !this.password) {
            throw new Error('Mobile.de credentials not configured');
        }
        const credentials = Buffer.from(`${this.username}:${this.password}`).toString('base64');
        return `Basic ${credentials}`;
    }
    async makeRequest(endpoint, params = {}) {
        try {
            const response = await axios_1.default.get(`${this.baseURL}${endpoint}`, {
                headers: {
                    'Authorization': this.getAuthHeader(),
                    'Accept': 'application/vnd.de.mobile.api+json',
                    'User-Agent': 'Nordhessen-Automobile/1.0'
                },
                params,
                timeout: 10000
            });
            return response;
        }
        catch (error) {
            console.error('Mobile.de API Error:', error);
            throw error;
        }
    }
    async discoverCustomerNumber() {
        if (this.customerNumber) {
            return this.customerNumber;
        }
        try {
            console.log('🔍 Auto-discovering customer number...');
            // Try to get any search results to find our customer number
            const response = await this.makeRequest('/search', {
                'page-size': 1
            });
            // Check if customer-number is in the response
            if (response.data['customer-number']) {
                this.customerNumber = response.data['customer-number'];
                console.log('✅ Customer number discovered:', this.customerNumber);
                return this.customerNumber;
            }
            // If not in main response, check if we can find it in ads
            if (response.data.ads && response.data.ads.length > 0) {
                // Try to extract from the first ad's data or make another call
                console.log('📋 Found ads, attempting to get customer info...');
                // Try a more specific search that might return customer info
                const detailResponse = await this.makeRequest('/search', {
                    'customer-number': 'auto-detect'
                });
                if (detailResponse.data['customer-number']) {
                    this.customerNumber = detailResponse.data['customer-number'];
                    console.log('✅ Customer number found:', this.customerNumber);
                    return this.customerNumber;
                }
            }
            throw new Error('Could not auto-discover customer number from API response');
        }
        catch (error) {
            console.error('❌ Failed to discover customer number:', error);
            throw new Error('Unable to connect to mobile.de API or discover customer number');
        }
    }
    async getInventory(pageSize = 50) {
        try {
            console.log('🚗 Fetching inventory from mobile.de...');
            // First ensure we have the customer number
            if (!this.customerNumber) {
                await this.discoverCustomerNumber();
            }
            // Fetch the full inventory
            const response = await this.makeRequest('/search', {
                'page-size': pageSize,
                'sort': 'created-desc' // Get newest first
            });
            console.log(`✅ Successfully fetched ${response.data.ads?.length || 0} vehicles`);
            return response.data;
        }
        catch (error) {
            console.error('❌ Error fetching inventory:', error);
            throw error;
        }
    }
    async searchVehicles(params = {}) {
        try {
            const searchParams = {
                'page-size': params.pageSize || 20
            };
            if (params.make)
                searchParams.make = params.make;
            if (params.model)
                searchParams.model = params.model;
            if (params.priceFrom)
                searchParams['price-from'] = params.priceFrom;
            if (params.priceTo)
                searchParams['price-to'] = params.priceTo;
            const response = await this.makeRequest('/search', searchParams);
            return response.data;
        }
        catch (error) {
            console.error('❌ Error searching vehicles:', error);
            throw error;
        }
    }
    // Transform mobile.de data to our internal format
    transformVehicleData(ad) {
        return {
            id: ad.id,
            title: ad.title,
            make: ad.vehicle.make,
            model: ad.vehicle.model,
            price: {
                amount: ad.price.amount,
                currency: ad.price.currency,
                formatted: `${ad.price.amount.toLocaleString('de-DE')} ${ad.price.currency}`
            },
            image: ad.images?.[0]?.sizes?.find(size => size.width >= 400)?.uri || ad.images?.[0]?.uri || null,
            mileage: ad.vehicle.mileage ? {
                value: ad.vehicle.mileage.value,
                unit: ad.vehicle.mileage.unit,
                formatted: `${ad.vehicle.mileage.value.toLocaleString('de-DE')} ${ad.vehicle.mileage.unit}`
            } : null,
            firstRegistration: ad.vehicle.firstRegistration,
            power: ad.vehicle.power ? {
                kw: ad.vehicle.power.kw,
                hp: ad.vehicle.power.hp,
                formatted: `${ad.vehicle.power.kw} kW (${ad.vehicle.power.hp} PS)`
            } : null,
            publicUrl: ad['public-url']
        };
    }
}
exports.default = new MobileDeService();
