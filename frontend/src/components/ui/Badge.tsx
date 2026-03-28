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
      default: 'bg-white/[0.06] text-gray-300 border border-white/[0.06]',
      premium: 'text-[#1a1a28] shadow-glow-gold',
      success: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
      warning: 'bg-amber-500/10 text-amber-400 border border-amber-500/20',
      info: 'bg-red-500/10 text-red-400 border border-red-500/20',
      outline: 'border border-red-500/40 text-red-400',
    };

    const sizes = {
      sm: 'px-2.5 py-0.5 text-[10px] gap-1 tracking-wider uppercase',
      md: 'px-3 py-1 text-xs gap-1.5',
      lg: 'px-4 py-1.5 text-sm gap-2',
    };

    return (
      <span
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        style={variant === 'premium' ? { background: 'linear-gradient(135deg, #c9a84c, #e8d190)' } : undefined}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';

export default Badge;
