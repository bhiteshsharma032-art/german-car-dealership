import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  X,
  Calendar,
  Gauge,
  Fuel,
  Settings,
  Zap,
  Users,
  Palette,
  Shield,
  Phone,
  Mail,

  MapPin,
  CheckCircle,
  Heart,
  Share2,
  AlertCircle,
} from 'lucide-react';
import { carService, Car } from '../../services/carService';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import VehicleCard from '../../components/inventory/VehicleCard';
import { cn } from '../../utils/cn';

export default function CarDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [vehicle, setVehicle] = useState<Car | null>(null);
  const [similarVehicles, setSimilarVehicles] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showLightbox, setShowLightbox] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (id) {
      loadVehicle(id);
      loadSimilarVehicles(id);
    }
  }, [id]);

  const loadVehicle = async (vehicleId: string) => {
    setLoading(true);
    setError(null);

    try {
      const car = await carService.getCarById(vehicleId);
      setVehicle(car);
    } catch (err) {
      console.error('Error loading vehicle:', err);
      setError('Fahrzeug nicht gefunden');
    } finally {
      setLoading(false);
    }
  };

  const loadSimilarVehicles = async (vehicleId: string) => {
    try {
      const similar = await carService.getSimilarCars(vehicleId);
      setSimilarVehicles(similar);
    } catch (err) {
      console.error('Error loading similar vehicles:', err);
    }
  };

  const nextImage = () => {
    if (vehicle && vehicle.images.length > 0) {
      setSelectedImageIndex((prev) => (prev + 1) % vehicle.images.length);
    }
  };

  const prevImage = () => {
    if (vehicle && vehicle.images.length > 0) {
      setSelectedImageIndex((prev) => (prev - 1 + vehicle.images.length) % vehicle.images.length);
    }
  };



  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen bg-[#1a1a1f] pt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-8 w-64 bg-white/[0.05] rounded mb-8"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="aspect-video bg-white/[0.05] rounded-3xl mb-4"></div>
                <div className="grid grid-cols-4 gap-2">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="aspect-video bg-white/[0.05] rounded-xl"></div>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <div className="h-12 bg-white/[0.05] rounded-xl"></div>
                <div className="h-32 bg-white/[0.05] rounded-2xl"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error State
  if (error || !vehicle) {
    return (
      <div className="min-h-screen bg-[#1a1a1f] pt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <Card variant="elevated" className="max-w-2xl mx-auto p-10 text-center border border-white/[0.08] bg-white/[0.02] backdrop-blur-xl">
            <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-6" />
            <h2 className="text-3xl font-display font-bold text-gray-100 mb-3">Fahrzeug nicht gefunden</h2>
            <p className="text-gray-400 mb-8 font-light">
              Das gesuchte Fahrzeug ist nicht verfügbar oder wurde bereits verkauft.
            </p>
            <div className="flex gap-4 justify-center">
              <Button onClick={() => navigate('/fahrzeuge')} className="bg-red-500 hover:bg-[#dc2626] text-white rounded-xl shadow-[0_0_20px_rgba(239,68,68,0.3)]">
                Zur Fahrzeugübersicht
              </Button>
              <Button variant="secondary" onClick={() => navigate('/kontakt')} className="bg-white/[0.05] hover:bg-white/[0.1] border-white/[0.1] text-gray-200 rounded-xl">
                Kontakt aufnehmen
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{`${vehicle.brand} ${vehicle.model} - Nordhessen Automobile`}</title>
        <meta name="description" content={vehicle.description} />
      </Helmet>

      <div className="min-h-screen bg-[#1a1a1f] pt-20">
        {/* Breadcrumb */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center gap-2 text-sm text-gray-500">
            <Link to="/" className="hover:text-red-400 transition-colors">
              Startseite
            </Link>
            <ChevronRight className="w-4 h-4" />
            <Link to="/fahrzeuge" className="hover:text-red-400 transition-colors">
              Fahrzeuge
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-100">{vehicle.brand} {vehicle.model}</span>
          </nav>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Gallery & Details */}
            <div className="lg:col-span-2 space-y-8">
              {/* Image Gallery */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                {/* Main Image */}
                <div className="relative aspect-video bg-white/[0.02] border border-white/[0.06] rounded-3xl overflow-hidden mb-4 group shadow-glass">
                  {vehicle.images && vehicle.images.length > 0 ? (
                    <>
                      <AnimatePresence mode="wait">
                        <motion.img
                          key={selectedImageIndex}
                          src={vehicle.images[selectedImageIndex]}
                          alt={`${vehicle.brand} ${vehicle.model}`}
                          initial={{ opacity: 0, scale: 0.98 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="w-full h-full object-contain cursor-zoom-in bg-black/60 backdrop-blur-sm"
                          onClick={() => setShowLightbox(true)}
                        />
                      </AnimatePresence>
                      
                      {/* Navigation Arrows */}
                      {vehicle.images.length > 1 && (
                        <>
                          <button
                            onClick={prevImage}
                            className="absolute left-6 top-1/2 -translate-y-1/2 w-14 h-14 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-black/60 hover:scale-110 border border-white/10 transition-all opacity-0 group-hover:opacity-100 shadow-xl"
                          >
                            <ChevronLeft className="w-8 h-8 text-white mr-1" />
                          </button>
                          <button
                            onClick={nextImage}
                            className="absolute right-6 top-1/2 -translate-y-1/2 w-14 h-14 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-black/60 hover:scale-110 border border-white/10 transition-all opacity-0 group-hover:opacity-100 shadow-xl"
                          >
                            <ChevronRight className="w-8 h-8 text-white ml-1" />
                          </button>
                        </>
                      )}

                      {/* Image Counter */}
                      <div className="absolute bottom-6 right-6 px-4 py-2 bg-black/50 backdrop-blur-md rounded-xl text-white text-sm font-medium tracking-widest border border-white/10 shadow-lg">
                        {selectedImageIndex + 1} / {vehicle.images.length}
                      </div>
                    </>
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <svg className="w-24 h-24 text-gray-500/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 17H4C3.44772 17 3 16.5523 3 16V12L5.4 6.8C5.55 6.3 6 6 6.5 6H17.5C18 6 18.45 6.3 18.6 6.8L21 12V16C21 16.5523 20.5523 17 20 17H19M5 17C5 18.1046 5.89543 19 7 19C8.10457 19 9 18.1046 9 17M5 17C5 15.8954 5.89543 15 7 15C8.10457 15 9 15.8954 9 17M19 17C19 18.1046 18.1046 19 17 19C15.8954 19 15 18.1046 15 17M19 17C19 15.8954 18.1046 15 17 15C15.8954 15 15 15.8954 15 17M9 17H15" />
                      </svg>
                    </div>
                  )}
                </div>

                {/* Thumbnail Grid */}
                {vehicle.images && vehicle.images.length > 1 && (
                  <div className="grid grid-cols-4 md:grid-cols-6 gap-3">
                    {vehicle.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImageIndex(index)}
                        className={cn(
                          'aspect-video rounded-xl overflow-hidden border-2 transition-all hover:scale-105',
                          selectedImageIndex === index
                            ? 'border-[#ef4444] shadow-glow-red'
                            : 'border-transparent opacity-60 hover:opacity-100 hover:border-white/20'
                        )}
                      >
                        <img
                          src={image}
                          alt={`${vehicle.brand} ${vehicle.model} - Bild ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </motion.div>

              {/* Vehicle Title & Badges */}
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-3xl md:text-5xl font-display font-bold text-gray-100 mb-2 tracking-tight">
                      {vehicle.brand} <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ef4444] to-[#f87171]">{vehicle.model}</span>
                    </h1>
                    <p className="text-lg text-gray-400 font-light">{vehicle.description}</p>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setIsFavorite(!isFavorite)}
                      className="w-12 h-12 bg-white/[0.03] backdrop-blur-md rounded-xl flex items-center justify-center hover:bg-white/[0.08] transition-all border border-white/[0.08] shadow-glass"
                    >
                      <Heart
                        className={cn(
                          'w-5 h-5 transition-colors',
                          isFavorite ? 'text-red-500 fill-[#ef4444] drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]' : 'text-gray-400'
                        )}
                      />
                    </button>
                    <button className="w-12 h-12 bg-white/[0.03] backdrop-blur-md rounded-xl flex items-center justify-center hover:bg-white/[0.08] transition-all border border-white/[0.08] shadow-glass">
                      <Share2 className="w-5 h-5 text-gray-400 hover:text-white" />
                    </button>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {vehicle.isExclusive && (
                    <Badge variant="premium" size="md">
                      Top Angebot
                    </Badge>
                  )}
                  {vehicle.warranty && (
                    <Badge variant="success" size="md">
                      <Shield className="w-4 h-4" />
                      Garantie inklusive
                    </Badge>
                  )}
                  <Badge variant="info" size="md">
                    {vehicle.condition}
                  </Badge>
                </div>
              </div>

              {/* Key Facts Grid */}
              <Card variant="elevated">
                <div className="p-6">
                  <h2 className="text-xl font-bold text-gray-100 mb-6">Fahrzeugdaten</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    <FactItem
                      icon={<Calendar className="w-5 h-5" />}
                      label="Erstzulassung"
                      value={vehicle.year.toString()}
                    />
                    <FactItem
                      icon={<Gauge className="w-5 h-5" />}
                      label="Kilometerstand"
                      value={`${vehicle.mileage.toLocaleString('de-DE')} km`}
                    />
                    <FactItem
                      icon={<Fuel className="w-5 h-5" />}
                      label="Kraftstoff"
                      value={vehicle.fuelType}
                    />
                    <FactItem
                      icon={<Settings className="w-5 h-5" />}
                      label="Getriebe"
                      value={vehicle.transmission}
                    />
                    <FactItem
                      icon={<Zap className="w-5 h-5" />}
                      label="Leistung"
                      value={`${vehicle.horsePower} PS`}
                    />
                    <FactItem
                      icon={<Users className="w-5 h-5" />}
                      label="Vorbesitzer"
                      value={vehicle.previousOwners.toString()}
                    />
                    <FactItem
                      icon={<Palette className="w-5 h-5" />}
                      label="Außenfarbe"
                      value={vehicle.exteriorColor}
                    />
                    <FactItem
                      icon={<Palette className="w-5 h-5" />}
                      label="Innenausstattung"
                      value={vehicle.interiorColor}
                    />
                    <FactItem
                      icon={<Shield className="w-5 h-5" />}
                      label="Garantie"
                      value={vehicle.warranty ? `${vehicle.warrantyMonths || 12} Monate` : 'Keine'}
                    />
                  </div>
                </div>
              </Card>

              {/* Description */}
              {vehicle.description && (
                <Card variant="elevated">
                  <div className="p-6">
                    <h2 className="text-xl font-bold text-gray-100 mb-4">Beschreibung</h2>
                    <p className="text-gray-400 leading-relaxed whitespace-pre-line">
                      {vehicle.description}
                    </p>
                  </div>
                </Card>
              )}

              {/* Features */}
              {vehicle.features && vehicle.features.length > 0 && (
                <Card variant="elevated">
                  <div className="p-6">
                    <h2 className="text-xl font-bold text-gray-100 mb-4">Ausstattung</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {vehicle.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2 text-gray-400">
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              )}
            </div>

            {/* Right Column - Sticky CTA */}
            <div className="lg:sticky lg:top-24 lg:self-start space-y-6">
              {/* Price Card */}
              <div className="bg-white/[0.02] backdrop-blur-xl border border-white/[0.08] rounded-3xl p-8 shadow-glass relative overflow-hidden group hover:border-white/[0.15] transition-all duration-500">
                <div className="absolute top-0 right-0 w-40 h-40 bg-red-500/10 rounded-full blur-3xl group-hover:bg-red-500/20 transition-all duration-500" />
                <div className="relative z-10">
                  <div className="text-sm text-gray-400 mb-2 font-medium tracking-wide uppercase">Preis</div>
                  <div className="text-5xl font-display font-bold text-gray-100 mb-8 tracking-tight">
                    {vehicle.price.toLocaleString('de-DE')} €
                  </div>

                  <div className="space-y-4">
                    <a href="tel:+4956193004649" className="block w-full border-0 p-0 m-0">
                      <Button size="lg" className="w-full h-14 bg-red-500 hover:bg-[#dc2626] text-white rounded-xl shadow-[0_0_20px_rgba(239,68,68,0.3)]">
                        <Phone className="w-5 h-5 pointer-events-none" />
                        Jetzt anrufen
                      </Button>
                    </a>
                  </div>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="bg-white/[0.02] backdrop-blur-xl border border-white/[0.08] rounded-3xl p-6 shadow-glass hover:border-white/[0.15] transition-all duration-500">
                <div className="space-y-5">
                  <div className="flex items-center gap-4 group cursor-default">
                    <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center group-hover:scale-110 transition-all duration-300">
                      <CheckCircle className="w-5 h-5 text-red-500" />
                    </div>
                    <span className="text-sm text-gray-300 font-medium">Geprüfte Qualität</span>
                  </div>
                  <div className="flex items-center gap-4 group cursor-default">
                    <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center group-hover:scale-110 transition-all duration-300">
                      <Shield className="w-5 h-5 text-red-500" />
                    </div>
                    <span className="text-sm text-gray-300 font-medium">Garantie inklusive</span>
                  </div>
                  <div className="flex items-center gap-4 group cursor-default">
                    <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center group-hover:scale-110 transition-all duration-300">
                      <CheckCircle className="w-5 h-5 text-red-500" />
                    </div>
                    <span className="text-sm text-gray-300 font-medium">Faire Preise</span>
                  </div>
                </div>
              </div>

              {/* Location */}
              <div className="bg-white/[0.02] backdrop-blur-xl border border-white/[0.08] rounded-3xl p-6 shadow-glass">
                <h3 className="font-display font-semibold text-gray-100 mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-red-500" />
                  Standort
                </h3>
                <p className="text-gray-300 text-sm mb-2 font-medium">Nordhessen-Automobile Seidler & Osmikhovsky GbR</p>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Sandershäuser Straße 87a<br />
                  34123 Kassel
                </p>
              </div>
            </div>
          </div>

          {/* Similar Vehicles */}
          {similarVehicles.length > 0 && (
            <div className="mt-16">
              <h2 className="text-3xl font-bold text-gray-100 mb-8">Ähnliche Fahrzeuge</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {similarVehicles.map((car) => (
                  <VehicleCard
                    key={car.id}
                    id={car.id}
                    make={car.brand}
                    model={car.model}
                    title={`${car.brand} ${car.model}`}
                    price={{
                      amount: car.price,
                      formatted: `${car.price.toLocaleString('de-DE')} €`,
                    }}
                    mileage={{
                      formatted: `${car.mileage.toLocaleString('de-DE')} km`,
                    }}
                    firstRegistration={`${car.year}-01-01`}
                    power={{
                      formatted: `${car.horsePower} PS`,
                    }}
                    fuelType={car.fuelType}
                    transmission={car.transmission}
                    image={car.images[0]}
                    images={car.images}
                    isExclusive={car.isExclusive}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Lightbox */}
        <AnimatePresence>
          {showLightbox && vehicle.images && vehicle.images.length > 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center">
              <button
                onClick={() => setShowLightbox(false)}
                className="absolute top-6 right-6 w-14 h-14 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/20 transition-all border border-white/20 hover:scale-110"
              >
                <X className="w-6 h-6 text-white" />
              </button>

              {vehicle.images.length > 1 && (
                <button
                  onClick={prevImage}
                  className="absolute left-6 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/20 transition-all border border-white/20 hover:scale-110"
                >
                  <ChevronLeft className="w-8 h-8 text-white mr-1" />
                </button>
              )}

              <motion.img
                key={selectedImageIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                src={vehicle.images[selectedImageIndex]}
                alt={`${vehicle.brand} ${vehicle.model}`}
                className="max-w-[90vw] max-h-[90vh] object-contain drop-shadow-2xl"
              />

              {vehicle.images.length > 1 && (
                <button
                  onClick={nextImage}
                  className="absolute right-6 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/20 transition-all border border-white/20 hover:scale-110"
                >
                  <ChevronRight className="w-8 h-8 text-white ml-1" />
                </button>
              )}

              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-6 py-3 bg-white/10 backdrop-blur-md rounded-2xl text-white font-medium tracking-widest border border-white/20">
                {selectedImageIndex + 1} / {vehicle.images.length}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

interface FactItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

function FactItem({ icon, label, value }: FactItemProps) {
  return (
    <div>
      <div className="flex items-center gap-2 text-gray-500 mb-1">
        {icon}
        <span className="text-sm">{label}</span>
      </div>
      <div className="text-gray-100 font-semibold">{value}</div>
    </div>
  );
}
