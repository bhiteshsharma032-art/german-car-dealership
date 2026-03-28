import { Link } from 'react-router-dom';
import { Heart, Calendar, Gauge, Fuel, Settings, MapPin } from 'lucide-react';
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
  const [isFavorite, setIsFavorite] = useState(false);
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
      <div className="absolute inset-0 z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-br from-white/[0.1] via-transparent to-transparent" />
      
      {/* Animated glowing top border */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-red-500/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-20 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform" style={{ transitionDuration: '1.5s' }} />

      {/* Hover background glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-0 rounded-[2rem]"
        style={{
          background: 'radial-gradient(800px circle at var(--mouse-x, 50%) var(--mouse-y, 0%), rgba(239,68,68,0.08), transparent 60%)',
        }}
      />

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
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#12121c] to-[#22222a]">
            <svg className="w-16 h-16 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M5 17H4C3.44772 17 3 16.5523 3 16V12L5.4 6.8C5.55 6.3 6 6 6.5 6H17.5C18 6 18.45 6.3 18.6 6.8L21 12V16C21 16.5523 20.5523 17 20 17H19M5 17C5 18.1046 5.89543 19 7 19C8.10457 19 9 18.1046 9 17M5 17C5 15.8954 5.89543 15 7 15C8.10457 15 9 15.8954 9 17M19 17C19 18.1046 18.1046 19 17 19C15.8954 19 15 18.1046 15 17M19 17C19 15.8954 18.1046 15 17 15C15.8954 15 15 15.8954 15 17M9 17H15" />
            </svg>
          </div>
        )}

        {/* No badges */}

        {/* Favorite Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            setIsFavorite(!isFavorite);
          }}
          className="absolute top-3 right-3 w-9 h-9 bg-black/40 backdrop-blur-md rounded-xl flex items-center justify-center hover:bg-black/60 transition-all z-10 border border-white/[0.06]"
          aria-label="Zu Favoriten hinzufügen"
        >
          <Heart
            className={cn(
              'h-4 w-4 transition-all duration-300',
              isFavorite ? 'text-red-500 fill-red-500 scale-110' : 'text-white/70'
            )}
          />
        </button>

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
          <h3 className="text-base font-display font-bold text-white mb-1 line-clamp-2 leading-snug min-h-[2.75rem] group-hover:text-red-400 transition-colors duration-300">
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
                <div className="text-xs font-semibold text-gray-200 truncate">{fuelType}</div>
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
                <div className="text-xs font-semibold text-gray-200 truncate">{transmission}</div>
              </div>
            </div>
          )}
        </div>

        {/* CTA */}
        <Link
          to={`/fahrzeug/${id}`}
          className="flex items-center justify-center w-full py-3 text-white rounded-xl font-semibold text-sm transition-all duration-300 hover:shadow-lg group/btn"
          style={{
            background: 'linear-gradient(135deg, #ef4444, #dc2626)',
            boxShadow: '0 0 20px rgba(239,68,68,0.15)',
          }}
        >
          <span className="group-hover/btn:tracking-wider transition-all duration-300">{t('card.details')}</span>
        </Link>
      </div>
    </motion.article>
  );
}
