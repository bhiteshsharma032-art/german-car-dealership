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
    netAmount?: number | null;
    netFormatted?: string | null;
    isVatable?: boolean;
    vatRate?: number;
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
  private CACHE_TTL = 2 * 60 * 1000; // 2 minutes - show new cars quickly
  private inflightRequest: Promise<InventoryResponse> | null = null;

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

      // Deduplicate: if a simple query is already in-flight, reuse it
      if (isSimpleQuery && this.inflightRequest) {
        console.log('⏳ Reusing in-flight inventory request...');
        const result = await this.inflightRequest;
        return {
          ...result,
          data: result.data.slice(0, limit),
          limit
        };
      }

      console.log('📡 Fetching inventory from mobile.de API...');
      
      const fetchPromise = (async (): Promise<InventoryResponse> => {
        const response = await api.get('/inventory', {
          params: {
            limit: 1000, // Always fetch all for caching
            ...params,
          },
        });

        if (response.data.success) {
          console.log(`✅ Loaded ${response.data.data?.length || 0} vehicles from mobile.de`);
          const result: InventoryResponse = {
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
          error: typeof response.data.error === 'string' ? response.data.error : (response.data.message || 'Failed to fetch inventory'),
        };
      })();

      // Store inflight promise for deduplication
      if (isSimpleQuery) {
        this.inflightRequest = fetchPromise;
      }

      const result = await fetchPromise;

      // Clear inflight
      if (isSimpleQuery) {
        this.inflightRequest = null;
      }

      return {
        ...result,
        data: result.data.slice(0, limit),
        limit
      };
    } catch (error: any) {
      this.inflightRequest = null;
      console.error('❌ Error fetching inventory:', error);
      const errMsg = error?.response?.data?.error || error?.response?.data?.message || error?.message || 'Network error';
      return {
        success: false,
        data: [],
        error: typeof errMsg === 'string' ? errMsg : 'Network error',
      };
    }
  }

  async getVehicleById(id: string): Promise<InventoryVehicle | null> {
    try {
      console.log(`📡 Fetching vehicle ${id} from mobile.de Ad API...`);
      
      const response = await api.get('/inventory/' + id);
      
      if (response.data.success && response.data.data) {
        console.log(`✅ Found vehicle: ${response.data.data.make} ${response.data.data.model}`);
        return response.data.data;
      }

      console.warn(`⚠️ Vehicle ${id} not found via API`);
      return null;
    } catch (error) {
      console.error('❌ Error fetching vehicle ad directly:', error);
      return null;
    }
  }

  async searchVehicles(params: SearchParams): Promise<InventoryResponse> {
    return this.getInventory(params.limit || 1000, params);
  }
}

export const inventoryService = new InventoryService();
