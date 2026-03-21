# Car Dealership API Documentation

Base URL: `http://localhost:5000/api`

## Authentication

Admin routes require a Bearer token in the Authorization header:
```
Authorization: Bearer <token>
```

---

## Public Endpoints

### Health Check

#### GET /health
Check server health status.

**Response:**
```json
{
  "success": true,
  "data": {
    "status": "OK",
    "timestamp": "2024-01-22T10:30:00.000Z",
    "uptime": 3600,
    "environment": "development",
    "version": "1.0.0"
  },
  "message": "Server ist betriebsbereit"
}
```

---

## Car Endpoints

### GET /cars
List all cars with filtering, sorting, and pagination.

**Query Parameters:**
- `brand` (string): Filter by brand (e.g., "BMW", "Mercedes-Benz")
- `minPrice` (number): Minimum price in EUR
- `maxPrice` (number): Maximum price in EUR
- `year` (number): Filter by year
- `fuelType` (string): Benzin, Diesel, Elektro, Hybrid, Plug-in-Hybrid
- `bodyType` (string): Limousine, SUV, Kombi, Coupé, Cabrio, Van, Sportwagen
- `transmission` (string): Automatik, Schaltgetriebe
- `condition` (string): Neu, Gebraucht, Jahreswagen
- `sortBy` (string): Field to sort by (price, year, mileage, createdAt)
- `sortOrder` (string): asc or desc (default: desc)
- `page` (number): Page number (default: 1)
- `limit` (number): Items per page (default: 10, max: 100)

**Example:**
```
GET /cars?brand=BMW&minPrice=40000&maxPrice=80000&sortBy=price&sortOrder=asc&page=1&limit=10
```

**Response:**
```json
{
  "success": true,
  "data": [...],
  "message": "23 Fahrzeuge gefunden",
  "total": 23,
  "page": 1,
  "limit": 10,
  "totalPages": 3,
  "hasNext": true,
  "hasPrev": false
}
```

---

### GET /cars/exclusive
Get exclusive/featured deals only.

**Response:**
```json
{
  "success": true,
  "data": [...],
  "message": "5 exklusive Angebote gefunden"
}
```

---

### GET /cars/brands
Get all available brands with car counts and price ranges.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "brand": "BMW",
      "count": 5,
      "minPrice": 42000,
      "maxPrice": 98000
    },
    ...
  ],
  "message": "5 Marken verfügbar"
}
```

---

### GET /cars/filters
Get all available filter options with counts.

**Response:**
```json
{
  "success": true,
  "data": {
    "brands": [
      { "value": "BMW", "count": 5 },
      { "value": "Mercedes-Benz", "count": 5 }
    ],
    "years": [2024, 2023, 2022, 2021],
    "fuelTypes": [
      { "value": "Benzin", "count": 7 },
      { "value": "Diesel", "count": 6 }
    ],
    "bodyTypes": [
      { "value": "SUV", "count": 8 },
      { "value": "Limousine", "count": 6 }
    ],
    "transmissions": ["Automatik", "Schaltgetriebe"],
    "conditions": [
      { "value": "Gebraucht", "count": 16 },
      { "value": "Jahreswagen", "count": 5 }
    ],
    "priceRange": { "min": 32000, "max": 185000 },
    "mileageRange": { "min": 1200, "max": 48000 }
  },
  "message": "Filteroptionen erfolgreich abgerufen"
}
```

---

### GET /cars/:id
Get single car details by ID.

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "1",
    "brand": "Porsche",
    "model": "911 Carrera S",
    "year": 2023,
    "price": 145000,
    ...
  }
}
```

---

### GET /cars/similar/:id
Get similar cars based on brand and body type.

**Response:**
```json
{
  "success": true,
  "data": [...],
  "message": "6 ähnliche Fahrzeuge gefunden"
}
```

---

## Brand Endpoints

### GET /brands
Get all brands with logos and descriptions.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "bmw",
      "name": "BMW",
      "logo": "https://cdn.worldvectorlogo.com/logos/bmw.svg",
      "description": "Bayerische Motoren Werke - Freude am Fahren",
      "country": "Deutschland"
    },
    ...
  ],
  "message": "5 Marken verfügbar"
}
```

---

### GET /brands/:id
Get brand by ID.

---

## Feature Endpoints

### GET /features
Get all car features.

**Query Parameters:**
- `category` (string): comfort, safety, technology, exterior, interior

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "klimaautomatik",
      "name": "Klimaautomatik",
      "category": "comfort"
    },
    ...
  ],
  "message": "40 Ausstattungsmerkmale verfügbar"
}
```

---

## Admin Endpoints

### POST /admin/login
Admin login to get authentication token.

**Request Body:**
```json
{
  "username": "admin",
  "password": "dealer2024"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGc...",
    "user": {
      "username": "admin",
      "role": "admin"
    }
  },
  "message": "Erfolgreich angemeldet"
}
```

---

### GET /admin/cars
Get all cars (admin view). Requires authentication.

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": [...],
  "message": "23 Fahrzeuge gefunden"
}
```

---

### POST /admin/cars
Add a new car. Requires authentication.

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "brand": "BMW",
  "model": "X5 M50i",
  "year": 2024,
  "price": 95000,
  "mileage": 0,
  "fuelType": "Benzin",
  "transmission": "Automatik",
  "bodyType": "SUV",
  "engineSize": 4.4,
  "horsePower": 530,
  "color": "Schwarz",
  "exteriorColor": "Carbonschwarz Metallic",
  "interiorColor": "Leder Cognac",
  "features": ["led-scheinwerfer", "navi", "ledersitze"],
  "images": [],
  "isExclusive": false,
  "condition": "Neu",
  "previousOwners": 0,
  "warranty": true,
  "warrantyMonths": 48,
  "description": "Brandneuer BMW X5 M50i..."
}
```

**Response:**
```json
{
  "success": true,
  "data": { ... },
  "message": "Fahrzeug erfolgreich hinzugefügt"
}
```

---

### PUT /admin/cars/:id
Update an existing car. Requires authentication.

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:** (partial update supported)
```json
{
  "price": 92000,
  "mileage": 5000,
  "description": "Updated description..."
}
```

**Response:**
```json
{
  "success": true,
  "data": { ... },
  "message": "Fahrzeug erfolgreich aktualisiert"
}
```

---

### DELETE /admin/cars/:id
Delete a car. Requires authentication.

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": { ... },
  "message": "Fahrzeug erfolgreich gelöscht"
}
```

---

### GET /admin/stats
Get dashboard statistics. Requires authentication.

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "totalCars": 23,
    "byBrand": {
      "BMW": 5,
      "Mercedes-Benz": 5,
      "Audi": 5,
      "Porsche": 4,
      "Volkswagen": 4
    },
    "byCondition": {
      "Neu": 2,
      "Jahreswagen": 5,
      "Gebraucht": 16
    },
    "priceRanges": {
      "unter_30k": 0,
      "30k_50k": 7,
      "50k_80k": 9,
      "80k_120k": 5,
      "ueber_120k": 2
    },
    "avgPrice": 68000,
    "exclusiveDeals": 5,
    "totalValue": 1564000
  },
  "message": "Statistiken erfolgreich abgerufen"
}
```

---

## Error Responses

All endpoints return errors in this format:

```json
{
  "success": false,
  "error": "Error message in German"
}
```

**Common Status Codes:**
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

---

## Notes

- All prices are in EUR (€)
- All distances are in kilometers (km)
- Engine power is in PS (Pferdestärken)
- All text responses are in German
- Pagination default: 10 items per page, max 100
- Token expiration: 24 hours
- All dates are in ISO 8601 format
