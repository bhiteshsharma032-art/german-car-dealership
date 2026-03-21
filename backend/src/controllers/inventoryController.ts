import { Request, Response } from 'express';
import axios from 'axios';
import * as xml2js from 'xml2js';

// Mobile.de Search-API Configuration (the one that works!)
const MOBILE_DE_CONFIG = {
  baseURL: 'https://services.mobile.de/search-api',
  username: process.env.MOBILEDE_API_USERNAME || 'dlr_dimitriosmikhovsky',
  password: process.env.MOBILEDE_API_PASSWORD || 'kovoExT0mG3Y',
  customerId: process.env.MOBILEDE_CUSTOMER_ID || '712285',
  timeout: 10000
};

// Create Base64 encoded credentials
function getAuthHeader() {
  const credentials = Buffer.from(`${MOBILE_DE_CONFIG.username}:${MOBILE_DE_CONFIG.password}`).toString('base64');
  return `Basic ${credentials}`;
}

// Make request to mobile.de Search-API
async function makeMobileDeRequest(endpoint: string, params: Record<string, any> = {}) {
  try {
    console.log('🔄 Mobile.de API Request:', { endpoint, params });
    
    const response = await axios.get(`${MOBILE_DE_CONFIG.baseURL}${endpoint}`, {
      headers: {
        'Authorization': getAuthHeader(),
        'Accept': 'application/xml',
        'User-Agent': 'Nordhessen-Automobile/1.0'
      },
      params,
      timeout: MOBILE_DE_CONFIG.timeout
    });

    console.log('✅ Mobile.de API Response:', response.status, response.statusText);
    return { success: true, data: response.data, status: response.status };
  } catch (error: any) {
    console.error('❌ Mobile.de API Error:', {
      status: error.response?.status,
      statusText: error.response?.statusText,
      message: error.message
    });

    return {
      success: false,
      error: {
        status: error.response?.status || 500,
        message: error.response?.statusText || error.message
      }
    };
  }
}

// Parse XML response to JSON
async function parseXMLResponse(xmlData: string) {
  const parser = new xml2js.Parser({ explicitArray: false });
  return await parser.parseStringPromise(xmlData);
}

// Transform mobile.de XML ad to our format
function transformVehicle(ad: any) {
  console.log('🔍 Transforming vehicle ad:', ad.$?.key);
  
  const vehicle = ad['ad:vehicle'] || {};
  const price = ad['ad:price'] || {};
  const images = ad['ad:images'] || {};
  const specifics = vehicle['ad:specifics'] || {};
  
  // Extract make and model
  const make = vehicle['ad:make']?.['resource:local-description']?._ || 'Unknown';
  const model = vehicle['ad:model']?.['resource:local-description']?._ || 'Unknown';
  const modelDescription = vehicle['ad:model-description']?.$?.value || '';
  
  // Extract price
  const priceAmount = parseFloat(price['ad:consumer-price-amount']?.$?.value || '0');
  const currency = price.$?.currency || 'EUR';
  
  // Extract mileage from specifics
  const mileageValue = parseInt(specifics['ad:mileage']?.$?.value || '0');
  
  // Extract first registration from specifics
  const firstReg = specifics['ad:first-registration']?.$?.value || null;
  
  // Extract fuel type from specifics
  const fuelType = specifics['ad:fuel']?.['resource:local-description']?._ || 'Benzin';
  
  // Extract transmission from specifics (gearbox)
  const transmission = specifics['ad:gearbox']?.['resource:local-description']?._ || 'Automatik';
  
  // Extract body type/category
  const bodyType = vehicle['ad:category']?.['resource:local-description']?._ || 'Limousine';
  
  // Extract condition from specifics
  const condition = specifics['ad:condition']?.['resource:local-description']?._ || 'Gebraucht';
  
  // Extract power from specifics (in kW)
  const powerKw = parseInt(specifics['ad:power']?.$?.value || '0');
  const powerHp = Math.round(powerKw * 1.36); // Convert kW to HP
  
  // Extract additional details
  const exteriorColor = specifics['ad:exterior-color']?.['resource:local-description']?._ || 'Unknown';
  const interiorColor = specifics['ad:interior-color']?.['resource:local-description']?._ || 'Unknown';
  const interiorType = specifics['ad:interior-type']?.['resource:local-description']?._ || 'Unknown';
  const doorCount = specifics['ad:door-count']?.['resource:local-description']?._ || 'Unknown';
  const cubicCapacity = parseInt(specifics['ad:cubic-capacity']?.$?.value || '0');
  const previousOwners = specifics['ad:number-of-previous-owners'] || 'Unknown';
  const driveType = specifics['ad:drive-type']?.$?.value || 'Unknown';
  
  // Extract features
  const features = vehicle['ad:features']?.['ad:feature'] || [];
  const featureList = Array.isArray(features) ? 
    features.map(f => f['resource:local-description']?._).filter(Boolean) : 
    (features['resource:local-description']?._ ? [features['resource:local-description']._] : []);
  
  const transformedVehicle = {
    id: ad.$?.key || `vehicle_${Date.now()}`,
    title: modelDescription || `${make} ${model}`,
    make: make,
    model: model,
    modelDescription: modelDescription,
    price: {
      amount: priceAmount,
      currency: currency,
      formatted: `${priceAmount.toLocaleString('de-DE')} ${currency}`
    },
    image: getFirstImage(images),
    images: getAllImages(images),
    mileage: {
      value: mileageValue,
      unit: 'km',
      formatted: `${mileageValue.toLocaleString('de-DE')} km`
    },
    firstRegistration: firstReg,
    year: extractYear(firstReg),
    fuelType: fuelType,
    transmission: transmission,
    bodyType: bodyType,
    condition: condition,
    power: {
      kw: powerKw,
      hp: powerHp,
      formatted: `${powerKw} kW (${powerHp} PS)`
    },
    exteriorColor: exteriorColor,
    interiorColor: interiorColor,
    interiorType: interiorType,
    doorCount: doorCount,
    cubicCapacity: cubicCapacity,
    previousOwners: previousOwners,
    driveType: driveType,
    features: featureList,
    publicUrl: ad.$?.url || '#'
  };
  
  console.log('✅ Transformed vehicle:', {
    id: transformedVehicle.id,
    title: transformedVehicle.title,
    price: transformedVehicle.price.formatted,
    mileage: transformedVehicle.mileage.formatted,
    year: transformedVehicle.year,
    power: transformedVehicle.power.formatted
  });
  
  return transformedVehicle;
}

// Extract year from date string
function extractYear(dateString: string | null): number | null {
  if (!dateString) return null;
  const match = dateString.match(/(\d{4})/);
  return match ? parseInt(match[1]) : null;
}

// Extract first image from mobile.de images structure (for backward compatibility)
function getFirstImage(images: any): string | null {
  if (!images || !images['ad:image']) return null;
  
  const imageArray = Array.isArray(images['ad:image']) ? images['ad:image'] : [images['ad:image']];
  if (imageArray.length === 0) return null;
  
  const firstImage = imageArray[0];
  
  // Try to get the largest representation
  if (firstImage['ad:representation']) {
    const representations = Array.isArray(firstImage['ad:representation']) ? 
                           firstImage['ad:representation'] : [firstImage['ad:representation']];
    
    // Look for L (Large) size first, then XL, then M, then S
    const largeImage = representations.find((rep: any) => rep.$?.size === 'L') ||
                      representations.find((rep: any) => rep.$?.size === 'XL') ||
                      representations.find((rep: any) => rep.$?.size === 'M') ||
                      representations[0];
    
    return largeImage?.$?.url || largeImage?.url || null;
  }
  
  return firstImage.$?.url || firstImage.url || null;
}

// Extract ALL images from mobile.de images structure
function getAllImages(images: any): string[] {
  if (!images || !images['ad:image']) return [];
  
  const imageArray = Array.isArray(images['ad:image']) ? images['ad:image'] : [images['ad:image']];
  const allImages: string[] = [];
  
  imageArray.forEach((image: any) => {
    if (image['ad:representation']) {
      const representations = Array.isArray(image['ad:representation']) ? 
                             image['ad:representation'] : [image['ad:representation']];
      
      // Get the largest representation for each image (prefer L, then XL, then M, then S)
      const largeImage = representations.find((rep: any) => rep.$?.size === 'L') ||
                        representations.find((rep: any) => rep.$?.size === 'XL') ||
                        representations.find((rep: any) => rep.$?.size === 'M') ||
                        representations[0];
      
      if (largeImage?.$?.url) {
        allImages.push(largeImage.$.url);
      } else if (largeImage?.url) {
        allImages.push(largeImage.url);
      }
    } else if (image.$?.url) {
      allImages.push(image.$.url);
    } else if (image.url) {
      allImages.push(image.url);
    }
  });
  
  return allImages;
}

export class InventoryController {
  /**
   * Test mobile.de connection
   * GET /api/inventory/test
   */
  async testConnection(req: Request, res: Response) {
    try {
      console.log('🧪 Testing mobile.de Search-API connection...');
      
      const result = await makeMobileDeRequest('/search', {
        customerNumber: MOBILE_DE_CONFIG.customerId,
        pageSize: 1
      });
      
      if (result.success) {
        const parsed = await parseXMLResponse(result.data);
        const searchResult = parsed['search:search-result'];
        const total = parseInt(searchResult['search:total'] || '0');
        
        res.json({
          success: true,
          message: 'Mobile.de API connection successful',
          status: result.status,
          customerNumber: MOBILE_DE_CONFIG.customerId,
          vehicleCount: total
        });
      } else {
        res.status(result.error?.status || 500).json({
          success: false,
          message: 'Mobile.de API connection failed',
          customerNumber: MOBILE_DE_CONFIG.customerId,
          error: result.error
        });
      }
    } catch (error: any) {
      console.error('Controller error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error during API test',
        error: error.message
      });
    }
  }

  /**
   * Get inventory from mobile.de
   * GET /api/inventory
   */
  async getInventory(req: Request, res: Response) {
    try {
      console.log('🚗 Fetching inventory from mobile.de...');
      
      const pageSize = parseInt(req.query.pageSize as string) || 50;
      const result = await makeMobileDeRequest('/search', {
        customerNumber: MOBILE_DE_CONFIG.customerId,
        pageSize: pageSize
      });
      
      if (result.success) {
        const parsed = await parseXMLResponse(result.data);
        const searchResult = parsed['search:search-result'];
        const ads = searchResult['search:ads']?.['ad:ad'] || [];
        
        // Handle both single ad and array of ads
        const adsArray = Array.isArray(ads) ? ads : [ads];
        const vehicles = adsArray.filter(ad => ad).map(transformVehicle);
        
        res.json({
          success: true,
          data: vehicles,
          total: parseInt(searchResult['search:total'] || '0'),
          customerNumber: MOBILE_DE_CONFIG.customerId,
          message: `Successfully fetched ${vehicles.length} vehicles`
        });
      } else {
        res.status(result.error?.status || 500).json({
          success: false,
          data: [],
          total: 0,
          error: result.error,
          message: 'Failed to fetch inventory from mobile.de'
        });
      }
    } catch (error: any) {
      console.error('Controller error:', error);
      res.status(500).json({
        success: false,
        data: [],
        total: 0,
        message: 'Internal server error',
        error: error.message
      });
    }
  }

  /**
   * Search vehicles with filters
   * GET /api/inventory/search
   */
  async searchVehicles(req: Request, res: Response) {
    try {
      console.log('🔍 Searching vehicles on mobile.de...');
      
      const searchParams: any = {
        customerNumber: MOBILE_DE_CONFIG.customerId,
        pageSize: parseInt(req.query.pageSize as string) || 20
      };
      
      // Add search filters
      if (req.query.make) searchParams.make = req.query.make;
      if (req.query.model) searchParams.model = req.query.model;
      if (req.query.priceFrom) searchParams.priceFrom = req.query.priceFrom;
      if (req.query.priceTo) searchParams.priceTo = req.query.priceTo;
      
      const result = await makeMobileDeRequest('/search', searchParams);
      
      if (result.success) {
        const parsed = await parseXMLResponse(result.data);
        const searchResult = parsed['search:search-result'];
        const ads = searchResult['search:ads']?.['ad:ad'] || [];
        
        const adsArray = Array.isArray(ads) ? ads : [ads];
        const vehicles = adsArray.filter(ad => ad).map(transformVehicle);
        
        res.json({
          success: true,
          data: vehicles,
          total: parseInt(searchResult['search:total'] || '0'),
          customerNumber: MOBILE_DE_CONFIG.customerId,
          searchParams: req.query
        });
      } else {
        res.status(result.error?.status || 500).json({
          success: false,
          data: [],
          total: 0,
          error: result.error,
          searchParams: req.query
        });
      }
    } catch (error: any) {
      console.error('Controller error:', error);
      res.status(500).json({
        success: false,
        data: [],
        total: 0,
        message: 'Internal server error',
        error: error.message
      });
    }
  }

  /**
   * Get filter options from mobile.de data
   * GET /api/inventory/filters
   */
  async getFilterOptions(req: Request, res: Response) {
    try {
      console.log('🔧 Getting filter options from mobile.de data...');
      
      // Get all vehicles to extract filter options
      const result = await makeMobileDeRequest('/search', {
        customerNumber: MOBILE_DE_CONFIG.customerId,
        pageSize: 100 // Get more vehicles for better filter data
      });
      
      if (result.success) {
        const parsed = await parseXMLResponse(result.data);
        const searchResult = parsed['search:search-result'];
        const ads = searchResult['search:ads']?.['ad:ad'] || [];
        
        const adsArray = Array.isArray(ads) ? ads : [ads];
        const vehicles = adsArray.filter(ad => ad).map(transformVehicle);
        
        // Extract real filter options from the data
        const brands = [...new Set(vehicles.map(v => v.make))].map(brand => ({
          brand,
          count: vehicles.filter(v => v.make === brand).length
        }));
        
        const fuelTypes = [...new Set(vehicles.map(v => v.fuelType))].map(fuel => ({
          value: fuel,
          count: vehicles.filter(v => v.fuelType === fuel).length
        }));
        
        const bodyTypes = [...new Set(vehicles.map(v => v.bodyType))].map(body => ({
          value: body,
          count: vehicles.filter(v => v.bodyType === body).length
        }));
        
        const transmissions = [...new Set(vehicles.map(v => v.transmission))];
        
        const conditions = [...new Set(vehicles.map(v => v.condition))].map(condition => ({
          value: condition,
          count: vehicles.filter(v => v.condition === condition).length
        }));
        
        const years = [...new Set(vehicles.map(v => v.year).filter(y => y !== null))].sort((a, b) => (b as number) - (a as number));
        
        res.json({
          success: true,
          data: {
            brands,
            fuelTypes,
            bodyTypes,
            transmissions,
            conditions,
            years,
            priceRanges: [
              { label: 'Bis 20.000 €', min: 0, max: 20000 },
              { label: '20.000 - 40.000 €', min: 20000, max: 40000 },
              { label: '40.000 - 60.000 €', min: 40000, max: 60000 },
              { label: '60.000 - 100.000 €', min: 60000, max: 100000 },
              { label: 'Über 100.000 €', min: 100000, max: 999999 },
            ]
          },
          message: 'Filter options extracted from mobile.de data'
        });
      } else {
        res.status(result.error?.status || 500).json({
          success: false,
          data: {
            brands: [],
            fuelTypes: [],
            bodyTypes: [],
            transmissions: [],
            conditions: [],
            years: [],
            priceRanges: []
          },
          error: result.error,
          message: 'Failed to get filter options from mobile.de'
        });
      }
    } catch (error: any) {
      console.error('Controller error:', error);
      res.status(500).json({
        success: false,
        data: {
          brands: [],
          fuelTypes: [],
          bodyTypes: [],
          transmissions: [],
          conditions: [],
          years: [],
          priceRanges: []
        },
        message: 'Internal server error',
        error: error.message
      });
    }
  }
}

export default new InventoryController();