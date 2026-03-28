import api from './api';

export interface InventoryVehicle {
  id: string;
  make: string;
  model: string;
  title: string;
  price: {
    amount: number;
    formatted: string;
    currency: string;
  };
  mileage?: {
    value: number;
    formatted: string;
    unit: string;
  };
  firstRegistration?: string;
  power?: {
    hp: number;
    kw: number;
    formatted: string;
  };
  fuelType?: string;
  transmission?: string;
  bodyType?: string;
  color?: string;
  interiorColor?: string;
  doors?: number;
  seats?: number;
  owners?: number;
  condition?: string;
  features?: string[];
  description?: string;
  images?: string[];
  image?: string;
  publicUrl: string;
  location?: {
    city: string;
    zipCode: string;
    country: string;
  };
  seller?: {
    name: string;
    type: string;
  };
  availability?: string;
  hu?: string; // HU/AU inspection
  emissionClass?: string;
  co2Emission?: number;
  fuelConsumption?: {
    combined?: number;
    city?: number;
    highway?: number;
  };
}

export interface SearchParams {
  make?: string;
  model?: string;
  priceFrom?: number;
  priceTo?: number;
  yearFrom?: number;
  yearTo?: number;
  mileageFrom?: number;
  mileageTo?: number;
  fuelType?: string;
  transmission?: string;
  bodyType?: string;
  color?: string;
  powerFrom?: number;
  powerTo?: number;
  condition?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

export interface InventoryResponse {
  success: boolean;
  data: InventoryVehicle[];
  total?: number;
  page?: number;
  limit?: number;
  error?: string;
}

class InventoryService {
  private cache: InventoryResponse | null = null;
  private lastFetch: number = 0;
  private CACHE_TTL = 5 * 60 * 1000; // 5 minutes

  async getInventory(limit: number = 1000, params?: SearchParams): Promise<InventoryResponse> {
    try {
      const isSimpleQuery = !params || Object.keys(params).length === 0;
      
      // Use cache if fetching standard inventory without complex filters
      if (isSimpleQuery && this.cache && (Date.now() - this.lastFetch < this.CACHE_TTL)) {
        console.log('⚡ Using cached inventory data from mobile.de');
        return {
          ...this.cache,
          data: this.cache.data.slice(0, limit),
          limit
        };
      }

      console.log('📡 Fetching inventory from mobile.de API...');
      
      const response = await api.get('/inventory', {
        params: {
          limit,
          ...params,
        },
      });

      if (response.data.success) {
        console.log(`✅ Loaded ${response.data.data?.length || 0} vehicles from mobile.de`);
        const result = {
          success: true,
          data: response.data.data || [],
          total: response.data.total,
          page: response.data.page,
          limit: response.data.limit,
        };

        // Cache the successful base response
        if (isSimpleQuery && result.data.length > 0) {
          this.cache = result;
          this.lastFetch = Date.now();
        }

        return result;
      }

      return {
        success: false,
        data: [],
        error: response.data.error || 'Failed to fetch inventory',
      };
    } catch (error: any) {
      console.error('❌ Error fetching inventory:', error);
      return {
        success: false,
        data: [],
        error: error.message || 'Network error',
      };
    }
  }

  async getVehicleById(id: string): Promise<InventoryVehicle | null> {
    try {
      console.log(`📡 Fetching vehicle ${id} from mobile.de API...`);
      
      // For now, fetch all and filter (can be optimized with specific endpoint)
      const response = await this.getInventory(100);
      
      if (response.success) {
        const vehicle = response.data.find(v => v.id === id);
        if (vehicle) {
          console.log(`✅ Found vehicle: ${vehicle.make} ${vehicle.model}`);
          return vehicle;
        }
      }

      console.warn(`⚠️ Vehicle ${id} not found`);
      return null;
    } catch (error) {
      console.error('❌ Error fetching vehicle:', error);
      return null;
    }
  }

  async searchVehicles(params: SearchParams): Promise<InventoryResponse> {
    return this.getInventory(params.limit || 1000, params);
  }
}

export const inventoryService = new InventoryService();
