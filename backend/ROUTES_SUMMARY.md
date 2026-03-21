# API Routes Summary

## Quick Reference

### Public Routes (No Auth Required)

| Method | Endpoint | Description | Query Params |
|--------|----------|-------------|--------------|
| GET | `/api/health` | Server health check | - |
| GET | `/api/cars` | List all cars | brand, minPrice, maxPrice, year, fuelType, bodyType, transmission, condition, sortBy, sortOrder, page, limit |
| GET | `/api/cars/exclusive` | Get exclusive deals | - |
| GET | `/api/cars/brands` | Brands with counts | - |
| GET | `/api/cars/filters` | All filter options | - |
| GET | `/api/cars/:id` | Single car details | - |
| GET | `/api/cars/similar/:id` | Similar cars | - |
| GET | `/api/brands` | All brands | - |
| GET | `/api/brands/:id` | Single brand | - |
| GET | `/api/features` | All features | category |

### Admin Routes (Auth Required)

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/admin/login` | Admin login | ❌ No |
| GET | `/api/admin/cars` | All cars (admin) | ✅ Yes |
| POST | `/api/admin/cars` | Add new car | ✅ Yes |
| PUT | `/api/admin/cars/:id` | Update car | ✅ Yes |
| DELETE | `/api/admin/cars/:id` | Delete car | ✅ Yes |
| GET | `/api/admin/stats` | Dashboard stats | ✅ Yes |

---

## Filter Parameters

### Available Filters

```typescript
{
  brand: 'BMW' | 'Mercedes-Benz' | 'Audi' | 'Porsche' | 'Volkswagen',
  minPrice: number,  // in EUR
  maxPrice: number,  // in EUR
  year: number,      // 2021-2024
  fuelType: 'Benzin' | 'Diesel' | 'Elektro' | 'Hybrid' | 'Plug-in-Hybrid',
  bodyType: 'Limousine' | 'SUV' | 'Kombi' | 'Coupé' | 'Cabrio' | 'Van' | 'Sportwagen',
  transmission: 'Automatik' | 'Schaltgetriebe',
  condition: 'Neu' | 'Gebraucht' | 'Jahreswagen',
  sortBy: 'price' | 'year' | 'mileage' | 'createdAt',
  sortOrder: 'asc' | 'desc',
  page: number,      // default: 1
  limit: number      // default: 10, max: 100
}
```

---

## Response Formats

### Standard Response
```typescript
{
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}
```

### Paginated Response
```typescript
{
  success: boolean;
  data: T[];
  message: string;
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}
```

---

## Common Use Cases

### 1. Homepage - Show Exclusive Deals
```
GET /api/cars/exclusive
```

### 2. Inventory Page - All Cars with Filters
```
GET /api/cars?page=1&limit=12&sortBy=price&sortOrder=asc
```

### 3. Brand Filter
```
GET /api/cars?brand=BMW&page=1&limit=12
```

### 4. Price Range Filter
```
GET /api/cars?minPrice=40000&maxPrice=80000
```

### 5. Electric Cars Only
```
GET /api/cars?fuelType=Elektro
```

### 6. New SUVs
```
GET /api/cars?bodyType=SUV&condition=Neu
```

### 7. Car Detail Page
```
GET /api/cars/:id
GET /api/cars/similar/:id
```

### 8. Filter Sidebar - Get Options
```
GET /api/cars/filters
```

### 9. Brand Page
```
GET /api/cars?brand=BMW
GET /api/brands/bmw
```

### 10. Admin Dashboard
```
POST /api/admin/login
GET /api/admin/stats
GET /api/admin/cars
```

---

## Authentication Flow

### 1. Login
```bash
POST /api/admin/login
Body: { "username": "admin", "password": "dealer2024" }
Response: { "token": "..." }
```

### 2. Use Token
```bash
GET /api/admin/stats
Headers: { "Authorization": "Bearer <token>" }
```

### 3. Token Expiration
- Tokens expire after 24 hours
- Return 401 Unauthorized if expired
- Client should redirect to login

---

## Error Codes

| Code | Meaning | Example |
|------|---------|---------|
| 200 | Success | Request successful |
| 201 | Created | Car added successfully |
| 400 | Bad Request | Missing required fields |
| 401 | Unauthorized | Invalid or missing token |
| 403 | Forbidden | Not admin role |
| 404 | Not Found | Car not found |
| 500 | Server Error | Internal error |

---

## Rate Limiting

Currently no rate limiting implemented. Consider adding in production:
- Public routes: 100 requests/minute
- Admin routes: 50 requests/minute

---

## CORS Configuration

Allowed origins:
- Development: `http://localhost:5173`
- Production: Configure via `CORS_ORIGIN` env variable

---

## Data Validation

### Car Object (POST/PUT)
Required fields:
- `brand` (string)
- `model` (string)
- `year` (number, 1900-2025)
- `price` (number, > 0)

Optional fields:
- All other Car interface fields

### Admin Login
Required fields:
- `username` (string)
- `password` (string)

---

## Performance Notes

- In-memory data storage (23 cars)
- No database queries
- Fast response times (<10ms typical)
- Pagination reduces payload size
- Consider caching for production

---

## Security Notes

- Simple JWT-like token (demo purposes)
- Use proper JWT library in production
- Store JWT_SECRET securely
- Use HTTPS in production
- Implement rate limiting
- Add input sanitization
- Consider refresh tokens

---

## Future Enhancements

- [ ] Database integration (PostgreSQL/MongoDB)
- [ ] Image upload functionality
- [ ] Search functionality (full-text)
- [ ] Favorites/Wishlist
- [ ] Contact/Inquiry forms
- [ ] Test drive scheduling
- [ ] Email notifications
- [ ] Advanced analytics
- [ ] Multi-language support
- [ ] Payment integration
