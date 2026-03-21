import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';
import { motion } from 'framer-motion';


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
}

export default function Contact() {
  const [searchParams] = useSearchParams();
  const carRef = searchParams.get('car');

  const [submitting, setSubmitting] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactForm>({
    defaultValues: {
      carReference: carRef || '',
    },
  });

  const onSubmit = async (data: ContactForm) => {
    try {
      setSubmitting(true);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log('Contact form:', data);
      toast.success('Vielen Dank! Wir werden uns innerhalb von 24 Stunden bei Ihnen melden.');
      reset();
    } catch (error) {
      toast.error('Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.');
    } finally {
      setSubmitting(false);
    }
  };



  return (
    <>
      <Helmet>
        <title>Kontakt - Nordhessen Automobile</title>
        <meta name="description" content="Kontaktieren Sie uns für weitere Informationen oder vereinbaren Sie eine Probefahrt" />
      </Helmet>

      {/* Hero */}
      <div className="relative bg-[#0a0a0a] text-white py-24 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-600/10 rounded-full blur-[120px] mix-blend-screen pointer-events-none"
          />
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 text-center mb-6"
          >
            Kontaktieren Sie uns
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-400 text-center max-w-3xl mx-auto font-light"
          >
            Wir sind für Sie da und beantworten gerne alle Ihre Fragen
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
            <div className="bg-zinc-900/80 backdrop-blur-2xl border border-zinc-800/80 rounded-3xl p-8 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.5)] relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-600 to-red-400 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-out" />
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              
              <div className="relative z-10">
                <h2 className="text-3xl font-bold mb-8 text-white flex items-center gap-4">
                  Senden Sie uns eine Nachricht
                </h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                {/* Salutation */}
                <div>
                  <label htmlFor="salutation" className="block text-sm font-medium text-gray-300 mb-2">
                    Anrede *
                  </label>
                  <select
                    {...register('salutation', { required: 'Anrede ist erforderlich' })}
                    id="salutation"
                    className="input w-full"
                  >
                    <option value="">Bitte wählen</option>
                    <option value="Herr">Herr</option>
                    <option value="Frau">Frau</option>
                    <option value="Divers">Divers</option>
                  </select>
                  {errors.salutation && (
                    <p className="mt-1 text-sm text-red-600">{errors.salutation.message}</p>
                  )}
                </div>

                {/* Name Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-300 mb-2">
                      Vorname *
                    </label>
                    <input
                      {...register('firstName', { required: 'Vorname ist erforderlich' })}
                      type="text"
                      id="firstName"
                      className="input w-full"
                    />
                    {errors.firstName && (
                      <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-300 mb-2">
                      Nachname *
                    </label>
                    <input
                      {...register('lastName', { required: 'Nachname ist erforderlich' })}
                      type="text"
                      id="lastName"
                      className="input w-full"
                    />
                    {errors.lastName && (
                      <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>
                    )}
                  </div>
                </div>

                {/* Contact Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                      E-Mail *
                    </label>
                    <input
                      {...register('email', {
                        required: 'E-Mail ist erforderlich',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Ungültige E-Mail-Adresse',
                        },
                      })}
                      type="email"
                      id="email"
                      className="input w-full"
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                      Telefon *
                    </label>
                    <input
                      {...register('phone', { required: 'Telefon ist erforderlich' })}
                      type="tel"
                      id="phone"
                      className="input w-full"
                    />
                    {errors.phone && (
                      <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
                    )}
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                    Betreff *
                  </label>
                  <select
                    {...register('subject', { required: 'Betreff ist erforderlich' })}
                    id="subject"
                    className="input w-full"
                  >
                    <option value="">Bitte wählen</option>

                    <option value="Finanzierung">Finanzierung</option>
                    <option value="Inzahlungnahme">Inzahlungnahme</option>
                    <option value="Service">Service & Wartung</option>
                    <option value="Sonstiges">Sonstiges</option>
                  </select>
                  {errors.subject && (
                    <p className="mt-1 text-sm text-red-600">{errors.subject.message}</p>
                  )}
                </div>

                {/* Car Reference */}
                {carRef && (
                  <div>
                    <label htmlFor="carReference" className="block text-sm font-medium text-gray-300 mb-2">
                      Fahrzeug-Referenz
                    </label>
                    <input
                      {...register('carReference')}
                      type="text"
                      id="carReference"
                      className="input w-full bg-zinc-900 border border-zinc-800"
                      readOnly
                    />
                  </div>
                )}

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                    Nachricht *
                  </label>
                  <textarea
                    {...register('message', { required: 'Nachricht ist erforderlich' })}
                    id="message"
                    rows={6}
                    className="input w-full"
                    placeholder="Teilen Sie uns mit, wie wir Ihnen helfen können..."
                  />
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
                  )}
                </div>

                {/* Privacy Checkbox */}
                <div>
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      {...register('privacy', { required: 'Sie müssen der Datenschutzerklärung zustimmen' })}
                      type="checkbox"
                      className="mt-1"
                    />
                    <span className="text-sm text-gray-400">
                      Ich habe die Datenschutzerklärung zur Kenntnis genommen und stimme zu, dass meine Angaben zur Kontaktaufnahme und für Rückfragen gespeichert werden. *
                    </span>
                  </label>
                  {errors.privacy && (
                    <p className="mt-1 text-sm text-red-600">{errors.privacy.message}</p>
                  )}
                </div>

                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={submitting}
                  className="relative w-full group overflow-hidden bg-gradient-to-r from-red-600 to-red-500 text-white px-8 py-4 rounded-xl font-semibold flex items-center justify-center gap-3 transition-shadow hover:shadow-[0_0_20px_rgba(220,38,38,0.4)]"
                >
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                  <span className="relative z-10 flex items-center gap-2">
                    {submitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                        Wird gesendet...
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                        Nachricht senden
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
              className="bg-zinc-900/60 backdrop-blur-xl border border-zinc-800/60 rounded-3xl p-6 shadow-xl hover:border-red-500/30 hover:shadow-[0_0_30px_rgba(239,68,68,0.1)] transition-all duration-300 group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10 flex items-start gap-5">
                <div className="p-4 bg-zinc-800/80 text-gray-300 rounded-2xl group-hover:text-red-500 group-hover:bg-red-500/10 transition-colors">
                  <MapPin className="h-7 w-7" />
                </div>
                <div>
                  <h3 className="font-semibold text-white text-lg mb-2">Adresse</h3>
                  <p className="text-gray-400 leading-relaxed font-light">
                    Nordhessen-Automobile<br/>Seidler & Osmikhovsky GbR<br />
                    Sandershäuser Straße 87a<br />
                    34123 Kassel<br />
                    Deutschland
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Phone Card */}
            <motion.div 
              whileHover={{ scale: 1.02, translateY: -5 }}
              className="bg-zinc-900/60 backdrop-blur-xl border border-zinc-800/60 rounded-3xl p-6 shadow-xl hover:border-red-500/30 hover:shadow-[0_0_30px_rgba(239,68,68,0.1)] transition-all duration-300 group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10 flex items-start gap-5">
                <div className="p-4 bg-zinc-800/80 text-gray-300 rounded-2xl group-hover:text-red-500 group-hover:bg-red-500/10 transition-colors">
                  <Phone className="h-7 w-7" />
                </div>
                <div>
                  <h3 className="font-semibold text-white text-lg mb-2">Telefon</h3>
                  <a href="tel:+4956193004649" className="text-gray-400 hover:text-red-400 font-light text-lg transition-colors">
                    0561 930 04 649
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Email Card */}
            <motion.div 
              whileHover={{ scale: 1.02, translateY: -5 }}
              className="bg-zinc-900/60 backdrop-blur-xl border border-zinc-800/60 rounded-3xl p-6 shadow-xl hover:border-red-500/30 hover:shadow-[0_0_30px_rgba(239,68,68,0.1)] transition-all duration-300 group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10 flex items-start gap-5">
                <div className="p-4 bg-zinc-800/80 text-gray-300 rounded-2xl group-hover:text-red-500 group-hover:bg-red-500/10 transition-colors">
                  <Mail className="h-7 w-7" />
                </div>
                <div>
                  <h3 className="font-semibold text-white text-lg mb-2">E-Mail</h3>
                  <a href="mailto:info@nordhessen-automobile.de" className="text-gray-400 hover:text-red-400 font-light transition-colors break-all">
                    info@nordhessen-automobile.de
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Opening Hours Card */}
            <motion.div 
              whileHover={{ scale: 1.02, translateY: -5 }}
              className="bg-zinc-900/60 backdrop-blur-xl border border-zinc-800/60 rounded-3xl p-6 shadow-xl hover:border-red-500/30 hover:shadow-[0_0_30px_rgba(239,68,68,0.1)] transition-all duration-300 group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10 flex items-start gap-5">
                <div className="p-4 bg-zinc-800/80 text-gray-300 rounded-2xl group-hover:text-red-500 group-hover:bg-red-500/10 transition-colors">
                  <Clock className="h-7 w-7" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-white text-lg mb-4">Öffnungszeiten</h3>
                  <table className="w-full text-sm font-light">
                    <tbody className="space-y-3">
                      <tr>
                        <td className="text-gray-400 py-2 border-b border-zinc-800/50">Montag - Freitag</td>
                        <td className="text-right text-gray-300 font-medium py-2 border-b border-zinc-800/50">09:00 - 18:00</td>
                      </tr>
                      <tr>
                        <td className="text-gray-400 py-2 border-b border-zinc-800/50">Samstag</td>
                        <td className="text-right text-gray-300 font-medium py-2 border-b border-zinc-800/50">10:00 - 16:00</td>
                      </tr>
                      <tr>
                        <td className="text-gray-500 py-2">Sonntag</td>
                        <td className="text-right text-red-500/80 font-medium py-2">Geschlossen</td>
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
