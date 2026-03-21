import React, { createContext, useState, useContext, useEffect } from 'react';

type Language = 'de' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  de: {
    'nav.home': 'Startseite',
    'nav.vehicles': 'Fahrzeuge',
    'nav.financing': 'Finanzierung',
    'nav.tradein': 'Inzahlungnahme',
    'nav.exclusive': 'Exklusive Angebote',
    'nav.about': 'Über uns',
    'nav.contact': 'Kontakt',
    'header.call': 'Rufen Sie uns an',
    'header.menu': 'Menü',
  },
  en: {
    'nav.home': 'Home',
    'nav.vehicles': 'Vehicles',
    'nav.financing': 'Financing',
    'nav.tradein': 'Trade-In',
    'nav.exclusive': 'Exclusive Deals',
    'nav.about': 'About Us',
    'nav.contact': 'Contact',
    'header.call': 'Call us',
    'header.menu': 'Menu',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('site_language');
    return (saved === 'en' || saved === 'de') ? saved : 'de';
  });

  useEffect(() => {
    localStorage.setItem('site_language', language);
    document.documentElement.lang = language;
  }, [language]);

  const t = (key: string) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
