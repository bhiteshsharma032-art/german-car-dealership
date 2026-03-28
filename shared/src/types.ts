export interface Car {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number; // in EUR
  mileage: number; // in km
  fuelType: FuelType;
  transmission: TransmissionType;
  color: string;
  description: string;
  images: string[];
  createdAt: Date;
  updatedAt: Date;
}

export enum FuelType {
  PETROL = 'PETROL',
  DIESEL = 'DIESEL',
  ELECTRIC = 'ELECTRIC',
  HYBRID = 'HYBRID',
}

export enum TransmissionType {
  MANUAL = 'MANUAL',
  AUTOMATIC = 'AUTOMATIC',
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
