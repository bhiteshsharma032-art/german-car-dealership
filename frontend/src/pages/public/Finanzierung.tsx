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
import { useLanguage } from '../../contexts/LanguageContext';

export default function Finanzierung() {
  const { t } = useLanguage();
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
      title: t('fin.benefits.1.title'),
      description: t('fin.benefits.1.desc'),
    },
    {
      icon: <Euro className="w-6 h-6" />,
      title: t('fin.benefits.2.title'),
      description: t('fin.benefits.2.desc'),
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: t('fin.benefits.3.title'),
      description: t('fin.benefits.3.desc'),
    },
    {
      icon: <Lock className="w-6 h-6" />,
      title: t('fin.benefits.4.title'),
      description: t('fin.benefits.4.desc'),
    },
  ];

  const steps = [
    {
      number: '01',
      title: t('fin.steps.1.title'),
      description: t('fin.steps.1.desc'),
    },
    {
      number: '02',
      title: t('fin.steps.2.title'),
      description: t('fin.steps.2.desc'),
    },
    {
      number: '03',
      title: t('fin.steps.3.title'),
      description: t('fin.steps.3.desc'),
    },
    {
      number: '04',
      title: t('fin.steps.4.title'),
      description: t('fin.steps.4.desc'),
    },
    {
      number: '05',
      title: t('fin.steps.5.title'),
      description: t('fin.steps.5.desc'),
    },
  ];

  const faqItems = [
    {
      title: t('fin.faq.1.t'),
      content: t('fin.faq.1.a'),
    },
    {
      title: t('fin.faq.2.t'),
      content: t('fin.faq.2.a'),
    },
    {
      title: t('fin.faq.3.t'),
      content: t('fin.faq.3.a'),
    },
    {
      title: t('fin.faq.4.t'),
      content: t('fin.faq.4.a'),
    },
    {
      title: t('fin.faq.5.t'),
      content: t('fin.faq.5.a'),
    },
    {
      title: t('fin.faq.6.t'),
      content: t('fin.faq.6.a'),
    },
  ];

  return (
    <>
      <Helmet>
        <title>{t('nav.financing')} - Nordhessen Automobile</title>
        <meta name="description" content={t('fin.hero.subtitle')} />
      </Helmet>

      <div className="min-h-screen bg-[#1a1a1f] pt-20">
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
                {t('fin.hero.badge')}
              </Badge>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-100 mb-6">
                {t('fin.hero.title1')}{' '}
                <span className="bg-gradient-to-r from-[#dc2626] to-[#ef4444] bg-clip-text text-transparent">
                  {t('fin.hero.title2')}
                </span>
              </h1>
              
              <p className="text-xl text-gray-500 mb-8 leading-relaxed">
                {t('fin.hero.subtitle')}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/kontakt">
                  <Button size="xl" rightIcon={<ArrowRight className="w-5 h-5" />}>
                    {t('fin.hero.cta.inquiry')}
                  </Button>
                </Link>
                <Button variant="outline" size="xl" onClick={() => document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' })}>
                  <Calculator className="w-5 h-5" />
                  {t('fin.hero.cta.calculate')}
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 pt-12 border-t border-white/[0.06]">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-100 mb-1">{t('fin.hero.stats.apr')}</div>
                  <div className="text-sm text-gray-500">{t('fin.hero.stats.apr_label')}</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-100 mb-1">{t('fin.hero.stats.approval')}</div>
                  <div className="text-sm text-gray-500">{t('fin.hero.stats.approval_label')}</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-100 mb-1">{t('fin.hero.stats.term')}</div>
                  <div className="text-sm text-gray-500">{t('fin.hero.stats.term_label')}</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-100 mb-1">{t('fin.hero.stats.fee')}</div>
                  <div className="text-sm text-gray-500">{t('fin.hero.stats.fee_label')}</div>
                </div>
              </div>
            </div>
          </SectionContent>
        </Section>

        {/* Benefits Section */}
        <Section variant="default">
          <SectionContent>
            <div className="text-center mb-12">
              <SectionTitle>{t('fin.benefits.title')}</SectionTitle>
              <SectionSubtitle>
                {t('fin.benefits.subtitle')}
              </SectionSubtitle>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit, index) => (
                <Card key={index} variant="elevated" hover className="p-6 text-center group">
                  <div className="w-16 h-16 bg-gradient-to-r from-[#dc2626] to-[#ef4444] rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    {benefit.icon}
                  </div>
                  <h3 className="text-lg font-bold text-gray-100 mb-2">{benefit.title}</h3>
                  <p className="text-gray-500 text-sm">{benefit.description}</p>
                </Card>
              ))}
            </div>
          </SectionContent>
        </Section>

        {/* Financing Models */}
        <Section variant="dark">
          <SectionContent>
            <div className="text-center mb-12">
              <SectionTitle>{t('fin.models.title')}</SectionTitle>
              <SectionSubtitle>
                {t('fin.models.subtitle')}
              </SectionSubtitle>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card variant="elevated" hover className="p-8 border-t-4 border-t-red-600">
                <h3 className="text-2xl font-bold text-gray-100 mb-4">{t('fin.models.1.title')}</h3>
                <p className="text-gray-500 mb-6 min-h-[80px]">
                  {t('fin.models.1.desc')}
                </p>
                <ul className="space-y-3 text-gray-400">
                  <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-red-500" /> {t('fin.models.1.feat1')}</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-red-500" /> {t('fin.models.1.feat2')}</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-red-500" /> {t('fin.models.1.feat3')}</li>
                </ul>
              </Card>

              <Card variant="elevated" hover className="p-8 border-t-4 border-t-red-600">
                <h3 className="text-2xl font-bold text-gray-100 mb-4">{t('fin.models.2.title')}</h3>
                <p className="text-gray-500 mb-6 min-h-[80px]">
                  {t('fin.models.2.desc')}
                </p>
                <ul className="space-y-3 text-gray-400">
                  <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-red-500" /> {t('fin.models.2.feat1')}</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-red-500" /> {t('fin.models.2.feat2')}</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-red-500" /> {t('fin.models.2.feat3')}</li>
                </ul>
              </Card>

              <Card variant="elevated" hover className="p-8 border-t-4 border-t-red-600">
                <h3 className="text-2xl font-bold text-gray-100 mb-4">{t('fin.models.3.title')}</h3>
                <p className="text-gray-500 mb-6 min-h-[80px]">
                  {t('fin.models.3.desc')}
                </p>
                <ul className="space-y-3 text-gray-400">
                  <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-red-500" /> {t('fin.models.3.feat1')}</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-red-500" /> {t('fin.models.3.feat2')}</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-red-500" /> {t('fin.models.3.feat3')}</li>
                </ul>
              </Card>
            </div>
          </SectionContent>
        </Section>

        {/* Process Steps */}
        <Section variant="default">
          <SectionContent>
            <div className="text-center mb-12">
              <SectionTitle>{t('fin.steps.title')}</SectionTitle>
              <SectionSubtitle>
                {t('fin.steps.subtitle')}
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
                        <h3 className="text-xl font-bold text-gray-100 mb-2">{step.title}</h3>
                        <p className="text-gray-500">{step.description}</p>
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
        <Section variant="default" id="calculator">
          <SectionContent>
            <div className="max-w-xl mx-auto">
              {/* Calculator */}
              <div>
                <h2 className="text-3xl font-bold text-gray-100 mb-6">
                  <Calculator className="w-8 h-8 inline-block mr-3 text-red-500" />
                  {t('fin.calc.title')}
                </h2>
                <Card variant="elevated" className="p-6">
                  <div className="space-y-4">
                    <Input
                      label={t('fin.calc.price')}
                      type="number"
                      placeholder="25000"
                      value={formData.vehiclePrice}
                      onChange={(e) => setFormData({ ...formData, vehiclePrice: e.target.value })}
                      rightIcon={<span className="text-gray-400">€</span>}
                    />
                    <Input
                      label={t('fin.calc.downpayment')}
                      type="number"
                      placeholder="5000"
                      value={formData.downPayment}
                      onChange={(e) => setFormData({ ...formData, downPayment: e.target.value })}
                      rightIcon={<span className="text-gray-400">€</span>}
                    />
                    <Select
                      label={t('fin.calc.term')}
                      value={formData.term}
                      onChange={(e) => setFormData({ ...formData, term: e.target.value })}
                      options={[
                        { value: '12', label: '12 ' + t('car.data.months') },
                        { value: '24', label: '24 ' + t('car.data.months') },
                        { value: '36', label: '36 ' + t('car.data.months') },
                        { value: '48', label: '48 ' + t('car.data.months') },
                        { value: '60', label: '60 ' + t('car.data.months') },
                        { value: '72', label: '72 ' + t('car.data.months') },
                        { value: '84', label: '84 ' + t('car.data.months') },
                      ]}
                    />
                    <Button onClick={calculateMonthly} className="w-full" size="lg">
                      {t('fin.calc.button')}
                    </Button>

                    {monthlyPayment && (
                      <div className="mt-6 p-6 bg-gradient-to-r from-[#dc2626] to-[#ef4444] rounded-xl text-center">
                        <div className="text-sm text-white/80 mb-2">{t('fin.calc.result.label')}</div>
                        <div className="text-4xl font-bold text-white mb-2">
                          {monthlyPayment.toLocaleString('de-DE')} €
                        </div>
                        <div className="text-sm text-white/80">
                          {t('fin.calc.result.desc').replace('{term}', formData.term)}
                        </div>
                      </div>
                    )}

                    <p className="text-xs text-gray-500 mt-4">
                      {t('fin.calc.disclaimer')}
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
                <SectionTitle>{t('fin.req.title')}</SectionTitle>
                <SectionSubtitle>
                  {t('fin.req.subtitle')}
                </SectionSubtitle>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card variant="elevated" className="p-6">
                  <Users className="w-12 h-12 text-red-500 mb-4" />
                  <h3 className="text-xl font-bold text-gray-100 mb-3">{t('fin.req.personal')}</h3>
                  <ul className="space-y-2 text-gray-400">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>{t('fin.requirements.1') || 'Mindestalter 18 Jahre'}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>{t('fin.requirements.2') || 'Wohnsitz in Deutschland'}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>{t('fin.requirements.3') || 'Regelmäßiges Einkommen'}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>{t('fin.requirements.4') || 'Positive Bonität'}</span>
                    </li>
                  </ul>
                </Card>

                <Card variant="elevated" className="p-6">
                  <FileText className="w-12 h-12 text-red-500 mb-4" />
                  <h3 className="text-xl font-bold text-gray-100 mb-3">{t('fin.req.documents')}</h3>
                  <ul className="space-y-2 text-gray-400">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>{t('fin.documents.1') || 'Personalausweis oder Reisepass'}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>{t('fin.documents.2') || 'Gehaltsabrechnungen (letzte 3 Monate)'}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>{t('fin.documents.3') || 'Kontoauszüge'}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>{t('fin.documents.4') || 'Ggf. Nachweise über weitere Einkünfte'}</span>
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
                <SectionTitle>{t('fin.faq.title')}</SectionTitle>
                <SectionSubtitle>
                  {t('fin.faq.subtitle')}
                </SectionSubtitle>
              </div>

              <Accordion items={faqItems} />

              <div className="text-center mt-8">
                <Link to="/faq">
                  <Button variant="outline" size="lg">
                    {t('nav.faq')}
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
              <h2 className="text-3xl md:text-4xl font-bold text-gray-100 mb-4">
                {t('fin.cta.title')}
              </h2>
              <p className="text-xl text-gray-500 mb-8">
                {t('fin.cta.subtitle')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/fahrzeuge">
                  <Button size="xl">
                    {t('nav.vehicles')}
                  </Button>
                </Link>
                <Link to="/kontakt">
                  <Button variant="outline" size="xl">
                    {t('nav.contact')}
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
