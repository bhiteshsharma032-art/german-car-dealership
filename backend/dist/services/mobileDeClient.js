"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const mobilede_config_1 = require("../config/mobilede.config");
class MobileDeClient {
    constructor() {
        this.sellersCache = null;
        this.client = axios_1.default.create({
            baseURL: mobilede_config_1.mobileDeConfig.baseUrl,
            timeout: mobilede_config_1.mobileDeConfig.timeout,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'User-Agent': 'Nordhessen-Automobile/1.0'
            },
            auth: {
                username: mobilede_config_1.mobileDeConfig.username,
                password: mobilede_config_1.mobileDeConfig.password
            }
        });
        // Add request/response interceptors for debugging
        this.client.interceptors.request.use((config) => {
            console.log('🔄 Mobile.de API Request:', {
                method: config.method?.toUpperCase(),
                url: config.url,
                baseURL: config.baseURL,
                hasAuth: !!config.auth,
                contentType: config.headers['Content-Type'],
                accept: config.headers['Accept']
            });
            return config;
        }, (error) => {
            console.error('❌ Request setup error:', error.message);
            return Promise.reject(error);
        });
        this.client.interceptors.response.use((response) => {
            console.log('✅ Mobile.de API Response:', {
                status: response.status,
                statusText: response.statusText,
                url: response.config.url,
                dataSize: JSON.stringify(response.data).length
            });
            return response;
        }, (error) => {
            const status = error.response?.status;
            const statusText = error.response?.statusText;
            const url = error.config?.url;
            console.error('❌ Mobile.de API Error:', {
                status,
                statusText,
                url,
                message: error.message
            });
            // Provide specific 401 diagnosis
            if (status === 401) {
                console.error('🔐 401 Unauthorized - Possible causes:');
                console.error('  - Wrong API username/password');
                console.error('  - API access not activated for this account');
                console.error('  - Using web login credentials instead of API credentials');
                console.error('  - Account permissions insufficient for Seller-API');
                console.error('  - Wrong base URL or API endpoint');
            }
            return Promise.reject(error);
        });
    }
    /**
     * Test connection to mobile.de API
     * First call should be GET /seller-api/sellers per documentation
     */
    async testConnection() {
        try {
            console.log('🧪 Testing mobile.de Seller-API connection...');
            console.log('📋 Customer ID:', mobilede_config_1.mobileDeConfig.customerId);
            const response = await this.client.get('/seller-api/sellers');
            const sellers = response.data.sellers || response.data || [];
            this.sellersCache = sellers;
            return {
                success: true,
                data: { sellers }
            };
        }
        catch (error) {
            return {
                success: false,
                error: {
                    status: error.response?.status || 500,
                    message: error.response?.statusText || error.message,
                    details: error.response?.data
                }
            };
        }
    }
    /**
     * Get all sellers associated with this API user
     */
    async getSellers() {
        try {
            if (this.sellersCache) {
                return { success: true, data: this.sellersCache };
            }
            const response = await this.client.get('/seller-api/sellers');
            const sellers = response.data.sellers || response.data || [];
            this.sellersCache = sellers;
            return { success: true, data: sellers };
        }
        catch (error) {
            return {
                success: false,
                error: {
                    status: error.response?.status || 500,
                    message: error.response?.statusText || error.message,
                    details: error.response?.data
                }
            };
        }
    }
    /**
     * Get ads for a specific seller
     */
    async getAds(mobileSellerId) {
        try {
            console.log(`📋 Fetching ads for seller: ${mobileSellerId}`);
            const response = await this.client.get(`/seller-api/sellers/${mobileSellerId}/ads`);
            const ads = response.data.ads || response.data || [];
            return { success: true, data: ads };
        }
        catch (error) {
            return {
                success: false,
                error: {
                    status: error.response?.status || 500,
                    message: error.response?.statusText || error.message,
                    details: error.response?.data
                }
            };
        }
    }
    /**
     * Get a specific ad
     */
    async getAd(mobileSellerId, mobileAdId) {
        try {
            const response = await this.client.get(`/seller-api/sellers/${mobileSellerId}/ads/${mobileAdId}`);
            return { success: true, data: response.data };
        }
        catch (error) {
            return {
                success: false,
                error: {
                    status: error.response?.status || 500,
                    message: error.response?.statusText || error.message,
                    details: error.response?.data
                }
            };
        }
    }
    /**
     * Create a new ad
     */
    async createAd(mobileSellerId, adData, insertionRequestId) {
        try {
            const headers = {};
            // Use X-Mobile-Insertion-Request-Id for safe retries per documentation
            if (insertionRequestId) {
                headers['X-Mobile-Insertion-Request-Id'] = insertionRequestId;
            }
            const response = await this.client.post(`/seller-api/sellers/${mobileSellerId}/ads`, adData, { headers });
            // Per docs: success is 201 Created with new ad ID in Location header
            const location = response.headers.location || response.headers.Location;
            const mobileAdId = location ? location.split('/').pop() : null;
            return {
                success: true,
                data: {
                    mobileAdId: mobileAdId || 'unknown',
                    location: location || ''
                }
            };
        }
        catch (error) {
            return {
                success: false,
                error: {
                    status: error.response?.status || 500,
                    message: error.response?.statusText || error.message,
                    details: error.response?.data
                }
            };
        }
    }
    /**
     * Update an existing ad (full replacement per documentation)
     */
    async updateAd(mobileSellerId, mobileAdId, adData) {
        try {
            // Per docs: PUT requires the whole ad, not just changed fields
            const response = await this.client.put(`/seller-api/sellers/${mobileSellerId}/ads/${mobileAdId}`, adData);
            return { success: true, data: response.data };
        }
        catch (error) {
            return {
                success: false,
                error: {
                    status: error.response?.status || 500,
                    message: error.response?.statusText || error.message,
                    details: error.response?.data
                }
            };
        }
    }
    /**
     * Delete an ad
     */
    async deleteAd(mobileSellerId, mobileAdId) {
        try {
            await this.client.delete(`/seller-api/sellers/${mobileSellerId}/ads/${mobileAdId}`);
            return { success: true };
        }
        catch (error) {
            return {
                success: false,
                error: {
                    status: error.response?.status || 500,
                    message: error.response?.statusText || error.message,
                    details: error.response?.data
                }
            };
        }
    }
    /**
     * Clear sellers cache (useful for testing)
     */
    clearCache() {
        this.sellersCache = null;
    }
}
exports.default = new MobileDeClient();
