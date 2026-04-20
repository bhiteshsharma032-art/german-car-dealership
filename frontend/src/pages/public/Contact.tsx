import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Phone, MapPin, Clock, Send } from 'lucide-react';
import { motion } from 'framer-motion';
import api from '../../services/api';
import { useLanguage } from '../../contexts/LanguageContext';
import { saveContactToSupabase } from '../../services/supabaseService';

interface ContactForm {
  salutation: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  subject: string;
  carReference?: string;
  message: string;
  privacy: boolean;
  website: string;
}

export default function Contact() {
  const { t } = useLanguage();
  const [searchParams] = useSearchParams();
  const carRef = searchParams.get('car');

  const [submitting, setSubmitting] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactForm>({
    defaultValues: {
      carReference: carRef || '',
    },
  });

  const onSubmit = async (data: ContactForm) => {
    if (data.website) return; // Honeypot trap

    try {
      setSubmitting(true);

      // Run email API + Supabase save + Anfragen API in parallel
      const emailPromise = api.post('/contact', data);

      // Save to Supabase (fire and forget)
      saveContactToSupabase({
        salutation: data.salutation,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        subject: data.subject,
        carReference: data.carReference,
        message: data.message,
      });

      // Send data to Anfragen system (fire and forget)
      try {
        const anfrageTyp = 
          data.subject === 'Inzahlungnahme' ? 'inzahlungnahme' :
          data.subject === 'Finanzierung' ? 'finanzierung' :
          data.subject === 'Service' ? 'werkstatt' : 'allgemein';

        fetch(import.meta.env.VITE_ANFRAGEN_API_URL || 'https://<backend-url>/api/anfragen', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: `${data.firstName} ${data.lastName}`.trim(),
            email: data.email,
            telefon: data.phone,
            anfrageTyp,
            nachricht: data.message,
            website: data.website
          })
        }).catch(err => console.error('Anfragen API error:', err));
      } catch (err) {
        // Ignore errors to not affect existing flow
      }

      // Wait only for the email API (primary action)
      await emailPromise;

      toast.success(t('contact.form.success'));
      reset();
    } catch (error) {
      toast.error(t('contact.form.error'));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>{t('nav.contact')} - Nordhessen Automobile</title>
        <meta name="description" content={t('contact.subtitle')} />
      </Helmet>

      {/* Hero */}
      <div className="relative bg-gray-900 text-white py-24 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-500/10 rounded-full blur-[120px] mix-blend-screen pointer-events-none"
          />
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 text-center mb-6"
          >
            {t('contact.title')}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-400 text-center max-w-3xl mx-auto font-light"
          >
            {t('contact.subtitle')}
          </motion.p>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="lg:col-span-2"
          >
            <div className="bg-white/[0.02] border border-white/[0.06] rounded-3xl p-8 md:p-10 shadow-lg relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-600 to-red-400 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-out" />
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              
              <div className="relative z-10">
                <h2 className="text-3xl font-bold mb-8 text-gray-100 flex items-center gap-4">
                  {t('contact.form.title')}
                </h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                {/* Salutation */}
                <div>
                  <label htmlFor="salutation" className="block text-sm font-medium text-gray-300 mb-2">
                    {t('contact.form.salutation')} *
                  </label>
                  <select
                    {...register('salutation', { required: t('contact.form.required', { field: t('contact.form.salutation') }) })}
                    id="salutation"
                    className="input w-full"
                  >
                    <option value="">{t('contact.form.select')}</option>
                    <option value="Herr">{t('contact.form.salutation.m')}</option>
                    <option value="Frau">{t('contact.form.salutation.f')}</option>
                    <option value="Divers">{t('contact.form.salutation.d')}</option>
                  </select>
                  {errors.salutation && (
                    <p className="mt-1 text-sm text-red-500">{errors.salutation.message}</p>
                  )}
                </div>

                {/* Name Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-300 mb-2">
                      {t('contact.form.firstName')} *
                    </label>
                    <input
                      {...register('firstName', { required: t('contact.form.required', { field: t('contact.form.firstName') }) })}
                      type="text"
                      id="firstName"
                      className="input w-full"
                    />
                    {errors.firstName && (
                      <p className="mt-1 text-sm text-red-500">{errors.firstName.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-300 mb-2">
                      {t('contact.form.lastName')} *
                    </label>
                    <input
                      {...register('lastName', { required: t('contact.form.required', { field: t('contact.form.lastName') }) })}
                      type="text"
                      id="lastName"
                      className="input w-full"
                    />
                    {errors.lastName && (
                      <p className="mt-1 text-sm text-red-500">{errors.lastName.message}</p>
                    )}
                  </div>
                </div>

                {/* Contact Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                      {t('contact.form.email')} *
                    </label>
                    <input
                      {...register('email', {
                        required: t('contact.form.required', { field: t('contact.form.email') }),
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: t('contact.form.invalid_email'),
                        },
                      })}
                      type="email"
                      id="email"
                      className="input w-full"
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                      {t('contact.form.phone')} *
                    </label>
                    <input
                      {...register('phone', { required: t('contact.form.required', { field: t('contact.form.phone') }) })}
                      type="tel"
                      id="phone"
                      className="input w-full"
                    />
                    {errors.phone && (
                      <p className="mt-1 text-sm text-red-500">{errors.phone.message}</p>
                    )}
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                    {t('contact.form.subject')} *
                  </label>
                  <select
                    {...register('subject', { required: t('contact.form.required', { field: t('contact.form.subject') }) })}
                    id="subject"
                    className="input w-full"
                  >
                    <option value="">{t('contact.form.select')}</option>
                    <option value="Finanzierung">{t('contact.form.subject.finance')}</option>
                    <option value="Inzahlungnahme">{t('contact.form.subject.tradein')}</option>
                    <option value="Service">{t('contact.form.subject.service')}</option>
                    <option value="Sonstiges">{t('contact.form.subject.other')}</option>
                  </select>
                  {errors.subject && (
                    <p className="mt-1 text-sm text-red-500">{errors.subject.message}</p>
                  )}
                </div>

                {/* Car Reference */}
                {carRef && (
                  <div>
                    <label htmlFor="carReference" className="block text-sm font-medium text-gray-300 mb-2">
                      {t('inv.chip.type')} Reference
                    </label>
                    <input
                      {...register('carReference')}
                      type="text"
                      id="carReference"
                      className="input w-full bg-[#1a1a1f] border border-white/[0.06]"
                      readOnly
                    />
                  </div>
                )}

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                    {t('contact.form.message')} *
                  </label>
                  <textarea
                    {...register('message', { required: t('contact.form.required', { field: t('contact.form.message') }) })}
                    id="message"
                    rows={6}
                    className="input w-full"
                    placeholder={t('contact.form.message_placeholder')}
                  />
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-500">{errors.message.message}</p>
                  )}
                </div>

                {/* Privacy Checkbox */}
                <div>
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      {...register('privacy', { required: t('contact.form.required', { field: t('footer.privacy') }) })}
                      type="checkbox"
                      className="mt-1"
                    />
                    <span className="text-sm text-gray-500">
                      {t('contact.form.privacy')} *
                    </span>
                  </label>
                  {errors.privacy && (
                    <p className="mt-1 text-sm text-red-500">{errors.privacy.message}</p>
                  )}
                </div>

                {/* Honeypot */}
                <input type="text" {...register('website')} className="hidden" tabIndex={-1} autoComplete="off" />

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
                        {t('contact.form.button.sending')}
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                        {t('contact.form.button.send')}
                      </>
                    )}
                  </span>
                </motion.button>
              </form>
              </div>
            </div>
          </motion.div>

          {/* Contact Info Cards */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="space-y-6"
          >
            {/* Address Card */}
            <motion.div 
              whileHover={{ scale: 1.02, translateY: -5 }}
              className="bg-white/[0.02] border border-white/[0.06] rounded-3xl p-6 shadow-md hover:border-red-200 hover:shadow-lg transition-all duration-300 group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10 flex items-start gap-5">
                <div className="p-4 bg-white/[0.03] text-gray-500 rounded-2xl group-hover:text-red-500 group-hover:bg-red-500/10 transition-colors">
                  <MapPin className="h-7 w-7" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-100 text-lg mb-2">{t('contact.info.address')}</h3>
                  <p className="text-gray-500 leading-relaxed font-light">
                    Nordhessen-Automobile<br/>Seidler und Osmikhovski GbR<br />
                    Sandershäuser Straße 87a<br />
                    34123 Kassel<br />
                    Deutschland
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Departments Card */}
            <motion.div 
              whileHover={{ scale: 1.02, translateY: -5 }}
              className="bg-white/[0.02] border border-white/[0.06] rounded-3xl p-6 shadow-md hover:border-red-200 hover:shadow-lg transition-all duration-300 group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10 flex items-start gap-5">
                <div className="p-4 bg-white/[0.03] text-gray-500 rounded-2xl group-hover:text-red-500 group-hover:bg-red-500/10 transition-colors">
                  <Phone className="h-7 w-7" />
                </div>
                <div className="w-full space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-100 text-lg mb-1">Verkauf</h3>
                    <div className="flex flex-col gap-1">
                      <a href="tel:+4956198866911" className="text-gray-500 hover:text-red-500 font-light text-sm transition-colors">Tel: 0561/98866911</a>
                      <p className="text-gray-500 font-light text-sm">Fax: 0561/98866916</p>
                      <a href="mailto:verkauf@nordhessen-automobile.de" className="text-gray-500 hover:text-red-500 font-light text-sm transition-colors break-all">verkauf@nordhessen-automobile.de</a>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-100 text-lg mb-1">Werkstatt</h3>
                    <div className="flex flex-col gap-1">
                      <a href="tel:+4956198866918" className="text-gray-500 hover:text-red-500 font-light text-sm transition-colors">Tel: 0561/98866918</a>
                      <a href="mailto:werkstatt@nordhessen-automobile.de" className="text-gray-500 hover:text-red-500 font-light text-sm transition-colors break-all">werkstatt@nordhessen-automobile.de</a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>



            {/* Opening Hours Card */}
            <motion.div 
              whileHover={{ scale: 1.02, translateY: -5 }}
              className="bg-white/[0.02] border border-white/[0.06] rounded-3xl p-6 shadow-md hover:border-red-200 hover:shadow-lg transition-all duration-300 group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10 flex items-start gap-5">
                <div className="p-4 bg-white/[0.03] text-gray-500 rounded-2xl group-hover:text-red-500 group-hover:bg-red-500/10 transition-colors">
                  <Clock className="h-7 w-7" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-100 text-lg mb-4">{t('contact.info.hours')}</h3>
                  <table className="w-full text-sm font-light">
                    <tbody className="space-y-3">
                      <tr>
                        <td className="text-gray-500 py-2 border-b border-white/[0.06]">{t('contact.info.hours.mon_fri')}</td>
                        <td className="text-right text-gray-300 font-medium py-2 border-b border-white/[0.06]">09:00 - 18:00</td>
                      </tr>
                      <tr>
                        <td className="text-gray-500 py-2 border-b border-white/[0.06]">{t('contact.info.hours.sat')}</td>
                        <td className="text-right text-gray-300 font-medium py-2 border-b border-white/[0.06]">10:00 - 16:00</td>
                      </tr>
                      <tr>
                        <td className="text-gray-500 py-2">{t('contact.info.hours.sun')}</td>
                        <td className="text-right text-red-500/80 font-medium py-2">{t('contact.info.hours.closed')}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>


          </motion.div>
        </div>


      </div>
    </>
  );
}
