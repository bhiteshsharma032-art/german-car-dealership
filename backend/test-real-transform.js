const axios = require('axios');
const xml2js = require('xml2js');

// Mobile.de Search-API Configuration
const MOBILE_DE_CONFIG = {
  baseURL: 'https://services.mobile.de/search-api',
  username: 'dlr_dimitriosmikhovsky',
  password: 'kovoExT0mG3Y',
  customerId: '712285'
};

function getAuthHeader() {
  const credentials = Buffer.from(`${MOBILE_DE_CONFIG.username}:${MOBILE_DE_CONFIG.password}`).toString('base64');
  return `Basic ${credentials}`;
}

// Updated transform function that matches the real XML structure
function transformVehicle(ad) {
  console.log('🔍 Transforming vehicle ad:', ad.$?.key);
  
  const vehicle = ad['ad:vehicle'] || {};
  const price = ad['ad:price'] || {};
  const images = ad['ad:images'] || {};
  const specifics = vehicle['ad:specifics'] || {};
  
  // Extract make and model
  const make = vehicle['ad:make']?.['resource:local-description']?._ || 'Unknown';
  const model = vehicle['ad:model']?.['resource:local-description']?._ || 'Unknown';
  const modelDescription = vehicle['ad:model-description']?.$?.value || '';
  
  // Extract price
  const priceAmount = parseFloat(price['ad:consumer-price-amount']?.$?.value || '0');
  const currency = price.$?.currency || 'EUR';
  
  // Extract mileage from specifics
  const mileageValue = parseInt(specifics['ad:mileage']?.$?.value || '0');
  
  // Extract first registration from specifics
  const firstReg = specifics['ad:first-registration']?.$?.value || null;
  
  // Extract fuel type from specifics
  const fuelType = specifics['ad:fuel']?.['resource:local-description']?._ || 'Benzin';
  
  // Extract transmission from specifics (gearbox)
  const transmission = specifics['ad:gearbox']?.['resource:local-description']?._ || 'Automatik';
  
  // Extract body type/category
  const bodyType = vehicle['ad:category']?.['resource:local-description']?._ || 'Limousine';
  
  // Extract condition from specifics
  const condition = specifics['ad:condition']?.['resource:local-description']?._ || 'Gebraucht';
  
  // Extract power from specifics (in kW)
  const powerKw = parseInt(specifics['ad:power']?.$?.value || '0');
  const powerHp = Math.round(powerKw * 1.36); // Convert kW to HP
  
  // Extract additional details
  const exteriorColor = specifics['ad:exterior-color']?.['resource:local-description']?._ || 'Unknown';
  const interiorColor = specifics['ad:interior-color']?.['resource:local-description']?._ || 'Unknown';
  const interiorType = specifics['ad:interior-type']?.['resource:local-description']?._ || 'Unknown';
  const doorCount = specifics['ad:door-count']?.['resource:local-description']?._ || 'Unknown';
  const cubicCapacity = parseInt(specifics['ad:cubic-capacity']?.$?.value || '0');
  const previousOwners = specifics['ad:number-of-previous-owners'] || 'Unknown';
  const driveType = specifics['ad:drive-type']?.$?.value || 'Unknown';
  
  // Extract features
  const features = vehicle['ad:features']?.['ad:feature'] || [];
  const featureList = Array.isArray(features) ? 
    features.map(f => f['resource:local-description']?._).filter(Boolean) : 
    (features['resource:local-description']?._ ? [features['resource:local-description']._] : []);
  
  const transformedVehicle = {
    id: ad.$?.key || `vehicle_${Date.now()}`,
    title: modelDescription || `${make} ${model}`,
    make: make,
    model: model,
    modelDescription: modelDescription,
    price: {
      amount: priceAmount,
      currency: currency,
      formatted: `${priceAmount.toLocaleString('de-DE')} ${currency}`
    },
    image: getFirstImage(images),
    images: getAllImages(images),
    mileage: {
      value: mileageValue,
      unit: 'km',
      formatted: `${mileageValue.toLocaleString('de-DE')} km`
    },
    firstRegistration: firstReg,
    year: extractYear(firstReg),
    fuelType: fuelType,
    transmission: transmission,
    bodyType: bodyType,
    condition: condition,
    power: {
      kw: powerKw,
      hp: powerHp,
      formatted: `${powerKw} kW (${powerHp} PS)`
    },
    exteriorColor: exteriorColor,
    interiorColor: interiorColor,
    interiorType: interiorType,
    doorCount: doorCount,
    cubicCapacity: cubicCapacity,
    previousOwners: previousOwners,
    driveType: driveType,
    features: featureList,
    publicUrl: ad.$?.url || '#'
  };
  
  console.log('✅ Transformed vehicle:', {
    id: transformedVehicle.id,
    title: transformedVehicle.title,
    price: transformedVehicle.price.formatted,
    mileage: transformedVehicle.mileage.formatted,
    year: transformedVehicle.year,
    power: transformedVehicle.power.formatted,
    fuel: transformedVehicle.fuelType,
    transmission: transformedVehicle.transmission,
    color: transformedVehicle.exteriorColor
  });
  
  return transformedVehicle;
}

// Extract year from date string
function extractYear(dateString) {
  if (!dateString) return null;
  const match = dateString.match(/(\d{4})/);
  return match ? parseInt(match[1]) : null;
}

// Extract first image from mobile.de images structure
function getFirstImage(images) {
  if (!images || !images['ad:image']) return null;
  
  const imageArray = Array.isArray(images['ad:image']) ? images['ad:image'] : [images['ad:image']];
  if (imageArray.length === 0) return null;
  
  const firstImage = imageArray[0];
  
  if (firstImage['ad:representation']) {
    const representations = Array.isArray(firstImage['ad:representation']) ? 
                           firstImage['ad:representation'] : [firstImage['ad:representation']];
    
    const largeImage = representations.find((rep) => rep.$?.size === 'L') ||
                      representations.find((rep) => rep.$?.size === 'XL') ||
                      representations.find((rep) => rep.$?.size === 'M') ||
                      representations[0];
    
    return largeImage?.$?.url || largeImage?.url || null;
  }
  
  return firstImage.$?.url || firstImage.url || null;
}

// Extract ALL images from mobile.de images structure
function getAllImages(images) {
  if (!images || !images['ad:image']) return [];
  
  const imageArray = Array.isArray(images['ad:image']) ? images['ad:image'] : [images['ad:image']];
  const allImages = [];
  
  imageArray.forEach((image) => {
    if (image['ad:representation']) {
      const representations = Array.isArray(image['ad:representation']) ? 
                             image['ad:representation'] : [image['ad:representation']];
      
      const largeImage = representations.find((rep) => rep.$?.size === 'L') ||
                        representations.find((rep) => rep.$?.size === 'XL') ||
                        representations.find((rep) => rep.$?.size === 'M') ||
                        representations[0];
      
      if (largeImage?.$?.url) {
        allImages.push(largeImage.$.url);
      } else if (largeImage?.url) {
        allImages.push(largeImage.url);
      }
    } else if (image.$?.url) {
      allImages.push(image.$.url);
    } else if (image.url) {
      allImages.push(image.url);
    }
  });
  
  return allImages;
}

async function testRealTransform() {
  try {
    console.log('🧪 Testing Real Transform with Live Data...');
    
    const response = await axios.get(`${MOBILE_DE_CONFIG.baseURL}/search`, {
      headers: {
        'Authorization': getAuthHeader(),
        'Accept': 'application/xml',
        'User-Agent': 'Nordhessen-Automobile/1.0'
      },
      params: {
        customerNumber: MOBILE_DE_CONFIG.customerId,
        pageSize: 3
      },
      timeout: 10000
    });

    console.log('✅ Got XML response, parsing...');
    
    const parser = new xml2js.Parser({ explicitArray: false });
    const parsed = await parser.parseStringPromise(response.data);
    
    const searchResult = parsed['search:search-result'];
    const ads = searchResult['search:ads']?.['ad:ad'] || [];
    const adsArray = Array.isArray(ads) ? ads : [ads];
    
    console.log(`\n🚗 Transforming ${adsArray.length} vehicles:`);
    console.log('================================================================================');
    
    const transformedVehicles = adsArray.filter(ad => ad).map(transformVehicle);
    
    console.log('\n📊 Final Results:');
    transformedVehicles.forEach((vehicle, index) => {
      console.log(`\n--- Vehicle ${index + 1} ---`);
      console.log('ID:', vehicle.id);
      console.log('Title:', vehicle.title);
      console.log('Make/Model:', `${vehicle.make} ${vehicle.model}`);
      console.log('Price:', vehicle.price.formatted);
      console.log('Mileage:', vehicle.mileage.formatted);
      console.log('Year:', vehicle.year);
      console.log('Fuel:', vehicle.fuelType);
      console.log('Transmission:', vehicle.transmission);
      console.log('Power:', vehicle.power.formatted);
      console.log('Color:', vehicle.exteriorColor);
      console.log('Features:', vehicle.features?.slice(0, 3).join(', ') + '...');
    });
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.response) {
      console.error('Status:', error.response.status);
    }
  }
}

testRealTransform();