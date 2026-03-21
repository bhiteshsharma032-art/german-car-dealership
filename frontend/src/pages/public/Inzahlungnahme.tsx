import { Helmet } from 'react-helmet-async';
import {
  RefreshCw,
  CheckCircle,
  Euro,
  Shield,
  Zap,
  ArrowRight,
} from 'lucide-react';
import Section, { SectionContent, SectionTitle, SectionSubtitle } from '../../components/ui/Section';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';

export default function Inzahlungnahme() {

  const benefits = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'Schnelle Bewertung',
      description: 'Fahrzeugbewertung innerhalb von 24 Stunden',
    },
    {
      icon: <Euro className="w-6 h-6" />,
      title: 'Faire Preise',
      description: 'Transparente und marktgerechte Bewertung',
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Sicher & Diskret',
      description: 'Vertrauliche Abwicklung garantiert',
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: 'Unkompliziert',
      description: 'Einfacher Prozess ohne versteckte Kosten',
    },
  ];

  const steps = [
    {
      number: '01',
      title: 'Fahrzeug beschreiben',
      description: 'Füllen Sie unser Formular mit den Details zu Ihrem Fahrzeug aus.',
    },
    {
      number: '02',
      title: 'Bewertung erhalten',
      description: 'Wir prüfen Ihre Angaben und erstellen eine faire Bewertung.',
    },
    {
      number: '03',
      title: 'Termin vereinbaren',
      description: 'Bei Interesse vereinbaren wir einen Besichtigungstermin.',
    },
  ];


  return (
    <>
      <Helmet>
        <title>Inzahlungnahme & Autoankauf - Nordhessen Automobile</title>
        <meta name="description" content="Verkaufen Sie Ihr Fahrzeug schnell und unkompliziert. Faire Bewertung und schnelle Abwicklung garantiert." />
      </Helmet>

      <div className="min-h-screen bg-[#171717] pt-20">
        {/* Hero Section */}
        <Section variant="default" withGlow>
          <div className="absolute inset-0 pointer-events-none">
            <div
              className="absolute -top-20 -right-20 w-96 h-96 rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(220,38,38,0.15) 0%, transparent 70%)',
                animation: 'glowPulse 6s ease-in-out infinite',
              }}
            />
          </div>

          <SectionContent>
            <div className="max-w-4xl mx-auto text-center relative z-10">
              <Badge variant="premium" size="lg" className="mb-6">
                <RefreshCw className="w-4 h-4" />
                Inzahlungnahme & Ankauf
              </Badge>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                Verkaufen Sie Ihr Auto{' '}
                <span className="bg-gradient-to-r from-[#dc2626] to-[#ef4444] bg-clip-text text-transparent">
                  schnell & fair
                </span>
              </h1>
              
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Wir kaufen Ihr Fahrzeug zu fairen Konditionen. Schnelle Bewertung, 
                transparente Abwicklung und sofortige Zahlung.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="xl" rightIcon={<ArrowRight className="w-5 h-5" />}>
                  Jetzt Fahrzeug bewerten lassen
                </Button>
                <Button variant="outline" size="xl">
                  <Phone className="w-5 h-5" />
                  Telefonisch anfragen
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 pt-12 border-t border-zinc-800">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-1">24h</div>
                  <div className="text-sm text-gray-400">Bewertung</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-1">100%</div>
                  <div className="text-sm text-gray-400">Transparent</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-1">0€</div>
                  <div className="text-sm text-gray-400">Gebühren</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-1">Sofort</div>
                  <div className="text-sm text-gray-400">Zahlung</div>
                </div>
              </div>
            </div>
          </SectionContent>
        </Section>

        {/* Benefits Section */}
        <Section variant="default">
          <SectionContent>
            <div className="text-center mb-12">
              <SectionTitle>Ihre Vorteile</SectionTitle>
              <SectionSubtitle>
                Warum Sie Ihr Fahrzeug bei uns verkaufen sollten
              </SectionSubtitle>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit, index) => (
                <Card key={index} variant="elevated" hover className="p-6 text-center group">
                  <div className="w-16 h-16 bg-gradient-to-r from-[#dc2626] to-[#ef4444] rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    {benefit.icon}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{benefit.title}</h3>
                  <p className="text-gray-400 text-sm">{benefit.description}</p>
                </Card>
              ))}
            </div>
          </SectionContent>
        </Section>

        {/* Process Steps */}
        <Section variant="dark">
          <SectionContent>
            <div className="text-center mb-12">
              <SectionTitle>So einfach geht's</SectionTitle>
              <SectionSubtitle>
                In 3 Schritten zum Verkauf
              </SectionSubtitle>
            </div>

            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {steps.map((step, index) => (
                  <Card key={index} variant="elevated" className="p-6 text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-[#dc2626] to-[#ef4444] rounded-xl flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-bold text-white">{step.number}</span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                    <p className="text-gray-400">{step.description}</p>
                  </Card>
                ))}
              </div>
            </div>
          </SectionContent>
        </Section>


      </div>
    </>
  );
}

function Phone(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}
    