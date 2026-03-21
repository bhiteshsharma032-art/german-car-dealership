
import { inventoryService, InventoryVehicle } from './inventoryService';

export interface Car {
  id: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  fuelType: string;
  transmission: string;
  bodyType: string;
  engineSize: number;
  horsePower: number;
  color: string;
  exteriorColor: string;
  interiorColor: string;
  features: string[];
  images: string[];
  isExclusive: boolean;
  condition: string;
  previousOwners: number;
  lastService?: string;
  warranty: boolean;
  warrantyMonths?: number;
  description: string;
  createdAt: string | Date;
  updatedAt: string | Date;
}

export interface CarFilters {
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  year?: number;
  fuelType?: string;
  bodyType?: string;
  transmission?: string;
  condition?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  message?: string;
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// Transform mobile.de vehicle to our Car interface
const transformMobileDeVehicle = (vehicle: InventoryVehicle): Car => {
  return {
    id: vehicle.id,
    brand: vehicle.make,
    model: vehicle.model,
    year: vehicle.firstRegistration ? new Date(vehicle.firstRegistration).getFullYear() : new Date().getFullYear(),
    price: vehicle.price.amount,
    mileage: vehicle.mileage?.value || 0,
    fuelType: 'Benzin', // Default, could be enhanced with more API data
    transmission: 'Automatik', // Default, could be enhanced with more API data
    bodyType: 'Limousine', // Default, could be enhanced with more API data
    engineSize: 0, // Not available in mobile.de API
    horsePower: vehicle.power?.hp || 0,
    color: 'Schwarz', // Default
    exteriorColor: 'Schwarz', // Default
    interiorColor: 'Schwarz', // Default
    features: [], // Could be enhanced with more API data
    images: vehicle.images || (vehicle.image ? [vehicle.image] : []), // Use all images or fallback to single image
    isExclusive: vehicle.price.amount > 50000, // Mark expensive cars as exclusive
    condition: 'Gebraucht',
    previousOwners: 1,
    warranty: true,
    description: vehicle.title,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
};

// PRODUCTION SERVICE - ONLY MOBILE.DE DATA
export const carService = {
  // Get all cars from mobile.de ONLY
  getAllCars: async (filters?: CarFilters): Promise<PaginatedResponse<Car>> => {
    try {
      console.log('🚗 CarService: Fetching LIVE mobile.de inventory (NO MOCK DATA)');
      
      // Use mobile.de inventory service ONLY
      const response = await inventoryService.getInventory(filters?.limit || 50);
      
      if (!response.success) {
        throw new Error(response.error || 'Failed to fetch cars from mobile.de');
      }

      // Transform mobile.de vehicles to our Car interface
      const transformedCars = response.data.map(transformMobileDeVehicle);

      // Apply filters if provided
      let filteredCars = transformedCars;
      
      if (filters?.brand) {
        filteredCars = filteredCars.filter(car => 
          car.brand.toLowerCase().includes(filters.brand!.toLowerCase())
        );
      }
      
      if (filters?.minPrice) {
        filteredCars = filteredCars.filter(car => car.price >= filters.minPrice!);
      }
      
      if (filters?.maxPrice) {
        filteredCars = filteredCars.filter(car => car.price <= filters.maxPrice!);
      }

      return {
        success: true,
        data: filteredCars,
        total: filteredCars.length,
        page: 1,
        limit: filteredCars.length,
        totalPages: 1,
        hasNext: false,
        hasPrev: false,
        message: `Found ${filteredCars.length} vehicles from mobile.de`
      };
    } catch (error) {
      console.error('Error fetching cars from mobile.de:', error);
      return {
        success: false,
        data: [],
        total: 0,
        page: 1,
        limit: 0,
        totalPages: 0,
        hasNext: false,
        hasPrev: false,
        message: 'Failed to fetch vehicles from mobile.de'
      };
    }
  },

  // Get exclusive deals from mobile.de ONLY
  getExclusiveDeals: async (): Promise<Car[]> => {
    try {
      console.log('💎 CarService: Fetching exclusive deals from mobile.de (NO MOCK DATA)');
      
      const response = await inventoryService.getInventory(20);
      
      if (!response.success) {
        return [];
      }

      // Transform and filter for exclusive deals (expensive cars)
      const transformedCars = response.data
        .map(transformMobileDeVehicle)
        .filter(car => car.isExclusive)
        .slice(0, 4);

      return transformedCars;
    } catch (error) {
      console.error('Error fetching exclusive deals from mobile.de:', error);
      return [];
    }
  },

  // Get car by ID from mobile.de ONLY
  getCarById: async (id: string): Promise<Car> => {
    try {
      console.log('🔍 CarService: Getting car by ID from mobile.de (NO MOCK DATA)');
      
      const response = await inventoryService.getInventory(100);
      
      if (!response.success) {
        throw new Error('Car not found in mobile.de inventory');
      }

      const vehicle = response.data.find(v => v.id === id);
      
      if (!vehicle) {
        throw new Error('Car not found in mobile.de inventory');
      }

      return transformMobileDeVehicle(vehicle);
    } catch (error) {
      console.error('Error fetching car by ID from mobile.de:', error);
      throw error;
    }
  },

  // Get similar cars from mobile.de ONLY
  getSimilarCars: async (id: string): Promise<Car[]> => {
    try {
      console.log('🔗 CarService: Getting similar cars from mobile.de (NO MOCK DATA)');
      
      const response = await inventoryService.getInventory(50);
      
      if (!response.success) {
        return [];
      }

      // Get the current car to find similar ones
      const currentVehicle = response.data.find(v => v.id === id);
      
      if (!currentVehicle) {
        return [];
      }

      // Find similar cars (same make or similar price range)
      const similarVehicles = response.data
        .filter(v => v.id !== id)
        .filter(v => 
          v.make === currentVehicle.make || 
          Math.abs(v.price.amount - currentVehicle.price.amount) < 10000
        )
        .slice(0, 3);

      return similarVehicles.map(transformMobileDeVehicle);
    } catch (error) {
      console.error('Error fetching similar cars from mobile.de:', error);
      return [];
    }
  },

  // Get brands from mobile.de ONLY
  getBrandsWithCounts: async () => {
    try {
      console.log('🏷️ CarService: Getting brands from mobile.de (NO MOCK DATA)');
      
      const response = await inventoryService.getInventory(100);
      
      if (!response.success) {
        return [];
      }

      // Count brands from mobile.de data
      const brandCounts = response.data.reduce((acc, vehicle) => {
        acc[vehicle.make] = (acc[vehicle.make] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      return Object.entries(brandCounts).map(([brand, count]) => ({
        brand,
        count,
      }));
    } catch (error) {
      console.error('Error fetching brands from mobile.de:', error);
      return [];
    }
  },

  // Get filter options from mobile.de ONLY
  getFilterOptions: async () => {
    try {
      console.log('🔧 CarService: Getting filter options from mobile.de (NO MOCK DATA)');
      
      const response = await inventoryService.getInventory(100);
      
      if (!response.success) {
        return {
          brands: [],
          fuelTypes: ['Benzin', 'Diesel', 'Elektro', 'Hybrid'],
          bodyTypes: ['Limousine', 'Kombi', 'SUV', 'Coupé'],
          transmissions: ['Automatik', 'Manuell'],
          priceRanges: [
            { label: 'Bis 20.000 €', min: 0, max: 20000 },
            { label: '20.000 - 40.000 €', min: 20000, max: 40000 },
            { label: '40.000 - 60.000 €', min: 40000, max: 60000 },
            { label: '60.000 - 100.000 €', min: 60000, max: 100000 },
            { label: 'Über 100.000 €', min: 100000, max: 999999 },
          ]
        };
      }

      const brands = [...new Set(response.data.map(v => v.make))];

      return {
        brands,
        fuelTypes: ['Benzin', 'Diesel', 'Elektro', 'Hybrid'],
        bodyTypes: ['Limousine', 'Kombi', 'SUV', 'Coupé'],
        transmissions: ['Automatik', 'Manuell'],
        conditions: ['Neu', 'Gebraucht', 'Vorführwagen'],
        priceRanges: [
          { label: 'Bis 20.000 €', min: 0, max: 20000 },
          { label: '20.000 - 40.000 €', min: 20000, max: 40000 },
          { label: '40.000 - 60.000 €', min: 40000, max: 60000 },
          { label: '60.000 - 100.000 €', min: 60000, max: 100000 },
          { label: 'Über 100.000 €', min: 100000, max: 999999 },
        ]
      };
    } catch (error) {
      console.error('Error fetching filter options from mobile.de:', error);
      return {
        brands: [],
        fuelTypes: ['Benzin', 'Diesel', 'Elektro', 'Hybrid'],
        bodyTypes: ['Limousine', 'Kombi', 'SUV', 'Coupé'],
        transmissions: ['Automatik', 'Manuell'],
        conditions: ['Neu', 'Gebraucht', 'Vorführwagen'],
        priceRanges: []
      };
    }
  },
};
