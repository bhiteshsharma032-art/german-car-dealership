import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '../../utils/cn';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'glass' | 'bordered';
  hover?: boolean;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', hover = false, children, ...props }, ref) => {
    const baseStyles = 'rounded-2xl overflow-hidden transition-all duration-500';

    const variants = {
      default: 'bg-white/[0.02] border border-white/[0.04]',
      elevated: 'bg-[#22222a]/50 backdrop-blur-xl border border-white/[0.06] shadow-glass',
      glass: 'bg-white/[0.03] backdrop-blur-2xl border border-white/[0.08] shadow-glass',
      bordered: 'bg-white/[0.01] border border-white/[0.08]',
    };

    const hoverStyles = hover
      ? 'hover:shadow-glow-red hover:-translate-y-1 hover:border-[#ef4444]/30 hover:bg-white/[0.04] cursor-pointer'
      : '';

    return (
      <div
        ref={ref}
        className={cn(baseStyles, variants[variant], hoverStyles, className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

export const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('p-6 pb-4', className)} {...props} />
  )
);
CardHeader.displayName = 'CardHeader';

export const CardBody = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
  )
);
CardBody.displayName = 'CardBody';

export const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('p-6 pt-4 border-t border-white/[0.04]', className)} {...props} />
  )
);
CardFooter.displayName = 'CardFooter';

export default Card;
