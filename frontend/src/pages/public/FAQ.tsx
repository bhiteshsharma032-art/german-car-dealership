import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Search, HelpCircle, MessageCircle, Phone, Mail } from 'lucide-react';
import Section, { SectionContent, SectionTitle, SectionSubtitle } from '../../components/ui/Section';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Accordion from '../../components/ui/Accordion';

export default function FAQ() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'Alle Fragen', icon: <HelpCircle className="w-4 h-4" /> },
    { id: 'buying', label: 'Fahrzeugkauf', icon: <HelpCircle className="w-4 h-4" /> },
    { id: 'financing', label: 'Finanzierung', icon: <HelpCircle className="w-4 h-4" /> },
    { id: 'tradein', label: 'Inzahlungnahme', icon: <HelpCircle className="w-4 h-4" /> },
    { id: 'warranty', label: 'Garantie', icon: <HelpCircle className="w-4 h-4" /> },
    { id: 'delivery', label: 'Lieferung', icon: <HelpCircle className="w-4 h-4" /> },
    { id: 'documents', label: 'Dokumente', icon: <HelpCircle className="w-4 h-4" /> },
  ];

  const faqs = [
    // Fahrzeugkauf
    {
      category: 'buying',
      title: 'Wie kann ich eine Probefahrt vereinbaren?',
      content: 'Sie können eine Probefahrt direkt über unser Kontaktformular, telefonisch oder per E-Mail anfragen. Wir vereinbaren dann einen passenden Termin mit Ihnen. Bitte bringen Sie Ihren Führerschein zur Probefahrt mit.',
    },
    {
      category: 'buying',
      title: 'Kann ich ein Fahrzeug reservieren?',
      content: 'Ja, Sie können ein Fahrzeug gegen eine Anzahlung reservieren. Die Reservierung ist für 7 Tage gültig. Kontaktieren Sie uns für weitere Details zur Reservierungsgebühr.',
    },
    {
      category: 'buying',
      title: 'Sind alle Fahrzeuge geprüft?',
      content: 'Ja, alle unsere Fahrzeuge durchlaufen eine gründliche technische Prüfung durch unsere Experten. Wir stellen sicher, dass jedes Fahrzeug unseren hohen Qualitätsstandards entspricht.',
    },
    {
      category: 'buying',
      title: 'Kann ich ein Fahrzeug vor dem Kauf begutachten lassen?',
      content: 'Selbstverständlich! Sie können das Fahrzeug von einem unabhängigen Gutachter Ihrer Wahl prüfen lassen. Vereinbaren Sie einfach einen Termin mit uns.',
    },
    {
      category: 'buying',
      title: 'Welche Zahlungsmethoden akzeptieren Sie?',
      content: 'Wir akzeptieren Barzahlung, Banküberweisung und Finanzierung über unsere Partnerbanken. Bei größeren Beträgen empfehlen wir eine Banküberweisung.',
    },

    // Finanzierung
    {
      category: 'financing',
      title: 'Welche Finanzierungsmöglichkeiten bieten Sie an?',
      content: 'Wir bieten flexible Finanzierungsoptionen mit Laufzeiten von 12 bis 84 Monaten. Die Zinssätze beginnen ab 3,99% effektiv, abhängig von Ihrer Bonität und der gewählten Laufzeit.',
    },
    {
      category: 'financing',
      title: 'Welche Unterlagen benötige ich für eine Finanzierung?',
      content: 'Für eine Finanzierungsanfrage benötigen Sie: Personalausweis oder Reisepass, aktuelle Gehaltsabrechnungen (letzte 3 Monate), Kontoauszüge und ggf. Nachweise über weitere Einkünfte.',
    },
    {
      category: 'financing',
      title: 'Wie lange dauert die Finanzierungszusage?',
      content: 'In der Regel erhalten Sie innerhalb von 24 Stunden eine Rückmeldung zu Ihrer Finanzierungsanfrage. Bei positiver Bonität kann die Zusage oft noch schneller erfolgen.',
    },
    {
      category: 'financing',
      title: 'Ist eine Anzahlung erforderlich?',
      content: 'Eine Anzahlung ist nicht zwingend erforderlich, wird aber empfohlen. Üblich sind 10-20% des Kaufpreises. Eine höhere Anzahlung reduziert die monatliche Rate und die Gesamtkosten.',
    },
    {
      category: 'financing',
      title: 'Kann ich die Finanzierung vorzeitig ablösen?',
      content: 'Ja, eine vorzeitige Ablösung ist jederzeit möglich. Bitte beachten Sie, dass je nach Vertrag eine Vorfälligkeitsentschädigung anfallen kann. Details finden Sie in Ihrem Finanzierungsvertrag.',
    },

    // Inzahlungnahme
    {
      category: 'tradein',
      title: 'Nehmen Sie mein altes Fahrzeug in Zahlung?',
      content: 'Ja, wir nehmen Ihr aktuelles Fahrzeug gerne in Zahlung. Unsere Experten bewerten Ihr Fahrzeug fair und transparent basierend auf dem aktuellen Marktwert.',
    },
    {
      category: 'tradein',
      title: 'Wie wird der Wert meines Fahrzeugs ermittelt?',
      content: 'Die Bewertung erfolgt anhand verschiedener Faktoren: Marke, Modell, Baujahr, Kilometerstand, Zustand, Ausstattung und aktuelle Marktsituation. Wir nutzen professionelle Bewertungstools für eine faire Einschätzung.',
    },
    {
      category: 'tradein',
      title: 'Muss ich mein Fahrzeug verkaufen, um bei Ihnen zu kaufen?',
      content: 'Nein, die Inzahlungnahme ist optional. Sie können Ihr neues Fahrzeug auch ohne Inzahlungnahme Ihres alten Fahrzeugs erwerben.',
    },
    {
      category: 'tradein',
      title: 'Wie lange ist das Ankaufsangebot gültig?',
      content: 'Unser Ankaufsangebot ist in der Regel 7 Tage gültig. Da sich Marktwerte ändern können, behalten wir uns vor, das Angebot nach Ablauf dieser Frist anzupassen.',
    },

    // Garantie
    {
      category: 'warranty',
      title: 'Bieten Sie eine Garantie auf die Fahrzeuge?',
      content: 'Ja, alle unsere Fahrzeuge werden mit einer Garantie verkauft. Die Garantiedauer und der Umfang variieren je nach Fahrzeug und Alter. Details besprechen wir gerne persönlich.',
    },
    {
      category: 'warranty',
      title: 'Was deckt die Garantie ab?',
      content: 'Unsere Garantie deckt in der Regel Motor, Getriebe und wichtige mechanische Komponenten ab. Verschleißteile wie Reifen, Bremsen und Batterie sind üblicherweise ausgenommen. Genaue Details erhalten Sie beim Kauf.',
    },
    {
      category: 'warranty',
      title: 'Kann ich die Garantie erweitern?',
      content: 'Ja, wir bieten verschiedene Garantieerweiterungen an. Sie können die Laufzeit verlängern oder den Leistungsumfang erweitern. Sprechen Sie uns für ein individuelles Angebot an.',
    },
    {
      category: 'warranty',
      title: 'Was passiert im Garantiefall?',
      content: 'Im Garantiefall kontaktieren Sie uns bitte umgehend. Wir koordinieren die Reparatur mit unseren Partnerwerkstätten. Die Abwicklung erfolgt direkt über uns.',
    },

    // Lieferung
    {
      category: 'delivery',
      title: 'Liefern Sie Fahrzeuge deutschlandweit?',
      content: 'Ja, wir bieten einen deutschlandweiten Lieferservice an. Die Kosten richten sich nach der Entfernung und werden individuell berechnet. Kontaktieren Sie uns für ein konkretes Angebot.',
    },
    {
      category: 'delivery',
      title: 'Wie lange dauert die Lieferung?',
      content: 'Die Lieferzeit beträgt in der Regel 3-7 Werktage nach Vertragsabschluss und Zahlungseingang. Bei Finanzierung kann es etwas länger dauern, bis alle Formalitäten abgeschlossen sind.',
    },
    {
      category: 'delivery',
      title: 'Kann ich das Fahrzeug auch selbst abholen?',
      content: 'Selbstverständlich! Sie können Ihr Fahrzeug gerne persönlich bei uns abholen. Wir nehmen uns Zeit für eine ausführliche Übergabe und Einweisung.',
    },
    {
      category: 'delivery',
      title: 'Ist das Fahrzeug bei Übergabe zugelassen?',
      content: 'Auf Wunsch übernehmen wir die Zulassung für Sie. Alternativ können Sie das Fahrzeug mit Kurzzeitkennzeichen oder auf einem Anhänger abholen und selbst zulassen.',
    },

    // Dokumente
    {
      category: 'documents',
      title: 'Welche Dokumente erhalte ich beim Kauf?',
      content: 'Sie erhalten: Fahrzeugbrief (Zulassungsbescheinigung Teil II), Fahrzeugschein (Teil I), Kaufvertrag, COC-Papiere (falls vorhanden), Serviceheft, HU-Bericht und alle vorhandenen Rechnungen.',
    },
    {
      category: 'documents',
      title: 'Ist ein Serviceheft vorhanden?',
      content: 'Bei den meisten unserer Fahrzeuge ist ein Serviceheft vorhanden. Falls nicht, können wir oft die Servicehistorie über die Vertragswerkstätten nachvollziehen.',
    },
    {
      category: 'documents',
      title: 'Erhalte ich eine Rechnung?',
      content: 'Ja, Sie erhalten selbstverständlich eine ordnungsgemäße Rechnung für Ihren Fahrzeugkauf. Diese benötigen Sie auch für die Zulassung.',
    },
    {
      category: 'documents',
      title: 'Was ist, wenn Dokumente fehlen?',
      content: 'Fehlende Dokumente wie Fahrzeugbrief oder COC-Papiere können wir in der Regel nachbestellen. Dies kann jedoch einige Wochen dauern und zusätzliche Kosten verursachen.',
    },
  ];

  const filteredFaqs = faqs.filter((faq) => {
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    const matchesSearch = searchQuery === '' || 
      faq.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <Helmet>
        <title>Häufige Fragen (FAQ) - Nordhessen Automobile</title>
        <meta name="description" content="Antworten auf häufig gestellte Fragen zu Fahrzeugkauf, Finanzierung, Garantie und mehr." />
      </Helmet>

      <div className="min-h-screen bg-[#171717] pt-20">
        {/* Hero Section */}
        <Section variant="default" withGlow>
          <SectionContent>
            <div className="max-w-4xl mx-auto text-center relative z-10">
              <Badge variant="premium" size="lg" className="mb-6">
                <HelpCircle className="w-4 h-4" />
                Häufige Fragen
              </Badge>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                Wie können wir{' '}
                <span className="bg-gradient-to-r from-[#dc2626] to-[#ef4444] bg-clip-text text-transparent">
                  Ihnen helfen?
                </span>
              </h1>
              
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Finden Sie schnell Antworten auf die häufigsten Fragen rund um 
                Fahrzeugkauf, Finanzierung und Service.
              </p>

              {/* Search Bar */}
              <div className="relative max-w-2xl mx-auto">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Frage suchen..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-[#1a1a1a] border border-zinc-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
            </div>
          </SectionContent>
        </Section>

        {/* Category Filter */}
        <Section variant="default">
          <SectionContent>
            <div className="flex flex-wrap gap-3 justify-center mb-12">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all flex items-center gap-2 ${
                    activeCategory === category.id
                      ? 'bg-gradient-to-r from-[#dc2626] to-[#ef4444] text-white shadow-lg'
                      : 'bg-[#1a1a1a] text-gray-300 hover:bg-[#262626]'
                  }`}
                >
                  {category.icon}
                  {category.label}
                </button>
              ))}
            </div>

            {/* FAQ List */}
            <div className="max-w-4xl mx-auto">
              {filteredFaqs.length > 0 ? (
                <Card variant="elevated" className="p-6">
                  <Accordion
                    items={filteredFaqs.map((faq) => ({
                      title: faq.title,
                      content: faq.content,
                    }))}
                  />
                </Card>
              ) : (
                <Card variant="elevated" className="p-12 text-center">
                  <HelpCircle className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">Keine Ergebnisse gefunden</h3>
                  <p className="text-gray-400">
                    Versuchen Sie es mit anderen Suchbegriffen oder wählen Sie eine andere Kategorie.
                  </p>
                </Card>
              )}
            </div>
          </SectionContent>
        </Section>

        {/* Contact CTA */}
        <Section variant="dark">
          <SectionContent>
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <SectionTitle>Ihre Frage ist nicht dabei?</SectionTitle>
                <SectionSubtitle>
                  Kontaktieren Sie uns – wir helfen Ihnen gerne weiter
                </SectionSubtitle>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card variant="elevated" className="p-6 text-center group hover:border-red-500/50 transition-all">
                  <div className="w-16 h-16 bg-gradient-to-r from-[#dc2626] to-[#ef4444] rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <Phone className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">Telefon</h3>
                  <p className="text-gray-400 text-sm mb-4">Mo-Fr: 09:00-18:00 Uhr</p>
                  <a href="tel:+4956193004649" className="text-red-500 hover:text-red-400 font-semibold">
                    0561 930 04 649
                  </a>
                </Card>

                <Card variant="elevated" className="p-6 text-center group hover:border-red-500/50 transition-all">
                  <div className="w-16 h-16 bg-gradient-to-r from-[#dc2626] to-[#ef4444] rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <Mail className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">E-Mail</h3>
                  <p className="text-gray-400 text-sm mb-4">Antwort innerhalb 24h</p>
                  <a href="mailto:info@nordhessen-automobile.de" className="text-red-500 hover:text-red-400 font-semibold break-all">
                    info@nordhessen-automobile.de
                  </a>
                </Card>

                <Card variant="elevated" className="p-6 text-center group hover:border-red-500/50 transition-all">
                  <div className="w-16 h-16 bg-gradient-to-r from-[#dc2626] to-[#ef4444] rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <MessageCircle className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">Kontaktformular</h3>
                  <p className="text-gray-400 text-sm mb-4">Detaillierte Anfragen</p>
                  <Link to="/kontakt">
                    <Button variant="outline" size="sm">
                      Zum Formular
                    </Button>
                  </Link>
                </Card>
              </div>
            </div>
          </SectionContent>
        </Section>

        {/* Quick Links */}
        <Section variant="default">
          <SectionContent>
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-white mb-8">Weitere hilfreiche Links</h2>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/finanzierung">
                  <Button variant="outline" size="lg">
                    Finanzierung
                  </Button>
                </Link>
                <Link to="/inzahlungnahme">
                  <Button variant="outline" size="lg">
                    Inzahlungnahme
                  </Button>
                </Link>
                <Link to="/ueber-uns">
                  <Button variant="outline" size="lg">
                    Über uns
                  </Button>
                </Link>
                <Link to="/fahrzeuge">
                  <Button size="lg">
                    Fahrzeuge ansehen
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
