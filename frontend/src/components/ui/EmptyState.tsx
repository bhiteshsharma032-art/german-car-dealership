import { ReactNode } from 'react';
import { Search, Inbox, AlertCircle } from 'lucide-react';
import Button from './Button';
import Card from './Card';

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  variant?: 'default' | 'search' | 'error';
}

export default function EmptyState({
  icon,
  title,
  description,
  action,
  variant = 'default',
}: EmptyStateProps) {
  const defaultIcons = {
    default: <Inbox className="w-16 h-16" />,
    search: <Search className="w-16 h-16" />,
    error: <AlertCircle className="w-16 h-16" />,
  };

  const displayIcon = icon || defaultIcons[variant];

  return (
    <Card variant="elevated" className="p-12">
      <div className="text-center max-w-md mx-auto">
        <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-zinc-800/50 text-gray-500 mb-6">
          {displayIcon}
        </div>
        <h3 className="text-2xl font-bold text-white mb-3">{title}</h3>
        <p className="text-gray-400 mb-6 leading-relaxed">{description}</p>
        {action && (
          <Button onClick={action.onClick} size="lg">
            {action.label}
          </Button>
        )}
      </div>
    </Card>
  );
}
