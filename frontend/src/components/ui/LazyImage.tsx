import { useState } from 'react';
import { cn } from '../../utils/cn';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  fallback?: string;
}

export function LazyImage({ src, alt, className, fallback }: LazyImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  const defaultFallback = 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&auto=format&fit=crop';

  return (
    <div className={cn('relative overflow-hidden bg-gradient-to-br from-[#22222a] to-[#2a2a34]', className)}>
      {/* Loading shimmer */}
      {!loaded && !error && (
        <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-[#2a2a34] via-[#22222a] to-[#2a2a34] bg-[length:400%_100%]" />
      )}
      
      {/* Actual image */}
      <img
        src={error ? (fallback || defaultFallback) : src}
        alt={alt}
        className={cn(
          'w-full h-full object-cover transition-all duration-700',
          loaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
        )}
        onLoad={() => setLoaded(true)}
        onError={() => {
          setError(true);
          setLoaded(true);
        }}
        loading="lazy"
      />
      
      {/* Overlay gradient on hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
  );
}
