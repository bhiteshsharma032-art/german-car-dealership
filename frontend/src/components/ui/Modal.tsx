import { HTMLAttributes, forwardRef, useEffect } from 'react';
import { X } from 'lucide-react';
import { cn } from '../../utils/cn';

export interface ModalProps extends HTMLAttributes<HTMLDivElement> {
  open: boolean;
  onClose: () => void;
  title?: string;
}

const Modal = forwardRef<HTMLDivElement, ModalProps>(
  ({ className, open, onClose, title, children, ...props }, ref) => {
    useEffect(() => {
      if (open) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'unset';
      }
      return () => {
        document.body.style.overflow = 'unset';
      };
    }, [open]);

    if (!open) return null;

    return (
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:p-0">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-[#1e1e24] bg-opacity-50 backdrop-blur-sm transition-opacity"
            onClick={onClose}
          />

          {/* Modal */}
          <div
            ref={ref}
            className={cn(
              'relative inline-block align-bottom bg-white/[0.02] rounded-lg text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full border border-white/[0.06]',
              className
            )}
            {...props}
          >
            {title && (
              <div className="flex items-center justify-between p-6 border-b border-zinc-800">
                <h3 className="text-lg font-semibold text-white">{title}</h3>
                <button
                  onClick={onClose}
                  className="p-1 text-gray-400 hover:text-white hover:bg-zinc-800 rounded transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            )}
            {children}
          </div>
        </div>
      </div>
    );
  }
);

Modal.displayName = 'Modal';

export const ModalContent = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('p-6', className)} {...props} />
));

ModalContent.displayName = 'ModalContent';

export const ModalActions = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex gap-3 p-6 border-t border-zinc-800 bg-[#111111]', className)}
    {...props}
  />
));

ModalActions.displayName = 'ModalActions';

export default Modal;
