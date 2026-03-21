import { cn } from '../../utils/cn';

interface LoadingSkeletonProps {
  className?: string;
  variant?: 'card' | 'text' | 'circle' | 'button';
}

export function LoadingSkeleton({ className, variant = 'card' }: LoadingSkeletonProps) {
  const baseClasses = 'animate-shimmer bg-gradient-to-r from-zinc-800 via-zinc-700 to-zinc-800 bg-[length:400%_100%]';
  
  const variantClasses = {
    card: 'rounded-xl h-64 w-full',
    text: 'rounded h-4 w-full',
    circle: 'rounded-full h-12 w-12',
    button: 'rounded-lg h-10 w-32',
  };

  return (
    <div className={cn(baseClasses, variantClasses[variant], className)} />
  );
}

export function CarCardSkeleton() {
  return (
    <div className="bg-[#1a1a1a] rounded-xl shadow-lg overflow-hidden animate-fadeIn border border-zinc-800">
      <LoadingSkeleton className="aspect-video" />
      <div className="p-5 space-y-4">
        <LoadingSkeleton variant="text" className="w-3/4" />
        <LoadingSkeleton variant="text" className="w-1/2 h-8" />
        <div className="space-y-2">
          <LoadingSkeleton variant="text" className="w-full" />
          <LoadingSkeleton variant="text" className="w-full" />
          <LoadingSkeleton variant="text" className="w-full" />
        </div>
        <div className="flex gap-2">
          <LoadingSkeleton variant="button" className="flex-1" />
          <LoadingSkeleton variant="button" className="w-12" />
        </div>
      </div>
    </div>
  );
}

export function LuxuryLoader() {
  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
      <div className="relative">
        {/* Outer rotating ring with red glow */}
        <div className="absolute inset-0 animate-spin-slow">
          <div className="h-32 w-32 rounded-full border-4 border-transparent border-t-red-600 border-r-red-500 shadow-[0_0_30px_rgba(220,38,38,0.5)]"></div>
        </div>
        
        {/* Middle rotating ring */}
        <div className="absolute inset-2 animate-spin-reverse">
          <div className="h-28 w-28 rounded-full border-4 border-transparent border-b-red-700 border-l-red-600 shadow-[0_0_20px_rgba(185,28,28,0.4)]"></div>
        </div>
        
        {/* Inner pulsing circle with red glow */}
        <div className="absolute inset-6 animate-pulse-slow">
          <div className="h-20 w-20 rounded-full bg-gradient-to-br from-red-600 to-red-800 opacity-20 shadow-[0_0_40px_rgba(220,38,38,0.6)]"></div>
        </div>
        
        {/* Spinning wheel icon */}
        <div className="relative h-32 w-32 flex items-center justify-center">
          <svg className="h-16 w-16 text-red-500 animate-spin-slow" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" opacity="0.3"/>
            <circle cx="12" cy="12" r="6" stroke="currentColor" strokeWidth="2" opacity="0.5"/>
            <circle cx="12" cy="12" r="2" fill="currentColor"/>
            <line x1="12" y1="2" x2="12" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <line x1="12" y1="18" x2="12" y2="22" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <line x1="2" y1="12" x2="6" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <line x1="18" y1="12" x2="22" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <line x1="4.93" y1="4.93" x2="7.76" y2="7.76" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <line x1="16.24" y1="16.24" x2="19.07" y2="19.07" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <line x1="4.93" y1="19.07" x2="7.76" y2="16.24" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <line x1="16.24" y1="7.76" x2="19.07" y2="4.93" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>
      </div>
      
      {/* Loading text with red glow */}
      <div className="absolute bottom-1/3 left-1/2 transform -translate-x-1/2">
        <p className="text-red-500 font-semibold text-lg tracking-wider animate-pulse drop-shadow-[0_0_10px_rgba(220,38,38,0.8)]">
          Lädt Premium-Fahrzeuge...
        </p>
      </div>
      
      {/* Ambient particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-red-500 rounded-full animate-pulse-slow opacity-60"></div>
        <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-red-400 rounded-full animate-pulse-slow opacity-40" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-red-600 rounded-full animate-pulse-slow opacity-50" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/4 right-1/3 w-1 h-1 bg-red-400 rounded-full animate-pulse-slow opacity-30" style={{ animationDelay: '1.5s' }}></div>
      </div>
    </div>
  );
}
