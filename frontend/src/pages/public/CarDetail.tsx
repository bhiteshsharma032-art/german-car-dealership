import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
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
  MessageCircle,
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

  const estimatedMonthly = vehicle ? Math.round((vehicle.price * 0.02) / 12) : 0;

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen bg-[#171717] pt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-8 w-64 bg-zinc-800 rounded mb-8"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="aspect-video bg-zinc-800 rounded-xl mb-4"></div>
                <div className="grid grid-cols-4 gap-2">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="aspect-video bg-zinc-800 rounded-lg"></div>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <div className="h-12 bg-zinc-800 rounded"></div>
                <div className="h-32 bg-zinc-800 rounded"></div>
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
      <div className="min-h-screen bg-[#171717] pt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <Card variant="elevated" className="max-w-2xl mx-auto p-8 text-center">
            <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">Fahrzeug nicht gefunden</h2>
            <p className="text-gray-400 mb-6">
              Das gesuchte Fahrzeug ist nicht verfügbar oder wurde bereits verkauft.
            </p>
            <div className="flex gap-4 justify-center">
              <Button onClick={() => navigate('/fahrzeuge')}>
                Zur Fahrzeugübersicht
              </Button>
              <Button variant="secondary" onClick={() => navigate('/kontakt')}>
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

      <div className="min-h-screen bg-[#171717] pt-20">
        {/* Breadcrumb */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center gap-2 text-sm text-gray-400">
            <Link to="/" className="hover:text-white transition-colors">
              Startseite
            </Link>
            <ChevronRight className="w-4 h-4" />
            <Link to="/fahrzeuge" className="hover:text-white transition-colors">
              Fahrzeuge
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white">{vehicle.brand} {vehicle.model}</span>
          </nav>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Gallery & Details */}
            <div className="lg:col-span-2 space-y-8">
              {/* Image Gallery */}
              <div>
                {/* Main Image */}
                <div className="relative aspect-video bg-zinc-900 rounded-xl overflow-hidden mb-4 group">
                  {vehicle.images && vehicle.images.length > 0 ? (
                    <>
                      <img
                        src={vehicle.images[selectedImageIndex]}
                        alt={`${vehicle.brand} ${vehicle.model}`}
                        className="w-full h-full object-cover cursor-zoom-in"
                        onClick={() => setShowLightbox(true)}
                      />
                      
                      {/* Navigation Arrows */}
                      {vehicle.images.length > 1 && (
                        <>
                          <button
                            onClick={prevImage}
                            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-black/80 transition-all opacity-0 group-hover:opacity-100"
                          >
                            <ChevronLeft className="w-6 h-6 text-white" />
                          </button>
                          <button
                            onClick={nextImage}
                            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-black/80 transition-all opacity-0 group-hover:opacity-100"
                          >
                            <ChevronRight className="w-6 h-6 text-white" />
                          </button>
                        </>
                      )}

                      {/* Image Counter */}
                      <div className="absolute bottom-4 right-4 px-3 py-1.5 bg-black/60 backdrop-blur-sm rounded-lg text-white text-sm">
                        {selectedImageIndex + 1} / {vehicle.images.length}
                      </div>
                    </>
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <svg className="w-24 h-24 text-zinc-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 17H4C3.44772 17 3 16.5523 3 16V12L5.4 6.8C5.55 6.3 6 6 6.5 6H17.5C18 6 18.45 6.3 18.6 6.8L21 12V16C21 16.5523 20.5523 17 20 17H19M5 17C5 18.1046 5.89543 19 7 19C8.10457 19 9 18.1046 9 17M5 17C5 15.8954 5.89543 15 7 15C8.10457 15 9 15.8954 9 17M19 17C19 18.1046 18.1046 19 17 19C15.8954 19 15 18.1046 15 17M19 17C19 15.8954 18.1046 15 17 15C15.8954 15 15 15.8954 15 17M9 17H15" />
                      </svg>
                    </div>
                  )}
                </div>

                {/* Thumbnail Grid */}
                {vehicle.images && vehicle.images.length > 1 && (
                  <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
                    {vehicle.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImageIndex(index)}
                        className={cn(
                          'aspect-video rounded-lg overflow-hidden border-2 transition-all',
                          selectedImageIndex === index
                            ? 'border-red-500'
                            : 'border-transparent hover:border-zinc-600'
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
              </div>

              {/* Vehicle Title & Badges */}
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                      {vehicle.brand} {vehicle.model}
                    </h1>
                    <p className="text-lg text-gray-400">{vehicle.description}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setIsFavorite(!isFavorite)}
                      className="w-12 h-12 bg-[#1a1a1a] rounded-lg flex items-center justify-center hover:bg-zinc-800 transition-all border border-zinc-700"
                    >
                      <Heart
                        className={cn(
                          'w-5 h-5 transition-colors',
                          isFavorite ? 'text-red-500 fill-red-500' : 'text-gray-400'
                        )}
                      />
                    </button>
                    <button className="w-12 h-12 bg-[#1a1a1a] rounded-lg flex items-center justify-center hover:bg-zinc-800 transition-all border border-zinc-700">
                      <Share2 className="w-5 h-5 text-gray-400" />
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
                  <h2 className="text-xl font-bold text-white mb-6">Fahrzeugdaten</h2>
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
                    <h2 className="text-xl font-bold text-white mb-4">Beschreibung</h2>
                    <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                      {vehicle.description}
                    </p>
                  </div>
                </Card>
              )}

              {/* Features */}
              {vehicle.features && vehicle.features.length > 0 && (
                <Card variant="elevated">
                  <div className="p-6">
                    <h2 className="text-xl font-bold text-white mb-4">Ausstattung</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {vehicle.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2 text-gray-300">
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
              <Card variant="elevated">
                <div className="p-6">
                  <div className="text-sm text-gray-400 mb-1">Preis</div>
                  <div className="text-4xl font-bold text-white mb-4">
                    {vehicle.price.toLocaleString('de-DE')} €
                  </div>
                  <div className="text-sm text-gray-400 mb-6">
                    ab <span className="text-white font-semibold text-lg">{estimatedMonthly} €/Monat</span>
                  </div>

                  <div className="space-y-3">
                    <Button size="lg" className="w-full">
                      <Phone className="w-5 h-5" />
                      Jetzt anrufen
                    </Button>
                    <Button variant="secondary" size="lg" className="w-full">
                      <Mail className="w-5 h-5" />
                      Anfrage senden
                    </Button>
                    <Button variant="outline" size="lg" className="w-full">
                      <MessageCircle className="w-5 h-5" />
                      WhatsApp
                    </Button>
                  </div>
                </div>
              </Card>

              {/* Quick Actions */}
              <Card variant="elevated">
                <div className="p-6 space-y-3">
                  <h3 className="font-semibold text-white mb-4">Weitere Optionen</h3>
                  <button className="w-full text-left px-4 py-3 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-white transition-all">
                    💰 Finanzierung anfragen
                  </button>
                  <button className="w-full text-left px-4 py-3 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-white transition-all">
                    🔄 Inzahlungnahme anfragen
                  </button>
                </div>
              </Card>

              {/* Trust Badges */}
              <Card variant="elevated">
                <div className="p-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-sm text-gray-300">Geprüfte Qualität</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Shield className="w-5 h-5 text-green-500" />
                    <span className="text-sm text-gray-300">Garantie inklusive</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-sm text-gray-300">Faire Preise</span>
                  </div>
                </div>
              </Card>

              {/* Location */}
              <Card variant="elevated">
                <div className="p-6">
                  <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-red-500" />
                    Standort
                  </h3>
                  <p className="text-gray-300 text-sm mb-2">Nordhessen-Automobile Seidler & Osmikhovsky GbR</p>
                  <p className="text-gray-400 text-sm">
                    Sandershäuser Straße 87a<br />
                    34123 Kassel
                  </p>
                </div>
              </Card>
            </div>
          </div>

          {/* Similar Vehicles */}
          {similarVehicles.length > 0 && (
            <div className="mt-16">
              <h2 className="text-3xl font-bold text-white mb-8">Ähnliche Fahrzeuge</h2>
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
        {showLightbox && vehicle.images && vehicle.images.length > 0 && (
          <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center">
            <button
              onClick={() => setShowLightbox(false)}
              className="absolute top-4 right-4 w-12 h-12 bg-[#1a1a1a]/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-[#1a1a1a]/20 transition-all"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-[#1a1a1a]/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-[#1a1a1a]/20 transition-all"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>

            <img
              src={vehicle.images[selectedImageIndex]}
              alt={`${vehicle.brand} ${vehicle.model}`}
              className="max-w-[90vw] max-h-[90vh] object-contain"
            />

            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-[#1a1a1a]/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-[#1a1a1a]/20 transition-all"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-[#1a1a1a]/10 backdrop-blur-sm rounded-lg text-white">
              {selectedImageIndex + 1} / {vehicle.images.length}
            </div>
          </div>
        )}
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
      <div className="flex items-center gap-2 text-gray-400 mb-1">
        {icon}
        <span className="text-sm">{label}</span>
      </div>
      <div className="text-white font-semibold">{value}</div>
    </div>
  );
}
