# API Testing Guide

## Quick Test Commands

### 1. Health Check
```bash
curl http://localhost:5000/api/health
```

### 2. Get All Cars (with pagination)
```bash
curl "http://localhost:5000/api/cars?page=1&limit=5"
```

### 3. Filter Cars by Brand
```bash
curl "http://localhost:5000/api/cars?brand=BMW"
```

### 4. Filter by Price Range
```bash
curl "http://localhost:5000/api/cars?minPrice=40000&maxPrice=80000"
```

### 5. Filter by Multiple Criteria
```bash
curl "http://localhost:5000/api/cars?brand=BMW&fuelType=Elektro&sortBy=price&sortOrder=asc"
```

### 6. Get Exclusive Deals
```bash
curl http://localhost:5000/api/cars/exclusive
```

### 7. Get Brands with Counts
```bash
curl http://localhost:5000/api/cars/brands
```

### 8. Get Filter Options
```bash
curl http://localhost:5000/api/cars/filters
```

### 9. Get Single Car
```bash
curl http://localhost:5000/api/cars/1
```

### 10. Get Similar Cars
```bash
curl http://localhost:5000/api/cars/similar/1
```

### 11. Get All Brands
```bash
curl http://localhost:5000/api/brands
```

### 12. Get Features by Category
```bash
curl "http://localhost:5000/api/features?category=safety"
```

---

## Admin API Tests

### 1. Admin Login
```bash
curl -X POST http://localhost:5000/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"dealer2024"}'
```

**Save the token from response for next requests!**

### 2. Get Admin Stats
```bash
curl http://localhost:5000/api/admin/stats \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### 3. Get All Cars (Admin)
```bash
curl http://localhost:5000/api/admin/cars \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### 4. Add New Car
```bash
curl -X POST http://localhost:5000/api/admin/cars \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "brand": "BMW",
    "model": "X7 M60i",
    "year": 2024,
    "price": 125000,
    "mileage": 0,
    "fuelType": "Benzin",
    "transmission": "Automatik",
    "bodyType": "SUV",
    "engineSize": 4.4,
    "horsePower": 530,
    "color": "Schwarz",
    "exteriorColor": "Carbonschwarz Metallic",
    "interiorColor": "Leder Cognac",
    "features": ["led-scheinwerfer", "navi", "ledersitze", "panoramadach"],
    "images": [],
    "isExclusive": true,
    "condition": "Neu",
    "previousOwners": 0,
    "warranty": true,
    "warrantyMonths": 48,
    "description": "Brandneuer BMW X7 M60i mit Vollausstattung"
  }'
```

### 5. Update Car
```bash
curl -X PUT http://localhost:5000/api/admin/cars/1 \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "price": 140000,
    "mileage": 9000
  }'
```

### 6. Delete Car
```bash
curl -X DELETE http://localhost:5000/api/admin/cars/23 \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## PowerShell Examples (Windows)

### Get All Cars
```powershell
Invoke-RestMethod -Uri "http://localhost:5000/api/cars?page=1&limit=5" -Method Get
```

### Admin Login
```powershell
$body = @{
    username = "admin"
    password = "dealer2024"
} | ConvertTo-Json

$response = Invoke-RestMethod -Uri "http://localhost:5000/api/admin/login" -Method Post -Body $body -ContentType "application/json"
$token = $response.data.token
```

### Get Stats with Token
```powershell
$headers = @{
    Authorization = "Bearer $token"
}

Invoke-RestMethod -Uri "http://localhost:5000/api/admin/stats" -Method Get -Headers $headers
```

---

## JavaScript/Fetch Examples

### Get All Cars
```javascript
fetch('http://localhost:5000/api/cars?brand=BMW&page=1&limit=10')
  .then(res => res.json())
  .then(data => console.log(data));
```

### Admin Login
```javascript
fetch('http://localhost:5000/api/admin/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    username: 'admin',
    password: 'dealer2024'
  })
})
  .then(res => res.json())
  .then(data => {
    const token = data.data.token;
    localStorage.setItem('token', token);
  });
```

### Get Stats (Authenticated)
```javascript
const token = localStorage.getItem('token');

fetch('http://localhost:5000/api/admin/stats', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
})
  .then(res => res.json())
  .then(data => console.log(data));
```

---

## Expected Response Examples

### Success Response
```json
{
  "success": true,
  "data": { ... },
  "message": "Success message in German"
}
```

### Error Response
```json
{
  "success": false,
  "error": "Error message in German"
}
```

### Paginated Response
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

## Filter Combinations

### Budget Cars (under €40,000)
```bash
curl "http://localhost:5000/api/cars?maxPrice=40000&sortBy=price&sortOrder=asc"
```

### Luxury Electric Cars
```bash
curl "http://localhost:5000/api/cars?fuelType=Elektro&minPrice=80000"
```

### New SUVs
```bash
curl "http://localhost:5000/api/cars?bodyType=SUV&condition=Neu"
```

### Diesel Wagons (Kombi)
```bash
curl "http://localhost:5000/api/cars?bodyType=Kombi&fuelType=Diesel"
```

### Recent Year Models
```bash
curl "http://localhost:5000/api/cars?year=2023&sortBy=price&sortOrder=desc"
```
