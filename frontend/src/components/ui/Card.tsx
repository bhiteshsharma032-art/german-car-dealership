import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '../../utils/cn';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'glass' | 'bordered';
  hover?: boolean;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', hover = false, children, ...props }, ref) => {
    const baseStyles = 'rounded-xl overflow-hidden transition-all duration-300';

    const variants = {
      default: 'bg-[#1a1a1a]',
      elevated: 'bg-[#1a1a1a] shadow-[0_2px_16px_rgba(255,255,255,0.08)]',
      glass: 'bg-[#1a1a1a]/5 backdrop-blur-xl border border-white/10',
      bordered: 'bg-[#1a1a1a] border border-zinc-800',
    };

    const hoverStyles = hover
      ? 'hover:shadow-2xl hover:-translate-y-1 hover:shadow-red-600/30 hover:border-red-600/40 relative before:absolute before:inset-0 before:z-[-1] before:bg-gradient-to-r before:from-red-600 before:to-amber-500 before:opacity-0 hover:before:opacity-10 before:transition-opacity before:duration-500'
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
    <div ref={ref} className={cn('p-6 pt-4 border-t border-zinc-800', className)} {...props} />
  )
);
CardFooter.displayName = 'CardFooter';

export default Card;
