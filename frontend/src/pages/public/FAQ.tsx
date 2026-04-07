import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Search, HelpCircle, MessageCircle, Phone, Mail } from 'lucide-react';
import Section, { SectionContent, SectionTitle, SectionSubtitle } from '../../components/ui/Section';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Accordion from '../../components/ui/Accordion';
import { useLanguage } from '../../contexts/LanguageContext';

export default function FAQ() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const { t } = useLanguage();

  const categories = [
    { id: 'all', label: t('faq.cat.all'), icon: <HelpCircle className="w-4 h-4" /> },
    { id: 'buying', label: t('faq.cat.buying'), icon: <HelpCircle className="w-4 h-4" /> },
    { id: 'financing', label: t('faq.cat.financing'), icon: <HelpCircle className="w-4 h-4" /> },
    { id: 'tradein', label: t('faq.cat.tradein'), icon: <HelpCircle className="w-4 h-4" /> },
    { id: 'warranty', label: t('faq.cat.warranty'), icon: <HelpCircle className="w-4 h-4" /> },
    { id: 'delivery', label: t('faq.cat.delivery'), icon: <HelpCircle className="w-4 h-4" /> },
    { id: 'documents', label: t('faq.cat.documents'), icon: <HelpCircle className="w-4 h-4" /> },
  ];

  const faqs = [
    // Fahrzeugkauf
    {
      category: 'buying',
      title: t('faq.buy.q1.t'),
      content: t('faq.buy.q1.a'),
    },
    {
      category: 'buying',
      title: t('faq.buy.q2.t'),
      content: t('faq.buy.q2.a'),
    },
    {
      category: 'buying',
      title: t('faq.buy.q3.t'),
      content: t('faq.buy.q3.a'),
    },
    {
      category: 'buying',
      title: t('faq.buy.q4.t'),
      content: t('faq.buy.q4.a'),
    },
    {
      category: 'buying',
      title: t('faq.buy.q5.t'),
      content: t('faq.buy.q5.a'),
    },

    // Finanzierung
    {
      category: 'financing',
      title: t('faq.fin.q1.t'),
      content: t('faq.fin.q1.a'),
    },
    {
      category: 'financing',
      title: t('faq.fin.q2.t'),
      content: t('faq.fin.q2.a'),
    },
    {
      category: 'financing',
      title: t('faq.fin.q3.t'),
      content: t('faq.fin.q3.a'),
    },
    {
      category: 'financing',
      title: t('faq.fin.q4.t'),
      content: t('faq.fin.q4.a'),
    },
    {
      category: 'financing',
      title: t('faq.fin.q5.t'),
      content: t('faq.fin.q5.a'),
    },

    // Inzahlungnahme
    {
      category: 'tradein',
      title: t('faq.tr.q1.t'),
      content: t('faq.tr.q1.a'),
    },
    {
      category: 'tradein',
      title: t('faq.tr.q2.t'),
      content: t('faq.tr.q2.a'),
    },
    {
      category: 'tradein',
      title: t('faq.tr.q3.t'),
      content: t('faq.tr.q3.a'),
    },
    {
      category: 'tradein',
      title: t('faq.tr.q4.t'),
      content: t('faq.tr.q4.a'),
    },

    // Garantie
    {
      category: 'warranty',
      title: t('faq.wa.q1.t'),
      content: t('faq.wa.q1.a'),
    },
    {
      category: 'warranty',
      title: t('faq.wa.q2.t'),
      content: t('faq.wa.q2.a'),
    },
    {
      category: 'warranty',
      title: t('faq.wa.q3.t'),
      content: t('faq.wa.q3.a'),
    },
    {
      category: 'warranty',
      title: t('faq.wa.q4.t'),
      content: t('faq.wa.q4.a'),
    },

    // Lieferung
    {
      category: 'delivery',
      title: t('faq.del.q1.t'),
      content: t('faq.del.q1.a'),
    },
    {
      category: 'delivery',
      title: t('faq.del.q2.t'),
      content: t('faq.del.q2.a'),
    },
    {
      category: 'delivery',
      title: t('faq.del.q3.t'),
      content: t('faq.del.q3.a'),
    },
    {
      category: 'delivery',
      title: t('faq.del.q4.t'),
      content: t('faq.del.q4.a'),
    },

    // Dokumente
    {
      category: 'documents',
      title: t('faq.doc.q1.t'),
      content: t('faq.doc.q1.a'),
    },
    {
      category: 'documents',
      title: t('faq.doc.q2.t'),
      content: t('faq.doc.q2.a'),
    },
    {
      category: 'documents',
      title: t('faq.doc.q3.t'),
      content: t('faq.doc.q3.a'),
    },
    {
      category: 'documents',
      title: t('faq.doc.q4.t'),
      content: t('faq.doc.q4.a'),
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
        <title>{t('faq.title')} - Nordhessen Automobile</title>
        <meta name="description" content={t('faq.subtitle')} />
      </Helmet>

      <div className="min-h-screen bg-[#1a1a1f] pt-20">
        {/* Hero Section */}
        <Section variant="default" withGlow>
          <SectionContent>
            <div className="max-w-4xl mx-auto text-center relative z-10">
              <Badge variant="premium" size="lg" className="mb-6">
                <HelpCircle className="w-4 h-4" />
                {t('faq.cat.all')}
              </Badge>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-100 mb-6">
                {t('faq.cat.all')}{' '}
                <span className="bg-gradient-to-r from-[#dc2626] to-[#ef4444] bg-clip-text text-transparent">
                  FAQ
                </span>
              </h1>
              
              <p className="text-xl text-gray-500 mb-8 leading-relaxed">
                {t('faq.subtitle')}
              </p>

              {/* Search Bar */}
              <div className="relative max-w-2xl mx-auto">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder={t('faq.search_placeholder')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white/[0.02] border border-white/[0.06] rounded-xl text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#ef4444] focus:border-transparent"
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
                      : 'bg-white/[0.02] text-gray-400 hover:bg-white/[0.03] border border-white/[0.06]'
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
                  <h3 className="text-xl font-bold text-gray-100 mb-2">{t('faq.no_results')}</h3>
                  <p className="text-gray-500">
                    {t('faq.no_results_desc')}
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
                <SectionTitle>{t('faq.contact.title')}</SectionTitle>
                <SectionSubtitle>
                  {t('faq.contact.subtitle')}
                </SectionSubtitle>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card variant="elevated" className="p-6 text-center group hover:border-red-500/50 transition-all">
                  <div className="w-16 h-16 bg-gradient-to-r from-[#dc2626] to-[#ef4444] rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <Phone className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-100 mb-2">{t('faq.contact.phone')}</h3>
                  <p className="text-gray-500 text-sm mb-4">Mo-Fr: 09:00-18:00 Uhr</p>
                  <a href="tel:+4956193004649" className="text-red-500 hover:text-[#f87171] font-semibold">
                    0561 930 04 649
                  </a>
                </Card>

                <Card variant="elevated" className="p-6 text-center group hover:border-red-500/50 transition-all">
                  <div className="w-16 h-16 bg-gradient-to-r from-[#dc2626] to-[#ef4444] rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <Mail className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-100 mb-2">{t('faq.contact.email')}</h3>
                  <p className="text-gray-500 text-sm mb-4">Antwort innerhalb 24h</p>
                  <a href="mailto:info@nordhessen-automobile.de" className="text-red-500 hover:text-[#f87171] font-semibold break-all">
                    info@nordhessen-automobile.de
                  </a>
                </Card>

                <Card variant="elevated" className="p-6 text-center group hover:border-red-500/50 transition-all">
                  <div className="w-16 h-16 bg-gradient-to-r from-[#dc2626] to-[#ef4444] rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <MessageCircle className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-100 mb-2">{t('faq.contact.form')}</h3>
                  <p className="text-gray-500 text-sm mb-4">Detaillierte Anfragen</p>
                  <Link to="/kontakt">
                    <Button variant="outline" size="sm">
                      {t('car.error.contact')}
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
              <h2 className="text-3xl font-bold text-gray-100 mb-8">{t('faq.links.title')}</h2>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/finanzierung">
                  <Button variant="outline" size="lg">
                    {t('fin.hero.title')}
                  </Button>
                </Link>
                <Link to="/inzahlungnahme">
                  <Button variant="outline" size="lg">
                    {t('nav.tradein')}
                  </Button>
                </Link>
                <Link to="/ueber-uns">
                  <Button variant="outline" size="lg">
                    {t('faq.links.about')}
                  </Button>
                </Link>
                <Link to="/fahrzeuge">
                  <Button size="lg">
                    {t('faq.links.browse')}
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
