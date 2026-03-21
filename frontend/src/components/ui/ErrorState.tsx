import { AlertTriangle, RefreshCw } from 'lucide-react';
import Button from './Button';
import Card from './Card';

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  showRetry?: boolean;
}

export default function ErrorState({
  title = 'Ein Fehler ist aufgetreten',
  message = 'Beim Laden der Daten ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.',
  onRetry,
  showRetry = true,
}: ErrorStateProps) {
  return (
    <Card variant="elevated" className="p-12">
      <div className="text-center max-w-md mx-auto">
        <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-red-500/10 text-red-500 mb-6">
          <AlertTriangle className="w-16 h-16" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-3">{title}</h3>
        <p className="text-gray-400 mb-6 leading-relaxed">{message}</p>
        {showRetry && onRetry && (
          <Button onClick={onRetry} size="lg" leftIcon={<RefreshCw className="w-5 h-5" />}>
            Erneut versuchen
          </Button>
        )}
      </div>
    </Card>
  );
}
