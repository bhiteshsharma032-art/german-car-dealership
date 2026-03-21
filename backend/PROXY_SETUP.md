# 🚀 Mobile.de API Proxy Setup

## **What This Does**

Creates a secure Node.js backend proxy that:
- ✅ Stores mobile.de credentials securely in `.env` file
- ✅ Handles HTTP Basic Auth with Base64 encoding
- ✅ Bypasses CORS issues for frontend
- ✅ Provides clean `/api/inventory` endpoint
- ✅ Includes comprehensive error handling
- ✅ Transforms mobile.de data to your format

## **Quick Start**

### 1. Install Dependencies
```bash
cd backend
npm install express axios cors dotenv nodemon
```

### 2. Configure Environment
```bash
# Copy the proxy environment file
cp .env.proxy .env
```

### 3. Start Proxy Server
```bash
# Development mode with auto-reload
npm run dev

# Or production mode
npm start
```

### 4. Test the Proxy
```bash
# Run test script
node test-proxy.js
```

## **API Endpoints**

### Health Check
```bash
GET http://localhost:5001/health
```

### Test Mobile.de Connection
```bash
GET http://localhost:5001/api/test
```

### Get Inventory
```bash
GET http://localhost:5001/api/inventory
GET http://localhost:5001/api/inventory?pageSize=20
```

### Search Vehicles
```bash
GET http://localhost:5001/api/inventory/search?make=BMW&model=M4
GET http://localhost:5001/api/inventory/search?priceFrom=50000&priceTo=100000
```

## **Frontend Integration**

Update your frontend to use the proxy:

```javascript
// frontend/src/services/inventoryService.js
const API_BASE = 'http://localhost:5001/api';

export const inventoryService = {
  async getInventory() {
    const response = await fetch(`${API_BASE}/inventory`);
    return response.json();
  },
  
  async searchVehicles(filters) {
    const params = new URLSearchParams(filters);
    const response = await fetch(`${API_BASE}/inventory/search?${params}`);
    return response.json();
  }
};
```

## **Security Features**

- ✅ **Credentials Protection**: API keys stored in `.env` file
- ✅ **Base64 Encoding**: Proper HTTP Basic Auth implementation
- ✅ **CORS Handling**: Allows frontend access while blocking others
- ✅ **Error Sanitization**: Doesn't expose sensitive error details
- ✅ **Request Timeout**: Prevents hanging requests
- ✅ **Input Validation**: Sanitizes query parameters

## **Error Handling**

The proxy handles these error scenarios:

### 401 Unauthorized
```json
{
  "success": false,
  "message": "Mobile.de API connection failed",
  "error": {
    "status": 401,
    "message": "Unauthorized"
  }
}
```

### Network Timeout
```json
{
  "success": false,
  "error": {
    "status": 500,
    "message": "timeout of 10000ms exceeded"
  }
}
```

### Missing Credentials
```json
{
  "success": false,
  "message": "Mobile.de credentials not configured in .env file"
}
```

## **Data Transformation**

Mobile.de data is automatically transformed:

```javascript
// Mobile.de format → Your format
{
  id: "mobile-123",
  title: "BMW M4 Competition",
  vehicle: {
    make: "BMW",
    model: "M4",
    power: { hp: 510 }
  },
  price: { amount: 75000, currency: "EUR" }
}
// ↓ Becomes ↓
{
  id: "mobile-123",
  title: "BMW M4 Competition", 
  brand: "BMW",
  model: "M4",
  price: 75000,
  currency: "EUR",
  horsePower: 510
}
```

## **Troubleshooting**

### Proxy Won't Start
```bash
# Check if port 5001 is available
netstat -an | findstr :5001

# Try different port
PORT=5002 npm start
```

### 401 Errors
- Verify credentials in `.env` file
- Check if mobile.de account has API access
- Contact mobile.de support for API permissions

### CORS Issues
- Ensure proxy is running on port 5001
- Update frontend API_BASE URL
- Check browser network tab for actual errors

## **Testing Commands**

```bash
# Test health
curl http://localhost:5001/health

# Test mobile.de connection  
curl http://localhost:5001/api/test

# Test inventory
curl http://localhost:5001/api/inventory

# Test with parameters
curl "http://localhost:5001/api/inventory?pageSize=5"
```

## **Production Deployment**

For production, update:

1. **Environment Variables**:
   ```bash
   NODE_ENV=production
   PORT=5001
   CORS_ORIGIN=https://yourdomain.com
   ```

2. **Process Manager**:
   ```bash
   npm install -g pm2
   pm2 start src/proxy/mobileDeProxy.js --name mobile-proxy
   ```

3. **Reverse Proxy** (nginx):
   ```nginx
   location /api/ {
     proxy_pass http://localhost:5001/api/;
   }
   ```

Your secure mobile.de proxy is ready! 🚗✨