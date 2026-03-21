# Car Dealership Inventory Documentation

## Overview
Comprehensive hardcoded inventory data for a German premium car dealership with 23 vehicles.

## Data Structure

### Car Types (`/types/car.types.ts`)

#### Enums
- **FuelType**: Benzin, Diesel, Elektro, Hybrid, Plug-in-Hybrid
- **TransmissionType**: Automatik, Schaltgetriebe
- **BodyType**: Limousine, SUV, Kombi, Coupé, Cabrio, Van, Sportwagen
- **Condition**: Neu, Gebraucht, Jahreswagen

#### Interfaces
- **Car**: Complete vehicle information with 20+ fields
- **Brand**: Brand information with logo and description
- **CarFeature**: Feature categorization system

### Inventory Summary (`/data/cars.data.ts`)

#### Total Vehicles: 23

**By Brand:**
- BMW: 5 vehicles
- Mercedes-Benz: 5 vehicles
- Audi: 5 vehicles
- Porsche: 4 vehicles
- Volkswagen: 4 vehicles

**By Condition:**
- Neu (New): 2 vehicles
- Jahreswagen (Year-old): 5 vehicles
- Gebraucht (Used): 16 vehicles

**By Fuel Type:**
- Benzin: 7 vehicles
- Diesel: 6 vehicles
- Elektro: 4 vehicles
- Hybrid/Plug-in-Hybrid: 6 vehicles

**Price Range:**
- Budget (€15,000 - €40,000): 7 vehicles
- Mid-range (€40,000 - €70,000): 9 vehicles
- Premium (€70,000 - €150,000): 5 vehicles
- Luxury (€150,000+): 2 vehicles

**Exclusive Deals:** 5 featured vehicles
1. Porsche 911 Carrera S (€145,000)
2. Mercedes-Benz S 500 4MATIC (€128,000)
3. BMW iX xDrive50 (€98,000)
4. Audi RS 6 Avant (€135,000)
5. Porsche Taycan Turbo S (€185,000)

### Brands (`/data/brands.data.ts`)

5 German premium brands with logos and descriptions:
- BMW - "Freude am Fahren"
- Mercedes-Benz - "Das Beste oder nichts"
- Audi - "Vorsprung durch Technik"
- Porsche - "Es gibt kein Substitut"
- Volkswagen - "Das Auto"

### Features (`/data/features.data.ts`)

40+ features categorized into:
- **Comfort** (8 features): Klimaautomatik, Sitzheizung, Ledersitze, etc.
- **Safety** (10 features): ABS, ESP, Spurhalteassistent, etc.
- **Technology** (9 features): Navigationssystem, Head-Up Display, etc.
- **Exterior** (6 features): LED-Scheinwerfer, Matrix LED, etc.
- **Interior** (5 features): Multifunktionslenkrad, ISOFIX, etc.

## API Endpoints

### Cars
- `GET /api/cars` - Get all cars (with filters)
  - Query params: `exclusive`, `brand`, `minPrice`, `maxPrice`, `condition`
- `GET /api/cars/:id` - Get car by ID

### Brands
- `GET /api/brands` - Get all brands
- `GET /api/brands/:id` - Get brand by ID

### Features
- `GET /api/features` - Get all features
  - Query param: `category` (comfort, safety, technology, exterior, interior)

### Health
- `GET /api/health` - Server health check

## Helper Functions

### Cars Data
- `getCarById(id: string)`
- `getExclusiveCars()`
- `getCarsByBrand(brand: string)`
- `getCarsByPriceRange(min: number, max: number)`
- `getCarsByCondition(condition: Condition)`

### Brands Data
- `getBrandById(id: string)`
- `getBrandByName(name: string)`

### Features Data
- `getFeaturesByCategory(category: string)`
- `getFeatureById(id: string)`

## Sample Vehicles

### Budget Option
**VW Passat Variant 2.0 TDI** (€32,000)
- Year: 2021, Mileage: 48,000 km
- Diesel, 150 PS, Kombi
- Perfect for families and long-distance drivers

### Mid-Range Option
**BMW 320d Touring** (€42,000)
- Year: 2022, Mileage: 28,000 km
- Diesel, 190 PS, Kombi
- Well-maintained with full service history

### Premium Option
**Porsche Cayenne S** (€82,000)
- Year: 2021, Mileage: 32,000 km
- Benzin, 440 PS, SUV
- V6 Biturbo with air suspension

### Luxury Option
**Porsche Taycan Turbo S** (€185,000)
- Year: 2024, Mileage: 1,200 km
- Elektro, 761 PS, Limousine
- 0-100 km/h in 2.8 seconds

## German Market Specifics

- All prices in EUR (€)
- Mileage in kilometers (km)
- Engine power in PS (Pferdestärken)
- German descriptions and feature names
- Locale: de-DE
- Realistic German specifications and service history
