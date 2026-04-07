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
import { useLanguage } from '../../contexts/LanguageContext';

export default function Service() {
  const { t } = useLanguage();

  const services = [
    {
      icon: <CheckCircle className="w-8 h-8" />,
      title: t('service.list.1.title'),
      description: t('service.list.1.desc'),
      features: [
        t('service.list.1.f1'),
        t('service.list.1.f2'),
        t('service.list.1.f3'),
        t('service.list.1.f4'),
        t('service.list.1.f5'),
      ],
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: t('service.list.2.title'),
      description: t('service.list.2.desc'),
      features: [
        t('service.list.2.f1'),
        t('service.list.2.f2'),
        t('service.list.2.f3'),
        t('service.list.2.f4'),
        t('service.list.2.f5'),
      ],
    },
    {
      icon: <CreditCard className="w-8 h-8" />,
      title: t('service.list.3.title'),
      description: t('service.list.3.desc'),
      features: [
        t('service.list.3.f1'),
        t('service.list.3.f2'),
        t('service.list.3.f3'),
        t('service.list.3.f4'),
        t('service.list.3.f5'),
      ],
    },
    {
      icon: <RefreshCw className="w-8 h-8" />,
      title: t('service.list.4.title'),
      description: t('service.list.4.desc'),
      features: [
        t('service.list.4.f1'),
        t('service.list.4.f2'),
        t('service.list.4.f3'),
        t('service.list.4.f4'),
        t('service.list.4.f5'),
      ],
    },
    {
      icon: <FileCheck className="w-8 h-8" />,
      title: t('service.list.5.title'),
      description: t('service.list.5.desc'),
      features: [
        t('service.list.5.f1'),
        t('service.list.5.f2'),
        t('service.list.5.f3'),
        t('service.list.5.f4'),
        t('service.list.5.f5'),
      ],
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: t('service.list.6.title'),
      description: t('service.list.6.desc'),
      features: [
        t('service.list.6.f1'),
        t('service.list.6.f2'),
        t('service.list.6.f3'),
        t('service.list.6.f4'),
        t('service.list.6.f5'),
      ],
    },
  ];

  const advantages = [
    {
      icon: <Star className="w-6 h-6" />,
      title: t('service.advantages.1.title'),
      description: t('service.advantages.1.desc'),
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: t('service.advantages.2.title'),
      description: t('service.advantages.2.desc'),
    },
    {
      icon: <Euro className="w-6 h-6" />,
      title: t('service.advantages.3.title'),
      description: t('service.advantages.3.desc'),
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: t('service.advantages.4.title'),
      description: t('service.advantages.4.desc'),
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: t('service.advantages.5.title'),
      description: t('service.advantages.5.desc'),
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: t('service.advantages.6.title'),
      description: t('service.advantages.6.desc'),
    },
  ];

  const stats = [
    { value: '5.000+', label: t('service.stats.customers') },
    { value: '500+', label: t('service.stats.cars') },
    { value: '15+', label: t('service.stats.experience') },
    { value: '98%', label: t('service.stats.referral') },
  ];

  const testimonials = [
    {
      name: t('service.testimonials.1.name'),
      rating: 5,
      text: t('service.testimonials.1.text'),
    },
    {
      name: t('service.testimonials.2.name'),
      rating: 5,
      text: t('service.testimonials.2.text'),
    },
    {
      name: t('service.testimonials.3.name'),
      rating: 5,
      text: t('service.testimonials.3.text'),
    },
  ];

  return (
    <>
      <Helmet>
        <title>{t('nav.services')} - Nordhessen Automobile</title>
        <meta name="description" content={t('service.hero.subtitle')} />
      </Helmet>

      <div className="min-h-screen bg-[#1a1a1f] pt-20">
        {/* Hero Section */}
        <Section variant="default" withGlow>
          <SectionContent>
            <div className="max-w-4xl mx-auto text-center relative z-10">
              <Badge variant="premium" size="lg" className="mb-6">
                <Award className="w-4 h-4" />
                {t('service.hero.badge')}
              </Badge>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-100 mb-6">
                {t('service.hero.title1')}{' '}
                <span className="bg-gradient-to-r from-[#dc2626] to-[#ef4444] bg-clip-text text-transparent">
                  {t('service.hero.title2')}
                </span>
              </h1>
              
              <p className="text-xl text-gray-500 mb-8 leading-relaxed">
                {t('service.hero.subtitle')}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/fahrzeuge">
                  <Button size="xl">
                    {t('service.hero.cta.browse')}
                  </Button>
                </Link>
                <Link to="/kontakt">
                  <Button variant="outline" size="xl">
                    <Phone className="w-5 h-5" />
                    {t('service.hero.cta.consult')}
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
              <SectionTitle>{t('service.list.title')}</SectionTitle>
              <SectionSubtitle>
                {t('service.list.subtitle')}
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
              <SectionTitle>{t('service.advantages.title')}</SectionTitle>
              <SectionSubtitle>
                {t('service.advantages.subtitle')}
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
                <SectionTitle>{t('service.promise.title')}</SectionTitle>
                <SectionSubtitle>
                  {t('service.promise.subtitle')}
                </SectionSubtitle>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card variant="elevated" className="p-8">
                  <Zap className="w-12 h-12 text-red-500 mb-4" />
                  <h3 className="text-2xl font-bold text-gray-100 mb-4">{t('service.promise.1.title')}</h3>
                  <p className="text-gray-500 leading-relaxed">
                    {t('service.promise.1.desc')}
                  </p>
                </Card>

                <Card variant="elevated" className="p-8">
                  <Shield className="w-12 h-12 text-red-500 mb-4" />
                  <h3 className="text-2xl font-bold text-gray-100 mb-4">{t('service.promise.2.title')}</h3>
                  <p className="text-gray-500 leading-relaxed">
                    {t('service.promise.2.desc')}
                  </p>
                </Card>

                <Card variant="elevated" className="p-8">
                  <Users className="w-12 h-12 text-red-500 mb-4" />
                  <h3 className="text-2xl font-bold text-gray-100 mb-4">{t('service.promise.3.title')}</h3>
                  <p className="text-gray-500 leading-relaxed">
                    {t('service.promise.3.desc')}
                  </p>
                </Card>

                <Card variant="elevated" className="p-8">
                  <Award className="w-12 h-12 text-red-500 mb-4" />
                  <h3 className="text-2xl font-bold text-gray-100 mb-4">{t('service.promise.4.title')}</h3>
                  <p className="text-gray-500 leading-relaxed">
                    {t('service.promise.4.desc')}
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
              <SectionTitle>{t('service.testimonials.title')}</SectionTitle>
              <SectionSubtitle>
                {t('service.testimonials.subtitle')}
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
                      <div className="text-sm text-gray-500">{t('service.testimonials.verified')}</div>
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
                {t('service.cta.title')}
              </h2>
              <p className="text-xl text-gray-500 mb-8">
                {t('service.cta.subtitle')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/fahrzeuge">
                  <Button size="xl">
                    {t('service.cta.browse')}
                  </Button>
                </Link>
                <Link to="/finanzierung">
                  <Button variant="outline" size="xl">
                    {t('service.cta.finance')}
                  </Button>
                </Link>
                <Link to="/kontakt">
                  <Button variant="outline" size="xl">
                    {t('service.cta.contact')}
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
