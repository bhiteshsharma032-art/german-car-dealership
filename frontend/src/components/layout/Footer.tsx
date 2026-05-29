import { Link } from 'react-router-dom';
import { Instagram, MapPin, Phone, Mail } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

// TikTok icon (lucide-react does not bundle one)
const TikTokIcon = ({ className = '' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.2a8.16 8.16 0 0 0 4.77 1.52V6.27a4.83 4.83 0 0 1-1.84-.42z" />
  </svg>
);

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="relative bg-[#000000] overflow-hidden pt-20 pb-10 border-t border-white/[0.05]">
      {/* Top Gradient Line */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-red-500/50 to-transparent opacity-50" />

      {/* Ambient Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] pointer-events-none blur-[120px]" style={{ background: 'radial-gradient(ellipse, rgba(239,68,68,0.05) 0%, transparent 60%)' }} />

      <div className="container mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-12 lg:gap-8 mb-20">
          
          {/* Brand */}
          <div className="lg:col-span-4 flex flex-col items-start pr-0 lg:pr-8">
            <Link to="/" className="inline-block mb-8">
              <img src="/logo.png?v=3" alt="Nordhessen Automobile" className="h-28 sm:h-36 w-auto object-contain transition-transform duration-500 hover:scale-105" />
            </Link>
            <p className="text-sm leading-relaxed text-gray-400 max-w-sm font-light">
              {t('footer.tagline')}
            </p>
          </div>

          {/* Menü */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <h3 className="text-xs font-bold tracking-[0.25em] uppercase text-white mb-4 flex items-center gap-2">
              <div className="w-1 h-1 bg-red-500 rounded-full" />
              {t('header.menu')}
            </h3>
            <ul className="space-y-4">
              {[
                { label: t('nav.home'), to: '/' },
                { label: t('nav.vehicles'), to: '/fahrzeuge' },
                { label: t('nav.tradein'), to: '/inzahlungnahme' },
                { label: t('nav.about'), to: '/geschichte' },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-sm text-gray-400 hover:text-white transition-all duration-300 flex items-center gap-2 group"
                  >
                    <span className="group-hover:translate-x-2 transition-transform duration-300">{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Rechtliches */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <h3 className="text-xs font-bold tracking-[0.25em] uppercase text-white mb-4 flex items-center gap-2">
              <div className="w-1 h-1 bg-red-500 rounded-full" />
              {t('footer.legal')}
            </h3>
            <ul className="space-y-4">
              {[
                { label: t('footer.impressum'), to: '/impressum' },
                { label: t('footer.privacy'), to: '/datenschutz' },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-sm text-gray-400 hover:text-white transition-all duration-300 flex items-center gap-2 group"
                  >
                    <span className="group-hover:translate-x-2 transition-transform duration-300">{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info & Hours */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <h3 className="text-xs font-bold tracking-[0.25em] uppercase text-white mb-2 flex items-center gap-2">
              <div className="w-1 h-1 bg-red-500 rounded-full" />
              {t('footer.contact')}
            </h3>
            <div className="space-y-4 text-sm text-gray-400">
              <a href="tel:+4956198866911" className="flex items-center gap-4 hover:text-white transition-colors group w-fit">
                <div className="w-10 h-10 rounded-full bg-white/[0.03] border border-white/[0.05] flex items-center justify-center group-hover:border-red-500/50 group-hover:bg-red-500/10 transition-all">
                  <Phone className="h-4 w-4 text-gray-300 group-hover:text-red-400" />
                </div>
                <span className="tracking-wide">0561/98866911 ({t('footer.phone.sales')})</span>
              </a>
              <a href="tel:+4956198866918" className="flex items-center gap-4 hover:text-white transition-colors group w-fit">
                <div className="w-10 h-10 rounded-full bg-white/[0.03] border border-white/[0.05] flex items-center justify-center group-hover:border-red-500/50 group-hover:bg-red-500/10 transition-all">
                  <Phone className="h-4 w-4 text-gray-300 group-hover:text-red-400" />
                </div>
                <span className="tracking-wide">0561/98866918 ({t('footer.phone.workshop')})</span>
              </a>
              <a href="mailto:verkauf@nordhessen-automobile.de" className="flex items-center gap-4 hover:text-white transition-colors group w-fit">
                <div className="w-10 h-10 rounded-full bg-white/[0.03] border border-white/[0.05] flex items-center justify-center group-hover:border-red-500/50 group-hover:bg-red-500/10 transition-all">
                  <Mail className="h-4 w-4 text-gray-300 group-hover:text-red-400" />
                </div>
                <span className="tracking-wide">verkauf@nordhessen-automobile.de</span>
              </a>
            </div>

            <div className="w-full h-px bg-white/[0.05] my-2" />

            <div className="flex items-start gap-4 text-sm text-gray-400 group cursor-default">
              <div className="w-10 h-10 rounded-full bg-white/[0.03] border border-white/[0.05] flex items-center justify-center flex-shrink-0 mt-1 transition-all group-hover:border-red-500/20 group-hover:bg-red-500/5">
                <MapPin className="h-4 w-4 text-gray-300 group-hover:text-red-400 transition-colors" />
              </div>
              <div className="leading-relaxed flex flex-col gap-2">
                <span>Sandershäuser Straße 87a<br />34123 Kassel, DE</span>
                <span className="text-xs tracking-widest uppercase text-white/50">{t('footer.hours')}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/[0.05] flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-[10px] sm:text-xs tracking-widest uppercase text-gray-500 font-bold">
            © {new Date().getFullYear()} NORDHESSEN-AUTOMOBILE SEIDLER UND OSMIKHOVSKY GBR
          </p>
          <div className="flex items-center gap-3">
            <a
              href="https://www.instagram.com/nordhessen_automobile?igsh=eW9rcnM1eWloM2I3"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/[0.03] border border-white/[0.08] hover:bg-gradient-to-r hover:from-[#833ab4] hover:via-[#fd1d1d] hover:to-[#fcb045] hover:border-transparent hover:text-white transition-all duration-500 group"
            >
              <Instagram className="h-4 w-4 text-gray-400 group-hover:text-white transition-colors" />
              <span className="text-[10px] font-bold tracking-widest uppercase text-gray-400 group-hover:text-white transition-colors">Instagram</span>
            </a>
            <a
              href="https://www.tiktok.com/@nordhessen_automobile"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/[0.03] border border-white/[0.08] hover:bg-black hover:border-white/40 hover:text-white transition-all duration-500 group"
            >
              <TikTokIcon className="h-4 w-4 text-gray-400 group-hover:text-white transition-colors" />
              <span className="text-[10px] font-bold tracking-widest uppercase text-gray-400 group-hover:text-white transition-colors">TikTok</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
