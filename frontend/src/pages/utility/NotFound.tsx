import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Home, Search, Phone, ArrowLeft } from 'lucide-react';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';

export default function NotFound() {
  const quickLinks = [
    { label: 'Startseite', href: '/', icon: <Home className="w-5 h-5" /> },
    { label: 'Fahrzeuge durchsuchen', href: '/fahrzeuge', icon: <Search className="w-5 h-5" /> },
    { label: 'Kontakt', href: '/kontakt', icon: <Phone className="w-5 h-5" /> },
  ];

  return (
    <>
      <Helmet>
        <title>Seite nicht gefunden - Nordhessen Automobile</title>
        <meta name="robots" content="noindex, follow" />
      </Helmet>

      <div className="min-h-screen bg-[#171717] flex items-center justify-center px-4 py-20">
        <div className="max-w-2xl w-full text-center">
          {/* 404 Number */}
          <div className="relative mb-8">
            <h1 
              className="text-[180px] md:text-[240px] font-black leading-none"
              style={{
                background: 'linear-gradient(135deg, #dc2626 0%, #ef4444 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              404
            </h1>
            <div 
              className="absolute inset-0 blur-3xl opacity-20"
              style={{
                background: 'radial-gradient(circle, rgba(220,38,38,0.5) 0%, transparent 70%)',
              }}
            />
          </div>

          {/* Message */}
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Seite nicht gefunden
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            Die von Ihnen gesuchte Seite existiert leider nicht oder wurde verschoben.
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link to="/">
              <Button size="lg" leftIcon={<ArrowLeft className="w-5 h-5" />}>
                Zurück zur Startseite
              </Button>
            </Link>
            <Link to="/fahrzeuge">
              <Button variant="outline" size="lg">
                Fahrzeuge ansehen
              </Button>
            </Link>
          </div>

          {/* Quick Links */}
          <Card variant="elevated" className="p-8">
            <h3 className="text-lg font-bold text-white mb-6">Beliebte Seiten</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {quickLinks.map((link, index) => (
                <Link
                  key={index}
                  to={link.href}
                  className="flex items-center justify-center gap-2 p-4 rounded-lg bg-zinc-800/50 hover:bg-zinc-800 transition-colors text-gray-300 hover:text-white"
                >
                  {link.icon}
                  <span className="font-semibold">{link.label}</span>
                </Link>
              ))}
            </div>
          </Card>

          {/* Help Text */}
          <p className="text-sm text-gray-500 mt-8">
            Fehler-Code: 404 | Seite nicht gefunden
          </p>
        </div>
      </div>
    </>
  );
}
