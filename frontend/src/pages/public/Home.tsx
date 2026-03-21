import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  ArrowRight,
  CheckCircle,
  Euro,
  CreditCard,
  FileCheck
} from 'lucide-react';
import ScrollImageSequence from '../../components/ScrollImageSequence';
import { carService, Car } from '../../services/carService';
import VehicleCard from '../../components/inventory/VehicleCard';

export default function Home() {
  const [featuredCars, setFeaturedCars] = useState<Car[]>([]);
  const [availableBrands, setAvailableBrands] = useState<{name: string, logo: string}[]>([]);
  const [loading, setLoading] = useState(true);

      // High-quality, real, non-text colored logos for Premium Brands
  const BEAUTIFUL_LOGOS: Record<string, string> = {
    'bmw': 'https://upload.wikimedia.org/wikipedia/commons/4/44/BMW.svg',
    'mercedes-benz': 'https://upload.wikimedia.org/wikipedia/commons/9/90/Mercedes-Logo.svg',
    'audi': 'https://upload.wikimedia.org/wikipedia/commons/9/92/Audi-Logo_2016.svg',
    'porsche': 'https://upload.wikimedia.org/wikipedia/en/thumb/d/d3/Porsche_Wappen.svg/440px-Porsche_Wappen.svg.png',
    'volkswagen': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Volkswagen_Logo_till_1995.svg/512px-Volkswagen_Logo_till_1995.svg.png',
    'skoda': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Skoda_Auto_logo_%282011-2016%29.svg/512px-Skoda_Auto_logo_%282011-2016%29.svg.png',
    'seat': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/SEAT_Logo_2012.svg/512px-SEAT_Logo_2012.svg.png',
    'ford': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Ford_Motor_Company_Logo.svg/512px-Ford_Motor_Company_Logo.svg.png',
    'opel': 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Opel_Logo_2020.svg/512px-Opel_Logo_2020.svg.png'
  };

  useEffect(() => {
    const fetchFeaturedAndBrands = async () => {
      try {
        const [carsRes, brandsRes] = await Promise.all([
          carService.getAllCars({ limit: 4 }),
          carService.getBrandsWithCounts()
        ]);

        if (carsRes.success && carsRes.data) {
          const sorted = carsRes.data.sort((a, b) => (b.isExclusive ? 1 : 0) - (a.isExclusive ? 1 : 0));
          setFeaturedCars(sorted.slice(0, 4));
        }

        if (brandsRes && brandsRes.length > 0) {
          const dynamicBrands = brandsRes.map(b => ({
            name: b.brand,
            logo: BEAUTIFUL_LOGOS[b.brand.toLowerCase()] || `https://ui-avatars.com/api/?name=${b.brand}&background=1a1a1a&color=fff&font-size=0.33`
          }));
          // Show up to 5 available premium brands or fallback to generic
          setAvailableBrands(dynamicBrands.slice(0, 5));
        } else {
          // Fallback if no brands returned from API
          setAvailableBrands([
            { name: 'BMW', logo: BEAUTIFUL_LOGOS['bmw'] },
            { name: 'Mercedes-Benz', logo: BEAUTIFUL_LOGOS['mercedes-benz'] },
            { name: 'Audi', logo: BEAUTIFUL_LOGOS['audi'] },
            { name: 'Porsche', logo: BEAUTIFUL_LOGOS['porsche'] },
            { name: 'Volkswagen', logo: BEAUTIFUL_LOGOS['volkswagen'] },
          ]);
        }
      } catch (error) {
        console.error('Failed to load home data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchFeaturedAndBrands();
  }, []);

  return (
    <>
      <Helmet>
        <title>Nordhessen Automobile - Ihr Partner für Premium-Fahrzeuge</title>
        <meta
          name="description"
          content="Entdecken Sie unsere exklusive Auswahl an Premium-Fahrzeugen. BMW, Mercedes-Benz, Audi, Porsche und mehr."
        />
      </Helmet>

      {/* Scroll-Driven Image Sequence */}
      <ScrollImageSequence frameCount={121} folderPath="/frames" filePrefix="ezgif-frame-" fileExtension=".jpg" padLength={3} />

      {/* Gradient Transition from dark scroll sequence to content */}
      <div
        className="relative overflow-hidden"
        style={{
          background: '#000000',
          height: '120px',
          marginTop: '-2px',
        }}
      >
        {/* Scrolling Marquee Text Ticker */}
        <div className="absolute inset-0 flex items-center overflow-hidden pointer-events-none">
          <div
            className="whitespace-nowrap flex"
            style={{
              animation: 'marqueeLeft 30s linear infinite',
            }}
          >
            {[...Array(2)].map((_, i) => (
              <span
                key={i}
                className="text-[10px] tracking-[0.5em] uppercase font-light mx-4"
                style={{ color: 'rgba(220,38,38,0.12)' }}
              >
                Premium Fahrzeuge &nbsp;•&nbsp; BMW &nbsp;•&nbsp; Mercedes-Benz &nbsp;•&nbsp; Audi &nbsp;•&nbsp; Porsche &nbsp;•&nbsp; Volkswagen &nbsp;•&nbsp; Qualität seit 2009 &nbsp;•&nbsp; Nordhessen Automobile &nbsp;•&nbsp; Geprüfte Fahrzeuge &nbsp;•&nbsp; Faire Preise &nbsp;•&nbsp; Garantie inklusive &nbsp;•&nbsp; Finanzierung möglich &nbsp;•&nbsp;
              </span>
            ))}
          </div>
        </div>
        {/* Gold accent line */}
        <div className="absolute bottom-0 left-0 right-0 h-[1px]" style={{ background: 'linear-gradient(90deg, transparent 0%, #dc2626 50%, transparent 100%)', opacity: 0.3 }} />
      </div>

      {/* ── Separator: scrolling text ribbon ── */}
      <div className="relative overflow-hidden" style={{ background: '#000000', height: '50px' }}>
        <div className="absolute inset-0 flex items-center overflow-hidden pointer-events-none">
          <div className="whitespace-nowrap flex" style={{ animation: 'marqueeLeft 25s linear infinite' }}>
            {[...Array(2)].map((_, i) => (
              <span key={i} className="text-[11px] tracking-[0.4em] uppercase font-semibold mx-4" style={{ color: 'rgba(220,38,38,0.18)' }}>
                ★ &nbsp; Premium &nbsp; ★ &nbsp; Qualität &nbsp; ★ &nbsp; Vertrauen &nbsp; ★ &nbsp; Leistung &nbsp; ★ &nbsp; Eleganz &nbsp; ★ &nbsp; Exzellenz &nbsp; ★ &nbsp; Premium &nbsp; ★ &nbsp; Qualität &nbsp; ★ &nbsp; Vertrauen &nbsp; ★ &nbsp; Leistung &nbsp; ★ &nbsp; Eleganz &nbsp; ★ &nbsp; Exzellenz &nbsp;
              </span>
            ))}
          </div>
        </div>
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(220,38,38,0.15), transparent)' }} />
        <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(220,38,38,0.15), transparent)' }} />
      </div>

      {/* Brand Showcase */}
      <section className="py-16 relative overflow-hidden" style={{ background: '#000000' }}>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none" aria-hidden="true">
          <span
            className="text-[10vw] font-black uppercase tracking-widest"
            style={{
              color: 'transparent',
              WebkitTextStroke: '1px rgba(255,255,255,0.02)',
              animation: 'textReveal 10s ease-in-out infinite 2s',
            }}
          >
            PREMIUM MARKEN
          </span>
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h2 className="text-3xl font-bold text-center mb-12 text-white">
            Premium Marken
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8">
            {availableBrands.map((brand) => (
              <Link
                key={brand.name}
                to={`/fahrzeuge?brand=${brand.name}`}
                className="w-[calc(50%-0.5rem)] sm:w-48 lg:w-56 rounded-xl p-6 sm:p-8 flex flex-col items-center justify-center hover:shadow-2xl transition-all duration-300 transform hover:scale-105 group border border-zinc-800 focus:outline-none focus:ring-2 focus:ring-red-600"
                style={{ background: '#1a1a1a' }}
              >
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className={`h-16 sm:h-24 w-auto object-contain transition-all duration-300 group-hover:scale-110 drop-shadow-lg`}
                  style={{ filter: brand.name.toLowerCase() === 'audi' ? 'brightness(0) invert(1)' : 'none' }}
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    const fallback = document.createElement('div');
                    fallback.className = 'text-lg font-bold text-gray-400 group-hover:text-red-500 transition-colors uppercase tracking-widest';
                    fallback.textContent = brand.name;
                    if (!e.currentTarget.parentElement?.querySelector('div')) {
                      e.currentTarget.parentElement?.appendChild(fallback);
                    }
                  }}
                />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Separator: animated accent line ── */}
      <div className="relative" style={{ background: '#000000', height: '60px' }}>
        <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 flex items-center justify-center pointer-events-none">
          <div className="flex items-center gap-4">
            <div className="h-px w-24 md:w-40" style={{ background: 'linear-gradient(90deg, transparent, rgba(220,38,38,0.3))' }} />
            <div className="w-2 h-2 rotate-45" style={{ border: '1px solid rgba(220,38,38,0.3)', animation: 'borderGlow 4s ease-in-out infinite' }} />
            <div className="h-px w-24 md:w-40" style={{ background: 'linear-gradient(90deg, rgba(220,38,38,0.3), transparent)' }} />
          </div>
        </div>
      </div>

      {/* Top Fahrzeuge Section */}
      <section className="py-16 text-white relative overflow-hidden" style={{ background: '#000000' }}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col sm:flex-row justify-between items-end mb-12 gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">Top Fahrzeuge</h2>
              <p className="text-gray-400">Entdecken Sie unsere aktuellsten Premium-Modelle</p>
            </div>
            <Link
              to="/fahrzeuge"
              className="hidden sm:flex items-center gap-2 text-red-500 hover:text-red-400 font-medium transition-colors whitespace-nowrap"
            >
              Alle Fahrzeuge ansehen <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          {loading ? (
             <div className="flex justify-center py-20">
               <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
             </div>
          ) : featuredCars.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {featuredCars.map((vehicle) => (
                <div key={vehicle.id} className="transform hover:-translate-y-1 transition-transform duration-300">
                  <VehicleCard
                    id={vehicle.id}
                    make={vehicle.brand}
                    model={vehicle.model}
                    title={`${vehicle.brand} ${vehicle.model}`}
                    price={{
                      amount: vehicle.price,
                      formatted: `${vehicle.price.toLocaleString('de-DE')} €`,
                    }}
                    mileage={{
                      formatted: `${vehicle.mileage.toLocaleString('de-DE')} km`,
                    }}
                    firstRegistration={`${vehicle.year}-01-01`}
                    power={{
                      formatted: `${vehicle.horsePower} PS`,
                    }}
                    fuelType={vehicle.fuelType}
                    transmission={vehicle.transmission}
                    image={vehicle.images[0]}
                    images={vehicle.images}
                    isNew={new Date(vehicle.createdAt).getTime() > Date.now() - 7 * 24 * 60 * 60 * 1000}
                    isExclusive={vehicle.isExclusive}
                    hasFinancing={true}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              Derzeit sind keine Fahrzeuge verfügbar.
            </div>
          )}
          
          <div className="mt-10 sm:hidden flex justify-center">
            <Link
              to="/fahrzeuge"
              className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
            >
              Alle Fahrzeuge <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Separator: animated accent line ── */}
      <div className="relative" style={{ background: '#000000', height: '60px' }}>
        <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 flex items-center justify-center pointer-events-none">
          <div className="flex items-center gap-4">
            <div className="h-px w-24 md:w-40" style={{ background: 'linear-gradient(90deg, transparent, rgba(220,38,38,0.3))' }} />
            <div className="w-2 h-2 rotate-45" style={{ border: '1px solid rgba(220,38,38,0.3)', animation: 'borderGlow 4s ease-in-out infinite' }} />
            <div className="h-px w-24 md:w-40" style={{ background: 'linear-gradient(90deg, rgba(220,38,38,0.3), transparent)' }} />
          </div>
        </div>
      </div>

      {/* Why Choose Us */}
      <section className="py-16 text-white relative overflow-hidden" style={{ background: '#000000' }}>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none" aria-hidden="true">
          <span
            className="text-[14vw] font-black uppercase tracking-widest"
            style={{
              color: 'transparent',
              WebkitTextStroke: '1px rgba(220,38,38,0.03)',
              animation: 'textReveal 12s ease-in-out infinite 3s',
            }}
          >
            QUALITÄT
          </span>
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Warum Nordhessen Automobile?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl mb-6 group-hover:scale-110 transition-transform" style={{ background: 'linear-gradient(135deg, #dc2626, #ef4444)' }}>
                <CheckCircle className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-bold mb-3">Geprüfte Fahrzeuge</h3>
              <p className="text-gray-400">
                Jedes Fahrzeug wird von unseren Experten gründlich geprüft
              </p>
            </div>

            <div className="text-center group">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl mb-6 group-hover:scale-110 transition-transform" style={{ background: 'linear-gradient(135deg, #dc2626, #ef4444)' }}>
                <Euro className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-bold mb-3">Faire Preise</h3>
              <p className="text-gray-400">
                Transparente Preisgestaltung ohne versteckte Kosten
              </p>
            </div>

            <div className="text-center group">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl mb-6 group-hover:scale-110 transition-transform" style={{ background: 'linear-gradient(135deg, #dc2626, #ef4444)' }}>
                <FileCheck className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-bold mb-3">Garantie inklusive</h3>
              <p className="text-gray-400">
                Umfassende Garantie auf alle unsere Fahrzeuge
              </p>
            </div>

            <div className="text-center group">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl mb-6 group-hover:scale-110 transition-transform" style={{ background: 'linear-gradient(135deg, #dc2626, #ef4444)' }}>
                <CreditCard className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-bold mb-3">Finanzierung möglich</h3>
              <p className="text-gray-400">
                Flexible Finanzierungsoptionen für Ihr Traumauto
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Separator: scrolling text ribbon 2 ── */}
      <div className="relative overflow-hidden" style={{ background: '#000000', height: '50px' }}>
        <div className="absolute inset-0 flex items-center overflow-hidden pointer-events-none">
          <div className="whitespace-nowrap flex" style={{ animation: 'marqueeLeft 35s linear infinite', animationDirection: 'reverse' }}>
            {[...Array(2)].map((_, i) => (
              <span key={i} className="text-[11px] tracking-[0.4em] uppercase font-light mx-4" style={{ color: 'rgba(220,38,38,0.15)' }}>
                Nordhessen Automobile &nbsp;—&nbsp; Ihr Partner für Premium-Fahrzeuge &nbsp;—&nbsp; Geprüfte Qualität &nbsp;—&nbsp; Faire Preise &nbsp;—&nbsp; Über 500 Fahrzeuge &nbsp;—&nbsp; Seit 2009 &nbsp;—&nbsp; Nordhessen Automobile &nbsp;—&nbsp; Ihr Partner für Premium-Fahrzeuge &nbsp;—&nbsp; Geprüfte Qualität &nbsp;—&nbsp; Faire Preise &nbsp;—&nbsp; Über 500 Fahrzeuge &nbsp;—&nbsp; Seit 2009 &nbsp;—&nbsp;
              </span>
            ))}
          </div>
        </div>
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(220,38,38,0.12), transparent)' }} />
        <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(220,38,38,0.12), transparent)' }} />
      </div>

      {/* CTA Banner */}
      <section className="py-20 text-white relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #dc2626, #ef4444)' }}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, #333333 1px, transparent 0)',
            backgroundSize: '30px 30px'
          }}></div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none" aria-hidden="true">
          <span
            className="text-[15vw] font-black uppercase tracking-widest"
            style={{
              color: 'rgba(255,255,255,0.08)',
            }}
          >
            TRAUM
          </span>
        </div>
        <div className="absolute -top-20 left-1/3 w-80 h-80 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 70%)', animation: 'glowPulse 6s ease-in-out infinite' }} />
        <div className="absolute top-10 left-[10%] w-2 h-2 rounded-full pointer-events-none" style={{ background: 'rgba(255,255,255,0.25)', animation: 'floatHorizontal 7s ease-in-out infinite' }} />
        <div className="absolute bottom-10 right-[15%] w-1.5 h-1.5 rounded-full pointer-events-none" style={{ background: 'rgba(255,255,255,0.2)', animation: 'float 8s ease-in-out infinite 2s' }} />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ihr Traumauto wartet!
          </h2>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto opacity-90">
            Erkunden Sie unsere vielfältige Auswahl an Modellen.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/fahrzeuge"
              className="inline-flex items-center justify-center px-8 py-4 rounded-lg font-bold transition-all shadow-xl hover:scale-105 duration-300"
              style={{ background: '#1f2937', color: '#ffffff', border: '1px solid rgba(255,255,255,0.15)' }}
            >
              Fahrzeuge durchsuchen
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
