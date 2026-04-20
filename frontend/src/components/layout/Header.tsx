import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Globe } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../utils/cn';
import { useLanguage } from '../../contexts/LanguageContext';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const location = useLocation();
  const { language, setLanguage, t } = useLanguage();

  const navigation = [
    { label: t('nav.home'), href: '/' },
    { label: t('nav.vehicles'), href: '/fahrzeuge' },
    { label: t('nav.tradein'), href: '/inzahlungnahme' },
    { label: t('nav.about'), href: '/geschichte' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

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


      {/* Main Header */}
      <motion.header
        initial={false}
        animate={{
          backdropFilter: scrolled ? 'blur(30px) saturate(200%)' : 'blur(0px)',
        }}
        className={cn(
          'w-full top-0 z-50 transition-all duration-500',
          isHome ? 'fixed' : 'sticky',
          scrolled
            ? 'bg-black/80 backdrop-blur-md shadow-glass border-b border-white/[0.06]'
            : isHome
              ? ''
              : 'bg-[#1a1a1f] border-b border-white/[0.04]'
        )}
        style={{
          background: isHome && !scrolled
            ? 'linear-gradient(180deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.2) 70%, transparent 100%)'
            : undefined,
        }}
      >
        <nav className="container mx-auto px-5 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link 
              to="/" 
              className="flex items-center group focus:outline-none rounded-xl focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-[#1a1a1f]"
            >
              {!logoError ? (
                <img
                  src="/logo.png?v=3"
                  alt="Nordhessen Automobile"
                  className="h-14 md:h-16 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                  onError={() => setLogoError(true)}
                />
              ) : (
                <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center text-white font-bold text-lg ml-4">
                  N
                </div>
              )}
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navigation.map((item) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.label}
                    to={item.href}
                    className="relative px-4 py-2.5 text-sm font-medium transition-all duration-300 rounded-xl group"
                  >
                    <span className={cn(
                      'relative z-10 transition-colors duration-300',
                      active ? 'text-white' : 'text-gray-400 group-hover:text-white'
                    )}>
                      {item.label}
                    </span>

                    {active && (
                      <motion.div
                        layoutId="header-active-tab"
                        className="absolute inset-0 z-0 rounded-xl"
                        style={{
                          background: 'linear-gradient(135deg, rgba(239,68,68,0.2), rgba(220,38,38,0.08))',
                          border: '1px solid rgba(239,68,68,0.3)',
                          boxShadow: '0 0 15px rgba(239,68,68,0.15)',
                        }}
                        initial={false}
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}

                    {!active && (
                      <div className="absolute inset-0 rounded-xl bg-white/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    )}
                  </Link>
                );
              })}

              {/* Language Selector */}
              <div className="relative ml-3 flex items-center rounded-xl transition-all duration-300 bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.06]">
                <Globe className="w-3.5 h-3.5 ml-3 pointer-events-none absolute text-gray-500" />
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value as any)}
                  className="pl-8 pr-3 py-2 bg-transparent text-xs font-semibold uppercase appearance-none cursor-pointer focus:outline-none text-gray-400 hover:text-white tracking-wider"
                  aria-label="Select language"
                >
                  <option value="de" className="bg-[#12121c] text-gray-100">DE</option>
                  <option value="en" className="bg-[#12121c] text-gray-100">EN</option>
                  <option value="pt" className="bg-[#12121c] text-gray-100">PT</option>
                  <option value="fr" className="bg-[#12121c] text-gray-100">FR</option>
                  <option value="es" className="bg-[#12121c] text-gray-100">ES</option>
                  <option value="it" className="bg-[#12121c] text-gray-100">IT</option>
                </select>
              </div>

            {/* Call to Action Button */}
              <a 
                href="tel:+4956198866911" 
                className="ml-5 h-[36px] px-5 rounded-lg flex items-center justify-center text-[10px] font-bold uppercase tracking-widest text-red-500 border border-red-500/30 bg-red-500/10 hover:bg-red-500 hover:text-white transition-all duration-300"
              >
                <Phone className="w-3 h-3 mr-2" />
                0561/98866911
              </a>
            </div>

            {/* Mobile Actions */}
            <div className="flex items-center gap-3 md:hidden">
              <div className="relative flex items-center bg-white/[0.05] border border-white/[0.1] rounded-full px-3 py-1.5 backdrop-blur-md">
                <Globe className="w-3 h-3 text-red-500 mr-1.5" />
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value as any)}
                  className="bg-transparent text-[10px] font-black uppercase appearance-none cursor-pointer focus:outline-none text-white tracking-widest"
                >
                  <option value="de" className="bg-[#1a1a1f] text-gray-100">DE</option>
                  <option value="en" className="bg-[#1a1a1f] text-gray-100">EN</option>
                  <option value="pt" className="bg-[#1a1a1f] text-gray-100">PT</option>
                  <option value="fr" className="bg-[#1a1a1f] text-gray-100">FR</option>
                  <option value="es" className="bg-[#1a1a1f] text-gray-100">ES</option>
                  <option value="it" className="bg-[#1a1a1f] text-gray-100">IT</option>
                </select>
              </div>
              <button
                type="button"
                className="p-2.5 rounded-2xl min-w-[44px] min-h-[44px] flex items-center justify-center text-white bg-white/[0.05] border border-white/[0.1] backdrop-blur-md transition-all duration-300 hover:bg-white/[0.1]"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* Mobile Menu Drawer */}
      <div
        className={cn(
          'fixed top-0 right-0 bottom-0 w-80 max-w-[85vw] bg-[#22222a]/95 backdrop-blur-3xl z-50 transform transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] md:hidden border-l border-white/[0.08]',
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <div className="flex flex-col h-full">
          {/* Drawer Header */}
          <div className="flex items-center justify-between p-5 border-b border-white/[0.06]">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">N</span>
              </div>
              <span className="font-display font-bold text-white">{t('header.menu')}</span>
            </div>
            <button
              type="button"
              className="p-2 rounded-xl text-gray-500 hover:bg-white/[0.06] min-w-[44px] min-h-[44px] flex items-center justify-center transition-colors"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Drawer Navigation Links */}
          <nav className="flex-1 overflow-y-auto py-3">
            <div className="flex flex-col gap-1 px-3">
              {navigation.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: 20 }}
                  animate={mobileMenuOpen ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                >
                  <Link
                    to={item.href}
                    className={cn(
                      'px-4 py-4 text-base font-medium transition-all duration-300 min-h-[44px] flex items-center rounded-xl',
                      isActive(item.href)
                        ? 'text-white bg-red-500/10 border border-red-500/20'
                        : 'text-gray-400 hover:bg-white/[0.04] hover:text-white'
                    )}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {isActive(item.href) && (
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 mr-3 shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
                    )}
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </nav>

          {/* Drawer Footer */}
          <div className="p-5 border-t border-white/[0.06]">
            <div className="glass-card p-4 text-center">
              <p className="text-sm font-display font-semibold text-white mb-1">
                Nordhessen Automobile
              </p>
              <a href="tel:+4956198866911" className="text-xs text-red-400 hover:text-red-300 transition-colors block mb-1">
                Verkauf: 0561/98866911
              </a>
              <a href="tel:+4956198866918" className="text-xs text-red-400 hover:text-red-300 transition-colors block">
                Werkstatt: 0561/98866918
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
