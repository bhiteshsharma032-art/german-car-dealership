import { useState, useEffect } from 'react';
import { Phone, Mail, Heart, Calculator } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../../utils/cn';

interface StickyCTAProps {
  variant?: 'contact' | 'financing' | 'favorite' | 'custom';
  label?: string;
  href?: string;
  onClick?: () => void;
  showOnMobile?: boolean;
  showOnDesktop?: boolean;
}

export default function StickyCTA({
  variant = 'contact',
  label,
  href,
  onClick,
  showOnMobile = true,
  showOnDesktop = false,
}: StickyCTAProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show CTA after scrolling 300px
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const variants = {
    contact: {
      icon: <Phone className="w-5 h-5" />,
      label: label || 'Anrufen',
      href: href || 'tel:+4956193004649',
      bg: 'from-green-600 to-green-700',
    },
    financing: {
      icon: <Calculator className="w-5 h-5" />,
      label: label || 'Finanzierung',
      href: href || '/finanzierung',
      bg: 'from-blue-600 to-blue-700',
    },
    favorite: {
      icon: <Heart className="w-5 h-5" />,
      label: label || 'Merken',
      href: href,
      bg: 'from-red-600 to-red-700',
    },
    custom: {
      icon: <Mail className="w-5 h-5" />,
      label: label || 'Kontakt',
      href: href || '/kontakt',
      bg: 'from-[#dc2626] to-[#ef4444]',
    },
  };

  const config = variants[variant];

  const buttonClasses = cn(
    'fixed bottom-6 right-6 z-40 flex items-center gap-2 px-6 py-4 rounded-full shadow-2xl font-bold text-white transition-all duration-300',
    `bg-gradient-to-r ${config.bg}`,
    'hover:scale-105 hover:shadow-red-600/50',
    isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0 pointer-events-none',
    showOnMobile && !showOnDesktop && 'md:hidden',
    !showOnMobile && showOnDesktop && 'hidden md:flex',
    showOnMobile && showOnDesktop && 'flex'
  );

  const content = (
    <>
      {config.icon}
      <span className="hidden sm:inline">{config.label}</span>
    </>
  );

  if (onClick) {
    return (
      <button onClick={onClick} className={buttonClasses}>
        {content}
      </button>
    );
  }

  if (config.href?.startsWith('tel:') || config.href?.startsWith('mailto:')) {
    return (
      <a href={config.href} className={buttonClasses}>
        {content}
      </a>
    );
  }

  return (
    <Link to={config.href || '/'} className={buttonClasses}>
      {content}
    </Link>
  );
}

// Multi-action sticky bar for vehicle detail pages
export function StickyActionBar() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={cn(
        'fixed bottom-0 left-0 right-0 z-40 bg-[#1a1a1a] border-t border-zinc-800 shadow-2xl transition-all duration-300 md:hidden',
        isVisible ? 'translate-y-0' : 'translate-y-full'
      )}
    >
      <div className="container mx-auto px-4 py-3">
        <div className="grid grid-cols-3 gap-2">
          <a
            href="tel:+4956193004649"
            className="flex flex-col items-center justify-center gap-1 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition-colors"
          >
            <Phone className="w-5 h-5 text-green-500" />
            <span className="text-xs font-semibold text-white">Anrufen</span>
          </a>
          
          <Link
            to="/kontakt"
            className="flex flex-col items-center justify-center gap-1 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition-colors"
          >
            <Mail className="w-5 h-5 text-blue-500" />
            <span className="text-xs font-semibold text-white">Anfragen</span>
          </Link>
          
          <Link
            to="/finanzierung"
            className="flex flex-col items-center justify-center gap-1 py-2 rounded-lg bg-gradient-to-r from-[#dc2626] to-[#ef4444]"
          >
            <Calculator className="w-5 h-5 text-white" />
            <span className="text-xs font-semibold text-white">Finanzieren</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
