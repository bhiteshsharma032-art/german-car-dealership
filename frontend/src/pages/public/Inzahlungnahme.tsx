import { useState, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import {
  RefreshCw,
  CheckCircle,
  Euro,
  Shield,
  Zap,
  ArrowRight,
  Phone,
} from 'lucide-react';
import Section, { SectionContent, SectionTitle, SectionSubtitle } from '../../components/ui/Section';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import api from '../../services/api';
import { useLenis } from '../../components/SmoothScroll';
import { useLanguage } from '../../contexts/LanguageContext';
import { saveTradeInToSupabase } from '../../services/supabaseService';

// ---------- Types ----------
interface TradeInFormData {
  // Personal
  name: string;
  address: string;
  phone: string;
  email: string;

  // Vehicle basics
  vin: string;
  licensePlate: string;
  firstRegistration: string;

  // Condition / history
  accidentFree: string;
  accidentDamage: string;
  previousOwners: string;
  repainted: string;
  repaintedDetails: string;
  replacedEngineOrGearbox: string;
  replacedEngineOrGearboxDetails: string;
  exteriorColor: string;
  isMetallic: boolean;
  interiorColor: string;
  serviceHistory: string;
  lastInspectionKm: string;
  lastInspectionDate: string;
  tuvValidUntil: string;
  mileage: string;

  // Equipment / other
  upholstery: string;
  expectedPrice: string;
  financing: string;
  financingDetails: string;
  smokersCar: string;
  reImport: string;

  // Extra
  message: string;
  privacy: boolean;
  website: string;
}

// ---------- Helpers ----------


// ---------- Component ----------
export default function Inzahlungnahme() {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);
  const lenis = useLenis();
  const { t } = useLanguage();

  const {
    register,
    handleSubmit,
    reset,
  } = useForm<TradeInFormData>({
    defaultValues: {
      accidentFree: '',
      repainted: '',
      replacedEngineOrGearbox: '',
      serviceHistory: '',
      upholstery: '',
      financing: '',
      smokersCar: '',
      reImport: '',
      isMetallic: false,
    },
  });



  const onSubmit = async (data: TradeInFormData) => {
    if (data.website) return; // Honeypot trap

    try {
      setSubmitting(true);

      // Run email API + Supabase save + Anfragen API in parallel
      const emailPromise = api.post('/trade-ins', data);

      // Save to Supabase (fire and forget)
      saveTradeInToSupabase(data);

      // Send to Anfragen API (fire and forget)
      try {
        fetch(import.meta.env.VITE_ANFRAGEN_API_URL || 'https://<backend-url>/api/anfragen', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: data.name,
            email: data.email,
            telefon: data.phone,
            anfrageTyp: 'inzahlungnahme',
            fahrzeugReferenz: {
              marke: "Unknown", 
              modell: data.vin || "Unknown", 
              baujahr: parseInt(data.firstRegistration?.split('.')[1] || data.firstRegistration?.split('.')[0] || '2000') || 2000,
              kilometerstand: parseInt(data.mileage) || 0,
              zustand: data.accidentFree === 'Nein' ? 'unfallwagen' : data.accidentDamage ? 'maengel' : 'normal'
            },
            nachricht: data.message,
            website: data.website
          })
        }).catch(err => console.error('Anfragen API error:', err));
      } catch (err) {}

      // Wait only for the email API (primary action)
      await emailPromise;

      toast.success('Vielen Dank! Ihre Anfrage wurde erfolgreich gesendet. Wir melden uns innerhalb von 24 Stunden bei Ihnen.');
      setSubmitted(true);
      reset();
    } catch (error) {
      toast.error('Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.');
    } finally {
      setSubmitting(false);
    }
  };

  const scrollToForm = () => {
    if (formRef.current) {
      if (lenis) {
        lenis.scrollTo(formRef.current, { offset: -96 });
      } else {
        formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  // ---------- Data ----------
  const benefits = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: t('tradein.benefits.1.title'),
      description: t('tradein.benefits.1.desc'),
    },
    {
      icon: <Euro className="w-6 h-6" />,
      title: t('tradein.benefits.2.title'),
      description: t('tradein.benefits.2.desc'),
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: t('tradein.benefits.3.title'),
      description: t('tradein.benefits.3.desc'),
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: t('tradein.benefits.4.title'),
      description: t('tradein.benefits.4.desc'),
    },
  ];

  const steps = [
    {
      number: '01',
      title: t('tradein.steps.1.title'),
      description: t('tradein.steps.1.desc'),
    },
    {
      number: '02',
      title: t('tradein.steps.2.title'),
      description: t('tradein.steps.2.desc'),
    },
    {
      number: '03',
      title: t('tradein.steps.3.title'),
      description: t('tradein.steps.3.desc'),
    },
  ];

  // ---------- Radio helper ----------


  // ---------- Render ----------
  return (
    <>
      <Helmet>
        <title>Inzahlungnahme & Autoankauf - Nordhessen Automobile</title>
        <meta
          name="description"
          content="Verkaufen Sie Ihr Fahrzeug schnell und unkompliziert. Faire Bewertung und schnelle Abwicklung garantiert."
        />
      </Helmet>

      <div className="min-h-screen bg-[#1a1a1f] pt-20">
        {/* ────────── HERO ────────── */}
        <div className="relative bg-gray-900 text-white py-24 overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
              className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-500/10 rounded-full blur-[120px] mix-blend-screen pointer-events-none"
            />
          </div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex justify-center mb-6"
            >
              <Badge variant="premium" size="lg">
                <RefreshCw className="w-4 h-4" />{t("tradein.hero.badge")}</Badge>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 text-center"
            >
              {t('tradein.hero.title1')} {' '} <span className="bg-gradient-to-r from-[#dc2626] to-[#ef4444] bg-clip-text text-transparent">{t('tradein.hero.title2')}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xl text-gray-300 mb-8 leading-relaxed text-center max-w-3xl mx-auto font-light"
            >
              {t('tradein.hero.subtitle')}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <button
                onClick={scrollToForm}
                className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-[#dc2626] to-[#ef4444] text-white px-8 py-4 text-lg rounded-xl font-semibold hover:shadow-lg hover:shadow-red-600/25 hover:scale-[1.02] transition-all duration-300"
              >
                {t('tradein.hero.button')}
                <ArrowRight className="w-5 h-5" />
              </button>
              <a
                href="tel:+4956193004649"
                className="inline-flex items-center justify-center gap-3 border-2 border-[#dc2626] text-[#dc2626] hover:bg-[#dc2626] hover:text-white px-8 py-4 text-lg rounded-xl font-semibold transition-all duration-300"
              >
                <Phone className="w-5 h-5" />
                {t('tradein.hero.call')}
              </a>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 pt-12 border-t border-gray-700 max-w-4xl mx-auto"
            >
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">24h</div>
                <div className="text-sm text-gray-300">Bewertung</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">100%</div>
                <div className="text-sm text-gray-300">Transparent</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">0€</div>
                <div className="text-sm text-gray-300">Gebühren</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">Sofort</div>
                <div className="text-sm text-gray-300">Zahlung</div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* ────────── BENEFITS ────────── */}
        <Section variant="default">
          <SectionContent>
            <div className="text-center mb-12">
              <SectionTitle>{t('tradein.benefits.title')}</SectionTitle>
              <SectionSubtitle>{t('tradein.benefits.subtitle')}</SectionSubtitle>
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

        {/* ────────── PROCESS STEPS ────────── */}
        <Section variant="dark">
          <SectionContent>
            <div className="text-center mb-12">
              <SectionTitle>{t('tradein.steps.title')}</SectionTitle>
              <SectionSubtitle>{t('tradein.steps.subtitle')}</SectionSubtitle>
            </div>

            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {steps.map((step, index) => (
                  <Card key={index} variant="elevated" className="p-6 text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-[#dc2626] to-[#ef4444] rounded-xl flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-bold text-white">{step.number}</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-100 mb-3">{step.title}</h3>
                    <p className="text-gray-500">{step.description}</p>
                  </Card>
                ))}
              </div>
            </div>
          </SectionContent>
        </Section>

        {/* ────────── TRADE-IN FORM ────────── */}
        <Section variant="default">
          <SectionContent>
            <div ref={formRef} className="scroll-mt-24">
              <div className="text-center mb-12">
                <SectionTitle>{t('tradein.form.title')}</SectionTitle>
                <SectionSubtitle>{t('tradein.form.subtitle')}</SectionSubtitle>
              </div>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="max-w-2xl mx-auto text-center"
                >
                  <div className="bg-white/[0.02] border border-white/[0.06] rounded-3xl p-12 shadow-lg">
                    <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-100 mb-4">{t('tradein.form.success.title')}</h3>
                    <p className="text-gray-500 mb-8 leading-relaxed">{t('tradein.form.success.desc')}</p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#dc2626] to-[#ef4444] text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-red-600/25 transition-all"
                    >
                      <RefreshCw className="w-4 h-4" />
                      {t('tradein.form.success.btn')}
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7 }}
                  className="max-w-4xl mx-auto"
                >
                  <div className="bg-[#2a2a34] border border-white/[0.08] rounded-[2.5rem] p-6 md:p-12 shadow-2xl relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-600 to-red-400" />
                    <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent pointer-events-none" />

                    <form onSubmit={handleSubmit(onSubmit)} className="relative z-10 space-y-12">
                      
                      {/* Section 1: Personal Data */}
                      <div>
                        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                          <span className="w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500 text-sm">01</span>
                          {t('tradein.form.section.personal')}
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-400 pl-1">{t('tradein.form.table.name')} *</label>
                            <input type="text" {...register('name', { required: true })} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-red-500 transition-colors" />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-400 pl-1">E-Mail *</label>
                            <input type="email" {...register('email', { required: true })} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-red-500 transition-colors" />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-400 pl-1">{t('tradein.form.table.phone')} *</label>
                            <input type="text" {...register('phone', { required: true })} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-red-500 transition-colors" />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-400 pl-1">{t('tradein.form.table.address')} * <span className="text-[10px] opacity-60">({t('tradein.form.table.address_hint')})</span></label>
                            <input type="text" {...register('address', { required: true })} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-red-500 transition-colors" />
                          </div>
                        </div>
                      </div>

                      {/* Section 2: Vehicle Basics */}
                      <div>
                        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                          <span className="w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500 text-sm">02</span>
                          {t('tradein.form.section.vehicle')}
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-400 pl-1">{t('tradein.form.table.vin')} *</label>
                            <input type="text" {...register('vin', { required: true })} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-red-500 transition-colors uppercase" placeholder="WBA..." />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <label className="text-sm font-medium text-gray-400 pl-1">{t('tradein.form.table.licenseplate')}</label>
                              <input type="text" {...register('licensePlate')} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-red-500 transition-colors" />
                            </div>
                            <div className="space-y-2">
                              <label className="text-sm font-medium text-gray-400 pl-1">{t('tradein.form.table.firstregistration')} *</label>
                              <input type="text" {...register('firstRegistration', { required: true })} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-red-500 transition-colors" placeholder="MM/JJJJ" />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-400 pl-1">{t('tradein.form.table.mileage')} *</label>
                            <input type="text" {...register('mileage', { required: true })} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-red-500 transition-colors" placeholder="e.g. 50.000" />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-400 pl-1">{t('tradein.form.table.price')}</label>
                            <div className="relative">
                              <input type="text" {...register('expectedPrice')} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-red-500 transition-colors pr-10" placeholder="0" />
                              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">€</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Section 3: Condition & History */}
                      <div>
                        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                          <span className="w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500 text-sm">03</span>
                          {t('tradein.form.section.condition')}
                        </h3>
                        <div className="space-y-8">
                          
                          {/* Accident Free */}
                          <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-5 space-y-4">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                              <div className="space-y-1">
                                <p className="text-white font-semibold">{t('tradein.form.table.accidentfree')}</p>
                                <p className="text-xs text-gray-500">{t('tradein.form.table.accident_hint')}</p>
                              </div>
                              <div className="flex gap-4">
                                <label className="flex items-center gap-2 cursor-pointer bg-white/5 px-4 py-2 rounded-lg border border-transparent hover:border-red-500/50 transition-all has-[:checked]:bg-red-500/20 has-[:checked]:border-red-500">
                                  <input type="radio" value="Ja" {...register('accidentFree')} className="hidden" />
                                  <span className="text-sm text-white">{t('tradein.form.table.yes')}</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer bg-white/5 px-4 py-2 rounded-lg border border-transparent hover:border-red-500/50 transition-all has-[:checked]:bg-red-500/20 has-[:checked]:border-red-500">
                                  <input type="radio" value="Nein" {...register('accidentFree')} className="hidden" />
                                  <span className="text-sm text-white">{t('tradein.form.table.no')}</span>
                                </label>
                              </div>
                            </div>
                            <input type="text" {...register('accidentDamage')} placeholder={t('tradein.form.table.accident_details')} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-red-500 transition-colors mt-2" />
                          </div>

                          {/* Repainted */}
                          <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-5 space-y-4">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                              <div className="space-y-1">
                                <p className="text-white font-semibold">{t('tradein.form.table.repainted')}</p>
                              </div>
                              <div className="flex gap-4">
                                <label className="flex items-center gap-2 cursor-pointer bg-white/5 px-4 py-2 rounded-lg border border-transparent hover:border-red-500/50 transition-all has-[:checked]:bg-red-500/20 has-[:checked]:border-red-500">
                                  <input type="radio" value="Ja" {...register('repainted')} className="hidden" />
                                  <span className="text-sm text-white">{t('tradein.form.table.yes')}</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer bg-white/5 px-4 py-2 rounded-lg border border-transparent hover:border-red-500/50 transition-all has-[:checked]:bg-red-500/20 has-[:checked]:border-red-500">
                                  <input type="radio" value="Nein" {...register('repainted')} className="hidden" />
                                  <span className="text-sm text-white">{t('tradein.form.table.no')}</span>
                                </label>
                              </div>
                            </div>
                            <input type="text" {...register('repaintedDetails')} placeholder={t('tradein.form.table.repainted_hint')} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-red-500 transition-colors mt-2" />
                          </div>

                          {/* Engine/Gearbox Replacement */}
                          <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-5 space-y-4">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                              <div className="space-y-1">
                                <p className="text-white font-semibold">{t('tradein.form.table.engine')}</p>
                              </div>
                              <div className="flex gap-4">
                                <label className="flex items-center gap-2 cursor-pointer bg-white/5 px-4 py-2 rounded-lg border border-transparent hover:border-red-500/50 transition-all has-[:checked]:bg-red-500/20 has-[:checked]:border-red-500">
                                  <input type="radio" value="Ja" {...register('replacedEngineOrGearbox')} className="hidden" />
                                  <span className="text-sm text-white">{t('tradein.form.table.yes')}</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer bg-white/5 px-4 py-2 rounded-lg border border-transparent hover:border-red-500/50 transition-all has-[:checked]:bg-red-500/20 has-[:checked]:border-red-500">
                                  <input type="radio" value="Nein" {...register('replacedEngineOrGearbox')} className="hidden" />
                                  <span className="text-sm text-white">{t('tradein.form.table.no')}</span>
                                </label>
                              </div>
                            </div>
                            <input type="text" {...register('replacedEngineOrGearboxDetails')} placeholder={t('tradein.form.table.engine_hint')} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-red-500 transition-colors mt-2" />
                          </div>

                          {/* Detail Grid */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                              <label className="text-sm font-medium text-gray-400 pl-1">{t('tradein.form.table.prevowners')}</label>
                              <div className="relative">
                                <input type="text" {...register('previousOwners')} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-red-500 transition-colors" placeholder={t('tradein.form.table.prevowners_hint')} />
                              </div>
                            </div>
                            <div className="space-y-2">
                              <label className="text-sm font-medium text-gray-400 pl-1">{t('tradein.form.table.servicehistory')}</label>
                              <div className="flex gap-4">
                                <label className="flex-1 flex items-center justify-center gap-2 cursor-pointer bg-white/5 py-3 rounded-xl border border-white/10 hover:border-red-500/50 transition-all has-[:checked]:bg-red-500/20 has-[:checked]:border-red-500">
                                  <input type="radio" value="Ja" {...register('serviceHistory')} className="hidden" />
                                  <span className="text-sm text-white">{t('tradein.form.table.yes')}</span>
                                </label>
                                <label className="flex-1 flex items-center justify-center gap-2 cursor-pointer bg-white/5 py-3 rounded-xl border border-white/10 hover:border-red-500/50 transition-all has-[:checked]:bg-red-500/20 has-[:checked]:border-red-500">
                                  <input type="radio" value="Nein" {...register('serviceHistory')} className="hidden" />
                                  <span className="text-sm text-white">{t('tradein.form.table.no')}</span>
                                </label>
                              </div>
                            </div>
                          </div>

                          {/* Inspection row */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                             <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-5 space-y-4">
                                <p className="text-white font-semibold text-sm">{t('tradein.form.table.lastinspection')}</p>
                                <div className="grid grid-cols-2 gap-4">
                                  <input type="text" {...register('lastInspectionKm')} placeholder={t('tradein.form.table.km')} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm outline-none focus:border-red-500" />
                                  <input type="text" {...register('lastInspectionDate')} placeholder={t('tradein.form.table.date')} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm outline-none focus:border-red-500" />
                                </div>
                             </div>
                             <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-5 space-y-4">
                                <p className="text-white font-semibold text-sm">{t('tradein.form.table.tuv')}</p>
                                <input type="text" {...register('tuvValidUntil', { required: true })} placeholder="MM/JJJJ" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm outline-none focus:border-red-500" />
                             </div>
                          </div>

                        </div>
                      </div>

                      {/* Section 4: Configuration & Additional Info */}
                      <div>
                        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                          <span className="w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500 text-sm">04</span>
                          {t('tradein.form.section.config')}
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                          {/* Exterior */}
                          <div className="space-y-6">
                             <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-400 pl-1">{t('tradein.form.table.extcolor')}</label>
                                <input type="text" {...register('exteriorColor')} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-red-500 transition-colors" />
                             </div>
                             <label className="flex items-center gap-3 cursor-pointer group">
                                <div className="w-6 h-6 rounded-md bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-red-500 transition-colors">
                                  <input type="checkbox" {...register('isMetallic')} className="w-4 h-4 accent-red-500" />
                                </div>
                                <span className="text-sm text-gray-300">{t('tradein.form.table.metallic')}</span>
                             </label>

                             <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-400 pl-1">{t('tradein.form.table.price')}</label>
                                <div className="relative">
                                  <input type="text" {...register('expectedPrice')} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-red-500 transition-colors pr-10" placeholder="0" />
                                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">€</span>
                                </div>
                             </div>
                          </div>
                          
                          {/* Interior */}
                          <div className="space-y-6">
                              <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-400 pl-1">{t('tradein.form.table.upholstery')}</label>
                                <div className="grid grid-cols-3 gap-2">
                                  {['fabric', 'leather', 'part_leather'].map(type => (
                                    <label key={type} className="flex flex-col items-center justify-center gap-1 cursor-pointer bg-white/5 p-2 rounded-xl border border-white/10 hover:border-red-500/50 transition-all has-[:checked]:bg-red-500/20 has-[:checked]:border-red-500">
                                      <input type="radio" value={type} {...register('upholstery')} className="hidden" />
                                      <span className="text-[10px] text-white text-center font-bold tracking-tighter uppercase">{t(`tradein.form.table.${type}`)}</span>
                                    </label>
                                  ))}
                                </div>
                              </div>
                              <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-400 pl-1">{t('tradein.form.table.intcolor')}</label>
                                <input type="text" {...register('interiorColor')} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-red-500 transition-colors" />
                              </div>
                          </div>
                        </div>

                        {/* Extra Options Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
                           <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-5 space-y-4">
                              <p className="text-white font-semibold text-sm">{t('tradein.form.table.smokers')}</p>
                              <div className="flex gap-4">
                                {['Ja', 'Nein'].map(val => (
                                  <label key={val} className="flex-1 flex items-center justify-center gap-2 cursor-pointer bg-white/5 py-2.5 rounded-xl border border-white/10 hover:border-red-500/50 transition-all has-[:checked]:bg-red-500/20 has-[:checked]:border-red-500">
                                    <input type="radio" value={val} {...register('smokersCar')} className="hidden" />
                                    <span className="text-sm text-white">{val === 'Ja' ? t('tradein.form.table.yes') : t('tradein.form.table.no')}</span>
                                  </label>
                                ))}
                              </div>
                           </div>
                           <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-5 space-y-4">
                              <p className="text-white font-semibold text-sm">{t('tradein.form.table.reimport')}</p>
                              <div className="flex gap-4">
                                {['Ja', 'Nein'].map(val => (
                                  <label key={val} className="flex-1 flex items-center justify-center gap-2 cursor-pointer bg-white/5 py-2.5 rounded-xl border border-white/10 hover:border-red-500/50 transition-all has-[:checked]:bg-red-500/20 has-[:checked]:border-red-500">
                                    <input type="radio" value={val} {...register('reImport')} className="hidden" />
                                    <span className="text-sm text-white">{val === 'Ja' ? t('tradein.form.table.yes') : t('tradein.form.table.no')}</span>
                                  </label>
                                ))}
                              </div>
                           </div>
                        </div>

                        {/* Financing Section */}
                        <div className="mt-8 bg-white/[0.02] border border-white/[0.05] rounded-2xl p-5 space-y-4">
                           <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                              <p className="text-white font-semibold">{t('tradein.form.table.financing')}</p>
                              <div className="flex gap-4">
                                {['Ja', 'Nein'].map(val => (
                                  <label key={val} className="flex items-center gap-2 cursor-pointer bg-white/5 px-6 py-2 rounded-lg border border-transparent hover:border-red-500/50 transition-all has-[:checked]:bg-red-500/20 has-[:checked]:border-red-500">
                                    <input type="radio" value={val} {...register('financing')} className="hidden" />
                                    <span className="text-sm text-white">{val === 'Ja' ? t('tradein.form.table.yes') : t('tradein.form.table.no')}</span>
                                  </label>
                                ))}
                              </div>
                           </div>
                           <input type="text" {...register('financingDetails')} placeholder={t('tradein.form.table.financing_hint')} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-red-500 transition-colors mt-2" />
                        </div>

                        <div className="mt-10">
                          <label className="text-sm font-medium text-gray-400 pl-1 mb-2 block">{t('tradein.form.table.message')}</label>
                          <textarea
                            {...register('message')}
                            rows={4}
                            className="w-full bg-white/5 border border-white/10 rounded-[1.5rem] px-5 py-4 text-white outline-none focus:border-red-500 transition-colors resize-none"
                            placeholder={t('tradein.form.table.message_hint')}
                          />
                        </div>

                        <div className="mt-8">
                          <label className="flex items-start gap-3 cursor-pointer group">
                            <input
                              {...register('privacy', { required: true })}
                              type="checkbox"
                              className="mt-1 w-5 h-5 accent-red-600 rounded-md"
                            />
                            <span className="text-sm text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                              {t('tradein.form.table.privacy')}
                            </span>
                          </label>
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={submitting}
                        className="relative w-full overflow-hidden bg-gradient-to-r from-red-600 to-red-500 text-white font-black py-5 rounded-[1.5rem] text-lg uppercase tracking-widest flex items-center justify-center gap-3 transition-all duration-300 shadow-[0_0_30px_rgba(239,68,68,0.2)] hover:shadow-[0_0_40px_rgba(239,68,68,0.4)] hover:scale-[1.01] disabled:opacity-50"
                      >
                        <div className="absolute inset-0 bg-white/10 translate-y-full hover:translate-y-0 transition-transform duration-300" />
                        {submitting ? (
                          <>
                            <RefreshCw className="w-6 h-6 animate-spin" />
                            {t('tradein.form.table.submitting')}
                          </>
                        ) : (
                          <>
                            {t('tradein.form.table.submit')}
                            <ArrowRight className="w-6 h-6" />
                          </>
                        )}
                      </button>

                      {/* Honeypot */}
                      <input type="text" {...register('website')} className="hidden" tabIndex={-1} autoComplete="off" />

                    </form>
                  </div>
                </motion.div>
              )}
            </div>
          </SectionContent>
        </Section>
      </div>
    </>
  );
}
