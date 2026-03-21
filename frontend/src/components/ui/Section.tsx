import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '../../utils/cn';

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  variant?: 'default' | 'dark' | 'darker';
  withPattern?: boolean;
  withGlow?: boolean;
}

const Section = forwardRef<HTMLElement, SectionProps>(
  ({ className, variant = 'default', withPattern = false, withGlow = false, children, ...props }, ref) => {
    const variants = {
      default: 'bg-[#171717]',
      dark: 'bg-[#0f0f0f]',
      darker: 'bg-black',
    };

    return (
      <section
        ref={ref}
        className={cn('py-16 relative overflow-hidden', variants[variant], className)}
        {...props}
      >
        {/* Background Pattern */}
        {withPattern && (
          <div className="absolute inset-0 pointer-events-none select-none" aria-hidden="true">
            <div
              className="absolute inset-0 opacity-[0.02]"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}
            />
          </div>
        )}

        {/* Glow Effect */}
        {withGlow && (
          <>
            <div
              className="absolute -top-20 -right-20 w-80 h-80 rounded-full pointer-events-none"
              style={{
                background: 'radial-gradient(circle, rgba(220,38,38,0.15) 0%, transparent 70%)',
                animation: 'glowPulse 6s ease-in-out infinite',
              }}
            />
            <div
              className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full pointer-events-none"
              style={{
                background: 'radial-gradient(circle, rgba(220,38,38,0.1) 0%, transparent 70%)',
                animation: 'glowPulse 8s ease-in-out infinite 1s',
              }}
            />
          </>
        )}

        {/* Content */}
        <div className="relative z-10">{children}</div>
      </section>
    );
  }
);

Section.displayName = 'Section';

export const SectionHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn('container mx-auto px-4 sm:px-6 lg:px-8 mb-12', className)} {...props}>
      {children}
    </div>
  )
);
SectionHeader.displayName = 'SectionHeader';

export const SectionTitle = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>(
  ({ className, children, ...props }, ref) => (
    <h2
      ref={ref}
      className={cn('text-3xl md:text-4xl font-bold text-white mb-3', className)}
      {...props}
    >
      {children}
    </h2>
  )
);
SectionTitle.displayName = 'SectionTitle';

export const SectionSubtitle = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
  ({ className, children, ...props }, ref) => (
    <p
      ref={ref}
      className={cn('text-gray-400 text-lg', className)}
      {...props}
    >
      {children}
    </p>
  )
);
SectionSubtitle.displayName = 'SectionSubtitle';

export const SectionContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn('container mx-auto px-4 sm:px-6 lg:px-8', className)} {...props}>
      {children}
    </div>
  )
);
SectionContent.displayName = 'SectionContent';

export default Section;
