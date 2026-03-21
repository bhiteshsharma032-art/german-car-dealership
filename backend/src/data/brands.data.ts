import { Brand } from '../types/car.types';

export const brands: Brand[] = [
  {
    id: 'bmw',
    name: 'BMW',
    logo: 'https://cdn.worldvectorlogo.com/logos/bmw.svg',
    description: 'Bayerische Motoren Werke - Freude am Fahren',
    country: 'Deutschland',
  },
  {
    id: 'mercedes',
    name: 'Mercedes-Benz',
    logo: 'https://cdn.worldvectorlogo.com/logos/mercedes-benz-9.svg',
    description: 'Das Beste oder nichts',
    country: 'Deutschland',
  },
  {
    id: 'audi',
    name: 'Audi',
    logo: 'https://cdn.worldvectorlogo.com/logos/audi-11.svg',
    description: 'Vorsprung durch Technik',
    country: 'Deutschland',
  },
  {
    id: 'porsche',
    name: 'Porsche',
    logo: 'https://cdn.worldvectorlogo.com/logos/porsche-logo.svg',
    description: 'Es gibt kein Substitut',
    country: 'Deutschland',
  },
  {
    id: 'volkswagen',
    name: 'Volkswagen',
    logo: 'https://cdn.worldvectorlogo.com/logos/volkswagen-1.svg',
    description: 'Das Auto',
    country: 'Deutschland',
  },
];

export const getBrandById = (id: string): Brand | undefined => {
  return brands.find(b => b.id === id);
};

export const getBrandByName = (name: string): Brand | undefined => {
  return brands.find(b => b.name.toLowerCase() === name.toLowerCase());
};
