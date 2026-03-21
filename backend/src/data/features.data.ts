import { CarFeature } from '../types/car.types';

export const carFeatures: CarFeature[] = [
  // Comfort Features
  { id: 'klimaautomatik', name: 'Klimaautomatik', category: 'comfort' },
  { id: 'sitzheizung', name: 'Sitzheizung', category: 'comfort' },
  { id: 'ledersitze', name: 'Ledersitze', category: 'comfort' },
  { id: 'elektrische-sitze', name: 'Elektrisch verstellbare Sitze', category: 'comfort' },
  { id: 'massagesitze', name: 'Massagesitze', category: 'comfort' },
  { id: 'panoramadach', name: 'Panorama-Glasdach', category: 'comfort' },
  { id: 'standheizung', name: 'Standheizung', category: 'comfort' },
  { id: 'ambiente-beleuchtung', name: 'Ambiente-Beleuchtung', category: 'comfort' },
  
  // Safety Features
  { id: 'abs', name: 'ABS', category: 'safety' },
  { id: 'esp', name: 'ESP', category: 'safety' },
  { id: 'airbags', name: 'Airbags (Front, Seite, Kopf)', category: 'safety' },
  { id: 'spurhalteassistent', name: 'Spurhalteassistent', category: 'safety' },
  { id: 'totwinkel-assistent', name: 'Totwinkel-Assistent', category: 'safety' },
  { id: 'notbremsassistent', name: 'Notbremsassistent', category: 'safety' },
  { id: 'abstandstempomat', name: 'Adaptiver Tempomat', category: 'safety' },
  { id: 'parkassistent', name: 'Einparkassistent', category: 'safety' },
  { id: 'rueckfahrkamera', name: '360° Rückfahrkamera', category: 'safety' },
  { id: 'nachtsichtassistent', name: 'Nachtsichtassistent', category: 'safety' },
  
  // Technology Features
  { id: 'navi', name: 'Navigationssystem', category: 'technology' },
  { id: 'head-up-display', name: 'Head-Up Display', category: 'technology' },
  { id: 'soundsystem', name: 'Premium Soundsystem', category: 'technology' },
  { id: 'apple-carplay', name: 'Apple CarPlay', category: 'technology' },
  { id: 'android-auto', name: 'Android Auto', category: 'technology' },
  { id: 'wireless-charging', name: 'Wireless Charging', category: 'technology' },
  { id: 'keyless-go', name: 'Keyless Go', category: 'technology' },
  { id: 'digital-cockpit', name: 'Digitales Cockpit', category: 'technology' },
  { id: 'sprachsteuerung', name: 'Sprachsteuerung', category: 'technology' },
  
  // Exterior Features
  { id: 'led-scheinwerfer', name: 'LED-Scheinwerfer', category: 'exterior' },
  { id: 'matrix-led', name: 'Matrix LED', category: 'exterior' },
  { id: 'alufelgen', name: 'Leichtmetallfelgen', category: 'exterior' },
  { id: 'sportpaket', name: 'Sportpaket', category: 'exterior' },
  { id: 'anhängerkupplung', name: 'Anhängerkupplung', category: 'exterior' },
  { id: 'dachträger', name: 'Dachträger', category: 'exterior' },
  
  // Interior Features
  { id: 'multifunktionslenkrad', name: 'Multifunktionslenkrad', category: 'interior' },
  { id: 'lenkradheizung', name: 'Lenkradheizung', category: 'interior' },
  { id: 'isofix', name: 'ISOFIX Kindersitzbefestigung', category: 'interior' },
  { id: 'kofferraum-elektrisch', name: 'Elektrische Heckklappe', category: 'interior' },
  { id: 'geteilte-ruecksitzbank', name: 'Geteilte Rücksitzbank', category: 'interior' },
];

export const getFeaturesByCategory = (category: CarFeature['category']): CarFeature[] => {
  return carFeatures.filter(f => f.category === category);
};

export const getFeatureById = (id: string): CarFeature | undefined => {
  return carFeatures.find(f => f.id === id);
};
