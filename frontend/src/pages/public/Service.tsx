import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import {
  Shield,
  CheckCircle,
  Award,
  CreditCard,
  RefreshCw,
  FileCheck,
  Users,
  Zap,
  Clock,
  Euro,
  Star,
  TrendingUp,
  Phone,
} from 'lucide-react';
import Section, { SectionContent, SectionTitle, SectionSubtitle } from '../../components/ui/Section';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';

export default function Service() {
  const services = [
    {
      icon: <CheckCircle className="w-8 h-8" />,
      title: 'Qualitätsprüfung',
      description: 'Jedes Fahrzeug durchläuft eine umfassende technische Prüfung',
      features: [
        'Motorprüfung und Diagnose',
        'Fahrwerkskontrolle',
        'Elektronik-Check',
        'Karosserie-Inspektion',
        'Probefahrt durch Experten',
      ],
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Garantie',
      description: 'Umfassender Schutz für Ihr Fahrzeug',
      features: [
        'Bis zu 24 Monate Garantie',
        'Motor & Getriebe abgedeckt',
        'Garantieerweiterung möglich',
        'Partnerwerkstätten deutschlandweit',
        'Schnelle Schadensabwicklung',
      ],
    },
    {
      icon: <CreditCard className="w-8 h-8" />,
      title: 'Finanzierung',
      description: 'Flexible Finanzierungslösungen für jeden Bedarf',
      features: [
        'Zinssätze ab 3,99% effektiv',
        'Laufzeiten von 12-84 Monaten',
        'Anzahlung optional',
        'Schnelle Zusage in 24h',
        'Individuelle Beratung',
      ],
    },
    {
      icon: <RefreshCw className="w-8 h-8" />,
      title: 'Inzahlungnahme',
      description: 'Faire Bewertung Ihres Gebrauchtwagens',
      features: [
        'Kostenlose Fahrzeugbewertung',
        'Marktgerechte Preise',
        'Schnelle Abwicklung',
        'Verrechnung mit Neukauf',
        'Auch Ankauf ohne Neukauf',
      ],
    },
    {
      icon: <FileCheck className="w-8 h-8" />,
      title: 'Zulassungsservice',
      description: 'Wir übernehmen alle Formalitäten für Sie',
      features: [
        'Komplette Zulassung',
        'Kennzeichen-Reservierung',
        'Versicherungsabwicklung',
        'Überführung möglich',
        'Kurzzeitkennzeichen',
      ],
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Persönlicher Service',
      description: 'Individuelle Betreuung von Anfang bis Ende',
      features: [
        'Persönlicher Ansprechpartner',
        'Ausführliche Beratung',
        'Probefahrt nach Wunsch',
        'Fahrzeugübergabe mit Einweisung',
        'After-Sales-Support',
      ],
    },
  ];

  const advantages = [
    {
      icon: <Star className="w-6 h-6" />,
      title: 'Premium-Auswahl',
      description: 'Handverlesene Fahrzeuge von Top-Marken',
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Geprüfte Qualität',
      description: 'Jedes Fahrzeug wird gründlich inspiziert',
    },
    {
      icon: <Euro className="w-6 h-6" />,
      title: 'Faire Preise',
      description: 'Transparente Preisgestaltung ohne versteckte Kosten',
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: 'Schnelle Abwicklung',
      description: 'Von der Anfrage bis zur Übergabe in kürzester Zeit',
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: '15+ Jahre Erfahrung',
      description: 'Kompetenz und Vertrauen seit 2009',
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Persönliche Beratung',
      description: 'Individuelle Betreuung durch Experten',
    },
  ];

  const stats = [
    { value: '5.000+', label: 'Zufriedene Kunden' },
    { value: '500+', label: 'Fahrzeuge pro Jahr' },
    { value: '15+', label: 'Jahre Erfahrung' },
    { value: '98%', label: 'Weiterempfehlungsrate' },
  ];

  const testimonials = [
    {
      name: 'Michael S.',
      rating: 5,
      text: 'Hervorragender Service von Anfang bis Ende. Die Beratung war kompetent und die Abwicklung reibungslos. Sehr empfehlenswert!',
    },
    {
      name: 'Sarah W.',
      rating: 5,
      text: 'Mein Traumauto gefunden und dank der flexiblen Finanzierung auch leisten können. Das Team war super freundlich und hilfsbereit.',
    },
    {
      name: 'Thomas M.',
      rating: 5,
      text: 'Faire Inzahlungnahme meines alten Fahrzeugs und ein tolles neues Auto. Alles perfekt organisiert. Danke!',
    },
  ];

  return (
    <>
      <Helmet>
        <title>Service & Vorteile - Nordhessen Automobile</title>
        <meta name="description" content="Entdecken Sie unsere umfassenden Services: Qualitätsprüfung, Garantie, Finanzierung, Inzahlungnahme und persönlicher Service." />
      </Helmet>

      <div className="min-h-screen bg-[#1a1a1f] pt-20">
        {/* Hero Section */}
        <Section variant="default" withGlow>
          <SectionContent>
            <div className="max-w-4xl mx-auto text-center relative z-10">
              <Badge variant="premium" size="lg" className="mb-6">
                <Award className="w-4 h-4" />
                Premium Service
              </Badge>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-100 mb-6">
                Mehr als nur{' '}
                <span className="bg-gradient-to-r from-[#dc2626] to-[#ef4444] bg-clip-text text-transparent">
                  ein Autokauf
                </span>
              </h1>
              
              <p className="text-xl text-gray-500 mb-8 leading-relaxed">
                Entdecken Sie unsere umfassenden Services und Vorteile, die Ihren 
                Fahrzeugkauf zu einem rundum sorglosen Erlebnis machen.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/fahrzeuge">
                  <Button size="xl">
                    Fahrzeuge ansehen
                  </Button>
                </Link>
                <Link to="/kontakt">
                  <Button variant="outline" size="xl">
                    <Phone className="w-5 h-5" />
                    Beratung anfragen
                  </Button>
                </Link>
              </div>
            </div>
          </SectionContent>
        </Section>

        {/* Stats Section */}
        <Section variant="default">
          <SectionContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <Card key={index} variant="elevated" className="p-6 text-center">
                  <div className="text-4xl font-bold text-gray-100 mb-2">{stat.value}</div>
                  <div className="text-gray-500">{stat.label}</div>
                </Card>
              ))}
            </div>
          </SectionContent>
        </Section>

        {/* Services Section */}
        <Section variant="dark">
          <SectionContent>
            <div className="text-center mb-12">
              <SectionTitle>Unsere Services</SectionTitle>
              <SectionSubtitle>
                Umfassende Betreuung für Ihren Fahrzeugkauf
              </SectionSubtitle>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, index) => (
                <Card key={index} variant="elevated" hover className="p-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-[#dc2626] to-[#ef4444] rounded-2xl flex items-center justify-center mb-4">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-100 mb-2">{service.title}</h3>
                  <p className="text-gray-500 mb-4">{service.description}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-gray-400">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              ))}
            </div>
          </SectionContent>
        </Section>

        {/* Advantages Section */}
        <Section variant="default">
          <SectionContent>
            <div className="text-center mb-12">
              <SectionTitle>Ihre Vorteile</SectionTitle>
              <SectionSubtitle>
                Warum Kunden uns vertrauen
              </SectionSubtitle>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {advantages.map((advantage, index) => (
                <Card key={index} variant="elevated" hover className="p-6 text-center group">
                  <div className="w-16 h-16 bg-gradient-to-r from-[#dc2626] to-[#ef4444] rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    {advantage.icon}
                  </div>
                  <h3 className="text-lg font-bold text-gray-100 mb-2">{advantage.title}</h3>
                  <p className="text-gray-500 text-sm">{advantage.description}</p>
                </Card>
              ))}
            </div>
          </SectionContent>
        </Section>

        {/* Quality Promise Section */}
        <Section variant="dark">
          <SectionContent>
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <SectionTitle>Unser Qualitätsversprechen</SectionTitle>
                <SectionSubtitle>
                  Darauf können Sie sich verlassen
                </SectionSubtitle>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card variant="elevated" className="p-8">
                  <Zap className="w-12 h-12 text-red-500 mb-4" />
                  <h3 className="text-2xl font-bold text-gray-100 mb-4">Schnell & Unkompliziert</h3>
                  <p className="text-gray-500 leading-relaxed">
                    Von der ersten Anfrage bis zur Fahrzeugübergabe – wir machen den Prozess 
                    so einfach und schnell wie möglich. Keine unnötige Bürokratie, keine 
                    versteckten Kosten.
                  </p>
                </Card>

                <Card variant="elevated" className="p-8">
                  <Shield className="w-12 h-12 text-red-500 mb-4" />
                  <h3 className="text-2xl font-bold text-gray-100 mb-4">Sicher & Transparent</h3>
                  <p className="text-gray-500 leading-relaxed">
                    Alle Fahrzeuge sind geprüft und dokumentiert. Sie erhalten vollständige 
                    Transparenz über Zustand, Historie und Ausstattung. Keine bösen 
                    Überraschungen.
                  </p>
                </Card>

                <Card variant="elevated" className="p-8">
                  <Users className="w-12 h-12 text-red-500 mb-4" />
                  <h3 className="text-2xl font-bold text-gray-100 mb-4">Persönlich & Kompetent</h3>
                  <p className="text-gray-500 leading-relaxed">
                    Unser erfahrenes Team steht Ihnen mit Rat und Tat zur Seite. Individuelle 
                    Beratung, die auf Ihre Bedürfnisse zugeschnitten ist.
                  </p>
                </Card>

                <Card variant="elevated" className="p-8">
                  <Award className="w-12 h-12 text-red-500 mb-4" />
                  <h3 className="text-2xl font-bold text-gray-100 mb-4">Erfahren & Vertrauenswürdig</h3>
                  <p className="text-gray-500 leading-relaxed">
                    Seit über 15 Jahren sind wir Ihr Partner für Premium-Fahrzeuge. Tausende 
                    zufriedene Kunden sprechen für unsere Qualität und Zuverlässigkeit.
                  </p>
                </Card>
              </div>
            </div>
          </SectionContent>
        </Section>

        {/* Testimonials Section */}
        <Section variant="default">
          <SectionContent>
            <div className="text-center mb-12">
              <SectionTitle>Das sagen unsere Kunden</SectionTitle>
              <SectionSubtitle>
                Echte Bewertungen von echten Kunden
              </SectionSubtitle>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {testimonials.map((testimonial, index) => (
                <Card key={index} variant="elevated" className="p-6">
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-amber-500 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-400 mb-4 italic">"{testimonial.text}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-[#dc2626] to-[#ef4444] rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">{testimonial.name.charAt(0)}</span>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-100">{testimonial.name}</div>
                      <div className="text-sm text-gray-500">Verifizierter Kunde</div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </SectionContent>
        </Section>

        {/* CTA Section */}
        <Section variant="dark">
          <SectionContent>
            <div className="max-w-4xl mx-auto text-center">
              <TrendingUp className="w-16 h-16 text-red-500 mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-bold text-gray-100 mb-4">
                Überzeugt? Dann starten Sie jetzt!
              </h2>
              <p className="text-xl text-gray-500 mb-8">
                Entdecken Sie unsere Premium-Fahrzeuge oder lassen Sie sich persönlich beraten
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/fahrzeuge">
                  <Button size="xl">
                    Fahrzeuge ansehen
                  </Button>
                </Link>
                <Link to="/finanzierung">
                  <Button variant="outline" size="xl">
                    Finanzierung prüfen
                  </Button>
                </Link>
                <Link to="/kontakt">
                  <Button variant="outline" size="xl">
                    Kontakt aufnehmen
                  </Button>
                </Link>
              </div>
            </div>
          </SectionContent>
        </Section>
      </div>
    </>
  );
}
