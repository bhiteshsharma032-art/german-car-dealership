const LOCALE = 'de-DE';
const CURRENCY = 'EUR';

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat(LOCALE, {
    style: 'currency',
    currency: CURRENCY,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

export const formatMileage = (mileage: number): string => {
  return new Intl.NumberFormat(LOCALE).format(mileage) + ' km';
};

export const formatDate = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat(LOCALE, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(dateObj);
};
