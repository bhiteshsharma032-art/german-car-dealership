import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '../../utils/cn';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'premium' | 'success' | 'warning' | 'info' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'default', size = 'md', children, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center font-semibold rounded-full transition-all';

    const variants = {
      default: 'bg-zinc-800 text-zinc-300',
      premium: 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg',
      success: 'bg-green-600/20 text-green-400 border border-green-600/30',
      warning: 'bg-amber-600/20 text-amber-400 border border-amber-600/30',
      info: 'bg-blue-600/20 text-blue-400 border border-blue-600/30',
      outline: 'border-2 border-[#dc2626] text-[#dc2626]',
    };

    const sizes = {
      sm: 'px-2 py-0.5 text-xs gap-1',
      md: 'px-3 py-1 text-sm gap-1.5',
      lg: 'px-4 py-1.5 text-base gap-2',
    };

    return (
      <span
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';

export default Badge;
