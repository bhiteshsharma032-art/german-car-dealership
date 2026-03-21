import express, { Express } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { errorHandler } from './middleware/errorHandler';
import { requestLogger } from './middleware/requestLogger';
import healthRouter from './routes/health';
import brandsRouter from './routes/brands';
import featuresRouter from './routes/features';
import adminRouter from './routes/admin';
import inventoryRouter from './routes/inventory';
import mobileDeRouter from './routes/mobilede';
import tradeInsRouter from './routes/tradeIns';

// Load environment variables
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 5000;

// Middleware - CORS configured for both local dev and production
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  process.env.CORS_ORIGIN,
  process.env.FRONTEND_URL,
].filter(Boolean) as string[];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps, curl, etc.)
    if (!origin) return callback(null, true);
    
    // Allow any Vercel preview/production URLs
    if (origin.endsWith('.vercel.app') || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    
    // In development, allow all origins
    if (process.env.NODE_ENV !== 'production') {
      return callback(null, true);
    }
    
    callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(requestLogger);

// Routes
app.use('/api/health', healthRouter);
app.use('/api/brands', brandsRouter);
app.use('/api/features', featuresRouter);
app.use('/api/admin', adminRouter);
app.use('/api/inventory', inventoryRouter);     // Mobile.de Live Inventory (ONLY SOURCE)
app.use('/api/mobilede', mobileDeRouter);       // Mobile.de API testing
app.use('/api/trade-ins', tradeInsRouter);


// Error handling middleware (must be last)
app.use(errorHandler);

// Only start listening when not in serverless mode (Vercel)
if (process.env.VERCEL !== '1') {
  app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
    console.log(`🌍[server]: Environment: ${process.env.NODE_ENV}`);
    console.log(`🚗[server]: Mobile.de Live Inventory Integration`);
    console.log(`📡[server]: Mobile.de Search-API ready:`);
    console.log(`  - Test: GET /api/inventory/test`);
    console.log(`  - Live Inventory: GET /api/inventory`);
    console.log(`  - Customer ID: ${process.env.MOBILEDE_CUSTOMER_ID || '712285'}`);
  });
}

export default app;
