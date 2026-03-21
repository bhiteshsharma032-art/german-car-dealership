
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Youtube } from 'lucide-react';

const GOLD = '#dc2626';

export default function Footer() {

  return (
    <footer style={{ background: '#0f0f0f' }}>
      {/* Gold accent line at top */}
      <div className="h-[1px] w-full" style={{ background: `linear-gradient(90deg, transparent 0%, ${GOLD} 50%, transparent 100%)`, opacity: 0.3 }} />

      <div className="container mx-auto px-6 md:px-12 lg:px-16 py-14">


        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 md:gap-8">

          {/* Brand & Contact */}
          <div className="lg:col-span-2">
            <h2
              className="text-2xl font-black tracking-wider mb-5 italic"
              style={{ color: GOLD }}
            >
              NORDHESSEN AUTOMOBILE
            </h2>
            <p className="text-sm leading-relaxed mb-6" style={{ color: 'rgba(255,255,255,0.4)' }}>
              Ihr vertrauenswürdiger Partner für Premium-Fahrzeuge. Exzellenz in jedem Detail seit 2009.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <a href="tel:+4956193004649" className="flex items-center gap-3 text-sm hover:text-red-500 transition-colors" style={{ color: 'rgba(255,255,255,0.5)' }}>
                <Phone className="h-4 w-4" />
                <span>0561 930 04 649</span>
              </a>
              <a href="mailto:info@nordhessen-automobile.de" className="flex items-center gap-3 text-sm hover:text-red-500 transition-colors" style={{ color: 'rgba(255,255,255,0.5)' }}>
                <Mail className="h-4 w-4" />
                <span>info@nordhessen-automobile.de</span>
              </a>
              <div className="flex items-start gap-3 text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
                <MapPin className="h-4 w-4 mt-0.5" />
                <span>Sandershäuser Straße 87a<br />34123 Kassel, Deutschland</span>
              </div>
            </div>
          </div>

          {/* Explore */}
          <div>
            <h3
              className="text-sm font-bold tracking-widest uppercase mb-5 italic"
              style={{ color: GOLD }}
            >
              Entdecken
            </h3>
            <ul className="space-y-3">
              {[
                { label: 'Fahrzeuge', to: '/fahrzeuge' },

                { label: 'Finanzierung', to: '/finanzierung' },
                { label: 'Inzahlungnahme', to: '/inzahlungnahme' },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-sm transition-colors duration-300 hover:pl-1"
                    style={{ color: 'rgba(255,255,255,0.45)' }}
                    onMouseOver={(e) => { e.currentTarget.style.color = GOLD; }}
                    onMouseOut={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.45)'; }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3
              className="text-sm font-bold tracking-widest uppercase mb-5 italic"
              style={{ color: GOLD }}
            >
              Support
            </h3>
            <ul className="space-y-3">
              {[
                { label: 'Kontakt', to: '/kontakt' },

              ].map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-sm transition-colors duration-300 hover:pl-1"
                    style={{ color: 'rgba(255,255,255,0.45)' }}
                    onMouseOver={(e) => { e.currentTarget.style.color = GOLD; }}
                    onMouseOut={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.45)'; }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Opening Hours & Newsletter */}
          <div>
            <h3
              className="text-sm font-bold tracking-widest uppercase mb-5 italic"
              style={{ color: GOLD }}
            >
              Öffnungszeiten
            </h3>
            <div className="space-y-2 mb-6 text-sm" style={{ color: 'rgba(255,255,255,0.45)' }}>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <div>
                  <div>Mo-Fr: 9:00-18:00</div>
                  <div>Sa: 10:00-14:00</div>
                  <div>So: Geschlossen</div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Social Links */}
        <div className="mt-12 pt-8" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110"
                style={{ background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.5)' }}
                onMouseOver={(e) => { e.currentTarget.style.background = GOLD; e.currentTarget.style.color = '#0a0a0a'; }}
                onMouseOut={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = 'rgba(255,255,255,0.5)'; }}
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110"
                style={{ background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.5)' }}
                onMouseOver={(e) => { e.currentTarget.style.background = GOLD; e.currentTarget.style.color = '#0a0a0a'; }}
                onMouseOut={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = 'rgba(255,255,255,0.5)'; }}
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110"
                style={{ background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.5)' }}
                onMouseOver={(e) => { e.currentTarget.style.background = GOLD; e.currentTarget.style.color = '#0a0a0a'; }}
                onMouseOut={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = 'rgba(255,255,255,0.5)'; }}
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>

            {/* Legal Links */}
            <div className="flex items-center gap-6 text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>
              <Link to="/impressum" className="hover:text-red-500 transition-colors">
                Impressum
              </Link>
              <Link to="/datenschutz" className="hover:text-red-500 transition-colors">
                Datenschutz
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 pt-6" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <p className="text-center text-xs tracking-wider" style={{ color: 'rgba(255,255,255,0.25)' }}>
            © {new Date().getFullYear()} Nordhessen-Automobile Seidler & Osmikhovsky GbR · Alle Rechte vorbehalten
          </p>
        </div>
      </div>
    </footer>
  );
}
