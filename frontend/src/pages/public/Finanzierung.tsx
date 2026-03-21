import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import {
  CreditCard,
  CheckCircle,
  Shield,
  TrendingUp,
  Calculator,
  FileText,
  Users,
  ArrowRight,
  Euro,
  Zap,
  Lock,
} from 'lucide-react';
import Section, { SectionContent, SectionTitle, SectionSubtitle } from '../../components/ui/Section';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import { Input, Select } from '../../components/ui/FormField';
import Badge from '../../components/ui/Badge';
import Accordion from '../../components/ui/Accordion';

export default function Finanzierung() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    vehiclePrice: '',
    downPayment: '',
    term: '48',
    message: '',
  });

  const [monthlyPayment, setMonthlyPayment] = useState<number | null>(null);

  const calculateMonthly = () => {
    const price = parseFloat(formData.vehiclePrice) || 0;
    const down = parseFloat(formData.downPayment) || 0;
    const months = parseInt(formData.term) || 48;
    const rate = 0.0399; // 3.99% example rate

    if (price > 0) {
      const financed = price - down;
      const monthly = (financed * (rate / 12)) / (1 - Math.pow(1 + rate / 12, -months));
      setMonthlyPayment(Math.round(monthly));
    }
  };


  const benefits = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'Schnelle Zusage',
      description: 'Finanzierungsentscheidung innerhalb von 24 Stunden',
    },
    {
      icon: <Euro className="w-6 h-6" />,
      title: 'Faire Konditionen',
      description: 'Transparente Zinssätze ab 3,99% effektiv',
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Flexible Laufzeiten',
      description: '12 bis 84 Monate nach Ihren Wünschen',
    },
    {
      icon: <Lock className="w-6 h-6" />,
      title: 'Diskret & Sicher',
      description: 'Ihre Daten sind bei uns in sicheren Händen',
    },
  ];

  const steps = [
    {
      number: '01',
      title: 'Fahrzeug auswählen',
      description: 'Wählen Sie Ihr Wunschfahrzeug aus unserem Bestand oder lassen Sie sich beraten.',
    },
    {
      number: '02',
      title: 'Finanzierung anfragen',
      description: 'Füllen Sie unser Formular aus oder kontaktieren Sie uns direkt.',
    },
    {
      number: '03',
      title: 'Angebot erhalten',
      description: 'Wir erstellen Ihnen ein individuelles Finanzierungsangebot.',
    },
    {
      number: '04',
      title: 'Vertragsabschluss',
      description: 'Nach Ihrer Zusage kümmern wir uns um alle Formalitäten.',
    },
    {
      number: '05',
      title: 'Fahrzeug übergeben',
      description: 'Ihr Traumauto wird übergeben – Sie können losfahren!',
    },
  ];

  const faqItems = [
    {
      title: 'Welche Unterlagen benötige ich für eine Finanzierung?',
      content: 'Für eine Finanzierungsanfrage benötigen Sie: Gültigen Personalausweis oder Reisepass mit Meldebescheinigung, Ihre letzten drei Gehaltsabrechnungen und einen Nachweis über ein unbefristetes Arbeitsverhältnis (außerhalb der Probezeit).',
    },
    {
      title: 'Wie wirkt sich die Finanzierungsanfrage auf meinen SCHUFA-Score aus?',
      content: 'Unsere vorläufige Kreditanfrage ist eine reine "Konditionenanfrage". Diese ist absolut bonitätsneutral und hat keinerlei negativen Einfluss auf Ihren SCHUFA-Score. Erst beim finalen Vertragsabschluss wird der Kredit verbindlich eingetragen.',
    },
    {
      title: 'Was ist eine Ballonfinanzierung bzw. Zielfinanzierung?',
      content: 'Bei der Ballonfinanzierung zahlen Sie während der Laufzeit sehr kleine monatliche Raten. Am Vertragsende bleibt eine größere "Schlussrate" (der Ballon) offen. Diese können Sie wahlweise auf einmal ablösen, das Fahrzeug an uns zurückgeben (verbrieftes Rückgaberecht) oder zu neuen Konditionen weiterfinanzieren.',
    },
    {
      title: 'Sind jederzeit Sondertilgungen möglich?',
      content: 'Ja! Bei einer Ratenfinanzierung können Sie gesetzlich jederzeit Sondertilgungen leisten oder den Kredit komplett ablösen, um Zinsen zu sparen.',
    },
    {
      title: 'Wie hoch sollte meine Anzahlung sein?',
      content: 'Sie können bei uns Ihr Wunschfahrzeug auch problemlos komplett finanzieren (0,- Euro Anzahlung). Eine Anzahlung über 10-20% wird jedoch oft empfohlen, da so die Restschuld und damit Ihre monatliche Rate merklich sinkt.',
    },
    {
      title: 'Was passiert bei unerwarteter Krankheit oder Arbeitslosigkeit?',
      content: 'Auf Wunsch sichern wir Sie mit einer Restschuldversicherung (RSV) ab. Diese Zusatzversicherung übernimmt im Falle von unverschuldeter Arbeitslosigkeit, Krankentagegeldbezug oder im schwersten Fall für Hinterbliebene Ihre komplette Finanzierungsrate.',
    },
  ];

  return (
    <>
      <Helmet>
        <title>Finanzierung - Nordhessen Automobile</title>
        <meta name="description" content="Flexible Fahrzeugfinanzierung mit fairen Konditionen. Schnelle Zusage und individuelle Lösungen für Ihr Traumauto." />
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
                <CreditCard className="w-4 h-4" />
                Flexible Finanzierung
              </Badge>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                Ihr Traumauto –{' '}
                <span className="bg-gradient-to-r from-[#dc2626] to-[#ef4444] bg-clip-text text-transparent">
                  einfach finanziert
                </span>
              </h1>
              
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Faire Konditionen, schnelle Zusage und individuelle Lösungen. 
                Wir machen Ihren Autokauf möglich – transparent und unkompliziert.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="xl" rightIcon={<ArrowRight className="w-5 h-5" />}>
                  Jetzt Finanzierung anfragen
                </Button>
                <Button variant="outline" size="xl">
                  <Calculator className="w-5 h-5" />
                  Rate berechnen
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 pt-12 border-t border-zinc-800">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-1">ab 3,99%</div>
                  <div className="text-sm text-gray-400">effektiver Jahreszins</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-1">24h</div>
                  <div className="text-sm text-gray-400">Zusage-Garantie</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-1">12-84</div>
                  <div className="text-sm text-gray-400">Monate Laufzeit</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-1">0€</div>
                  <div className="text-sm text-gray-400">Bearbeitungsgebühr</div>
                </div>
              </div>
            </div>
          </SectionContent>
        </Section>

        {/* Benefits Section */}
        <Section variant="default">
          <SectionContent>
            <div className="text-center mb-12">
              <SectionTitle>Ihre Vorteile bei uns</SectionTitle>
              <SectionSubtitle>
                Wir bieten Ihnen mehr als nur eine Finanzierung
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

        {/* Financing Models */}
        <Section variant="dark">
          <SectionContent>
            <div className="text-center mb-12">
              <SectionTitle>Unsere Finanzierungsmodelle</SectionTitle>
              <SectionSubtitle>
                Maßgeschneidert auf Ihre Bedürfnisse und Lebenssituation im deutschen Markt
              </SectionSubtitle>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card variant="elevated" hover className="p-8 border-t-4 border-t-red-600">
                <h3 className="text-2xl font-bold text-white mb-4">Klassische Ratenfinanzierung</h3>
                <p className="text-gray-400 mb-6 min-h-[80px]">
                  Gleichbleibende monatliche Raten über die gesamte Vertragslaufzeit. Am Ende haben Sie das Fahrzeug komplett abbezahlt. Kein Restwertrisiko und 100% Planungssicherheit.
                </p>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-red-500" /> Konstante Raten</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-red-500" /> Fahrzeug sofort Ihr Eigentum am Ende</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-red-500" /> Laufzeit bis zu 96 Monate</li>
                </ul>
              </Card>

              <Card variant="elevated" hover className="p-8 border-t-4 border-t-red-600">
                <h3 className="text-2xl font-bold text-white mb-4">Ballonfinanzierung</h3>
                <p className="text-gray-400 mb-6 min-h-[80px]">
                  Äußerst niedrige monatliche Raten kombiniert mit einer Schlussrate am Ende der Laufzeit. Perfekt, wenn Sie liquide bleiben oder später umschichten möchten.
                </p>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-red-500" /> Sehr geringe monatliche Belastung</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-red-500" /> Individuell definierbare Schlussrate</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-red-500" /> Anschlussfinanzierung (Schlussrate) möglich</li>
                </ul>
              </Card>

              <Card variant="elevated" hover className="p-8 border-t-4 border-t-red-600">
                <h3 className="text-2xl font-bold text-white mb-4">3-Wege-Finanzierung</h3>
                <p className="text-gray-400 mb-6 min-h-[80px]">
                  Die flexibelste Finanzierung am Markt. Am Laufzeitende wählen Sie: Auto kaufen, Ballon weiterfinanzieren oder einfach an uns zurückgeben!
                </p>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-red-500" /> Absolute Entscheidungsfreiheit am Ende</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-red-500" /> Garantierter Rücknahmewert</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-red-500" /> Null Wertverlustrisiko</li>
                </ul>
              </Card>
            </div>
          </SectionContent>
        </Section>

        {/* Process Steps */}
        <Section variant="default">
          <SectionContent>
            <div className="text-center mb-12">
              <SectionTitle>So einfach geht's</SectionTitle>
              <SectionSubtitle>
                In 5 Schritten zu Ihrem finanzierten Traumauto
              </SectionSubtitle>
            </div>

            <div className="max-w-5xl mx-auto">
              <div className="space-y-6">
                {steps.map((step, index) => (
                  <Card key={index} variant="elevated" className="p-6 hover:border-red-500/50 transition-all">
                    <div className="flex items-start gap-6">
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 bg-gradient-to-r from-[#dc2626] to-[#ef4444] rounded-xl flex items-center justify-center">
                          <span className="text-2xl font-bold text-white">{step.number}</span>
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                        <p className="text-gray-400">{step.description}</p>
                      </div>
                      <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 hidden md:block" />
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </SectionContent>
        </Section>

        {/* Calculator & Form Section */}
        <Section variant="dark">
          <SectionContent>
            <div className="max-w-xl mx-auto">
              {/* Calculator */}
              <div>
                <h2 className="text-3xl font-bold text-white mb-6">
                  <Calculator className="w-8 h-8 inline-block mr-3 text-red-500" />
                  Ratenrechner
                </h2>
                <Card variant="elevated" className="p-6">
                  <div className="space-y-4">
                    <Input
                      label="Fahrzeugpreis"
                      type="number"
                      placeholder="25000"
                      value={formData.vehiclePrice}
                      onChange={(e) => setFormData({ ...formData, vehiclePrice: e.target.value })}
                      rightIcon={<span className="text-gray-400">€</span>}
                    />
                    <Input
                      label="Anzahlung (optional)"
                      type="number"
                      placeholder="5000"
                      value={formData.downPayment}
                      onChange={(e) => setFormData({ ...formData, downPayment: e.target.value })}
                      rightIcon={<span className="text-gray-400">€</span>}
                    />
                    <Select
                      label="Laufzeit"
                      value={formData.term}
                      onChange={(e) => setFormData({ ...formData, term: e.target.value })}
                      options={[
                        { value: '12', label: '12 Monate' },
                        { value: '24', label: '24 Monate' },
                        { value: '36', label: '36 Monate' },
                        { value: '48', label: '48 Monate' },
                        { value: '60', label: '60 Monate' },
                        { value: '72', label: '72 Monate' },
                        { value: '84', label: '84 Monate' },
                      ]}
                    />
                    <Button onClick={calculateMonthly} className="w-full" size="lg">
                      Rate berechnen
                    </Button>

                    {monthlyPayment && (
                      <div className="mt-6 p-6 bg-gradient-to-r from-[#dc2626] to-[#ef4444] rounded-xl text-center">
                        <div className="text-sm text-white/80 mb-2">Ihre monatliche Rate</div>
                        <div className="text-4xl font-bold text-white mb-2">
                          {monthlyPayment.toLocaleString('de-DE')} €
                        </div>
                        <div className="text-sm text-white/80">
                          bei {formData.term} Monaten Laufzeit
                        </div>
                      </div>
                    )}

                    <p className="text-xs text-gray-500 mt-4">
                      * Beispielrechnung. Bonität vorausgesetzt. Effektiver Jahreszins ab 3,99%.
                    </p>
                  </div>
                </Card>
              </div>


            </div>
          </SectionContent>
        </Section>

        {/* Requirements Section */}
        <Section variant="default">
          <SectionContent>
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <SectionTitle>Voraussetzungen</SectionTitle>
                <SectionSubtitle>
                  Was Sie für eine Finanzierung benötigen
                </SectionSubtitle>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card variant="elevated" className="p-6">
                  <Users className="w-12 h-12 text-red-500 mb-4" />
                  <h3 className="text-xl font-bold text-white mb-3">Persönliche Voraussetzungen</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Mindestalter 18 Jahre</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Wohnsitz in Deutschland</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Regelmäßiges Einkommen</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Positive Bonität</span>
                    </li>
                  </ul>
                </Card>

                <Card variant="elevated" className="p-6">
                  <FileText className="w-12 h-12 text-red-500 mb-4" />
                  <h3 className="text-xl font-bold text-white mb-3">Benötigte Unterlagen</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Personalausweis oder Reisepass</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Gehaltsabrechnungen (letzte 3 Monate)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Kontoauszüge</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Ggf. Nachweise über weitere Einkünfte</span>
                    </li>
                  </ul>
                </Card>
              </div>
            </div>
          </SectionContent>
        </Section>

        {/* FAQ Section */}
        <Section variant="dark">
          <SectionContent>
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <SectionTitle>Häufige Fragen</SectionTitle>
                <SectionSubtitle>
                  Antworten auf die wichtigsten Fragen zur Finanzierung
                </SectionSubtitle>
              </div>

              <Accordion items={faqItems} />

              <div className="text-center mt-8">
                <Link to="/faq">
                  <Button variant="outline" size="lg">
                    Alle FAQs ansehen
                  </Button>
                </Link>
              </div>
            </div>
          </SectionContent>
        </Section>

        {/* CTA Section */}
        <Section variant="dark">
          <SectionContent>
            <div className="max-w-4xl mx-auto text-center">
              <TrendingUp className="w-16 h-16 text-red-500 mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Bereit für Ihr Traumauto?
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Entdecken Sie unsere Fahrzeuge und finden Sie Ihr perfektes Auto
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/fahrzeuge">
                  <Button size="xl">
                    Fahrzeuge ansehen
                  </Button>
                </Link>
                <Link to="/kontakt">
                  <Button variant="outline" size="xl">
                    Persönliche Beratung
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
