import api from './api';
import { Car, ApiResponse } from './carService';

// PRODUCTION ADMIN SERVICE - NO DEMO MODE, ONLY LIVE DATA

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: {
    username: string;
    role: string;
  };
}

export interface DashboardStats {
  totalCars: number;
  byBrand: Record<string, number>;
  byCondition: Record<string, number>;
  priceRanges: Record<string, number>;
  avgPrice: number;
  exclusiveDeals: number;
  totalValue: number;
}

export const adminService = {
  // Login - PRODUCTION ONLY
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    console.log('🔐 AdminService: Production login (NO DEMO MODE)');
    const response = await api.post<ApiResponse<LoginResponse>>('/admin/login', credentials);
    if (response.data.data?.token) {
      localStorage.setItem('token', response.data.data.token);
    }
    return response.data.data!;
  },

  // Logout - PRODUCTION ONLY
  logout: () => {
    console.log('🚪 AdminService: Production logout');
    localStorage.removeItem('token');
  },

  // Check if logged in - PRODUCTION ONLY
  isLoggedIn: (): boolean => {
    return !!localStorage.getItem('token');
  },

  // Get token - PRODUCTION ONLY
  getToken: (): string | null => {
    return localStorage.getItem('token');
  },

  // Get all cars from mobile.de - PRODUCTION ONLY
  getAllCars: async (): Promise<Car[]> => {
    console.log('🚗 AdminService: Getting cars from mobile.de (NO DEMO MODE)');
    const response = await api.get<ApiResponse<Car[]>>('/admin/cars');
    return response.data.data || [];
  },

  // Get dashboard stats from mobile.de - PRODUCTION ONLY
  getDashboardStats: async (): Promise<DashboardStats> => {
    console.log('📊 AdminService: Getting stats from mobile.de (NO DEMO MODE)');
    
    try {
      // Get live cars from mobile.de
      const cars = await adminService.getAllCars();
      
      // Calculate stats from live data
      const totalCars = cars.length;
      const byBrand = cars.reduce((acc, car) => {
        acc[car.brand] = (acc[car.brand] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);
      
      const byCondition = cars.reduce((acc, car) => {
        acc[car.condition] = (acc[car.condition] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);
      
      const priceRanges = cars.reduce((acc, car) => {
        const range = car.price < 20000 ? 'Unter 20k' :
                     car.price < 50000 ? '20k-50k' :
                     car.price < 100000 ? '50k-100k' : 'Über 100k';
        acc[range] = (acc[range] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);
      
      const avgPrice = cars.length > 0 ? 
        cars.reduce((sum, car) => sum + car.price, 0) / cars.length : 0;
      
      const exclusiveDeals = cars.filter(car => car.isExclusive).length;
      const totalValue = cars.reduce((sum, car) => sum + car.price, 0);
      
      return {
        totalCars,
        byBrand,
        byCondition,
        priceRanges,
        avgPrice,
        exclusiveDeals,
        totalValue
      };
    } catch (error) {
      console.error('Error getting dashboard stats from mobile.de:', error);
      return {
        totalCars: 0,
        byBrand: {},
        byCondition: {},
        priceRanges: {},
        avgPrice: 0,
        exclusiveDeals: 0,
        totalValue: 0
      };
    }
  },

  // Add car - redirect to mobile.de platform
  addCar: async (carData: Partial<Car>): Promise<Car> => {
    console.log('Adding car', carData);
    throw new Error('Cars should be added directly on mobile.de platform. This will automatically sync to your website.');
  },

  // Update car - redirect to mobile.de platform
  updateCar: async (id: string, carData: Partial<Car>): Promise<Car> => {
    console.log('Updating car', id, carData);
    throw new Error('Cars should be updated directly on mobile.de platform. Changes will automatically sync to your website.');
  },

  // Delete car - redirect to mobile.de platform
  deleteCar: async (id: string): Promise<void> => {
    console.log('Deleting car', id);
    throw new Error('Cars should be deleted directly on mobile.de platform. This will automatically sync to your website.');
  },

  // Get car by ID from mobile.de - PRODUCTION ONLY
  getCarById: async (id: string): Promise<Car> => {
    console.log('🔍 AdminService: Getting car by ID from mobile.de (NO DEMO MODE)');
    const cars = await adminService.getAllCars();
    const car = cars.find(c => c.id === id);
    if (!car) {
      throw new Error('Car not found in mobile.de inventory');
    }
    return car;
  }
};