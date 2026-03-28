import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '../../utils/cn';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline' | 'danger';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles = 'inline-flex items-center justify-center font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#22222a] disabled:opacity-50 disabled:cursor-not-allowed';

    const variants = {
      primary: 'text-white hover:scale-[1.02] focus:ring-red-500',
      secondary: 'bg-white/[0.05] text-gray-200 border border-white/[0.08] hover:bg-white/[0.08] hover:border-white/[0.12] focus:ring-gray-500',
      ghost: 'text-gray-300 hover:text-white hover:bg-white/[0.05] focus:ring-gray-500',
      outline: 'border-[1.5px] border-red-500/50 text-red-400 hover:bg-red-500/10 hover:border-red-500 focus:ring-red-500',
      danger: 'bg-red-500 text-white hover:bg-[#1a2ba3] hover:shadow-lg focus:ring-[#ef4444]',
    };

    const sizes = {
      sm: 'px-3 py-1.5 text-xs rounded-xl gap-1.5',
      md: 'px-5 py-2.5 text-sm rounded-xl gap-2',
      lg: 'px-6 py-3 text-base rounded-xl gap-2',
      xl: 'px-8 py-4 text-lg rounded-2xl gap-3',
    };

    return (
      <button
        ref={ref}
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          className
        )}
        style={variant === 'primary' ? {
          background: 'linear-gradient(135deg, #ef4444, #dc2626)',
          boxShadow: '0 0 20px rgba(239,68,68,0.2), 0 4px 12px rgba(0,0,0,0.3)',
        } : undefined}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          leftIcon
        )}
        {children}
        {!isLoading && rightIcon}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
