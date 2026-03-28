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
  Send,
  User,
  Car,
  ClipboardCheck,
  Settings,
} from 'lucide-react';
import Section, { SectionContent, SectionTitle, SectionSubtitle } from '../../components/ui/Section';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import api from '../../services/api';
import { useLenis } from '../../components/SmoothScroll';

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
const inputClass =
  'input w-full';

const labelClass =
  'block text-sm font-medium text-gray-300 mb-2';

const sectionHeadingClass =
  'text-xl font-bold text-gray-100 mb-6 flex items-center gap-3';

// ---------- Component ----------
export default function Inzahlungnahme() {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);
  const lenis = useLenis();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
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

  const accidentFree = watch('accidentFree');
  const repainted = watch('repainted');
  const replacedEngineOrGearbox = watch('replacedEngineOrGearbox');
  const financing = watch('financing');

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

  // ---------- Radio helper ----------
  const RadioGroup = ({
    name,
    label,
    required,
    options = ['Ja', 'Nein'],
  }: {
    name: keyof TradeInFormData;
    label: string;
    required?: boolean;
    options?: string[];
  }) => (
    <div>
      <span className={labelClass}>
        {label} {required && '*'}
      </span>
      <div className="flex gap-6 mt-1">
        {options.map((opt) => (
          <label key={opt} className="flex items-center gap-2 cursor-pointer text-gray-400 hover:text-gray-100 transition-colors">
            <input
              type="radio"
              value={opt}
              {...register(name, required ? { required: `${label} ist erforderlich` } : {})}
              className="w-4 h-4 accent-red-600"
            />
            <span className="text-sm">{opt}</span>
          </label>
        ))}
      </div>
      {errors[name] && (
        <p className="mt-1 text-sm text-red-500">{(errors[name] as any)?.message}</p>
      )}
    </div>
  );

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
                <RefreshCw className="w-4 h-4" />
                Inzahlungnahme & Ankauf
              </Badge>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 text-center"
            >
              Verkaufen Sie Ihr Auto{' '}
              <span className="bg-gradient-to-r from-[#dc2626] to-[#ef4444] bg-clip-text text-transparent">
                schnell & fair
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xl text-gray-300 mb-8 leading-relaxed text-center max-w-3xl mx-auto font-light"
            >
              Wir kaufen Ihr Fahrzeug zu fairen Konditionen. Schnelle Bewertung,
              transparente Abwicklung und sofortige Zahlung.
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
                Jetzt Fahrzeug bewerten lassen
                <ArrowRight className="w-5 h-5" />
              </button>
              <a
                href="tel:+4956193004649"
                className="inline-flex items-center justify-center gap-3 border-2 border-[#dc2626] text-[#dc2626] hover:bg-[#dc2626] hover:text-white px-8 py-4 text-lg rounded-xl font-semibold transition-all duration-300"
              >
                <Phone className="w-5 h-5" />
                Telefonisch anfragen
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
              <SectionTitle>Ihre Vorteile</SectionTitle>
              <SectionSubtitle>Warum Sie Ihr Fahrzeug bei uns verkaufen sollten</SectionSubtitle>
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
              <SectionTitle>So einfach geht's</SectionTitle>
              <SectionSubtitle>In 3 Schritten zum Verkauf</SectionSubtitle>
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
                <SectionTitle>
                  Checkliste Vorabbewertung
                </SectionTitle>
                <SectionSubtitle>
                  Füllen Sie das Formular aus und wir melden uns innerhalb von 24 Stunden bei Ihnen
                </SectionSubtitle>
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
                    <h3 className="text-2xl font-bold text-gray-100 mb-4">Anfrage erfolgreich gesendet!</h3>
                    <p className="text-gray-500 mb-8 leading-relaxed">
                      Vielen Dank für Ihre Anfrage. Wir werden Ihre Angaben prüfen und uns
                      innerhalb von 24 Stunden bei Ihnen melden.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#dc2626] to-[#ef4444] text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-red-600/25 transition-all"
                    >
                      <RefreshCw className="w-4 h-4" />
                      Weitere Anfrage senden
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
                  <div className="max-w-4xl mx-auto bg-white/[0.02] border border-white/[0.06] rounded-3xl p-8 md:p-10 shadow-lg relative overflow-hidden group">
                    {/* Top accent line */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-600 to-red-400" />

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
                      {/* ── Section 1: Personal Data ── */}
                      <div>
                        <h3 className={sectionHeadingClass}>
                          <div className="w-10 h-10 bg-gradient-to-r from-[#dc2626] to-[#ef4444] rounded-xl flex items-center justify-center shrink-0">
                            <User className="w-5 h-5 text-white" />
                          </div>
                          Ihre Kontaktdaten
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {/* Name */}
                          <div>
                            <label htmlFor="ti-name" className={labelClass}>Name, Vorname *</label>
                            <input
                              {...register('name', { required: 'Name ist erforderlich' })}
                              type="text"
                              id="ti-name"
                              placeholder="Max Mustermann"
                              className={inputClass}
                            />
                            {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>}
                          </div>

                          {/* Email */}
                          <div>
                            <label htmlFor="ti-email" className={labelClass}>E-Mail *</label>
                            <input
                              {...register('email', {
                                required: 'E-Mail ist erforderlich',
                                pattern: {
                                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                  message: 'Ungültige E-Mail-Adresse',
                                },
                              })}
                              type="email"
                              id="ti-email"
                              placeholder="max@beispiel.de"
                              className={inputClass}
                            />
                            {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
                          </div>

                          {/* Address */}
                          <div>
                            <label htmlFor="ti-address" className={labelClass}>Adresse (Plz, Ort, Straße & Nr.) *</label>
                            <input
                              {...register('address', { required: 'Adresse ist erforderlich' })}
                              type="text"
                              id="ti-address"
                              placeholder="34123 Kassel, Musterstraße 1"
                              className={inputClass}
                            />
                            {errors.address && <p className="mt-1 text-sm text-red-500">{errors.address.message}</p>}
                          </div>

                          {/* Phone */}
                          <div>
                            <label htmlFor="ti-phone" className={labelClass}>Telefon *</label>
                            <input
                              {...register('phone', { required: 'Telefon ist erforderlich' })}
                              type="tel"
                              id="ti-phone"
                              placeholder="0561 12345678"
                              className={inputClass}
                            />
                            {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone.message}</p>}
                          </div>
                        </div>
                      </div>

                      <div className="border-t border-white/[0.06]" />

                      {/* ── Section 2: Vehicle Basics ── */}
                      <div>
                        <h3 className={sectionHeadingClass}>
                          <div className="w-10 h-10 bg-gradient-to-r from-[#dc2626] to-[#ef4444] rounded-xl flex items-center justify-center shrink-0">
                            <Car className="w-5 h-5 text-white" />
                          </div>
                          Fahrzeug-Grunddaten
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          {/* 1. Fahrgestellnummer */}
                          <div>
                            <label htmlFor="ti-vin" className={labelClass}>1. Fahrgestellnummer (FIN) *</label>
                            <input
                              {...register('vin', { required: 'Fahrgestellnummer ist erforderlich' })}
                              type="text"
                              id="ti-vin"
                              placeholder="WVWZZZ3CZWE123456"
                              className={inputClass}
                            />
                            {errors.vin && <p className="mt-1 text-sm text-red-500">{errors.vin.message}</p>}
                          </div>

                          {/* 2. Kennzeichen */}
                          <div>
                            <label htmlFor="ti-licensePlate" className={labelClass}>2. Kennzeichen</label>
                            <input
                              {...register('licensePlate')}
                              type="text"
                              id="ti-licensePlate"
                              placeholder="KS-AB 1234"
                              className={inputClass}
                            />
                          </div>

                          {/* 3. Erstzulassung */}
                          <div>
                            <label htmlFor="ti-firstRegistration" className={labelClass}>3. Erstzulassung *</label>
                            <input
                              {...register('firstRegistration', { required: 'Erstzulassung ist erforderlich' })}
                              type="text"
                              id="ti-firstRegistration"
                              placeholder="MM/JJJJ"
                              className={inputClass}
                            />
                            {errors.firstRegistration && <p className="mt-1 text-sm text-red-500">{errors.firstRegistration.message}</p>}
                          </div>
                        </div>
                      </div>

                      <div className="border-t border-white/[0.06]" />

                      {/* ── Section 3: Condition & History ── */}
                      <div>
                        <h3 className={sectionHeadingClass}>
                          <div className="w-10 h-10 bg-gradient-to-r from-[#dc2626] to-[#ef4444] rounded-xl flex items-center justify-center shrink-0">
                            <ClipboardCheck className="w-5 h-5 text-white" />
                          </div>
                          Zustand & Historie
                        </h3>

                        <div className="space-y-6">
                          {/* 4. Unfallfrei */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <RadioGroup name="accidentFree" label="4. Unfallfrei?" required />
                            {accidentFree === 'Nein' && (
                              <div>
                                <label htmlFor="ti-accidentDamage" className={labelClass}>
                                  Reparaturhöhe und -art angeben
                                </label>
                                <input
                                  {...register('accidentDamage')}
                                  type="text"
                                  id="ti-accidentDamage"
                                  placeholder="z.B. Frontschaden, 3.500€"
                                  className={inputClass}
                                />
                              </div>
                            )}
                          </div>

                          {/* 5. Vorbesitzer */}
                          <div className="max-w-xs">
                            <label htmlFor="ti-previousOwners" className={labelClass}>5. Vorbesitzer (Anzahl mit Ihnen zusammen)</label>
                            <input
                              {...register('previousOwners')}
                              type="text"
                              id="ti-previousOwners"
                              placeholder="z.B. 2"
                              className={inputClass}
                            />
                          </div>

                          {/* 6. Nachlackierungen */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <RadioGroup name="repainted" label="6. Nachlackierungen?" />
                            {repainted === 'Ja' && (
                              <div>
                                <label htmlFor="ti-repaintedDetails" className={labelClass}>
                                  Wenn ja, welche?
                                </label>
                                <input
                                  {...register('repaintedDetails')}
                                  type="text"
                                  id="ti-repaintedDetails"
                                  placeholder="z.B. Motorhaube, vorderer Kotflügel rechts"
                                  className={inputClass}
                                />
                              </div>
                            )}
                          </div>

                          {/* 7. Austauschmotor / -getriebe */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <RadioGroup name="replacedEngineOrGearbox" label="7. Austauschmotor oder -getriebe?" />
                            {replacedEngineOrGearbox === 'Ja' && (
                              <div>
                                <label htmlFor="ti-replacedDetails" className={labelClass}>
                                  Datum und km-Stand angeben
                                </label>
                                <input
                                  {...register('replacedEngineOrGearboxDetails')}
                                  type="text"
                                  id="ti-replacedDetails"
                                  placeholder="z.B. 03/2023 bei 95.000 km"
                                  className={inputClass}
                                />
                              </div>
                            )}
                          </div>

                          {/* 8. Außenfarbe + metallic */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <label htmlFor="ti-exteriorColor" className={labelClass}>8. Außenfarbe</label>
                              <input
                                {...register('exteriorColor')}
                                type="text"
                                id="ti-exteriorColor"
                                placeholder="z.B. Schwarz"
                                className={inputClass}
                              />
                            </div>
                            <div className="flex items-end pb-1">
                              <label className="flex items-center gap-3 cursor-pointer text-gray-400 hover:text-gray-100 transition-colors">
                                <input
                                  type="checkbox"
                                  {...register('isMetallic')}
                                  className="w-5 h-5 accent-red-600 rounded"
                                />
                                <span className="text-sm font-medium">Metallic-Lackierung</span>
                              </label>
                            </div>
                          </div>

                          {/* 9. Innenfarbe */}
                          <div className="max-w-md">
                            <label htmlFor="ti-interiorColor" className={labelClass}>9. Innenfarbe</label>
                            <input
                              {...register('interiorColor')}
                              type="text"
                              id="ti-interiorColor"
                              placeholder="z.B. Schwarz"
                              className={inputClass}
                            />
                          </div>

                          {/* 10. Scheckheft gepflegt */}
                          <RadioGroup name="serviceHistory" label="10. Ist der Wagen scheckheftgepflegt?" />

                          {/* 11. Letzte Inspektion */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <label htmlFor="ti-lastInspectionKm" className={labelClass}>11. Letzte Inspektion — km</label>
                              <input
                                {...register('lastInspectionKm')}
                                type="text"
                                id="ti-lastInspectionKm"
                                placeholder="z.B. 85.000"
                                className={inputClass}
                              />
                            </div>
                            <div>
                              <label htmlFor="ti-lastInspectionDate" className={labelClass}>Letzte Inspektion — Datum</label>
                              <input
                                {...register('lastInspectionDate')}
                                type="text"
                                id="ti-lastInspectionDate"
                                placeholder="z.B. 06/2024"
                                className={inputClass}
                              />
                            </div>
                          </div>

                          {/* 12. TÜV / 13. Kilometerstand */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <label htmlFor="ti-tuvValidUntil" className={labelClass}>12. TÜV und AU gültig bis</label>
                              <input
                                {...register('tuvValidUntil')}
                                type="text"
                                id="ti-tuvValidUntil"
                                placeholder="z.B. 03/2026"
                                className={inputClass}
                              />
                            </div>
                            <div>
                              <label htmlFor="ti-mileage" className={labelClass}>13. Kilometerstand *</label>
                              <input
                                {...register('mileage', { required: 'Kilometerstand ist erforderlich' })}
                                type="text"
                                id="ti-mileage"
                                placeholder="z.B. 92.500"
                                className={inputClass}
                              />
                              {errors.mileage && <p className="mt-1 text-sm text-red-500">{errors.mileage.message}</p>}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="border-t border-white/[0.06]" />

                      {/* ── Section 4: Equipment & Other ── */}
                      <div>
                        <h3 className={sectionHeadingClass}>
                          <div className="w-10 h-10 bg-gradient-to-r from-[#dc2626] to-[#ef4444] rounded-xl flex items-center justify-center shrink-0">
                            <Settings className="w-5 h-5 text-white" />
                          </div>
                          Ausstattung & Sonstiges
                        </h3>

                        <div className="space-y-6">
                          {/* 14. Polster innen */}
                          <div>
                            <span className={labelClass}>14. Polster innen</span>
                            <div className="flex gap-6 mt-1">
                              {['Stoff', 'Leder', 'Teilleder'].map((opt) => (
                                <label key={opt} className="flex items-center gap-2 cursor-pointer text-gray-400 hover:text-gray-100 transition-colors">
                                  <input
                                    type="radio"
                                    value={opt}
                                    {...register('upholstery')}
                                    className="w-4 h-4 accent-red-600"
                                  />
                                  <span className="text-sm">{opt}</span>
                                </label>
                              ))}
                            </div>
                          </div>

                          {/* 15. Preisvorstellung */}
                          <div className="max-w-md">
                            <label htmlFor="ti-expectedPrice" className={labelClass}>15. Ihre Preisvorstellung (€)</label>
                            <input
                              {...register('expectedPrice')}
                              type="text"
                              id="ti-expectedPrice"
                              placeholder="z.B. 25.000"
                              className={inputClass}
                            />
                          </div>

                          {/* 16. Finanzierung */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <RadioGroup name="financing" label="16. Finanzierung" />
                            {financing === 'Ja' && (
                              <div>
                                <label htmlFor="ti-financingDetails" className={labelClass}>
                                  Bei welcher Bank, wie hoch ist die Ablöse?
                                </label>
                                <input
                                  {...register('financingDetails')}
                                  type="text"
                                  id="ti-financingDetails"
                                  placeholder="z.B. VW Bank, Restschuld 8.000€"
                                  className={inputClass}
                                />
                              </div>
                            )}
                          </div>

                          {/* 17 & 18 */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <RadioGroup name="smokersCar" label="17. Raucherwagen?" />
                            <RadioGroup name="reImport" label="18. Re-Import?" />
                          </div>
                        </div>
                      </div>

                      <div className="border-t border-white/[0.06]" />

                      {/* ── Additional Message ── */}
                      <div>
                        <label htmlFor="ti-message" className={labelClass}>Zusätzliche Nachricht (optional)</label>
                        <textarea
                          {...register('message')}
                          id="ti-message"
                          rows={4}
                          placeholder="Haben Sie weitere Informationen zu Ihrem Fahrzeug? Besondere Ausstattung, Mängel, etc.?"
                          className={inputClass}
                        />
                      </div>

                      {/* ── Privacy ── */}
                      <div>
                        <label className="flex items-start gap-3 cursor-pointer">
                          <input
                            {...register('privacy', { required: 'Sie müssen der Datenschutzerklärung zustimmen' })}
                            type="checkbox"
                            className="mt-1 w-4 h-4 accent-red-600"
                          />
                          <span className="text-sm text-gray-500">
                            Ich habe die Datenschutzerklärung zur Kenntnis genommen und stimme zu, dass meine Angaben
                            zur Kontaktaufnahme und für Rückfragen gespeichert werden. *
                          </span>
                        </label>
                        {errors.privacy && (
                          <p className="mt-1 text-sm text-red-500">{errors.privacy.message}</p>
                        )}
                      </div>

                      {/* ── Submit ── */}
                      <motion.button
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        disabled={submitting}
                        className="relative w-full group overflow-hidden bg-gradient-to-r from-red-600 to-red-500 text-white px-8 py-4 rounded-xl font-semibold flex items-center justify-center gap-3 transition-shadow hover:shadow-[0_0_20px_rgba(220,38,38,0.4)]"
                      >
                        <div className="absolute inset-0 bg-white/[0.02]/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                        <span className="relative z-10 flex items-center gap-2">
                          {submitting ? (
                            <>
                              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                              Wird gesendet...
                            </>
                          ) : (
                            <>
                              <Send className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                              Bewertungsanfrage absenden
                            </>
                          )}
                        </span>
                      </motion.button>
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