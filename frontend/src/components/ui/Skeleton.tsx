import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '../../utils/cn';

const Skeleton = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('animate-pulse bg-zinc-800 rounded', className)}
        {...props}
      />
    );
  }
);

Skeleton.displayName = 'Skeleton';

export const SkeletonCard = () => (
  <div className="bg-white/[0.02] rounded-lg shadow-sm overflow-hidden border border-white/[0.06]">
    <Skeleton className="aspect-video" />
    <div className="p-4 space-y-3">
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-6 w-1/2" />
      <div className="space-y-2">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-full" />
      </div>
    </div>
  </div>
);

export default Skeleton;
