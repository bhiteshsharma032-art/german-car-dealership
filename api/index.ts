import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';
import * as xml2js from 'xml2js';
import crypto from 'crypto';
import { createClient } from '@supabase/supabase-js';
import nodemailer from 'nodemailer';

// Load environment variables
dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const supabase: any = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : { from: () => ({ insert: async () => ({ error: null }), select: () => ({ order: async () => ({ data: [], error: null }) }), update: () => ({ eq: async () => ({ error: null }) }), delete: () => ({ eq: async () => ({ error: null }) }) }) };

// Email configuration
const hasEmailConfig = process.env.SMTP_USER && process.env.SMTP_PASS;
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true',
  auth: hasEmailConfig ? {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  } : undefined,
});

const app = express();

// ============================================================================
// MIDDLEWARE
// ============================================================================

app.use(cors({
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
    if (!origin) return callback(null, true);
    if (origin.endsWith('.vercel.app') || origin === 'http://localhost:5173' || origin === 'http://localhost:3000') {
      return callback(null, true);
    }
    if (process.env.NODE_ENV !== 'production') {
      return callback(null, true);
    }
    if (process.env.CORS_ORIGIN && origin === process.env.CORS_ORIGIN) {
      return callback(null, true);
    }
    callback(null, true); // Allow all for now
  },
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logger
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    const logMessage = `${req.method} ${req.path} ${res.statusCode} - ${duration}ms`;
    if (res.statusCode >= 400) {
      console.error(`❌ ${logMessage}`);
    } else {
      console.log(`✅ ${logMessage}`);
    }
  });
  next();
});

// ============================================================================
// AUTH UTILS
// ============================================================================

interface TokenPayload {
  username: string;
  role: string;
  iat: number;
  exp: number;
}

const generateToken = (username: string, role: string = 'admin'): string => {
  const payload: TokenPayload = {
    username, role,
    iat: Date.now(),
    exp: Date.now() + 24 * 60 * 60 * 1000,
  };
  const payloadStr = JSON.stringify(payload);
  const payloadBase64 = Buffer.from(payloadStr).toString('base64');
  const secret = process.env.JWT_SECRET || 'nordhessen-automobile-secret-2024';
  const signature = crypto.createHmac('sha256', secret).update(payloadBase64).digest('base64');
  return `${payloadBase64}.${signature}`;
};

const verifyToken = (token: string): TokenPayload | null => {
  try {
    const [payloadBase64, signature] = token.split('.');
    if (!payloadBase64 || !signature) return null;
    const secret = process.env.JWT_SECRET || 'nordhessen-automobile-secret-2024';
    const expectedSignature = crypto.createHmac('sha256', secret).update(payloadBase64).digest('base64');
    if (signature !== expectedSignature) return null;
    const payloadStr = Buffer.from(payloadBase64, 'base64').toString('utf-8');
    const payload: TokenPayload = JSON.parse(payloadStr);
    if (payload.exp < Date.now()) return null;
    return payload;
  } catch { return null; }
};

// Auth Middleware
const authMiddleware = (req: any, res: any, next: any) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, error: 'Keine Authentifizierung vorhanden' });
    }
    const token = authHeader.substring(7);
    const payload = verifyToken(token);
    if (!payload) {
      return res.status(401).json({ success: false, error: 'Ungültiger oder abgelaufener Token' });
    }
    req.user = payload;
    next();
  } catch (error) { next(error); }
};

const adminOnly = (req: any, res: any, next: any) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ success: false, error: 'Zugriff verweigert. Admin-Rechte erforderlich.' });
  }
  next();
};

// ============================================================================
// MOBILE.DE API CLIENT
// ============================================================================

const MOBILE_DE_CONFIG = {
  baseURL: 'https://services.mobile.de/search-api',
  username: process.env.MOBILEDE_API_USERNAME || 'dlr_dimitriosmikhovsky',
  password: process.env.MOBILEDE_API_PASSWORD || 'kovoExT0mG3Y',
  customerId: process.env.MOBILEDE_CUSTOMER_ID || '712285',
  timeout: parseInt(process.env.MOBILEDE_TIMEOUT || '30000')
};

function getAuthHeader() {
  const credentials = Buffer.from(`${MOBILE_DE_CONFIG.username}:${MOBILE_DE_CONFIG.password}`).toString('base64');
  return `Basic ${credentials}`;
}

async function makeMobileDeRequest(endpoint: string, params: Record<string, any> = {}) {
  try {
    console.log('🔄 Mobile.de API Request:', { endpoint, params, hasAuth: !!MOBILE_DE_CONFIG.username });
    const response = await axios.get(`${MOBILE_DE_CONFIG.baseURL}${endpoint}`, {
      headers: {
        'Authorization': getAuthHeader(),
        'Accept': 'application/xml',
        'Accept-Language': 'de',
        'User-Agent': 'Nordhessen-Automobile/1.0'
      },
      params,
      timeout: MOBILE_DE_CONFIG.timeout
    });
    console.log('✅ Mobile.de API Response:', response.status);
    return { success: true, data: response.data, status: response.status };
  } catch (error: any) {
    console.error('❌ Mobile.de API Error:', {
      status: error.response?.status,
      message: error.message,
      data: error.response?.data ? 'XML/HTML Data received' : 'No data'
    });
    
    // Ensure error message is always a string
    let errorMsg = 'Failed to fetch from mobile.de';
    if (error.response?.data && typeof error.response.data === 'string' && error.response.data.includes('<error')) {
      errorMsg = `Mobile.de API Error: ${error.response.status} ${error.response.statusText || ''}`;
    } else {
      errorMsg = error.message || 'Unknown network error';
    }

    return {
      success: false,
      error: { 
        status: error.response?.status || 500, 
        message: errorMsg
      }
    };
  }
}

async function parseXMLResponse(xmlData: string) {
  const parser = new xml2js.Parser({ explicitArray: false });
  return await parser.parseStringPromise(xmlData);
}

// ============================================================================
// VEHICLE TRANSFORMATION
// ============================================================================

function extractYear(dateString: string | null): number | null {
  if (!dateString) return null;
  const match = dateString.match(/(\d{4})/);
  return match ? parseInt(match[1]) : null;
}

function getFirstImage(images: any): string | null {
  if (!images || !images['ad:image']) return null;
  const imageArray = Array.isArray(images['ad:image']) ? images['ad:image'] : [images['ad:image']];
  if (imageArray.length === 0) return null;
  const firstImage = imageArray[0];
  if (firstImage['ad:representation']) {
    const representations = Array.isArray(firstImage['ad:representation']) ?
      firstImage['ad:representation'] : [firstImage['ad:representation']];
    const largeImage = representations.find((rep: any) => rep.$?.size === 'XXXL') ||
      representations.find((rep: any) => rep.$?.size === 'XXL') ||
      representations.find((rep: any) => rep.$?.size === 'XL') ||
      representations.find((rep: any) => rep.$?.size === 'L') ||
      representations.find((rep: any) => rep.$?.size === 'M') ||
      representations[0];
    const url = largeImage?.$?.url || largeImage?.url || null;
    return url ? url.replace(/^http:\/\//i, 'https://') : null;
  }
  const fallbackUrl = firstImage.$?.url || firstImage.url || null;
  return fallbackUrl ? fallbackUrl.replace(/^http:\/\//i, 'https://') : null;
}

function getAllImages(images: any): string[] {
  if (!images || !images['ad:image']) return [];
  const imageArray = Array.isArray(images['ad:image']) ? images['ad:image'] : [images['ad:image']];
  const allImages: string[] = [];
  imageArray.forEach((image: any) => {
    if (image['ad:representation']) {
      const representations = Array.isArray(image['ad:representation']) ?
        image['ad:representation'] : [image['ad:representation']];
      const largeImage = representations.find((rep: any) => rep.$?.size === 'XXXL') ||
        representations.find((rep: any) => rep.$?.size === 'XXL') ||
        representations.find((rep: any) => rep.$?.size === 'XL') ||
        representations.find((rep: any) => rep.$?.size === 'L') ||
        representations.find((rep: any) => rep.$?.size === 'M') ||
        representations[0];
      const url1 = largeImage?.$?.url;
      const url2 = largeImage?.url;
      if (url1) allImages.push(url1.replace(/^http:\/\//i, 'https://'));
      else if (url2) allImages.push(url2.replace(/^http:\/\//i, 'https://'));
    } else if (image.$?.url) {
      allImages.push(image.$.url.replace(/^http:\/\//i, 'https://'));
    } else if (image.url) {
      allImages.push(image.url.replace(/^http:\/\//i, 'https://'));
    }
  });
  return allImages;
}

function decodeHtmlEntities(str: string): string {
  if (!str || typeof str !== 'string') return str;
  return str
    .replace(/&quot;/g, '"')
    .replace(/&#34;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&nbsp;/g, ' ')
    .replace(/&euro;/g, '€')
    .replace(/&#8364;/g, '€')
    .replace(/&auml;/g, 'ä').replace(/&Auml;/g, 'Ä')
    .replace(/&ouml;/g, 'ö').replace(/&Ouml;/g, 'Ö')
    .replace(/&uuml;/g, 'ü').replace(/&Uuml;/g, 'Ü')
    .replace(/&szlig;/g, 'ß');
}

// Extracts plaintext description from mobile.de's ad:description (which is HTML)
// Preserves line breaks for <br>, <p>, <li> so bullet points remain readable
function extractDescription(descriptionNode: any): string {
  if (!descriptionNode) return '';
  // mobile.de returns description as an object with possibly multiple language variants
  // It may look like: { 'resource:local-description': { _: '<html>...</html>', $: { lang: 'de' } } }
  // OR: { 'resource:local-description': [{ _: '...', $: { lang: 'de' } }, { _: '...', $: { lang: 'en' } }] }
  let raw = '';
  const localDesc = descriptionNode['resource:local-description'] || descriptionNode;
  if (Array.isArray(localDesc)) {
    // Prefer German, then first
    const de = localDesc.find((d: any) => d?.$?.lang === 'de');
    raw = de?._ || localDesc[0]?._ || '';
  } else if (typeof localDesc === 'object' && localDesc?._) {
    raw = localDesc._;
  } else if (typeof localDesc === 'string') {
    raw = localDesc;
  } else if (typeof descriptionNode === 'string') {
    raw = descriptionNode;
  }
  if (!raw) return '';

  // Convert common HTML structure to plaintext with line breaks preserved
  let text = raw
    .replace(/<\s*br\s*\/?\s*>/gi, '\n')
    .replace(/<\s*\/p\s*>/gi, '\n\n')
    .replace(/<\s*li\s*[^>]*>/gi, '\n• ')
    .replace(/<\s*\/li\s*>/gi, '')
    .replace(/<\s*\/?ul\s*[^>]*>/gi, '\n')
    .replace(/<\s*\/?ol\s*[^>]*>/gi, '\n')
    .replace(/<[^>]+>/g, ''); // strip remaining tags
  text = decodeHtmlEntities(text);
  // Collapse excessive whitespace but keep line breaks
  text = text.replace(/[ \t]+/g, ' ').replace(/\n{3,}/g, '\n\n').trim();
  return text;
}

function transformVehicle(ad: any) {
  const vehicle = ad['ad:vehicle'] || {};
  const price = ad['ad:price'] || {};
  const images = ad['ad:images'] || {};
  const specifics = vehicle['ad:specifics'] || {};

  const make = vehicle['ad:make']?.['resource:local-description']?._ || 'Unknown';
  const model = vehicle['ad:model']?.['resource:local-description']?._ || 'Unknown';
  const modelDescription = vehicle['ad:model-description']?.$?.value || '';
  const priceAmount = parseFloat(price['ad:consumer-price-amount']?.$?.value || '0');
  const currency = price.$?.currency || 'EUR';
  const mileageValue = parseInt(specifics['ad:mileage']?.$?.value || '0');
  const firstReg = specifics['ad:first-registration']?.$?.value || null;
  const fuelType = specifics['ad:fuel']?.['resource:local-description']?._ || 'Benzin';
  const transmission = specifics['ad:gearbox']?.['resource:local-description']?._ || 'Automatik';
  const bodyType = vehicle['ad:category']?.['resource:local-description']?._ || 'Limousine';
  const condition = specifics['ad:condition']?.['resource:local-description']?._ || 'Gebraucht';
  const powerKw = parseInt(specifics['ad:power']?.$?.value || '0');
  const powerHp = Math.round(powerKw * 1.36);
  const exteriorColor = specifics['ad:exterior-color']?.['resource:local-description']?._ || 'Unknown';
  const interiorColor = specifics['ad:interior-color']?.['resource:local-description']?._ || 'Unknown';
  const interiorType = specifics['ad:interior-type']?.['resource:local-description']?._ || 'Unknown';
  const doorCount = specifics['ad:door-count']?.['resource:local-description']?._ || 'Unknown';
  const cubicCapacity = parseInt(specifics['ad:cubic-capacity']?.$?.value || '0');
  const previousOwners = specifics['ad:number-of-previous-owners'] || 'Unknown';
  const driveType = specifics['ad:drive-type']?.$?.value || 'Unknown';

  const features = vehicle['ad:features']?.['ad:feature'] || [];
  const featureList = Array.isArray(features) ?
    features.map((f: any) => f['resource:local-description']?._).filter(Boolean) :
    (features['resource:local-description']?._ ? [features['resource:local-description']._] : []);

  // Full description (HTML in mobile.de XML — extract plaintext preserving line breaks)
  const description = extractDescription(ad['ad:description']);

  return {
    id: ad.$?.key || `vehicle_${Date.now()}`,
    title: decodeHtmlEntities(modelDescription || `${make} ${model}`),
    make: decodeHtmlEntities(make),
    model: decodeHtmlEntities(model),
    modelDescription: decodeHtmlEntities(modelDescription),
    description,
    price: { amount: priceAmount, currency, formatted: `${priceAmount.toLocaleString('de-DE')} ${currency}` },
    image: getFirstImage(images),
    images: getAllImages(images),
    mileage: { value: mileageValue, unit: 'km', formatted: `${mileageValue.toLocaleString('de-DE')} km` },
    firstRegistration: firstReg,
    year: extractYear(firstReg),
    fuelType: decodeHtmlEntities(fuelType),
    transmission: decodeHtmlEntities(transmission),
    bodyType: decodeHtmlEntities(bodyType),
    condition: decodeHtmlEntities(condition),
    power: { kw: powerKw, hp: powerHp, formatted: `${powerKw} kW (${powerHp} PS)` },
    exteriorColor: decodeHtmlEntities(exteriorColor),
    interiorColor: decodeHtmlEntities(interiorColor),
    interiorType: decodeHtmlEntities(interiorType),
    doorCount, cubicCapacity, previousOwners, driveType,
    features: featureList.map(decodeHtmlEntities),
    publicUrl: ad.$?.url || '#'
  };
}

// ============================================================================
// BRANDS DATA
// ============================================================================

const brands = [
  { id: 'bmw', name: 'BMW', logo: '/brands/bmw.svg', country: 'Deutschland', founded: 1916 },
  { id: 'mercedes', name: 'Mercedes-Benz', logo: '/brands/mercedes.svg', country: 'Deutschland', founded: 1926 },
  { id: 'audi', name: 'Audi', logo: '/brands/audi.svg', country: 'Deutschland', founded: 1909 },
  { id: 'volkswagen', name: 'Volkswagen', logo: '/brands/vw.svg', country: 'Deutschland', founded: 1937 },
  { id: 'porsche', name: 'Porsche', logo: '/brands/porsche.svg', country: 'Deutschland', founded: 1931 },
];

// ============================================================================
// FEATURES DATA
// ============================================================================

const carFeatures = [
  { id: 'navigation', name: 'Navigation', category: 'infotainment', icon: '🗺️' },
  { id: 'leather', name: 'Lederausstattung', category: 'comfort', icon: '🪑' },
  { id: 'parkassist', name: 'Parkassistent', category: 'safety', icon: '🅿️' },
  { id: 'sunroof', name: 'Schiebedach', category: 'comfort', icon: '☀️' },
  { id: 'heated_seats', name: 'Sitzheizung', category: 'comfort', icon: '🔥' },
  { id: 'cruise_control', name: 'Tempomat', category: 'comfort', icon: '⏩' },
  { id: 'bluetooth', name: 'Bluetooth', category: 'infotainment', icon: '📶' },
  { id: 'camera', name: 'Rückfahrkamera', category: 'safety', icon: '📷' },
];

// ============================================================================
// HELPERS & DB MAPPING
// ============================================================================

const mapTradeInToDB = (data: any) => ({
  id: data.id,
  name: data.name,
  email: data.email,
  phone: data.phone,
  address: data.address,
  vin: data.vin,
  license_plate: data.licensePlate,
  first_registration: data.firstRegistration,
  mileage: data.mileage,
  expected_price: data.expectedPrice,
  accident_free: data.accidentFree,
  accident_damage: data.accidentDamage,
  previous_owners: data.previousOwners,
  repainted: data.repainted,
  repainted_details: data.repaintedDetails,
  replaced_engine_or_gearbox: data.replacedEngineOrGearbox,
  replaced_engine_or_gearbox_details: data.replacedEngineOrGearboxDetails,
  exterior_color: data.exteriorColor,
  is_metallic: data.isMetallic,
  interior_color: data.interiorColor,
  service_history: data.serviceHistory,
  last_inspection_km: data.lastInspectionKm,
  last_inspection_date: data.lastInspectionDate,
  tuv_valid_until: data.tuvValidUntil,
  upholstery: data.upholstery,
  financing: data.financing,
  financing_details: data.financingDetails,
  smokers_car: data.smokersCar,
  re_import: data.reImport,
  message: data.message,
  status: data.status || 'new',
  created_at: data.createdAt || new Date().toISOString()
});

const mapTradeInFromDB = (item: any) => ({
  id: item.id,
  createdAt: item.created_at,
  status: item.status || 'new',
  name: item.name,
  email: item.email,
  phone: item.phone,
  address: item.address,
  vin: item.vin,
  licensePlate: item.license_plate,
  firstRegistration: item.first_registration,
  mileage: item.mileage,
  expectedPrice: item.expected_price,
  accidentFree: item.accident_free,
  accidentDamage: item.accident_damage,
  previousOwners: item.previous_owners,
  repainted: item.repainted,
  repaintedDetails: item.repainted_details,
  replacedEngineOrGearbox: item.replaced_engine_or_gearbox,
  replacedEngineOrGearboxDetails: item.replaced_engine_or_gearbox_details,
  exteriorColor: item.exterior_color,
  isMetallic: item.is_metallic,
  interiorColor: item.interior_color,
  serviceHistory: item.service_history,
  lastInspectionKm: item.last_inspection_km,
  lastInspectionDate: item.last_inspection_date,
  tuv_valid_until: item.tuv_valid_until,
  upholstery: item.upholstery,
  financing: item.financing,
  financing_details: item.financing_details,
  smokersCar: item.smokers_car,
  reImport: item.re_import,
  message: item.message,
});

// ============================================================================
// ROUTES
// ============================================================================

// --- Health ---
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    data: {
      status: 'OK',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || 'production',
      version: '1.0.0',
    },
    message: 'Server ist betriebsbereit',
  });
});

// --- Brands ---
app.get('/api/brands', (req, res) => {
  res.json({ success: true, data: brands, message: `${brands.length} Marken verfügbar` });
});

app.get('/api/brands/:id', (req, res) => {
  const brand = brands.find(b => b.id === req.params.id);
  if (!brand) return res.status(404).json({ success: false, error: 'Marke nicht gefunden' });
  res.json({ success: true, data: brand });
});

// --- Features ---
app.get('/api/features', (req, res) => {
  const { category } = req.query;
  let filtered = carFeatures;
  if (category && typeof category === 'string') {
    filtered = carFeatures.filter(f => f.category === category);
  }
  res.json({ success: true, data: filtered, message: `${filtered.length} Ausstattungsmerkmale verfügbar` });
});

// --- Inventory (Mobile.de) ---
app.get('/api/inventory/test', async (req, res) => {
  try {
    const result = await makeMobileDeRequest('/search', {
      customerNumber: MOBILE_DE_CONFIG.customerId,
      'max-results': 1
    });
    if (result.success) {
      const parsed = await parseXMLResponse(result.data);
      const searchResult = parsed['search:search-result'];
      const total = parseInt(searchResult['search:total'] || '0');
      res.json({ success: true, message: 'Mobile.de API connection successful', status: result.status, customerNumber: MOBILE_DE_CONFIG.customerId, vehicleCount: total });
    } else {
      const resAny = result as any;
      const errorMsg = typeof resAny.error === 'object' ? resAny.error.message : (resAny.error || 'Connection failed');
      res.status(resAny.error?.status || 500).json({ success: false, message: 'Mobile.de API connection failed', error: errorMsg });
    }
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
  }
});

app.get('/api/inventory/filters', async (req, res) => {
  try {
    const result = await makeMobileDeRequest('/search', {
      customerNumber: MOBILE_DE_CONFIG.customerId,
      'max-results': 100
    });
    if (result.success) {
      const parsed = await parseXMLResponse(result.data);
      const searchResult = parsed['search:search-result'];
      const ads = searchResult['search:ads']?.['ad:ad'] || [];
      const adsArray = Array.isArray(ads) ? ads : [ads];
      const vehicles = adsArray.filter((ad: any) => ad).map(transformVehicle);
      const brandsList = [...new Set(vehicles.map((v: any) => v.make))].map(brand => ({
        brand, count: vehicles.filter((v: any) => v.make === brand).length
      }));
      const fuelTypes = [...new Set(vehicles.map((v: any) => v.fuelType))].map(fuel => ({
        value: fuel, count: vehicles.filter((v: any) => v.fuelType === fuel).length
      }));
      const bodyTypes = [...new Set(vehicles.map((v: any) => v.bodyType))].map(body => ({
        value: body, count: vehicles.filter((v: any) => v.bodyType === body).length
      }));
      const transmissions = [...new Set(vehicles.map((v: any) => v.transmission))];
      const conditions = [...new Set(vehicles.map((v: any) => v.condition))].map(condition => ({
        value: condition, count: vehicles.filter((v: any) => v.condition === condition).length
      }));
      const years = [...new Set(vehicles.map((v: any) => v.year).filter((y: any) => y !== null))].sort((a: any, b: any) => b - a);
      res.json({
        success: true,
        data: {
          brands: brandsList, fuelTypes, bodyTypes, transmissions, conditions, years,
          priceRanges: [
            { label: 'Bis 20.000 €', min: 0, max: 20000 },
            { label: '20.000 - 40.000 €', min: 20000, max: 40000 },
            { label: '40.000 - 60.000 €', min: 40000, max: 60000 },
            { label: '60.000 - 100.000 €', min: 60000, max: 100000 },
            { label: 'Über 100.000 €', min: 100000, max: 999999 },
          ]
        },
        message: 'Filter options extracted from mobile.de data'
      });
    } else {
      const resAny = result as any;
      const errorMsg = typeof resAny.error === 'object' ? resAny.error.message : (resAny.error || 'Failed to get filters');
      res.status(resAny.error?.status || 500).json({ success: false, data: { brands: [], fuelTypes: [], bodyTypes: [], transmissions: [], conditions: [], years: [], priceRanges: [] }, error: errorMsg });
    }
  } catch (error: any) {
    res.status(500).json({ success: false, data: { brands: [], fuelTypes: [], bodyTypes: [], transmissions: [], conditions: [], years: [], priceRanges: [] }, error: error.message });
  }
});

app.get('/api/inventory/search', async (req, res) => {
  try {
    const searchParams: any = {
      customerNumber: MOBILE_DE_CONFIG.customerId,
      'max-results': parseInt(req.query.limit as string) || 100
    };
    if (req.query.make) searchParams.make = req.query.make;
    if (req.query.model) searchParams.model = req.query.model;
    if (req.query.priceFrom) searchParams.priceFrom = req.query.priceFrom;
    if (req.query.priceTo) searchParams.priceTo = req.query.priceTo;
    const result = await makeMobileDeRequest('/search', searchParams);
    if (result.success) {
      const parsed = await parseXMLResponse(result.data);
      const searchResult = parsed['search:search-result'];
      const ads = searchResult['search:ads']?.['ad:ad'] || [];
      const adsArray = Array.isArray(ads) ? ads : [ads];
      const vehicles = adsArray.filter((ad: any) => ad).map(transformVehicle);
      res.json({ success: true, data: vehicles, total: parseInt(searchResult['search:total'] || '0'), customerNumber: MOBILE_DE_CONFIG.customerId, searchParams: req.query });
    } else {
      const resAny = result as any;
      const errorMsg = typeof resAny.error === 'object' ? resAny.error.message : (resAny.error || 'Search failed');
      res.status(resAny.error?.status || 500).json({ success: false, data: [], total: 0, error: errorMsg, searchParams: req.query });
    }
  } catch (error: any) {
    res.status(500).json({ success: false, data: [], total: 0, error: error.message });
  }
});

app.get('/api/inventory', async (req, res) => {
  try {
    const allVehicles: any[] = [];
    const pageSize = 100; // mobile.de max per request
    
    // First request to get total count and first page
    const firstResult = await makeMobileDeRequest('/search', {
      customerNumber: MOBILE_DE_CONFIG.customerId,
      'max-results': pageSize,
      'page.number': 1,
      'page.size': pageSize
    });
    
    if (!firstResult.success) {
      const resData = firstResult as any;
      const errorMsg = typeof resData.error === 'object' ? resData.error.message : (resData.error || 'Failed to fetch inventory');
      return res.status(resData.error?.status || 500).json({ 
        success: false, data: [], total: 0, error: errorMsg,
        message: 'Failed to fetch inventory from mobile.de' 
      });
    }
    
    const firstParsed = await parseXMLResponse(firstResult.data);
    const firstSearchResult = firstParsed['search:search-result'];
    const totalAvailable = parseInt(firstSearchResult['search:total'] || '0');
    const firstAds = firstSearchResult['search:ads']?.['ad:ad'] || [];
    const firstAdsArray = Array.isArray(firstAds) ? firstAds : [firstAds];
    allVehicles.push(...firstAdsArray.filter((ad: any) => ad).map(transformVehicle));
    
    // Fetch ALL remaining pages
    const totalPages = Math.ceil(totalAvailable / pageSize);
    
    if (totalPages > 1) {
      for (let p = 2; p <= totalPages; p++) {
        const pageResult = await makeMobileDeRequest('/search', {
          customerNumber: MOBILE_DE_CONFIG.customerId,
          'max-results': pageSize,
          'page.number': p,
          'page.size': pageSize
        });
        if (pageResult.success) {
          const parsed = await parseXMLResponse(pageResult.data);
          const searchResult = parsed['search:search-result'];
          const ads = searchResult['search:ads']?.['ad:ad'] || [];
          const adsArray = Array.isArray(ads) ? ads : [ads];
          allVehicles.push(...adsArray.filter((ad: any) => ad).map(transformVehicle));
        }
      }
    }

    // Image enrichment: any car missing images gets fetched from per-ad endpoint in parallel.
    // mobile.de /search sometimes omits images for certain ads, but the /ad/{id} endpoint always has them.
    const missingImageVehicles = allVehicles.filter(v => !v.images || v.images.length === 0);
    if (missingImageVehicles.length > 0) {
      console.log(`🔍 Enriching ${missingImageVehicles.length} cars with missing images via per-ad fetch...`);
      const enrichLimit = 8; // 8 concurrent per-ad fetches to stay within Vercel timeouts
      for (let i = 0; i < missingImageVehicles.length; i += enrichLimit) {
        const batch = missingImageVehicles.slice(i, i + enrichLimit);
        await Promise.all(batch.map(async (v) => {
          try {
            const adResult = await makeMobileDeRequest(`/ad/${v.id}`);
            if (adResult.success) {
              const parsed = await parseXMLResponse(adResult.data);
              const adData = parsed['ad:ad'];
              if (adData) {
                const enriched = transformVehicle(adData);
                if (enriched.images && enriched.images.length > 0) {
                  v.images = enriched.images;
                  v.image = enriched.image || enriched.images[0];
                }
                if (enriched.description && !v.description) v.description = enriched.description;
              }
            }
          } catch (e) {
            // Skip silently — vehicle still appears in results without images
          }
        }));
      }
    }

    // Sort: cars with images first, cars without images last
    allVehicles.sort((a, b) => {
      const aHas = a.images && a.images.length > 0 ? 1 : 0;
      const bHas = b.images && b.images.length > 0 ? 1 : 0;
      return bHas - aHas;
    });

    res.json({ 
      success: true, 
      data: allVehicles, 
      total: totalAvailable, 
      fetched: allVehicles.length,
      withImages: allVehicles.filter(v => v.images && v.images.length > 0).length,
      message: `Successfully fetched ${allVehicles.length} of ${totalAvailable} vehicles` 
    });
  } catch (error: any) {
    res.status(500).json({ success: false, data: [], total: 0, error: error.message });
  }
});

app.get('/api/inventory/:id', async (req, res) => {
  try {
    // We hit the specific AD endpoint instead of search to get ALL details including ALL images
    const result = await makeMobileDeRequest(`/ad/${req.params.id}`);
    if (result.success) {
      const parsed = await parseXMLResponse(result.data);
      const adData = parsed['ad:ad'];
      if (!adData) {
         return res.status(404).json({ success: false, data: null, message: 'Vehicle not found' });
      }
      const vehicle = transformVehicle(adData);
      res.json({ success: true, data: vehicle, message: 'Successfully fetched vehicle details' });
    } else {
      const resAny = result as any;
      const errorMsg = typeof resAny.error === 'object' ? resAny.error.message : (resAny.error || 'Failed to fetch vehicle');
      res.status(resAny.error?.status || 500).json({ success: false, data: null, error: errorMsg, message: 'Failed to fetch vehicle from mobile.de' });
    }
  } catch (error: any) {
    res.status(500).json({ success: false, data: null, error: error.message });
  }
});

// --- Admin ---
app.post('/api/admin/login', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ success: false, error: 'Benutzername und Passwort sind erforderlich' });
  }
  const adminUsername = process.env.ADMIN_USERNAME || 'admin';
  const adminPassword = process.env.ADMIN_PASSWORD || 'dealer2024';
  if (username !== adminUsername || password !== adminPassword) {
    return res.status(401).json({ success: false, error: 'Ungültige Anmeldedaten' });
  }
  const token = generateToken(username, 'admin');
  res.json({ success: true, data: { token, user: { username, role: 'admin' } }, message: 'Erfolgreich angemeldet' });
});

app.get('/api/admin/cars', authMiddleware, adminOnly, async (req, res) => {
  try {
    const result = await makeMobileDeRequest('/search', {
      customerNumber: MOBILE_DE_CONFIG.customerId,
      'max-results': 50
    });
    if (result.success) {
      const parsed = await parseXMLResponse(result.data);
      const searchResult = parsed['search:search-result'];
      const ads = searchResult['search:ads']?.['ad:ad'] || [];
      const adsArray = Array.isArray(ads) ? ads : [ads];
      const vehicles = adsArray.filter((ad: any) => ad).map(transformVehicle);
      res.json({ success: true, data: vehicles, total: parseInt(searchResult['search:total'] || '0') });
    } else {
      res.status(result.error?.status || 500).json({ success: false, data: [], error: result.error });
    }
  } catch (error: any) {
    res.status(500).json({ success: false, data: [], error: error.message });
  }
});

app.get('/api/admin/cars/:id', authMiddleware, adminOnly, async (req, res) => {
  try {
    const result = await makeMobileDeRequest('/search', {
      customerNumber: MOBILE_DE_CONFIG.customerId,
      'max-results': 100
    });
    if (result.success) {
      const parsed = await parseXMLResponse(result.data);
      const searchResult = parsed['search:search-result'];
      const ads = searchResult['search:ads']?.['ad:ad'] || [];
      const adsArray = Array.isArray(ads) ? ads : [ads];
      const vehicles = adsArray.filter((ad: any) => ad).map(transformVehicle);
      const vehicle = vehicles.find((v: any) => v.id === req.params.id);
      if (!vehicle) return res.status(404).json({ success: false, error: 'Vehicle not found' });
      res.json({ success: true, data: vehicle });
    } else {
      const resAny = result as any;
      const errorMsg = typeof resAny.error === 'object' ? resAny.error.message : (resAny.error || 'Failed to fetch car by ID');
      res.status(resAny.error?.status || 500).json({ success: false, error: errorMsg });
    }
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post('/api/admin/cars', authMiddleware, adminOnly, (req, res) => {
  res.status(501).json({ success: false, message: 'Cars should be added directly on mobile.de platform. This will automatically sync to your website.' });
});

app.put('/api/admin/cars/:id', authMiddleware, adminOnly, (req, res) => {
  res.status(501).json({ success: false, message: 'Cars should be updated directly on mobile.de platform. Changes will automatically sync to your website.' });
});

app.delete('/api/admin/cars/:id', authMiddleware, adminOnly, (req, res) => {
  res.status(501).json({ success: false, message: 'Cars should be deleted directly on mobile.de platform. This will automatically sync to your website.' });
});

app.get('/api/admin/stats', authMiddleware, adminOnly, async (req, res) => {
  try {
    const result = await makeMobileDeRequest('/search', {
      customerNumber: MOBILE_DE_CONFIG.customerId,
      'max-results': 50
    });
    if (result.success) {
      const parsed = await parseXMLResponse(result.data);
      const searchResult = parsed['search:search-result'];
      const ads = searchResult['search:ads']?.['ad:ad'] || [];
      const adsArray = Array.isArray(ads) ? ads : [ads];
      const vehicles = adsArray.filter((ad: any) => ad).map(transformVehicle);
      res.json({ success: true, data: vehicles, total: parseInt(searchResult['search:total'] || '0') });
    } else {
      res.status(result.error?.status || 500).json({ success: false, data: [], error: result.error });
    }
  } catch (error: any) {
    res.status(500).json({ success: false, data: [], error: error.message });
  }
});

// --- Mobile.de test routes ---
app.get('/api/mobilede/test-connection', async (req, res) => {
  try {
    const result = await makeMobileDeRequest('/search', {
      customerNumber: MOBILE_DE_CONFIG.customerId,
      'max-results': 1
    });
    if (result.success) {
      res.json({ success: true, message: 'Mobile.de connection successful', status: result.status });
    } else {
      const resAny = result as any;
      const errorMsg = typeof resAny.error === 'object' ? resAny.error.message : (resAny.error || 'Connection failed');
      res.status(resAny.error?.status || 500).json({ success: false, message: 'Connection failed', error: errorMsg });
    }
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// --- Contact Form ---
app.post('/api/contact', async (req, res) => {
  try {
    const formData = req.body;
    
    // DB Save
    const { error: dbError } = await supabase.from('contact_submissions').insert([formData]);
    if (dbError) console.error('DB Error:', dbError);

    // Email Logic
    if (hasEmailConfig) {
      const mailOptions = {
        from: `"Nordhessen Automobile Website" <${process.env.SMTP_USER}>`,
        to: process.env.CONTACT_EMAIL || 'seidler@nordhessen-automobile.de',
        replyTo: formData.email,
        subject: `Neue Kontaktanfrage: ${formData.subject}`,
        text: `Name: ${formData.firstName} ${formData.lastName}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nMessage: ${formData.message}`
      };
      await transporter.sendMail(mailOptions);
    }

    res.status(200).json({ success: true, message: 'Contact form submitted and saved successfully' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Failed to submit contact form', error: error.message });
  }
});

app.post('/api/contact/financing', async (req, res) => {
  try {
    const formData = req.body;
    const dbData = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      vehicle_price: formData.vehiclePrice,
      down_payment: formData.downPayment,
      term: formData.term,
      message: formData.message
    };
    
    const { error: dbError } = await supabase.from('financing_submissions').insert([dbData]);
    if (dbError) console.error('DB Error:', dbError);

    if (hasEmailConfig) {
      const mailOptions = {
        from: `"Nordhessen Automobile Website" <${process.env.SMTP_USER}>`,
        to: process.env.CONTACT_EMAIL || 'seidler@nordhessen-automobile.de',
        replyTo: formData.email,
        subject: `Neue Finanzierungsanfrage: ${formData.name}`,
        text: `Name: ${formData.name}\nEmail: ${formData.email}\nPrice: ${formData.vehiclePrice}\nTerm: ${formData.term}`
      };
      await transporter.sendMail(mailOptions);
    }

    res.status(200).json({ success: true, message: 'Financing request submitted and saved successfully' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Failed to submit financing request', error: error.message });
  }
});

// Admin variants to fetch
app.get('/api/contact', authMiddleware, adminOnly, async (req, res) => {
  try {
    const { data, error } = await supabase.from('contact_submissions').select('*').order('created_at', { ascending: false });
    if (error) throw error;
    res.json({ success: true, data, total: data?.length || 0 });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.get('/api/contact/financing', authMiddleware, adminOnly, async (req, res) => {
  try {
    const { data, error } = await supabase.from('financing_submissions').select('*').order('created_at', { ascending: false });
    if (error) throw error;
    res.json({ success: true, data, total: data?.length || 0 });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// --- Trade-Ins ---
app.post('/api/trade-ins', async (req, res) => {
  try {
    const newTradeIn = {
      ...req.body,
      id: `ti_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString(),
      status: 'new'
    };
    
    const dbData = mapTradeInToDB(newTradeIn);
    const { error: dbError } = await supabase.from('tradein_submissions').insert([dbData]);
    if (dbError) console.error('DB Error:', dbError);

    if (hasEmailConfig) {
      const mailOptions = {
        from: `"Nordhessen Automobile Website" <${process.env.SMTP_USER}>`,
        to: process.env.TRADEIN_EMAIL || 'seidler@nordhessen-automobile.de',
        replyTo: newTradeIn.email,
        subject: `Neue Inzahlungnahme-Anfrage: ${newTradeIn.name}`,
        text: [
          `Name: ${newTradeIn.name || '-'}`,
          `E-Mail: ${newTradeIn.email || '-'}`,
          `Telefon: ${newTradeIn.phone || '-'}`,
          `Adresse: ${newTradeIn.address || '-'}`,
          `FIN/VIN: ${newTradeIn.vin || '-'}`,
          `Kennzeichen: ${newTradeIn.licensePlate || '-'}`,
          `Erstzulassung: ${newTradeIn.firstRegistration || '-'}`,
          `Kilometerstand: ${newTradeIn.mileage || '-'}`,
          `Wunschpreis: ${newTradeIn.expectedPrice || '-'}`,
          `Unfallfrei: ${newTradeIn.accidentFree ? 'Ja' : 'Nein'}`,
          `Vorbesitzer: ${newTradeIn.previousOwners ?? '-'}`,
          `Außenfarbe: ${newTradeIn.exteriorColor || '-'}`,
          `Innenfarbe: ${newTradeIn.interiorColor || '-'}`,
          `Scheckheft: ${newTradeIn.serviceHistory ? 'Ja' : 'Nein'}`,
          `TÜV gültig bis: ${newTradeIn.tuvValidUntil || '-'}`,
          `Nachricht: ${newTradeIn.message || '-'}`,
        ].join('\n')
      };
      await transporter.sendMail(mailOptions);
    }

    res.status(201).json({ success: true, data: newTradeIn, message: 'Trade-in request successfully created and saved' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Failed to create trade-in request', error: error.message });
  }
});

app.get('/api/trade-ins', authMiddleware, adminOnly, async (req, res) => {
  try {
    const { data, error } = await supabase.from('tradein_submissions').select('*').order('created_at', { ascending: false });
    if (error) throw error;
    const mappedData = data.map(mapTradeInFromDB);
    res.json({ success: true, data: mappedData, total: mappedData.length });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.patch('/api/trade-ins/:id/status', authMiddleware, adminOnly, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const { error } = await supabase.from('tradein_submissions').update({ status }).eq('id', id);
    if (error) throw error;
    res.json({ success: true, message: 'Status updated successfully in Supabase' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Failed to update status', error: error.message });
  }
});

app.delete('/api/trade-ins/:id', authMiddleware, adminOnly, async (req, res) => {
  try {
    const { id } = req.params;
    const { error } = await supabase.from('tradein_submissions').delete().eq('id', id);
    if (error) throw error;
    res.json({ success: true, message: 'Trade-in deleted successfully from Supabase' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Failed to delete trade-in', error: error.message });
  }
});

// --- Error handler ---
app.use((err: any, req: any, res: any, _next: any) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Ein interner Serverfehler ist aufgetreten';
  console.error('Error:', { message: err.message, statusCode, path: req.path });
  res.status(statusCode).json({
    success: false,
    error: process.env.NODE_ENV === 'production' && statusCode === 500
      ? 'Ein interner Serverfehler ist aufgetreten'
      : message,
  });
});

export default app;
