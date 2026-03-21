import { CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from './Button';
import Card from './Card';

interface SuccessStateProps {
  title: string;
  message: string;
  action?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
  secondaryAction?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
}

export default function SuccessState({
  title,
  message,
  action,
  secondaryAction,
}: SuccessStateProps) {
  return (
    <Card variant="elevated" className="p-12">
      <div className="text-center max-w-md mx-auto">
        <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-green-500/10 text-green-500 mb-6">
          <CheckCircle className="w-16 h-16" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-3">{title}</h3>
        <p className="text-gray-400 mb-6 leading-relaxed">{message}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {action && (
            action.href ? (
              <Link to={action.href}>
                <Button size="lg">{action.label}</Button>
              </Link>
            ) : (
              <Button onClick={action.onClick} size="lg">
                {action.label}
              </Button>
            )
          )}
          {secondaryAction && (
            secondaryAction.href ? (
              <Link to={secondaryAction.href}>
                <Button variant="outline" size="lg">
                  {secondaryAction.label}
                </Button>
              </Link>
            ) : (
              <Button variant="outline" size="lg" onClick={secondaryAction.onClick}>
                {secondaryAction.label}
              </Button>
            )
          )}
        </div>
      </div>
    </Card>
  );
}
