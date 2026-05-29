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
  Phone,
  Mail,

  MapPin,
  CheckCircle,
  Share2,
  AlertCircle,
} from 'lucide-react';
import { carService, Car } from '../../services/carService';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import VehicleCard from '../../components/inventory/VehicleCard';
import ExpandableText from '../../components/ui/ExpandableText';
import { cn } from '../../utils/cn';
import { useLanguage } from '../../contexts/LanguageContext';

export default function CarDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [vehicle, setVehicle] = useState<Car | null>(null);
  const [similarVehicles, setSimilarVehicles] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showLightbox, setShowLightbox] = useState(false);
  const [showAllFeatures, setShowAllFeatures] = useState(false);

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
      setError('not_found');
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
            <h2 className="text-3xl font-display font-bold text-gray-100 mb-3">{t('car.error.not_found')}</h2>
            <p className="text-gray-400 mb-8 font-light">
              {t('car.error.not_found_desc')}
            </p>
            <div className="flex gap-4 justify-center">
              <Button onClick={() => navigate('/fahrzeuge')} className="bg-red-500 hover:bg-[#dc2626] text-white rounded-xl shadow-[0_0_20px_rgba(239,68,68,0.3)]">
                {t('car.error.back_to_list')}
              </Button>
              <Button variant="secondary" onClick={() => navigate('/kontakt')} className="bg-white/[0.05] hover:bg-white/[0.1] border-white/[0.1] text-gray-200 rounded-xl">
                {t('car.error.contact')}
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
              {t('nav.home')}
            </Link>
            <ChevronRight className="w-4 h-4" />
            <Link to="/fahrzeuge" className="hover:text-red-400 transition-colors">
              {t('nav.vehicles')}
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-100">{vehicle.brand} {vehicle.model}</span>
          </nav>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-2 md:py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Gallery & Details */}
            <div className="lg:col-span-2 space-y-8">
              {/* Image Gallery */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                {/* Main Image */}
                <div className="relative aspect-[4/3] md:aspect-video bg-white/[0.02] border border-white/[0.06] rounded-3xl overflow-hidden mb-4 group shadow-glass">
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
                    {vehicle.images.map((image, index) => {
                      const isHidden = index > 11;
                      const isLastVisible = index === 11;
                      const hasMoreImages = vehicle.images.length > 12;

                      if (isHidden) return null;

                      return (
                        <button
                          key={index}
                          onClick={() => {
                            setSelectedImageIndex(index);
                            // If they tap the "+X" button, pop open the lightbox immediately
                            if (isLastVisible && hasMoreImages) {
                              setShowLightbox(true);
                            }
                          }}
                          className={cn(
                            'relative aspect-video rounded-xl overflow-hidden border-2 transition-all hover:scale-105',
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
                          {/* "+X" overlay on the 12th image */}
                          {isLastVisible && hasMoreImages && (
                            <div className="absolute inset-0 bg-black/60 flex items-center justify-center backdrop-blur-sm">
                              <span className="text-white font-bold text-xl drop-shadow-md">+{vehicle.images.length - 11}</span>
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
              </motion.div>

              {/* Vehicle Title & Badges */}
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-3xl md:text-5xl font-bold text-gray-100 mb-2 tracking-tight" style={{ fontFamily: "'Inter', system-ui, -apple-system, sans-serif" }}>
                      {vehicle.title || `${vehicle.brand} ${vehicle.model}`}
                    </h1>
                    <p className="text-lg text-gray-400 font-light"><ExpandableText maxLines={2} alwaysClamp whitespace="pre-line">{vehicle.description}</ExpandableText></p>
                  </div>
                  <div className="flex gap-3">
                    <button className="w-12 h-12 bg-white/[0.03] backdrop-blur-md rounded-xl flex items-center justify-center hover:bg-white/[0.08] transition-all border border-white/[0.08] shadow-glass">
                      <Share2 className="w-5 h-5 text-gray-400 hover:text-white" />
                    </button>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {vehicle.isExclusive && (
                    <Badge variant="premium" size="md">
                      {t('car.badge.top_offer')}
                    </Badge>
                  )}
                  <Badge variant="info" size="md">
                    {t(`attr.cond.${vehicle.condition}`)}
                  </Badge>
                </div>
              </div>

              {/* Key Facts Grid */}
              <div className="relative bg-white/[0.02] backdrop-blur-xl border border-white/[0.08] rounded-3xl p-8 overflow-hidden group hover:border-white/[0.15] transition-all duration-500">
                <div className="absolute top-0 right-1/2 w-64 h-64 bg-red-500/5 rounded-full blur-3xl group-hover:bg-red-500/10 transition-all duration-500" />
                <div className="relative z-10">
                  <h2 className="text-2xl font-display font-bold text-white mb-8 flex items-center gap-3">
                    <div className="w-8 h-px bg-red-500" />
                    {t('car.data.title')}
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <FactItem
                      icon={<Calendar className="w-5 h-5" />}
                      label={t('car.data.year')}
                      value={vehicle.year.toString()}
                    />
                    <FactItem
                      icon={<Gauge className="w-5 h-5" />}
                      label={t('car.data.mileage')}
                      value={vehicle.mileageFormatted || `${vehicle.mileage.toLocaleString('de-DE')} km`}
                    />
                    <FactItem
                      icon={<Fuel className="w-5 h-5" />}
                      label={t('car.data.fuel')}
                      value={t(`attr.fuel.${vehicle.fuelType}`)}
                    />
                    <FactItem
                      icon={<Settings className="w-5 h-5" />}
                      label={t('car.data.transmission')}
                      value={t(`attr.trans.${vehicle.transmission}`)}
                    />
                    <FactItem
                      icon={<Zap className="w-5 h-5" />}
                      label={t('car.data.power')}
                      value={vehicle.powerFormatted || `${vehicle.horsePower} PS`}
                    />
                    <FactItem
                      icon={<Users className="w-5 h-5" />}
                      label={t('car.data.owners')}
                      value={vehicle.previousOwners.toString()}
                    />
                    {vehicle.exteriorColor && vehicle.exteriorColor !== 'Unknown' && (
                    <FactItem
                      icon={<Palette className="w-5 h-5" />}
                      label={t('car.data.ext_color')}
                      value={t(`attr.color.${vehicle.exteriorColor}`)}
                    />
                    )}
                    {vehicle.interiorColor && vehicle.interiorColor !== 'Unknown' && (
                    <FactItem
                      icon={<Palette className="w-5 h-5" />}
                      label={t('car.data.int_color')}
                      value={t(`attr.color.${vehicle.interiorColor}`)}
                    />
                    )}
                  </div>
                  
                  {/* Energy Efficiency & CO2 Data */}
                  {(vehicle.fuelConsumption?.combined || vehicle.co2Emission || vehicle.emissionClass) && (
                    <div className="mt-8 pt-6 border-t border-white/[0.05]">
                      <h3 className="text-sm font-semibold text-gray-300 mb-4 uppercase tracking-wider">Verbrauchs- & Emissionswerte</h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {vehicle.fuelConsumption?.combined && (
                          <div className="bg-white/[0.02] rounded-xl p-3 border border-white/[0.05]">
                            <div className="text-[10px] text-gray-500 uppercase">Verbrauch komb.</div>
                            <div className="text-sm font-bold text-gray-100">{vehicle.fuelConsumption.combined} l/100km</div>
                          </div>
                        )}
                        {vehicle.co2Emission && (
                          <div className="bg-white/[0.02] rounded-xl p-3 border border-white/[0.05]">
                            <div className="text-[10px] text-gray-500 uppercase">CO2-Emissionen</div>
                            <div className="text-sm font-bold text-gray-100">{vehicle.co2Emission} g/km</div>
                          </div>
                        )}
                        {vehicle.emissionClass && (
                          <div className="bg-white/[0.02] rounded-xl p-3 border border-white/[0.05]">
                            <div className="text-[10px] text-gray-500 uppercase">Schadstoffklasse</div>
                            <div className="text-sm font-bold text-gray-100">{vehicle.emissionClass}</div>
                          </div>
                        )}
                        {vehicle.electricityConsumption && (
                          <div className="bg-white/[0.02] rounded-xl p-3 border border-white/[0.05]">
                            <div className="text-[10px] text-gray-500 uppercase">Stromverbrauch</div>
                            <div className="text-sm font-bold text-gray-100">{vehicle.electricityConsumption} kWh/100km</div>
                          </div>
                        )}
                        {vehicle.electricRange && (
                          <div className="bg-white/[0.02] rounded-xl p-3 border border-white/[0.05]">
                            <div className="text-[10px] text-gray-500 uppercase">Elektr. Reichweite</div>
                            <div className="text-sm font-bold text-gray-100">{vehicle.electricRange} km</div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Mandatory Vehicle Disclaimers */}
                  <div className="mt-6 pt-6 border-t border-white/[0.05] space-y-2 text-xs text-gray-500 leading-relaxed font-light">
                    <p>
                      * <strong>Endpreis ohne versteckte Zusatzkosten:</strong> Liefergebühren oder ähnliche zwingende Kosten sind (sofern anwendbar) bereits im angegebenen Endpreis enthalten.
                    </p>
                    <p>
                      * <strong>Laufleistung:</strong> Sofern die hier angegebene Laufleistung nicht der tatsächlichen Gesamtlaufleistung entsprechen sollte, ist dieser Wert ausdrücklich als abgelesener Kilometerstand zu verstehen.
                    </p>
                    {vehicle.isImport && (
                      <p>
                        * <strong>Herstellerstatus:</strong> Es handelt sich bei diesem Fahrzeug um ein Importfahrzeug / nicht ursprünglich für den deutschen Markt gebautes Fahrzeug.
                      </p>
                    )}
                    <p>
                      * Im Falle von konkreten <strong>Finanzierungs- oder Leasingraten</strong> beachten Sie bitte die gesonderten Pflichtinformationen gemäß PAngV direkt beim jeweiligen Angebot.
                    </p>
                  </div>
                </div>
              </div>

              {/* Description */}
              {vehicle.description && (
                <div className="relative bg-white/[0.02] backdrop-blur-xl border border-white/[0.08] rounded-3xl p-8 overflow-hidden group hover:border-white/[0.15] transition-all duration-500">
                  <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-red-500/80 to-transparent opacity-50 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute top-0 -right-20 w-64 h-64 bg-red-500/5 rounded-full blur-3xl group-hover:bg-red-500/10 transition-all duration-500" />
                  <div className="relative z-10">
                    <h2 className="text-2xl font-display font-bold text-white mb-6 flex items-center gap-3">
                      <div className="w-8 h-px bg-red-500" />
                      {t('car.description.title')}
                    </h2>
                    <ExpandableText maxLines={2} alwaysClamp className="prose prose-invert max-w-none">
                      <p className="text-gray-300/90 leading-loose font-light text-base md:text-lg">
                        {vehicle.description}
                      </p>
                    </ExpandableText>
                  </div>
                </div>
              )}

              {/* Features */}
              {vehicle.features && vehicle.features.length > 0 && (
                <div className="relative bg-white/[0.02] backdrop-blur-xl border border-white/[0.08] rounded-3xl p-8 overflow-hidden group hover:border-white/[0.15] transition-all duration-500">
                  <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-red-500/5 rounded-full blur-3xl group-hover:bg-red-500/10 transition-all duration-500" />
                  <div className="relative z-10">
                    <h2 className="text-2xl font-display font-bold text-white mb-8 flex items-center gap-3">
                      <div className="w-8 h-px bg-red-500" />
                      {t('car.features.title')}
                    </h2>
                    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4">
                      {(showAllFeatures ? vehicle.features : vehicle.features.slice(0, 6)).map((feature, index) => (
                        <li 
                          key={index} 
                          className="flex items-start gap-4 py-3 border-b border-white/[0.05] group"
                        >
                          <div className="mt-0.5 w-6 h-6 rounded-full bg-red-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-red-500/20 group-hover:scale-110 transition-all duration-300">
                            <CheckCircle className="w-3.5 h-3.5 text-red-500 opacity-80 group-hover:opacity-100" />
                          </div>
                          <span className="text-sm font-medium text-gray-300 leading-snug pt-0.5">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    {vehicle.features.length > 6 && (
                      <div className="mt-8 flex justify-center">
                        <Button 
                          onClick={() => setShowAllFeatures(!showAllFeatures)}
                          variant="secondary"
                          className="bg-white/[0.05] hover:bg-white/[0.1] border-white/[0.1] text-gray-200 rounded-xl px-8"
                        >
                          {showAllFeatures 
                            ? (t('car.features.show_less') === 'car.features.show_less' ? 'Weniger anzeigen' : t('car.features.show_less') || 'Weniger anzeigen') 
                            : t('card.show_more')}
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - Sticky CTA */}
            <div className="lg:sticky lg:top-24 lg:self-start space-y-6">
              {/* Price Card */}
              <div className="bg-white/[0.02] backdrop-blur-xl border border-white/[0.08] rounded-3xl p-8 shadow-glass relative overflow-hidden group hover:border-white/[0.15] transition-all duration-500">
                <div className="absolute top-0 right-0 w-40 h-40 bg-red-500/10 rounded-full blur-3xl group-hover:bg-red-500/20 transition-all duration-500" />
                <div className="relative z-10">
                  <div className="text-sm text-gray-400 mb-2 font-medium tracking-wide uppercase">{t('car.price.label')}</div>
                  <div className="text-5xl font-display font-bold text-gray-100 mb-2 tracking-tight">
                    {vehicle.priceFormatted || `${vehicle.price.toLocaleString('de-DE')} €`}
                  </div>
                  {vehicle.isVatable && vehicle.netPriceFormatted && (
                    <div className="mb-6">
                      <div className="text-sm text-gray-400">
                        {vehicle.netPriceFormatted} {t('car.price.net')}
                      </div>
                      <span className="inline-flex items-center mt-1 px-2 py-1 rounded-md bg-green-500/10 text-green-400 text-xs font-semibold border border-green-500/20">
                        {t('car.price.vat_reclaimable')}
                      </span>
                    </div>
                  )}
                  {!vehicle.isVatable && <div className="mb-6" />}

                  <div className="space-y-3">
                    <a href="tel:+4956198866911" className="block w-full border-0 p-0 m-0">
                      <Button size="lg" className="w-full h-14 bg-red-500 hover:bg-[#dc2626] text-white rounded-xl shadow-[0_0_20px_rgba(239,68,68,0.3)]">
                        <Phone className="w-5 h-5 pointer-events-none" />
                        {t('car.price.call_now')}
                      </Button>
                    </a>
                    <a
                      href={`mailto:verkauf@nordhessen-automobile.de?subject=${encodeURIComponent(`Anfrage: ${vehicle.title || `${vehicle.brand} ${vehicle.model}`}`)}`}
                      className="block w-full border-0 p-0 m-0"
                    >
                      <Button
                        size="lg"
                        variant="secondary"
                        className="w-full h-14 bg-white/[0.04] hover:bg-white/[0.08] text-white border border-white/[0.12] hover:border-red-500/40 rounded-xl backdrop-blur-md"
                      >
                        <Mail className="w-5 h-5 pointer-events-none" />
                        {t('car.price.email_now')}
                      </Button>
                    </a>
                  </div>
                </div>
              </div>

              {/* Location */}
              <div className="bg-white/[0.02] backdrop-blur-xl border border-white/[0.08] rounded-3xl p-6 shadow-glass">
                <h3 className="font-display font-semibold text-gray-100 mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-red-500" />
                  {t('car.location.title')}
                </h3>
                <p className="text-gray-300 text-sm mb-1 font-semibold">Nordhessen-Automobile</p>
                <p className="text-gray-400 text-sm mb-2">Seidler und Osmikhovski GbR</p>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Sandershäuser Straße 87a<br />
                  34123 Kassel
                </p>
              </div>
            </div>
          </div>

          {/* Similar Vehicles */}
          {similarVehicles.length > 0 && (
            <div className="mt-16 mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-100 mb-8">{t('car.similar.title')}</h2>
              <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {similarVehicles.map((car) => (
                  <VehicleCard
                    key={car.id}
                    id={car.id}
                    make={car.brand}
                    model={car.model}
                    title={car.title || `${car.brand} ${car.model}`}
                    price={{
                      amount: car.price,
                      formatted: car.priceFormatted || `${car.price.toLocaleString('de-DE')} €`,
                    }}
                    netPrice={car.netPrice}
                    netPriceFormatted={car.netPriceFormatted}
                    isVatable={car.isVatable}
                    mileage={{
                      formatted: car.mileageFormatted || `${car.mileage.toLocaleString('de-DE')} km`,
                    }}
                    firstRegistration={`${car.year}-01-01`}
                    power={{
                      formatted: car.powerFormatted || `${car.horsePower} PS`,
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
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[999] bg-black/95 backdrop-blur-xl flex items-center justify-center">
              <button
                onClick={() => setShowLightbox(false)}
                className="absolute top-4 right-4 md:top-6 md:right-6 w-12 h-12 md:w-14 md:h-14 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/20 transition-all border border-white/20 hover:scale-110 z-50 cursor-pointer"
              >
                <X className="w-6 h-6 text-white" />
              </button>

              {vehicle.images.length > 1 && (
                <button
                  onClick={prevImage}
                  className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 w-10 h-10 md:w-14 md:h-14 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/20 transition-all border border-white/20 hover:scale-110 z-50 cursor-pointer"
                >
                  <ChevronLeft className="w-6 h-6 md:w-8 md:h-8 text-white mr-1" />
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
                className="w-[100vw] md:w-[90vw] h-[100vh] md:h-[90vh] object-contain drop-shadow-2xl"
              />

              {vehicle.images.length > 1 && (
                <button
                  onClick={nextImage}
                  className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 w-10 h-10 md:w-14 md:h-14 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/20 transition-all border border-white/20 hover:scale-110 z-50 cursor-pointer"
                >
                  <ChevronRight className="w-6 h-6 md:w-8 md:h-8 text-white ml-1" />
                </button>
              )}

              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-6 py-3 bg-white/10 backdrop-blur-md rounded-2xl text-white font-medium tracking-widest border border-white/20 text-sm md:text-base z-50">
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
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.04] hover:border-white/[0.1] transition-all duration-300 group overflow-hidden">
      <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center flex-shrink-0 text-red-500 group-hover:scale-110 group-hover:bg-red-500/20 transition-all duration-300">
        {icon}
      </div>
      <div className="min-w-0 pr-1">
        <div className="text-[9px] sm:text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1 truncate">{label}</div>
        <div className="text-[13px] sm:text-sm font-bold text-gray-100 break-words leading-tight">{value}</div>
      </div>
    </div>
  );
}
