import { useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, useInView } from 'framer-motion';
import { Award, Star, Heart, TrendingUp, ShieldCheck, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';

function FadeUp({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, delay, ease: [0.32, 0.72, 0, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}



/* ── Image Placeholder Box ── */


export default function Geschichte() {
  const { t, language } = useLanguage();


  const values = [
    { 
      icon: <ShieldCheck className="w-7 h-7" />, 
      title: t('story.values.1.title'), 
      desc: t('story.values.1.desc') 
    },
    { 
      icon: <Star className="w-7 h-7" />, 
      title: t('story.values.2.title'), 
      desc: t('story.values.2.desc') 
    },
    { 
      icon: <Heart className="w-7 h-7" />, 
      title: t('story.values.3.title'), 
      desc: t('story.values.3.desc') 
    },
    { 
      icon: <TrendingUp className="w-7 h-7" />, 
      title: t('story.values.4.title'), 
      desc: t('story.values.4.desc') 
    },
  ];

  return (
    <>
      <Helmet>
        <title>{t('nav.story')} — Nordhessen Automobile</title>
        <meta name="description" content={t('story.hero.subtitle')} />
      </Helmet>

      <div className="bg-[#0a0a0a] min-h-screen">

        {/* ══ HERO ══ */}
        <section className="relative pt-36 pb-28 overflow-hidden flex items-center">
          {/* Background */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.8) 1px, transparent 0)', backgroundSize: '48px 48px' }} />
            <motion.div 
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-red-500/10 rounded-full blur-[120px] pointer-events-none" 
            />
            <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-red-600/5 rounded-full blur-[100px] pointer-events-none" />
            
            {/* Speed Light Streaks mimicking passing cars */}
            <motion.div
              initial={{ x: '-100vw', opacity: 0 }}
              animate={{ x: '100vw', opacity: [0, 1, 0] }}
              transition={{ duration: 2.5, ease: 'linear', repeat: Infinity, repeatDelay: 3 }}
              className="absolute top-[30%] left-0 w-[50vw] h-1 bg-gradient-to-r from-transparent via-red-500/60 to-transparent blur-[2px] transform -rotate-[10deg] pointer-events-none"
            />
            <motion.div
              initial={{ x: '-100vw', opacity: 0 }}
              animate={{ x: '100vw', opacity: [0, 1, 0] }}
              transition={{ duration: 3.5, ease: 'linear', repeat: Infinity, repeatDelay: 2, delay: 1 }}
              className="absolute top-[70%] left-0 w-[40vw] h-[2px] bg-gradient-to-r from-transparent via-white/50 to-transparent blur-[1px] transform -rotate-[15deg] pointer-events-none"
            />
          </div>
          {/* Top gradient line */}
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          {/* Scrolling background text */}
          <div className="absolute top-[60%] -translate-y-1/2 left-0 w-full overflow-hidden whitespace-nowrap opacity-[0.03] pointer-events-none select-none z-0 mix-blend-overlay">
            <motion.div
              animate={{ x: ['0%', '-50%'] }}
              transition={{ repeat: Infinity, ease: 'linear', duration: 40 }}
              className="inline-flex text-[15rem] font-black tracking-tighter text-white"
            >
              <span className="px-10">TRUST • PERFORMANCE • QUALITY • EXCELLENCE</span>
              <span className="px-10">TRUST • PERFORMANCE • QUALITY • EXCELLENCE</span>
            </motion.div>
          </div>

          <div className="container mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <FadeUp>
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-red-500/25 bg-red-500/8 text-red-500 text-[10px] tracking-[0.3em] uppercase font-bold mb-8">
                  <Award className="w-3.5 h-3.5" />
                  {t('story.hero.badge')}
                </span>
              </FadeUp>
              <FadeUp delay={0.1}>
                <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-black tracking-tighter leading-none text-white mb-8">
                  {t('story.hero.title1')}{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-red-400 to-white">
                    {t('story.hero.title2')}
                  </span>
                </h1>
              </FadeUp>
              <FadeUp delay={0.2}>
                <p className="text-lg md:text-xl text-gray-400 leading-relaxed max-w-2xl mx-auto font-light">
                  {t('story.hero.subtitle')}
                </p>
              </FadeUp>
            </div>
          </div>
        </section>



        {/* ══ TRUST & TRANSPARENCY ══ */}
        <section className="py-28 relative overflow-hidden border-t border-white/[0.04]">
          <div className="absolute inset-0">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-500/5 rounded-full blur-[150px] pointer-events-none" />
          </div>
          <div className="container mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <FadeUp>
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-red-500/25 bg-red-500/8 text-red-500 text-[10px] tracking-[0.3em] uppercase font-bold mb-6">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  {language === 'de' ? 'Vertrauen & Sicherheit' : 'Trust & Security'}
                </span>
              </FadeUp>
              <FadeUp delay={0.1}>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-black text-white tracking-tighter leading-tight mb-8">
                  {language === 'de' ? 'Warum Sie uns' : 'Why You Should'}{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-red-400 to-white">
                    {language === 'de' ? 'vertrauen können' : 'Trust Us'}
                  </span>
                </h2>
              </FadeUp>
              <FadeUp delay={0.2}>
                <div className="p-8 md:p-12 rounded-[2rem] border border-white/[0.06] bg-gradient-to-br from-white/[0.03] to-white/[0.01] backdrop-blur-md shadow-2xl relative overflow-hidden text-left md:text-center mt-10">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-red-500/50 to-transparent" />
                  
                  <p className="text-xl md:text-2xl text-gray-300 font-light leading-relaxed mb-6">
                    {language === 'de' 
                      ? 'Der Kauf eines Premiumfahrzeugs ist Vertrauenssache. Wir verstehen, dass Transparenz, Sicherheit und eine ehrliche Beratung die wichtigsten Faktoren für unsere Kunden sind.'
                      : 'Purchasing a premium vehicle is a matter of trust. We understand that transparency, security, and honest advice are the most important factors for our clients.'}
                  </p>
                  <p className="text-lg text-gray-400 leading-relaxed font-light">
                    {language === 'de'
                      ? 'Jedes einzelne Fahrzeug in unserem Bestand durchläuft vor dem Verkauf eine rigorose 150-Punkte-Prüfung durch unsere Experten. Wir garantieren Ihnen nicht nur eine lückenlose Fahrzeughistorie und einen verifizierten Kilometerstand, sondern bieten Ihnen auch absolute rechtliche Sicherheit bei der Abwicklung. Keine versteckten Mängel, keine unerwarteten Kosten – nur exzellente Fahrzeuge, die unseren strengen Qualitätsstandards entsprechen.'
                      : 'Every single vehicle in our inventory undergoes a rigorous 150-point inspection by our experts before being offered for sale. We don\'t just guarantee a flawless vehicle history and verified mileage; we also provide absolute legal security throughout the transaction. No hidden flaws, no unexpected costs – only excellent vehicles that meet our uncompromising quality standards.'}
                  </p>
                </div>
              </FadeUp>
            </div>
          </div>
        </section>



        {/* ══ VALUES ══ */}
        <section className="py-28 relative overflow-hidden">
          <div className="absolute inset-0 border-t border-white/[0.04]" />
          <div className="container mx-auto px-5 sm:px-6 lg:px-8">
            <FadeUp className="text-center mb-16">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-red-500/25 bg-red-500/8 text-red-500 text-[10px] tracking-[0.3em] uppercase font-bold mb-6">
                <Star className="w-3.5 h-3.5" />
                {t('story.values.badge')}
              </span>
              <h2 className="text-4xl md:text-5xl font-display font-black text-white tracking-tighter mb-5">
                {t('story.values.title')}
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto leading-relaxed">
                {t('story.values.subtitle')}
              </p>
            </FadeUp>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {values.map((v, i) => (
                <FadeUp key={v.title} delay={i * 0.1}>
                  <div className="group h-full p-8 rounded-[1.75rem] border border-white/[0.05] bg-white/[0.02] hover:bg-white/[0.04] hover:border-red-500/20 transition-all duration-500 relative overflow-hidden">
                    {/* Hover gradient effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-red-500/0 to-red-500/0 group-hover:from-red-500/[0.05] group-hover:to-transparent transition-all duration-700 pointer-events-none" />
                    
                    <div className="relative z-10">
                      <div className="w-14 h-14 rounded-2xl mb-6 flex items-center justify-center text-red-400 group-hover:text-white group-hover:bg-red-500 transition-all duration-500 border border-white/[0.06] group-hover:border-red-500 group-hover:scale-110" style={{ background: 'rgba(239,68,68,0.07)' }}>
                        {v.icon}
                      </div>
                      <h3 className="text-xl font-display font-bold text-white mb-3 group-hover:text-red-400 transition-colors duration-300">
                        {v.title}
                      </h3>
                      <p className="text-sm text-gray-500 leading-relaxed group-hover:text-gray-400 transition-colors duration-300">{v.desc}</p>
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>



        {/* ══ AWARDS / TRUST BADGES ══ */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 border-t border-white/[0.04]" />
          <div className="container mx-auto px-5 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { icon: <Award className="w-8 h-8" />, val: 'Premium', label: t('story.badges.1.label') },
                { icon: <ShieldCheck className="w-8 h-8" />, val: '100%', label: t('story.badges.2.label') },
                { icon: <Star className="w-8 h-8" />, val: 'Top', label: t('story.badges.3.label') },
              ].map(({ icon, val, label }, i) => (
                <FadeUp key={label} delay={i * 0.12}>
                  <div className="group flex items-center gap-5 p-7 rounded-2xl border border-white/[0.05] bg-white/[0.02] hover:border-red-500/20 hover:bg-white/[0.04] transition-all duration-500">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-red-400 group-hover:text-white group-hover:bg-red-500 transition-all duration-500 border border-white/[0.06] group-hover:border-red-500 flex-shrink-0" style={{ background: 'rgba(239,68,68,0.07)' }}>
                      {icon}
                    </div>
                    <div>
                      <div className="text-3xl font-display font-black text-white tracking-tighter">{val}</div>
                      <div className="text-xs text-gray-500 uppercase tracking-widest mt-1">{label}</div>
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* ══ CTA ══ */}
        <section className="py-32 relative overflow-hidden bg-[#050505] border-t border-white/[0.05]">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[700px] h-[400px] bg-red-500/8 rounded-full blur-[120px]" />
          </div>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-red-500/40 to-transparent" />

          <div className="container mx-auto px-5 sm:px-6 lg:px-8 text-center relative z-10">
            <FadeUp>
              <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-red-500/30 bg-red-500/10 text-red-500 text-xs tracking-[0.25em] uppercase font-bold mb-10">
                {t('story.cta.badge')}
              </span>
            </FadeUp>
            <FadeUp delay={0.1}>
              <h2 className="text-5xl md:text-7xl font-display font-black text-white tracking-tighter leading-none mb-6">
                {t('story.cta.title1')}{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-red-400 to-white">
                  {t('story.cta.title2')}
                </span>
              </h2>
            </FadeUp>
            <FadeUp delay={0.2}>
              <p className="text-lg text-gray-400 mb-14 max-w-xl mx-auto font-light leading-relaxed">
                {t('story.cta.subtitle')}
              </p>
            </FadeUp>
            <FadeUp delay={0.3}>
              <Link
                to="/fahrzeuge"
                className="group inline-flex items-center gap-4 px-10 py-5 rounded-full font-bold text-white text-lg transition-all duration-500 relative"
                style={{ background: 'linear-gradient(135deg, #ef4444, #b91c1c)', boxShadow: '0 0 40px rgba(239,68,68,0.3)' }}
              >
                <div className="absolute inset-0 rounded-full border border-white/20" />
                <span>{t('story.cta.button')}</span>
                <span className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white transition-colors duration-500 group-hover:text-red-600">
                  <ArrowRight className="w-5 h-5" />
                </span>
              </Link>
            </FadeUp>
          </div>
        </section>

      </div>
    </>
  );
}
