export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidYear = (year: number): boolean => {
  const currentYear = new Date().getFullYear();
  return year >= 1900 && year <= currentYear + 1;
};

export const isValidPrice = (price: number): boolean => {
  return price > 0 && price < 10000000;
};

export const isValidMileage = (mileage: number): boolean => {
  return mileage >= 0 && mileage < 1000000;
};
