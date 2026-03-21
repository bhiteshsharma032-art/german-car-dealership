import { Shield, Award, CheckCircle, Clock, Euro, Users } from 'lucide-react';
import Card from './Card';

interface TrustBadge {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const defaultBadges: TrustBadge[] = [
  {
    icon: <Shield className="w-6 h-6" />,
    title: 'Geprüfte Qualität',
    description: 'Jedes Fahrzeug wird gründlich inspiziert',
  },
  {
    icon: <Award className="w-6 h-6" />,
    title: '15+ Jahre Erfahrung',
    description: 'Ihr vertrauenswürdiger Partner seit 2009',
  },
  {
    icon: <CheckCircle className="w-6 h-6" />,
    title: 'Garantie inklusive',
    description: 'Umfassender Schutz für Ihr Fahrzeug',
  },
  {
    icon: <Clock className="w-6 h-6" />,
    title: 'Schnelle Abwicklung',
    description: 'Von der Anfrage bis zur Übergabe',
  },
];

interface TrustBadgesProps {
  badges?: TrustBadge[];
  variant?: 'default' | 'compact' | 'inline';
}

export default function TrustBadges({ badges = defaultBadges, variant = 'default' }: TrustBadgesProps) {
  if (variant === 'inline') {
    return (
      <div className="flex flex-wrap gap-4 justify-center">
        {badges.map((badge, index) => (
          <div
            key={index}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-800/50 border border-zinc-700"
          >
            <div className="text-red-500">{badge.icon}</div>
            <span className="text-sm font-semibold text-white">{badge.title}</span>
          </div>
        ))}
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {badges.map((badge, index) => (
          <div key={index} className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-[#dc2626] to-[#ef4444] mb-2">
              {badge.icon}
            </div>
            <h4 className="text-sm font-bold text-white mb-1">{badge.title}</h4>
            <p className="text-xs text-gray-400">{badge.description}</p>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {badges.map((badge, index) => (
        <Card key={index} variant="elevated" hover className="p-6 text-center group">
          <div className="w-16 h-16 bg-gradient-to-r from-[#dc2626] to-[#ef4444] rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
            {badge.icon}
          </div>
          <h3 className="text-lg font-bold text-white mb-2">{badge.title}</h3>
          <p className="text-gray-400 text-sm">{badge.description}</p>
        </Card>
      ))}
    </div>
  );
}

// Preset badge sets
export function FinancingTrustBadges() {
  const badges: TrustBadge[] = [
    {
      icon: <Clock className="w-6 h-6" />,
      title: '24h Zusage',
      description: 'Schnelle Finanzierungsentscheidung',
    },
    {
      icon: <Euro className="w-6 h-6" />,
      title: 'Ab 3,99%',
      description: 'Attraktive Zinssätze',
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Sicher & Diskret',
      description: 'Vertrauliche Abwicklung',
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: 'Flexible Laufzeiten',
      description: '12 bis 84 Monate',
    },
  ];

  return <TrustBadges badges={badges} variant="compact" />;
}

export function DealershipTrustBadges() {
  const badges: TrustBadge[] = [
    {
      icon: <Users className="w-6 h-6" />,
      title: '5.000+ Kunden',
      description: 'Zufriedene Käufer seit 2009',
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: 'Premium Marken',
      description: 'BMW, Mercedes, Audi & mehr',
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Geprüfte Fahrzeuge',
      description: 'Umfassende Qualitätskontrolle',
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: '98% Weiterempfehlung',
      description: 'Exzellenter Service',
    },
  ];

  return <TrustBadges badges={badges} variant="inline" />;
}
