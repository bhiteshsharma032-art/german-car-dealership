import { Link } from 'react-router-dom';
import { Calendar, Gauge, Fuel, Settings, MapPin } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';
import { useLanguage } from '../../contexts/LanguageContext';

interface VehicleCardProps {
  id: string;
  make: string;
  model: string;
  title: string;
  price: {
    amount: number;
    formatted: string;
  };
  netPrice?: number | null;
  netPriceFormatted?: string | null;
  isVatable?: boolean;
  mileage?: {
    formatted: string;
  };
  firstRegistration?: string;
  power?: {
    formatted: string;
  };
  fuelType?: string;
  transmission?: string;
  image?: string;
  images?: string[];
  location?: {
    city: string;
  };
  isNew?: boolean;
  isExclusive?: boolean;
  hasFinancing?: boolean;
  viewMode?: 'grid' | 'list';
}

export default function VehicleCard({
  id,
  title,
  price,
  netPriceFormatted,
  isVatable,
  mileage,
  firstRegistration,
  fuelType,
  transmission,
  image,
  images,
  location,
  viewMode = 'grid',
}: VehicleCardProps) {
  const { t } = useLanguage();
  const [imageError, setImageError] = useState(false);

  const displayImage = image || (images && images[0]);
  const year = firstRegistration ? new Date(firstRegistration).getFullYear() : null;

  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
      className={cn(
        "group relative overflow-hidden flex h-full rounded-[2rem] backdrop-blur-2xl transition-all duration-300",
        viewMode === 'list' ? "flex-col sm:flex-row" : "flex-col",
        "bg-white/[0.02] border border-white/[0.06] hover:border-red-500/40",
        "hover:scale-[1.02] hover:shadow-2xl hover:shadow-red-500/10"
      )}
      style={{
        boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
      }}
    >
      {/* Glossy Sheen overlay */}
      <div className="absolute inset-0 z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-br from-white/[0.05] via-transparent to-transparent" />
      
      {/* Animated glowing border effect */}
      <div className="absolute inset-0 border border-transparent group-hover:border-red-500/30 rounded-[2rem] transition-colors duration-500 z-20 pointer-events-none" />

      {/* Hover background glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-0 rounded-[2rem] bg-gradient-to-tr from-red-500/5 to-transparent" />

      {/* Image */}
      <Link to={`/fahrzeug/${id}`} className={cn(
        "block relative overflow-hidden shrink-0",
        viewMode === 'list' ? "w-full sm:w-[45%] lg:w-[45%] xl:w-[45%] h-64 sm:h-auto min-h-[240px]" : "aspect-[16/10]"
      )}>
        {displayImage && !imageError ? (
          <motion.img
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
            src={displayImage}
            alt={title}
            className="w-full h-full object-cover"
            loading="lazy"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-[#12121c] to-[#1a1a1f] border border-white/[0.05] rounded-[2rem]">
            <img src="/logo.png?v=3" alt="Nordhessen Automobile" className="h-16 mb-4 opacity-50 grayscale" />
            <span className="text-gray-500 font-medium text-sm tracking-widest uppercase">{t('card.images_soon')}</span>
          </div>
        )}

        {/* Bottom Gradient */}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#22222a] to-transparent z-[1]" />
      </Link>

      {/* Content */}
      <div className={cn(
        "p-5 flex flex-col flex-1 relative z-10",
        viewMode === 'list' && "justify-between"
      )}>
        {/* Title */}
        <Link to={`/fahrzeug/${id}`}>
          <h3 className="text-base font-display font-bold text-white mb-1 leading-snug min-h-[2.75rem] group-hover:text-red-400 transition-colors duration-300">
            {title}
          </h3>
        </Link>

        {/* Location */}
        {location?.city && (
          <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-3">
            <MapPin className="h-3 w-3" />
            <span>{location.city}</span>
          </div>
        )}

        {/* Price */}
        <div className={cn("mb-4", viewMode === 'list' && "mt-auto pt-2")}>
          <div className="text-2xl font-display font-bold text-white">
            {price.formatted}
          </div>
          {isVatable && netPriceFormatted && (
            <div className="text-xs text-gray-400 mt-1">
              <span className="text-gray-500">{netPriceFormatted} {t('car.price.net')}</span>
              <span className="ml-1.5 inline-flex items-center px-1.5 py-0.5 rounded bg-green-500/10 text-green-400 text-[10px] font-semibold border border-green-500/20">
                {t('car.price.vat_reclaimable')}
              </span>
            </div>
          )}
        </div>

        {/* Key Specs */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-2 mb-5 pb-5 border-b border-white/[0.04]">
          {year && (
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-white/[0.03] border border-white/[0.06] flex items-center justify-center flex-shrink-0">
                <Calendar className="h-3.5 w-3.5 text-gray-500" />
              </div>
              <div>
                <div className="text-[10px] text-gray-500 uppercase tracking-wider">{t('card.year')}</div>
                <div className="text-xs font-semibold text-gray-200">{year}</div>
              </div>
            </div>
          )}

          {mileage?.formatted && (
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-white/[0.03] border border-white/[0.06] flex items-center justify-center flex-shrink-0">
                <Gauge className="h-3.5 w-3.5 text-gray-500" />
              </div>
              <div>
                <div className="text-[10px] text-gray-500 uppercase tracking-wider">{t('card.km')}</div>
                <div className="text-xs font-semibold text-gray-200 truncate">{mileage.formatted}</div>
              </div>
            </div>
          )}

          {fuelType && (
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-white/[0.03] border border-white/[0.06] flex items-center justify-center flex-shrink-0">
                <Fuel className="h-3.5 w-3.5 text-gray-500" />
              </div>
              <div>
                <div className="text-[10px] text-gray-500 uppercase tracking-wider">{t('card.fuel')}</div>
                <div className="text-xs font-semibold text-gray-200 truncate">{t(`attr.fuel.${fuelType}`)}</div>
              </div>
            </div>
          )}

          {transmission && (
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-white/[0.03] border border-white/[0.06] flex items-center justify-center flex-shrink-0">
                <Settings className="h-3.5 w-3.5 text-gray-500" />
              </div>
              <div>
                <div className="text-[10px] text-gray-500 uppercase tracking-wider">{t('card.gearbox')}</div>
                <div className="text-xs font-semibold text-gray-200 truncate">{t(`attr.trans.${transmission}`)}</div>
              </div>
            </div>
          )}
        </div>

        {/* CTA */}
        <Link
          to={`/fahrzeug/${id}`}
          className="flex items-center justify-center w-full py-3 text-gray-300 bg-white/[0.03] border border-white/[0.08] rounded-xl font-semibold text-sm transition-all duration-300 hover:bg-red-500 hover:text-white hover:border-red-500 hover:shadow-[0_0_20px_rgba(239,68,68,0.3)] group/btn"
        >
          <span className="group-hover/btn:tracking-wider transition-all duration-300">{t('card.details')}</span>
        </Link>
      </div>
    </motion.article>
  );
}
