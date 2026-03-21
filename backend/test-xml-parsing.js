const xml2js = require('xml2js');

// Sample XML from the debug output
const sampleXML = `<?xml version="1.0" encoding="UTF-8"?>
<search:search-result xmlns:error="http://services.mobile.de/schema/common/error-1.0" xmlns:financing="http://services.mobile.de/schema/common/financing-1.0" xmlns:ad="http://services.mobile.de/schema/ad" xmlns:resource="http://services.mobile.de/schema/resource" xmlns:search="http://services.mobile.de/schema/search" xmlns:seller="http://services.mobile.de/schema/seller" xmlns:leasing="http://services.mobile.de/schema/common/leasing-1.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://services.mobile.de/schema/search http://services.mobile.de/schema/search-1.0.xsd">
  <search:total>85</search:total>
  <search:page-size>20</search:page-size>
  <search:current-page>1</search:current-page>
  <search:max-pages>5</search:max-pages>
  <search:ads>
    <ad:ad key="421304106" url="https://services.mobile.de/search-api/ad/421304106">
      <ad:creation-date value="2026-02-03T11:29:07.783+01:00"/>
      <ad:modification-date value="2026-03-17T18:52:51+01:00"/>
      <ad:vehicle>
        <ad:make key="AUDI" url="https://services.mobile.de/refdata/classes/Car/makes/AUDI">
          <resource:local-description xml-lang="en">Audi</resource:local-description>
        </ad:make>
        <ad:model key="RS6" url="https://services.mobile.de/refdata/classes/Car/makes/AUDI/models/RS6">
          <resource:local-description xml-lang="en">RS6</resource:local-description>
        </ad:model>
        <ad:specifics>
          <ad:mileage value="189650"/>
          <ad:first-registration value="2002-11"/>
          <ad:fuel key="PETROL" url="https://services.mobile.de/refdata/fuels/PETROL">
            <resource:local-description xml-lang="en">Petrol</resource:local-description>
          </ad:fuel>
          <ad:power value="331"/>
          <ad:gearbox key="AUTOMATIC_GEAR" url="https://services.mobile.de/refdata/gearboxes/AUTOMATIC_GEAR">
            <resource:local-description xml-lang="en">Automatic</resource:local-description>
          </ad:gearbox>
          <ad:condition key="USED" url="https://services.mobile.de/refdata/conditions/USED">
            <resource:local-description xml-lang="en">Used vehicle</resource:local-description>
          </ad:condition>
        </ad:specifics>
      </ad:vehicle>
      <ad:price currency="EUR" type="FIXED">
        <ad:consumer-price-amount value="27980.00"/>
      </ad:price>
      <ad:images count="1">
        <ad:image>
          <ad:representation size="L" url="https://img.classistatic.de/api/v1/mo-prod/images/45/45cc4337-f869-4ff1-af24-e451a6780f5d?rule=mo-360.jpg"/>
        </ad:image>
      </ad:images>
    </ad:ad>
  </search:ads>
</search:search-result>`;

async function testXMLParsing() {
  try {
    console.log('🧪 Testing XML Parsing...');
    
    const parser = new xml2js.Parser({ explicitArray: false });
    const parsed = await parser.parseStringPromise(sampleXML);
    
    console.log('\n📊 Parsed Structure:');
    const searchResult = parsed['search:search-result'];
    const ads = searchResult['search:ads']?.['ad:ad'] || [];
    const adsArray = Array.isArray(ads) ? ads : [ads];
    
    if (adsArray.length > 0) {
      const firstAd = adsArray[0];
      console.log('Ad Key:', firstAd.$?.key);
      
      const vehicle = firstAd['ad:vehicle'] || {};
      const specifics = vehicle['ad:specifics'] || {};
      const price = firstAd['ad:price'] || {};
      
      console.log('\n🚗 Vehicle Details:');
      console.log('Make:', vehicle['ad:make']?.['resource:local-description']?._);
      console.log('Model:', vehicle['ad:model']?.['resource:local-description']?._);
      console.log('Price:', price['ad:consumer-price-amount']?.$?.value);
      console.log('Currency:', price.$?.currency);
      
      console.log('\n📋 Specifics:');
      console.log('Mileage:', specifics['ad:mileage']?.$?.value);
      console.log('First Registration:', specifics['ad:first-registration']?.$?.value);
      console.log('Fuel:', specifics['ad:fuel']?.['resource:local-description']?._);
      console.log('Power:', specifics['ad:power']?.$?.value);
      console.log('Gearbox:', specifics['ad:gearbox']?.['resource:local-description']?._);
      console.log('Condition:', specifics['ad:condition']?.['resource:local-description']?._);
      
      // Test transformation function
      console.log('\n🔄 Testing Transformation:');
      const transformedVehicle = transformVehicle(firstAd);
      console.log('Transformed:', JSON.stringify(transformedVehicle, null, 2));
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

// Simplified transform function for testing
function transformVehicle(ad) {
  const vehicle = ad['ad:vehicle'] || {};
  const price = ad['ad:price'] || {};
  const specifics = vehicle['ad:specifics'] || {};
  
  // Extract make and model
  const make = vehicle['ad:make']?.['resource:local-description']?._ || 'Unknown';
  const model = vehicle['ad:model']?.['resource:local-description']?._ || 'Unknown';
  
  // Extract price
  const priceAmount = parseFloat(price['ad:consumer-price-amount']?.$?.value || '0');
  const currency = price.$?.currency || 'EUR';
  
  // Extract specifics
  const mileageValue = parseInt(specifics['ad:mileage']?.$?.value || '0');
  const firstReg = specifics['ad:first-registration']?.$?.value || null;
  const fuelType = specifics['ad:fuel']?.['resource:local-description']?._ || 'Benzin';
  const transmission = specifics['ad:gearbox']?.['resource:local-description']?._ || 'Automatik';
  const condition = specifics['ad:condition']?.['resource:local-description']?._ || 'Gebraucht';
  const powerKw = parseInt(specifics['ad:power']?.$?.value || '0');
  const powerHp = Math.round(powerKw * 1.36);
  
  return {
    id: ad.$?.key || 'unknown',
    title: `${make} ${model}`,
    make: make,
    model: model,
    price: {
      amount: priceAmount,
      currency: currency,
      formatted: `${priceAmount.toLocaleString('de-DE')} ${currency}`
    },
    mileage: {
      value: mileageValue,
      unit: 'km',
      formatted: `${mileageValue.toLocaleString('de-DE')} km`
    },
    firstRegistration: firstReg,
    year: firstReg ? parseInt(firstReg.split('-')[0]) : null,
    fuelType: fuelType,
    transmission: transmission,
    condition: condition,
    power: {
      kw: powerKw,
      hp: powerHp,
      formatted: `${powerKw} kW (${powerHp} PS)`
    }
  };
}

testXMLParsing();