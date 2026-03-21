import { Link } from 'react-router-dom';
import { Heart, Calendar, Gauge, Fuel, Settings, MapPin, CreditCard } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';
import Badge from '../ui/Badge';

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
  isNew = false,
  isExclusive = false,
  hasFinancing = true,
}: VehicleCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [imageError, setImageError] = useState(false);

  const displayImage = image || (images && images[0]);
  const year = firstRegistration ? new Date(firstRegistration).getFullYear() : null;
  
  // Calculate estimated monthly rate (simple estimation)
  const estimatedMonthly = Math.round((price.amount * 0.02) / 12);

  return (
    <motion.article 
      whileHover={{ y: -8 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="group bg-[#1a1a1a] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-red-900/10 transition-all duration-300 border border-zinc-800/50 hover:border-red-600/30 flex flex-col h-full"
    >
      {/* Image */}
      <Link to={`/fahrzeug/${id}`} className="block relative aspect-[4/3] overflow-hidden bg-black">
        {displayImage && !imageError ? (
          <motion.img
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.6 }}
            src={displayImage}
            alt={title}
            className="w-full h-full object-cover"
            loading="lazy"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-zinc-900 to-black">
            <svg className="w-20 h-20 text-zinc-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 17H4C3.44772 17 3 16.5523 3 16V12L5.4 6.8C5.55 6.3 6 6 6.5 6H17.5C18 6 18.45 6.3 18.6 6.8L21 12V16C21 16.5523 20.5523 17 20 17H19M5 17C5 18.1046 5.89543 19 7 19C8.10457 19 9 18.1046 9 17M5 17C5 15.8954 5.89543 15 7 15C8.10457 15 9 15.8954 9 17M19 17C19 18.1046 18.1046 19 17 19C15.8954 19 15 18.1046 15 17M19 17C19 15.8954 18.1046 15 17 15C15.8954 15 15 15.8954 15 17M9 17H15" />
            </svg>
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
          {isNew && (
            <Badge variant="success" size="sm">
              Neu
            </Badge>
          )}
          {isExclusive && (
            <Badge variant="premium" size="sm">
              Top
            </Badge>
          )}
        </div>

        {/* Favorite Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            setIsFavorite(!isFavorite);
          }}
          className="absolute top-3 right-3 w-10 h-10 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-black/80 transition-all"
          aria-label="Zu Favoriten hinzufügen"
        >
          <Heart
            className={cn(
              'h-5 w-5 transition-colors',
              isFavorite ? 'text-red-500 fill-red-500' : 'text-white'
            )}
          />
        </button>

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </Link>

      {/* Content */}
      <div className="p-5">
        {/* Title */}
        <Link to={`/fahrzeug/${id}`}>
          <h3 className="text-lg font-bold text-white mb-1 line-clamp-2 leading-tight min-h-[3.5rem] group-hover:text-red-500 transition-colors">
            {title}
          </h3>
        </Link>

        {/* Location */}
        {location?.city && (
          <div className="flex items-center gap-1.5 text-sm text-gray-400 mb-3">
            <MapPin className="h-3.5 w-3.5" />
            <span>{location.city}</span>
          </div>
        )}

        {/* Price */}
        <div className="mb-4">
          <div className="text-2xl font-bold text-white mb-1">
            {price.formatted}
          </div>
          {hasFinancing && (
            <div className="text-sm text-gray-400">
              ab <span className="text-white font-semibold">{estimatedMonthly} €/Monat</span>
            </div>
          )}
        </div>

        {/* Key Specs */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-2.5 mb-5 pb-5 border-b border-zinc-800">
          {year && (
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-gray-500 flex-shrink-0" />
              <div>
                <div className="text-xs text-gray-500">Jahr</div>
                <div className="text-sm font-semibold text-white truncate">{year}</div>
              </div>
            </div>
          )}

          {mileage?.formatted && (
            <div className="flex items-center gap-2">
              <Gauge className="h-4 w-4 text-gray-500 flex-shrink-0" />
              <div>
                <div className="text-xs text-gray-500">Km</div>
                <div className="text-sm font-semibold text-white truncate">{mileage.formatted}</div>
              </div>
            </div>
          )}

          {fuelType && (
            <div className="flex items-center gap-2">
              <Fuel className="h-4 w-4 text-gray-500 flex-shrink-0" />
              <div>
                <div className="text-xs text-gray-500">Kraftstoff</div>
                <div className="text-sm font-semibold text-white truncate">{fuelType}</div>
              </div>
            </div>
          )}

          {transmission && (
            <div className="flex items-center gap-2">
              <Settings className="h-4 w-4 text-gray-500 flex-shrink-0" />
              <div>
                <div className="text-xs text-gray-500">Getriebe</div>
                <div className="text-sm font-semibold text-white truncate">{transmission}</div>
              </div>
            </div>
          )}
        </div>

        {/* CTA */}
        <Link
          to={`/fahrzeug/${id}`}
          className="flex items-center justify-center w-full py-3 bg-gradient-to-r from-[#dc2626] to-[#ef4444] text-white rounded-lg hover:shadow-lg hover:shadow-red-600/25 transition-all font-semibold text-sm"
        >
          Details ansehen
        </Link>

        {/* Financing Badge */}
        {hasFinancing && (
          <div className="mt-3 text-center">
            <span className="text-xs text-gray-500 flex items-center justify-center gap-1.5">
              <CreditCard className="w-3.5 h-3.5 text-red-500" /> Finanzierung möglich
            </span>
          </div>
        )}
      </div>
    </motion.article>
  );
}
