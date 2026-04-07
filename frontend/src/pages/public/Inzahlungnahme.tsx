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
    try {
      setSubmitting(true);
      await api.post('/trade-ins', data);
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
                >
                  <div className="max-w-4xl mx-auto shadow-lg relative overflow-hidden group p-4 lg:p-0">

                    <form onSubmit={handleSubmit(onSubmit)} className="w-full bg-white text-gray-900 font-sans border-2 border-[#dc2626]">
                      {/* Red Header */}
                      <div className="bg-[#dc2626] text-white font-bold p-3 text-lg md:text-xl md:px-4 text-center">
                        {t('tradein.form.title')}
                      </div>

                      <div className="p-1 md:p-2 bg-white flex flex-col space-y-[2px]">
                        
                        {/* Name/Address section */}
                        <div className="flex gap-[2px]">
                          <div className="w-[30%] bg-[#d1d5db] text-gray-800 p-2 text-sm md:text-base font-semibold flex flex-col justify-between">
                            <div>{t('tradein.form.table.name')}</div>
                            <div className="my-2">{t('tradein.form.table.address')}<br/><span className="text-xs font-normal">{t('tradein.form.table.address_hint')}</span></div>
                            <div>{t('tradein.form.table.phone')}</div>
                          </div>
                          <div className="w-[70%] flex flex-col justify-between gap-[2px]">
                            <input type="text" {...register('name', { required: true })} className="h-[33%] w-full border border-gray-300 px-2 outline-none" />
                            <input type="text" {...register('address', { required: true })} className="h-[33%] w-full border border-gray-300 px-2 outline-none" />
                            <input type="text" {...register('phone', { required: true })} className="h-[33%] w-full border border-gray-300 px-2 outline-none" />
                          </div>
                        </div>

                        {/* 1 */}
                        <div className="flex gap-[2px]">
                          <div className="w-[30%] bg-[#d1d5db] px-2 py-3 text-sm md:text-base font-medium flex items-center">{t('tradein.form.table.vin')}</div>
                          <div className="w-[70%]"><input type="text" {...register('vin', { required: true })} className="w-full h-full min-h-[44px] border border-gray-300 px-2 outline-none" /></div>
                        </div>

                        {/* 2 & 3 */}
                        <div className="flex gap-[2px]">
                          <div className="w-[20%] bg-[#d1d5db] px-2 py-3 text-sm md:text-base font-medium flex items-center">{t('tradein.form.table.licenseplate')}</div>
                          <div className="w-[30%]"><input type="text" {...register('licensePlate')} className="w-full h-full min-h-[44px] border border-gray-300 px-2 outline-none" /></div>
                          <div className="w-[20%] bg-[#d1d5db] px-2 py-3 text-sm md:text-base font-medium flex items-center pr-0">{t('tradein.form.table.firstregistration')}</div>
                          <div className="w-[30%]"><input type="text" {...register('firstRegistration', { required: true })} className="w-full h-full min-h-[44px] border border-gray-300 px-2 outline-none" /></div>
                        </div>

                        {/* 4 */}
                        <div className="flex gap-[2px]">
                          <div className="w-[25%] bg-[#d1d5db] p-2 text-sm md:text-base font-medium flex items-center">{t('tradein.form.table.accidentfree')}</div>
                          <div className="w-[45%] bg-[#d1d5db] p-2 text-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-2">
                            <div className="flex gap-4 items-center">
                              <label className="flex items-center gap-1 cursor-pointer">{t('tradein.form.table.yes')} <input type="radio" value="Ja" {...register('accidentFree')} className="w-4 h-4 ml-1 accent-gray-800" /></label>
                              <label className="flex items-center gap-1 cursor-pointer">{t('tradein.form.table.no')} <input type="radio" value="Nein" {...register('accidentFree')} className="w-4 h-4 ml-1 accent-gray-800" /></label>
                            </div>
                            <span className="text-xs leading-none max-w-[120px]">{t('tradein.form.table.accident_hint')}</span>
                          </div>
                          <div className="w-[30%]"><input type="text" {...register('accidentDamage')} className="w-full h-full min-h-[44px] border border-gray-300 px-2 outline-none" /></div>
                        </div>

                        {/* 5 */}
                        <div className="flex gap-[2px]">
                          <div className="w-[25%] bg-[#d1d5db] px-2 py-3 text-sm md:text-base font-medium flex items-center">{t('tradein.form.table.prevowners')}</div>
                          <div className="w-[75%] border border-gray-300 px-2 py-2 flex items-center gap-2">
                            <span className="text-sm">{t('tradein.form.table.prevowners_hint')}</span>
                            <input type="text" {...register('previousOwners')} className="flex-1 outline-none text-sm px-2" />
                          </div>
                        </div>

                        {/* 6 */}
                        <div className="flex gap-[2px]">
                          <div className="w-[25%] bg-[#d1d5db] p-2 text-sm md:text-base font-medium flex items-center">{t('tradein.form.table.repainted')}</div>
                          <div className="w-[45%] bg-[#d1d5db] p-2 text-sm flex items-center justify-between">
                            <div className="flex gap-4 items-center">
                              <label className="flex items-center gap-1 cursor-pointer">{t('tradein.form.table.yes')} <input type="radio" value="Ja" {...register('repainted')} className="w-4 h-4 ml-1 accent-gray-800" /></label>
                              <label className="flex items-center gap-1 cursor-pointer">{t('tradein.form.table.no')} <input type="radio" value="Nein" {...register('repainted')} className="w-4 h-4 ml-1 accent-gray-800" /></label>
                            </div>
                            <span className="text-sm">{t('tradein.form.table.repainted_hint')}</span>
                          </div>
                          <div className="w-[30%]"><input type="text" {...register('repaintedDetails')} className="w-full h-full min-h-[44px] border border-gray-300 px-2 outline-none" /></div>
                        </div>

                        {/* 7 */}
                        <div className="flex gap-[2px]">
                          <div className="w-[25%] bg-[#d1d5db] p-2 text-sm md:text-base font-medium flex items-center" dangerouslySetInnerHTML={{ __html: t('tradein.form.table.engine').replace('\\n', '<br/>') }}></div>
                          <div className="w-[45%] bg-[#d1d5db] p-2 text-sm flex items-center justify-between">
                            <div className="flex gap-4 items-center">
                              <label className="flex items-center gap-1 cursor-pointer">{t('tradein.form.table.yes')} <input type="radio" value="Ja" {...register('replacedEngineOrGearbox')} className="w-4 h-4 ml-1 accent-gray-800" /></label>
                              <label className="flex items-center gap-1 cursor-pointer">{t('tradein.form.table.no')} <input type="radio" value="Nein" {...register('replacedEngineOrGearbox')} className="w-4 h-4 ml-1 accent-gray-800" /></label>
                            </div>
                            <span className="text-xs leading-none max-w-[150px]" dangerouslySetInnerHTML={{ __html: t('tradein.form.table.engine_hint').replace('\\n', '<br/>') }}></span>
                          </div>
                          <div className="w-[30%]"><input type="text" {...register('replacedEngineOrGearboxDetails')} className="w-full h-full min-h-[44px] border border-gray-300 px-2 outline-none" /></div>
                        </div>

                        {/* 8 */}
                        <div className="flex gap-[2px]">
                          <div className="w-[25%] bg-[#d1d5db] px-2 py-3 text-sm md:text-base font-medium flex items-center">{t('tradein.form.table.extcolor')}</div>
                          <div className="w-[60%]"><input type="text" {...register('exteriorColor')} className="w-full h-full min-h-[44px] border border-gray-300 px-2 outline-none" /></div>
                          <div className="w-[15%] bg-[#d1d5db] p-2 flex items-center justify-center gap-2 text-sm font-medium">
                            {t('tradein.form.table.metallic')} <input type="checkbox" {...register('isMetallic')} className="w-4 h-4 accent-white rounded-full bg-white" />
                          </div>
                        </div>

                        {/* 9 */}
                        <div className="flex gap-[2px]">
                          <div className="w-[25%] bg-[#d1d5db] px-2 py-3 text-sm md:text-base font-medium flex items-center">{t('tradein.form.table.intcolor')}</div>
                          <div className="w-[75%]"><input type="text" {...register('interiorColor')} className="w-full h-full min-h-[44px] border border-gray-300 px-2 outline-none" /></div>
                        </div>

                        {/* 10 */}
                        <div className="flex gap-[2px]">
                          <div className="w-[35%] bg-[#d1d5db] px-2 py-3 text-sm md:text-base font-medium flex items-center" dangerouslySetInnerHTML={{ __html: t('tradein.form.table.servicehistory').replace('\\n', '<br/>') }}></div>
                          <div className="flex-1 bg-[#d1d5db] px-2 py-3 flex items-center gap-6">
                            <label className="flex items-center gap-1 cursor-pointer text-sm">{t('tradein.form.table.yes')} <input type="radio" value="Ja" {...register('serviceHistory')} className="w-4 h-4 ml-1 accent-gray-800" /></label>
                            <label className="flex items-center gap-1 cursor-pointer text-sm">{t('tradein.form.table.no')} <input type="radio" value="Nein" {...register('serviceHistory')} className="w-4 h-4 ml-1 accent-gray-800" /></label>
                          </div>
                        </div>

                        {/* 11 */}
                        <div className="flex gap-[2px]">
                          <div className="w-[25%] bg-[#d1d5db] px-2 py-3 text-sm md:text-base font-medium flex items-center">{t('tradein.form.table.lastinspection')}</div>
                          <div className="flex-1 border border-gray-300 flex items-center px-2">
                             <span className="text-sm mr-2 w-8">{t('tradein.form.table.km')}</span>
                             <input type="text" {...register('lastInspectionKm')} className="flex-1 border-b border-gray-300 outline-none h-6 px-1 mr-4" />
                             <span className="text-sm mr-2">{t('tradein.form.table.date')}</span>
                             <input type="text" {...register('lastInspectionDate')} className="flex-1 border-b border-gray-300 outline-none h-6 px-1" />
                          </div>
                        </div>

                        {/* 12 & 13 */}
                        <div className="flex gap-[2px]">
                          <div className="w-[30%] bg-[#d1d5db] px-2 py-3 text-sm md:text-base font-medium flex items-center pr-0">{t('tradein.form.table.tuv')}</div>
                          <div className="w-[35%]"><input type="text" {...register('tuvValidUntil')} className="w-full h-full min-h-[44px] border border-gray-300 px-2 outline-none" /></div>
                          <div className="w-[20%] bg-[#d1d5db] px-2 py-3 text-sm md:text-base font-medium flex items-center pr-0">{t('tradein.form.table.mileage')}</div>
                          <div className="w-[15%]"><input type="text" {...register('mileage', { required: true })} className="w-full h-full min-h-[44px] border border-gray-300 px-2 outline-none" /></div>
                        </div>

                        {/* 14 */}
                        <div className="flex gap-[2px]">
                          <div className="w-[25%] bg-[#d1d5db] px-2 py-3 text-sm md:text-base font-medium flex items-center">{t('tradein.form.table.upholstery')}</div>
                          <div className="flex-1 bg-[#d1d5db] px-4 py-3 flex items-center gap-8">
                            <label className="flex items-center gap-1 cursor-pointer text-sm">{t('tradein.form.table.fabric')} <input type="radio" value="Stoff" {...register('upholstery')} className="w-4 h-4 ml-1 accent-gray-800" /></label>
                            <label className="flex items-center gap-1 cursor-pointer text-sm">{t('tradein.form.table.leather')} <input type="radio" value="Leder" {...register('upholstery')} className="w-4 h-4 ml-1 accent-gray-800" /></label>
                            <label className="flex items-center gap-1 cursor-pointer text-sm">{t('tradein.form.table.part_leather')} <input type="radio" value="Teilleder" {...register('upholstery')} className="w-4 h-4 ml-1 accent-gray-800" /></label>
                          </div>
                        </div>

                        {/* 15 */}
                        <div className="flex gap-[2px]">
                          <div className="w-[25%] bg-[#d1d5db] px-2 py-3 text-sm md:text-base font-medium flex items-center">{t('tradein.form.table.price')}</div>
                          <div className="flex-1"><input type="text" {...register('expectedPrice')} className="w-full h-full min-h-[44px] border border-gray-300 px-2 outline-none" /></div>
                        </div>

                        {/* 16 */}
                        <div className="flex flex-col gap-[2px] bg-[#d1d5db] p-2 mt-2">
                          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
                            <div className="w-[25%] font-medium text-sm md:text-base pr-2">{t('tradein.form.table.financing')}</div>
                            <div className="flex items-center gap-6">
                              <label className="flex items-center gap-1 cursor-pointer text-sm">{t('tradein.form.table.yes')} <input type="radio" value="Ja" {...register('financing')} className="w-4 h-4 ml-1 accent-gray-800" /></label>
                              <label className="flex items-center gap-1 cursor-pointer text-sm">{t('tradein.form.table.no')} <input type="radio" value="Nein" {...register('financing')} className="w-4 h-4 ml-1 accent-gray-800" /></label>
                            </div>
                            <div className="text-sm ml-4">{t('tradein.form.table.financing_hint')}</div>
                          </div>
                          <input type="text" {...register('financingDetails')} className="w-full h-10 border border-gray-300 bg-white px-2 outline-none mt-2" />
                        </div>

                        {/* 17 & 18 */}
                        <div className="flex gap-[2px]">
                          <div className="w-[50%] bg-[#d1d5db] p-2 flex items-center gap-4 text-sm md:text-base font-medium">
                             <div className="w-[60%]">{t('tradein.form.table.smokers')}</div>
                             <div className="flex gap-4">
                               <label className="flex items-center gap-1 cursor-pointer font-normal">{t('tradein.form.table.yes')} <input type="radio" value="Ja" {...register('smokersCar')} className="w-4 h-4 ml-1 accent-gray-800" /></label>
                               <label className="flex items-center gap-1 cursor-pointer font-normal">{t('tradein.form.table.no')} <input type="radio" value="Nein" {...register('smokersCar')} className="w-4 h-4 ml-1 accent-gray-800" /></label>
                             </div>
                          </div>
                          <div className="w-[50%] bg-[#d1d5db] p-2 flex items-center gap-4 text-sm md:text-base font-medium">
                             <div className="w-[50%]">{t('tradein.form.table.reimport')}</div>
                             <div className="flex gap-4">
                               <label className="flex items-center gap-1 cursor-pointer font-normal">{t('tradein.form.table.yes')} <input type="radio" value="Ja" {...register('reImport')} className="w-4 h-4 ml-1 accent-gray-800" /></label>
                               <label className="flex items-center gap-1 cursor-pointer font-normal">{t('tradein.form.table.no')} <input type="radio" value="Nein" {...register('reImport')} className="w-4 h-4 ml-1 accent-gray-800" /></label>
                             </div>
                          </div>
                        </div>

                      </div>

                      {/* Not in checklist but required */}
                      <div className="px-4 py-4 mt-2 bg-gray-50 border-t border-gray-200">
                         <div className="mb-4">
                           <textarea
                             {...register('message')}
                             rows={3}
                             placeholder={t('tradein.form.table.message')}
                             className="w-full border border-gray-300 p-2 text-sm outline-none focus:border-red-500"
                           />
                         </div>
                         <label className="flex items-start gap-2 cursor-pointer mb-4">
                           <input
                             {...register('privacy', { required: true })}
                             type="checkbox"
                             className="mt-1 w-4 h-4 accent-[#dc2626]"
                           />
                           <span className="text-sm font-medium text-gray-700 leading-snug">
                             {t('tradein.form.table.privacy')}
                           </span>
                         </label>

                         <button
                           type="submit"
                           disabled={submitting}
                           className="bg-[#dc2626] hover:bg-red-700 text-white font-bold py-3 px-8 uppercase w-full flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
                         >
                           {submitting ? t('tradein.form.table.submitting') : t('tradein.form.table.submit')}
                         </button>
                      </div>

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
