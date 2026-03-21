import { Link, useLocation } from 'react-router-dom';
import { Car, Menu, X, Phone, Mail, Clock, Globe } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';
import { useLanguage } from '../../contexts/LanguageContext';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { language, setLanguage, t } = useLanguage();

  const navigation = [
    { navKey: 'nav.home', href: '/' },
    { navKey: 'nav.vehicles', href: '/fahrzeuge' },
    { navKey: 'nav.financing', href: '/finanzierung' },
    { navKey: 'nav.tradein', href: '/inzahlungnahme' },


    { navKey: 'nav.contact', href: '/kontakt' },
  ];

  // Handle scroll for sticky header
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const isHome = location.pathname === '/';

  return (
    <>
      {/* Top Info Strip - Only on non-home pages */}
      {!isHome && (
        <div className="bg-[#0f0f0f] border-b border-zinc-900">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between py-2 text-xs">
              <div className="hidden md:flex items-center gap-6 text-gray-400">
                <a href="tel:+4956193004649" className="flex items-center gap-2 hover:text-red-500 transition-colors">
                  <Phone className="h-3.5 w-3.5" />
                  <span>0561 930 04 649</span>
                </a>
                <a href="mailto:info@nordhessen-automobile.de" className="flex items-center gap-2 hover:text-red-500 transition-colors">
                  <Mail className="h-3.5 w-3.5" />
                  <span>info@nordhessen-automobile.de</span>
                </a>
              </div>
              <div className="flex items-center gap-6 text-gray-400 ml-auto">
                <div className="flex items-center gap-2">
                  <Clock className="h-3.5 w-3.5" />
                  <span>Mo-Fr: 9:00-18:00 Uhr</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Header */}
      <header
        className={cn(
          'w-full top-0 z-50 transition-all duration-300',
          isHome ? 'absolute' : 'sticky',
          scrolled && !isHome ? 'bg-[#1a1a1a]/95 backdrop-blur-xl shadow-lg' : ''
        )}
        style={{
          background: isHome && !scrolled
            ? 'linear-gradient(180deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, transparent 100%)'
            : !isHome && !scrolled
            ? '#1a1a1a'
            : undefined,
        }}
      >
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 group">
              <img 
                src="/logo.jpeg" 
                alt="Nordhessen Automobile" 
                className="h-16 w-auto"
                onError={(e) => {
                  // Fallback to icon if image not found
                  e.currentTarget.style.display = 'none';
                  const parent = e.currentTarget.parentElement;
                  if (parent && !parent.querySelector('.fallback-icon')) {
                    const icon = document.createElement('div');
                    icon.className = 'fallback-icon';
                    icon.innerHTML = '<svg class="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 17H4C3.44772 17 3 16.5523 3 16V12L5.4 6.8C5.55 6.3 6 6 6.5 6H17.5C18 6 18.45 6.3 18.6 6.8L21 12V16C21 16.5523 20.5523 17 20 17H19M5 17C5 18.1046 5.89543 19 7 19C8.10457 19 9 18.1046 9 17M5 17C5 15.8954 5.89543 15 7 15C8.10457 15 9 15.8954 9 17M19 17C19 18.1046 18.1046 19 17 19C15.8954 19 15 18.1046 15 17M19 17C19 15.8954 18.1046 15 17 15C15.8954 15 15 15.8954 15 17M9 17H15"/></svg>';
                    parent.insertBefore(icon, parent.firstChild);
                  }
                }}
              />
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-100 to-gray-400 group-hover:from-red-500 group-hover:to-red-400 transition-all duration-500 tracking-tight drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                Nordhessen Automobile
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-2 lg:space-x-4">
              {navigation.map((item) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.navKey}
                    to={item.href}
                    className="relative px-3 py-2 text-sm font-medium transition-colors group rounded-md"
                  >
                    <span className={cn(
                      'relative z-10 transition-colors duration-300',
                      active ? 'text-white font-semibold flex items-center' : 'text-gray-300 group-hover:text-red-400'
                    )}>
                      {active && <span className="w-1.5 h-1.5 rounded-full bg-red-500 mr-2 shadow-[0_0_8px_rgba(220,38,38,0.8)]" />}
                      <span>{t(item.navKey)}</span>
                    </span>
                    
                    {active && (
                      <motion.div
                        layoutId="header-active-tab"
                        className="absolute inset-0 bg-red-600/10 border-b-2 border-red-600 z-0 rounded-t-sm"
                        initial={false}
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </Link>
                );
              })}
              
              {/* Language Toggle */}
              <button
                onClick={() => setLanguage(language === 'de' ? 'en' : 'de')}
                className="flex items-center gap-1.5 ml-4 px-3 py-1.5 rounded-md bg-zinc-800/50 hover:bg-zinc-700/50 text-gray-300 hover:text-white transition-all border border-zinc-700"
                aria-label="Toggle language"
              >
                <Globe className="w-4 h-4" />
                <span className="text-sm font-semibold uppercase">{language}</span>
              </button>
            </div>

            {/* Mobile Actions Container */}
            <div className="flex items-center gap-4 md:hidden">
              <button
                onClick={() => setLanguage(language === 'de' ? 'en' : 'de')}
                className="flex items-center gap-1 p-2 rounded-md text-gray-300 hover:text-white"
              >
                <Globe className="w-4 h-4" />
                <span className="text-xs font-bold uppercase">{language}</span>
              </button>
              {/* Mobile menu button - 44px touch target */}
            <button
              type="button"
              className="md:hidden p-2 rounded-md text-white hover:bg-gray-800 min-w-[44px] min-h-[44px] flex items-center justify-center"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Menu Drawer - Slide from right */}
      <div
        className={cn(
          'fixed top-0 right-0 bottom-0 w-80 max-w-[85vw] bg-black z-50 transform transition-transform duration-300 ease-in-out md:hidden shadow-2xl border-l border-gray-800',
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <div className="flex flex-col h-full">
          {/* Drawer Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-700">
            <div className="flex items-center space-x-2">
              <Car className="h-6 w-6 text-red-500" />
              <span className="font-bold text-white">Menü</span>
            </div>
            <button
              type="button"
              className="p-2 rounded-md text-gray-300 hover:bg-gray-800 min-w-[44px] min-h-[44px] flex items-center justify-center"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close menu"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Drawer Navigation Links */}
          <nav className="flex-1 overflow-y-auto py-4">
            <div className="flex flex-col">
              {navigation.map((item) => (
                <Link
                  key={item.navKey}
                  to={item.href}
                  className={cn(
                    'px-6 py-4 text-base font-medium transition-colors min-h-[44px] flex items-center',
                    isActive(item.href)
                      ? 'text-red-500 bg-red-900/20 border-r-4 border-red-500'
                      : 'text-gray-300 hover:bg-gray-800 hover:text-red-400'
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t(item.navKey)}
                </Link>
              ))}
            </div>
          </nav>

          {/* Drawer Footer */}
          <div className="p-4 border-t border-gray-700 bg-black">
            <p className="text-sm text-gray-300 text-center">
              Nordhessen Automobile
            </p>
            <p className="text-xs text-gray-400 text-center mt-1">
              0561 930 04 649
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
