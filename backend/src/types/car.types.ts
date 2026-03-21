export enum FuelType {
  BENZIN = 'Benzin',
  DIESEL = 'Diesel',
  ELEKTRO = 'Elektro',
  HYBRID = 'Hybrid',
  PLUG_IN_HYBRID = 'Plug-in-Hybrid',
}

export enum TransmissionType {
  AUTOMATIK = 'Automatik',
  SCHALTGETRIEBE = 'Schaltgetriebe',
}

export enum BodyType {
  LIMOUSINE = 'Limousine',
  SUV = 'SUV',
  KOMBI = 'Kombi',
  COUPE = 'Coupé',
  CABRIO = 'Cabrio',
  VAN = 'Van',
  SPORTWAGEN = 'Sportwagen',
}

export enum Condition {
  NEU = 'Neu',
  GEBRAUCHT = 'Gebraucht',
  JAHRESWAGEN = 'Jahreswagen',
}

export interface CarFeature {
  id: string;
  name: string;
  category: 'comfort' | 'safety' | 'technology' | 'exterior' | 'interior';
}

export interface Car {
  id: string;
  brand: string;
  model: string;
  year: number;
  price: number; // in EUR
  mileage: number; // in km
  
  // Technical specifications
  fuelType: FuelType;
  transmission: TransmissionType;
  bodyType: BodyType;
  engineSize: number; // in liters
  horsePower: number; // PS
  
  // Colors
  color: string; // Main color for display
  exteriorColor: string;
  interiorColor: string;
  
  // Features and images
  features: string[];
  images: string[];
  
  // Status
  isExclusive: boolean;
  condition: Condition;
  previousOwners: number;
  lastService?: string; // Date string
  warranty: boolean;
  warrantyMonths?: number;
  
  // Description
  description: string;
  
  // Metadata
  createdAt: Date;
  updatedAt: Date;
}

export interface Brand {
  id: string;
  name: string;
  logo: string;
  description: string;
  country: string;
}
